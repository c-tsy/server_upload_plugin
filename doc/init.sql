drop table if exists upload_drivers;

drop table if exists upload_files;

drop table if exists upload_store;

drop table if exists upload_used;

/*==============================================================*/
/* Table: drivers                                               */
/*==============================================================*/
create table upload_drivers
(
   DID                  bigint unsigned not null auto_increment,
   Name                 char(20) not null,
   Class                char(50) not null,
   Param                char(250) not null,
   Status               tinyint(1) not null default 1 comment '-1禁用0停用1启用',
   Used                 bigint unsigned not null default 0,
   Max                  bigint unsigned not null default 0,
   primary key (DID)
);

/*==============================================================*/
/* Index: status                                                */
/*==============================================================*/
create index status on upload_drivers
(
   Status
);

/*==============================================================*/
/* Table: files                                                 */
/*==============================================================*/
create table upload_files
(
   FID                  bigint unsigned not null auto_increment,
   SID                  bigint unsigned not null,
   Name                 char(250) not null,
   Ext                  char(20) not null,
   Size                 bigint not null,
   CRTime               datetime not null,
   UPTime               datetime not null,
   MD5                  char(50) not null,
   CTime                datetime not null,
   CUID                 bigint unsigned not null,
   Status               tinyint(1) not null,
   primary key (FID)
);

/*==============================================================*/
/* Index: cuid                                                  */
/*==============================================================*/
create index cuid on upload_files
(
   CUID
);

/*==============================================================*/
/* Table: store                                                 */
/*==============================================================*/
create table upload_store
(
   SID                  bigint unsigned not null auto_increment,
   Driver               char(20) not null,
   Path                 char(250) not null,
   MD5                  char(50) not null,
   Count                bigint not null,
   Status               tinyint(1) not null comment '-1已删除0待删除1使用中',
   primary key (SID)
);

/*==============================================================*/
/* Index: driver                                                */
/*==============================================================*/
create unique index driver on upload_store
(
   Driver,
   MD5
);

/*==============================================================*/
/* Index: md5                                                   */
/*==============================================================*/
create unique index md5 on upload_store
(
   MD5
);

/*==============================================================*/
/* Table: used                                                  */
/*==============================================================*/
create table upload_used
(
   UID                  bigint unsigned not null,
   Size                 bigint unsigned not null default 0 comment '单位为M',
   UTime                datetime not null,
   MaxSize              bigint unsigned not null default 0 comment '单位为M',
   primary key (UID)
);
