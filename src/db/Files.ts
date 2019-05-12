import { DbDataType } from "@ctsy/model";
/**
  * 文件 Files
  * 文件编号 FID 自增序号(bigint)
  * 原文件名 Name 字符250(char(250))
  * 文件后缀 Ext 字符20(char(20))
  * 文件大小 Size 大整数(bigint)
  * 创建时间 CRTime 时间日期(datetime)
  * 修改时间 UPTime 时间日期(datetime)
  * 文件MD5 MD5 字符50(char(50))
  * 上传时间 CTime 时间日期(datetime)
  * 上传人 CUID 大整数(bigint)
  * 文件状态 Status 状态值(tinyint(1))
*/
export default {    
    FID:{
        type:DbDataType.bigint,
        primaryKey:true,
        autoIncrement:true,
        defaultValue:0,
        allowNull:false
    },    
    SID:{
        type:DbDataType.bigint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },    
    Name:{
        type:DbDataType.char(250),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    Ext:{
        type:DbDataType.char(20),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    Size:{
        type:DbDataType.bigint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },    
    CRTime:{
        type:DbDataType.datetime,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:new Date,
        allowNull:false
    },    
    UPTime:{
        type:DbDataType.datetime,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:new Date,
        allowNull:false
    },    
    MD5:{
        type:DbDataType.char(50),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    CTime:{
        type:DbDataType.datetime,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:new Date,
        allowNull:false
    },    
    CUID:{
        type:DbDataType.bigint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },    
    Status:{
        type:DbDataType.tinyint(1),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },
}