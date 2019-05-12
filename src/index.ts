/**
 * 配置类
 */
class Config{
    /**
     * 是否允许未登录用户上传
     */
    AllowAnonymous: boolean = false;
    /**
     * 错误提示
     */
    Errors = {
        NOT_ALLOW: '未被授权上传',
        TOO_LARGE: '文件尺寸太大',
        DENY_TYPE: '不允许上传该类型文件',
        DRIVER_ERROR: '驱动错误',
        UPLOAD_ERROR: '保存错误',
        STORE_ERROR:'存储错误',
        FILE_NOT_EXIST:'文件不存在',
        FILE_FORBIDDEN:'禁止访问',
    }
    /**
     * 默认上传处理方式
     */
    DefaultMethod: string = 'Local'
    /**
     * 默认上传配置
     */
    DefaultConfig = {
        Dir:'./Upload/${Year}-${Month}-${Day}/${MD5}.${Ext}'
    }
    /**
     * 最大上传文件大小
     */
    MaxSize: number = 0;
    /**
     * 允许上传的后缀
     */
    AllowExt:string[]=[]
}
const config = new Config();
export default config;