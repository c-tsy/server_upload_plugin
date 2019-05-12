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
export default class Drivers{
        
    public DID:number=0;    
    public Name:string="";    
    public Class:string="";    
    public Param:string="";    
    public Status:number=1;    
    public Used:number=0;    
    public Max:number=0;
}