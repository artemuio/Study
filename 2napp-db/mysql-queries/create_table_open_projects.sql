use test;

create table open_projects(
 id_project int (10) AUTO_INCREMENT,
 name varchar(20) NOT NULL,
 theme varchar(20) NOT NULL,
 about varchar(350) NOT NULL,
 PRIMARY KEY (id_project) ); 