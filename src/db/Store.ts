import { DbDataType } from "@ctsy/model";
/**
  * 文件存储 Store
  * 存储编号 SID 自增序号(bigint)
  * 存储驱动 Driver 字符20(char(20))
  * 存储路径 Path 字符250(char(250))
  * 文件MD5 MD5 字符50(char(50))
  * 引用次数 Count 序号(bigint)
  * 状态 Status 状态值(tinyint(1))
*/
export default {    
    SID:{
        type:DbDataType.bigint,
        primaryKey:true,
        autoIncrement:true,
        defaultValue:0,
        allowNull:false
    },    
    Driver:{
        type:DbDataType.char(20),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    Path:{
        type:DbDataType.char(250),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    MD5:{
        type:DbDataType.char(50),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    Count:{
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