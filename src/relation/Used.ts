import Relation, { R } from "@ctsy/relation";
/**
  * 用户存储 Used
  * 用户编号 UID 大整数(bigint)
  * 存储量 Size 大整数(bigint)
  * 最后更新 UTime 时间日期(datetime)
  * 存储限制 MaxSize 大整数(bigint)
*/
export default class Used extends Relation{    
    constructor(ctx,table){
        super(ctx,table)
    }
}
