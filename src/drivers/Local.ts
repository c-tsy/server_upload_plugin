
import * as fs from 'fs'
import * as path from 'path';
import { UploadConfig } from '../iface/upload';
export default class Local {
    config: UploadConfig;
    mac: any;
    putPolicy: any;
    Instance: any;
    // Bucket: qiniu.bucket;
    constructor(ctx, config: UploadConfig) {
        this.config = config
    }

    async upload(d: any, key: string) {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(path.dirname(key))) { fs.mkdirSync(path.dirname(key)) }
            try {
                let write = fs.createWriteStream(key)
                let read = fs.createReadStream(d.path);
                read.on('end', () => {
                    fs.unlink(d.path, () => { })
                    resolve(key)
                })
                read.pipe(write)
            } catch (error) {
                reject(error)
            }
        })
    }
    async token() {
        // return this.putPolicy.uploadToken(this.mac);
    }
}