use test;


create table Users(
 id_user int (10) AUTO_INCREMENT,
 name varchar(20) NOT NULL,
 username varchar(20) NOT NULL,
 password varchar(15) NOT NULL,
 email varchar(50) NOT NULL,
 table_name varchar(100),
 PRIMARY KEY (id_user) ); 
