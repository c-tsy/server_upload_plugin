/**
  * 用户存储 Used
  * 用户编号 UID 大整数(bigint)
  * 存储量 Size 大整数(bigint)
  * 最后更新 UTime 时间日期(datetime)
  * 存储限制 MaxSize 大整数(bigint)
*/
export default class Used{
        
    public UID:number=0;    
    public Size:number=0;    
    public UTime:Date=new Date;    
    public MaxSize:number=0;
}