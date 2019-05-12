/**
  * 文件存储 Store
  * 存储编号 SID 自增序号(bigint)
  * 存储驱动 Driver 字符20(char(20))
  * 存储路径 Path 字符250(char(250))
  * 文件MD5 MD5 字符50(char(50))
  * 引用次数 Count 序号(bigint)
  * 状态 Status 状态值(tinyint(1))
*/
export default class Store{
        
    public SID:number=0;    
    public Driver:string="";    
    public Path:string="";    
    public MD5:string="";    
    public Count:number=0;    
    public Status:number=0;
}