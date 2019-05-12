import { DbDataType } from "@ctsy/model";
/**
  * 用户存储 Used
  * 用户编号 UID 大整数(bigint)
  * 存储量 Size 大整数(bigint)
  * 最后更新 UTime 时间日期(datetime)
  * 存储限制 MaxSize 大整数(bigint)
*/
export default {    
    UID:{
        type:DbDataType.bigint,
        primaryKey:true,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },    
    Size:{
        type:DbDataType.bigint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },    
    UTime:{
        type:DbDataType.datetime,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:new Date,
        allowNull:false
    },    
    MaxSize:{
        type:DbDataType.bigint,
        primaryKey:false,
        autoIncrement:false,
        defaultValue:0,
        allowNull:false
    },
}