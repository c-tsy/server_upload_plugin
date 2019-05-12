import { DbDataType } from "@ctsy/model";
/**
  * 存储驱动 Drivers
  * 驱动编号 DID 大数值自增(bigint)
  * 名称 Name 字符20(char(20))
  * 类 Class 字符50(char(50))
  * 参数 Param 字符250(char(250))
  * 状态 Status 状态值(tinyint(1))
  * 已用空间 Used 大整数(bigint)
  * 最大空间 Max 大整数(bigint)
*/
export default {    
    DID:{
        type:DbDataType.bigint,
        primaryKey:true,
        autoIncrement:true,
        defaultValue:0,
        allowNull:false
    },    
    Name:{
        type:DbDataType.char(20),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    Class:{
        type:DbDataType.char(50),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    Param:{
        type:DbDataType.char(250),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:"",
        allowNull:false
    },    
    Status:{
        type:DbDataType.tinyint(1),
        primaryKey:false,
        autoIncrement:false,
        defaultValue:1,
        allowNull:false
    },    
    Used:{
        type:DbDataType.bigint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },    
    Max:{
        type:DbDataType.bigint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },
}