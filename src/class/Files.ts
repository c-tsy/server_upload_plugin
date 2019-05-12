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
export default class Files{
        
    public FID:number=0;    
    public SID:number=0;    
    public Name:string="";    
    public Ext:string="";    
    public Size:number=0;    
    public CRTime:Date=new Date;    
    public UPTime:Date=new Date;    
    public MD5:string="";    
    public CTime:Date=new Date;    
    public CUID:number=0;    
    public Status:number=0;
    public Field:string='';
}