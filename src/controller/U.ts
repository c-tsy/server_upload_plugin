import BaseController from '@ctsy/controller/dist/base_controller';
import config from '../index';
import { extname, join, resolve } from 'path';
import { Models } from '../iface/models';
import { UploadConfig } from '../iface/upload';
import * as moment from 'moment';
import Files from '../class/Files';
import { stat, exists } from 'mz/fs';
import Store from '../class/Store';
import Local from '../drivers/Local';
import { md5_file } from '../utils';
import { createReadStream } from 'fs';
import * as mime from 'mime'
export default class U extends BaseController{
    _prefix='upload_'
    /**
     * 添加文件
     */
    async a() {
        let UID = this._ctx.UID || await this._session('UID');
        if (!config.AllowAnonymous && (UID <= 0)) {
            throw new Error(config.Errors.NOT_ALLOW);
        }
        let sp = this._ctx.path.split('/'), driverConfig = new UploadConfig,Class='';
        let method = sp[4] || this._ctx.query.m || this._ctx.req.body.m || config.DefaultMethod;
        //检查上传驱动是否存在
        if (method != 'Local') {
            let mrs = await this.M(Models.Drivers).where({ Class: method }).find();
            if (!mrs) {
                throw new Error(config.Errors.DRIVER_ERROR)
            }
            try {
                Class = '';
                driverConfig = Object.assign(driverConfig, JSON.parse(mrs.Param));
            } catch (error) {
                
            }
        } else {
            Class = resolve(join( __dirname, '../drivers', 'Local'));
        }

        let driver:Local
        try {
            driver = new (require(Class).default)(this._ctx,driverConfig)
        } catch (error) {
            throw new Error(config.Errors.DRIVER_ERROR);
        }

        let [Year, Month, Day, Hour, Min] = moment().format('YYYY-MM-DD-HH-mm').split('-')
        //计算文件MD5值
        let filesForm = Object.keys(this._files);
        let rs = {}, success=[],md5s=[];
        for (let i = 0; i < filesForm.length; i++){
            // MD5.encode()
            let fo = filesForm[i]
            if (config.MaxSize > 0 && this._files[fo].size > config.MaxSize) {
                rs[fo] = {
                    Error:config.Errors.TOO_LARGE
                }
                delete this._files[fo];
                continue;
            }
            let ext = extname(this._files[fo].name).substr(1);
            if (config.AllowExt.length > 0 && !config.AllowExt.includes(ext)) {
                rs[fo] = {
                    Error:config.Errors.DENY_TYPE
                }
                delete this._files[fo];
                continue;
            }
            this._files[fo].MD5 = await md5_file(this._files[fo].path);
            this._files[fo].ext = ext;
            this._files[fo].Save = driverConfig.Path instanceof Function ? await driverConfig.Path({
                File: this._files[fo],
                Method: method,
                Config:driverConfig
            }) : driverConfig.Path
                    .replace('{MD5}', this._files[fo].MD5)
                    .replace('{YEAR}', Year)
                    .replace('{MONTH}', Month)
                    .replace('{DAY}', Day)
                    .replace('{HOUR}', Hour)
                    .replace('{MIN}', Min)
                    .replace('{UID}', UID)
                    .replace('{EXT}', ext)
                ;
            success.push(this._files[fo]);
            md5s.push(this._files[fo].MD5);
        }
        if (md5s.length>0) {                
            let adds = [];
            let existed = await this.M(Models.Store).where({MD5:{in:md5s}}).getFields('MD5,SID',true)
            let myexisted = await this.M(Models.Files).where({MD5:{in:md5s},CUID:UID}).getFields('MD5,FID,SID',true)
            //TODO 更新Store的引用次数
            let countrs = {};
            for (let i = 0; i < success.length; i++){
                let file = success[i];
                let add = new Files()
                let stats = await stat(file.path);
                add.CRTime = stats.crtime;
                add.Name = file.name;
                add.Ext = file.ext;
                add.Size = file.size;
                add.UPTime = stats.uptime;
                add.CTime = new Date;
                add.CUID = UID;
                add.Status = 1;
                add.MD5 = file.MD5;
                add.Field = file.fieldName;
                if (myexisted[file.MD5]) {
                    add.FID = myexisted[file.MD5].FID;
                    add.SID = myexisted[file.MD5].SID;
                    rs[file.fieldName] = add;
                    continue;
                }
                else if (existed[file.MD5]) {
                    //系统已存在该文件，直接写关联数据就行
                    add.SID = existed[file.MD5].SID;
                } else {
                    //系统不存在文件，调用处理库并完成数据处理后写入数据库
                    try {
                        await driver.upload(file, file.Save);
                        let store = new Store();
                        store.Count = 1;
                        store.Driver = method;
                        store.MD5 = file.MD5;
                        store.Path = file.Save;
                        store.Status = 1;
                        let srs = await this.M(Models.Store).add(store);
                        if (srs) {
                            add.SID = srs.SID;
                        } else {
                            rs[file.fieldName] = { Error: config.Errors.STORE_ERROR }
                            continue;
                        }
                    } catch (error) {
                        rs[file.fieldName]={Error:config.Errors.UPLOAD_ERROR}
                    }
                }
                adds.push(add);
                rs[file.fieldName] = add;
            }
            if (adds.length > 0) {
                let r = await this.M(Models.Files).addAll(adds);
                for (let i = 0; i < r.length; i++){
                    rs[adds[i].Field].FID = r[i].FID;
                }
            }
            // if (countrs) {
            //     await this.M(Models.Store).
            // }
        }
        // debugger
        return rs;
    }
    /**
     * 读取服务端配置
     */
    async c() {
        return {
            Max: config.MaxSize,
            Exts: config.AllowExt,
            Anonymous: config.AllowAnonymous,            
        }
    }
    async r() {
        // 读取文件
        // 通过md5或者FID读取文件
        let sp = this._ctx.path.split('/')
        if (sp[4] && sp[4].length == 32) {
            //MD5模式
            //TODO 鉴权，是否允许该用户访问该资源
            let p = await this.M(Models.Store).where({ MD5: sp[4] }).getFields('Path')
            if (p && await exists(p)) {
                let stats = await stat(p);
                this._config.sendFile = true;
                this._ctx.set('Content-Type', mime.getType(extname(p).substr(1)));
                this._ctx.set('Content-Length', stats.size);
                this._ctx.set('Last-Modified', stats.mtimeMs);
                this._ctx.set('Expire', new Date(moment().add(7, 'day').format('YYYY-MM-DD HH:mm:ss')).toUTCString());
                if (this._ctx.headers['if-modified-since'] == stats.mtimeMs) {
                    this._ctx.status = 304;
                    this._ctx.body=''
                    return;
                } else {                    
                    return this._ctx.body = createReadStream(p);
                }
            }
        } else if (sp[4] && Number(sp[4]) > 0) {
            
        } else {
            throw new Error(config.Errors.FILE_NOT_EXIST);
        }
        return ''
    }
}