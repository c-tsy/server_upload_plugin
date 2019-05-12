import Controller from '@ctsy/controller/dist/controller'
/**
  * 用户存储 Used
  * 用户编号 UID 大整数(bigint)
  * 存储量 Size 大整数(bigint)
  * 最后更新 UTime 时间日期(datetime)
  * 存储限制 MaxSize 大整数(bigint)
*/
export default class Used extends Controller{
  get _KeywordTable(){
    return 'Used'
  }
 
  get _KeywordFields(){
    return []
  }
  
  
  
  
  async del(){throw new Error('禁止操作')}
  async delW(){throw new Error('禁止操作')}
  
}