var querystring = require("querystring"),
formidable = require("formidable");

function upload(fs,response, request) {
  console.log("Request handler 'upload' was called.");
 /* response.download('/archive.zip', 'file_on_disk.zip', function(err){
  if (!err) { console.log("Request handler 'upload' was applied.");//downloads_remaining_count--; }
    }
  });*/
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
  console.log("parsing done");

// Возможна ошибка в Windows: попытка переименования уже существующего файла 
  fs.rename(files.downloaded_file.path, "tmp/test.png", function(err) {
    if (err) {
    fs.unlink("/tmp/test.png");
    fs.rename(files.downloaded_file.path, "tmp/test.png");
    }
  });
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("received image:<br/>");
  response.write("<img src='/show' />");
  response.end();
  });
};


function show(fs,response,request) {
  console.log("Request handler 'show' was called.");
  if(request.method=='GET'){
   response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<form action='/upload' method='post' enctype='multipart/form-data'>"+
    "File: <input type='file' name='downloaded_file' multiple='multiple'></input> "+
    "<input type='submit' value='Upload'></form>");
   response.end();
 } if(request.method=='POST') {
  response.download(request.files.downloaded_file, function(err){
  if (!err) { console.log("Request handler 'upload' was applied.");//downloads_remaining_count--; }
    } else {
      console.log("Request handler 'upload' was denied.");
    }
  });
 }
 /* fs.readFile("tmp/test.png", "binary", function(error, file) {
   if(error) {
     response.writeHead(500, {"Content-Type": "text/plain"});
     response.write(error + "\n");
     response.end();
   } else {
     response.writeHead(200, {"Content-Type": "image/png"});
     response.write(file, "binary");
     response.end();
   }
 });*/
}


function start(fs,response,req) {
  if(!req.isAuthenticated()){
    fs.readFile('index.html',function(err,info){
      if(err){
        console.log("Error in reading index.html");
        response.writeHead(500);
        response.end("Error in server");
      return;
      }
      response.end(info);
    });
  } else {
    response.redirect('/profile');
  }
}

function siteuploaddata(fs,pathname,response){
	fs.readFile(pathname,function(err,info){
   if(err){
    console.log("Error in reading file"+ pathname);
    response.writeHead(500);
    response.end("Error in server");
    return;
  }
  response.end(info);
});
}


//var queryData='';
//var querystring = require('querystring');

function singin(fs,response, request,pool){
	pool.getConnection(function(err,conn){
    if(err){
      console.log("MYSQL: can't get connection from pool:",err);
      response.writeHead(400);
      response.end();
      return;
      //throw err;
    }	
  /*  request.on('data', function(data) {
     queryData += data;
     if(queryData.length > 1e6) {
       queryData = "";
       response.writeHead(413, {'Content-Type': 'text/plain'}).end();
       request.connection.destroy();
     }
    });*/
//    request.on('end', function() {
   //  var obj = querystring.parse(queryData);
    // queryData="";
     if(request.method == "POST"){
      if(!((request.body.name =="" )|| (request.body.username =="") ||(request.body.password =="")||(request.body.email==""))) {
        checkusername(request.body.username,conn,function(err){
          if(err){
            response.writeHead(400);
            response.end();
            return;
          }
        conn.query("INSERT INTO users SET ?",request.body,function(er,result){
          if(er){
            response.writeHead(400);
            response.end();
            console.log("MYSQL: ERROR: ",er);
          } else {
            createprojecttable(conn,result.insertId,request.body.username,function(error){
                if(error == null){
                  conn.query("UPDATE users SET users.table_name = ? WHERE users.id_user = ? ",[request.body.username+result.insertId,result.insertId],function(err){
                    conn.release();
                    if(err){
                      response.writeHead(400);
                      response.end();
                      console.log("MYSQL: ERROR: ",err);
                    }else{
                      makedir(fs,("user/"+request.body.username+result.insertId),function(er){
                        if(er){
                          response.writeHead(400);
                          response.end();
                          console.log("FS: ERROR: ",er);
                        } else {
                          fs.link("images/defaultava.png","user/"+(request.body.username+result.insertId)+"/ava.png");
                          response.writeHead(200);
                          response.end();
                        }
                      });
                    }
                  }); 
                }else{
                  response.writeHead(400);
                  response.end();
                  console.log("MYSQL: ERROR: ",error);
                }
            });
          }
        });
      });
      } else {
        response.writeHead(400);
        response.end();
      }
    } else if(request.method == "GET"){
      checkusername(request.url.substring(17,request.url.length),conn,function(err){
          conn.release();
        if(err){
          response.writeHead(400);
          response.end();
        }else{
          response.writeHead(200);
          response.end(); 
        }           
      });
    }
    });
};

function checkusername(username,conn,callback){
  conn.query("SELECT username FROM users WHERE username = ? LIMIT 2",username,function(er,res){//request.url.substring(17,request.url.length)
          if(er){
            console.log("Erro is SELECT");
            callback(er);
          }
          if(res[0]==null){
            callback(null);
          } else {
            callback(true);
          }
      });
}

function createprojecttable(conn,id,username,callback){
  conn.query("CREATE table ?? (id_project int (10) AUTO_INCREMENT,name varchar(20) NOT NULL,theme varchar(20) NOT NULL,format varchar(10)NOT NULL,about varchar(350),PRIMARY KEY (id_project) );",(username+id),function(err){//,
          if(err){
            callback(err);
          } else {
            callback(null);
          }
        });
};

function usersettings(fs,response,request,pool){
  if(request.method == "POST" && request.body.name != null){
    pool.getConnection(function(err,conn){
    if(err){
      console.log("MYSQL: can't get connection from pool:",err);
      response.writeHead(400);
      response.end();
      return;
      //throw err;
    }
 /*   if(request.method == "GET"){
      checkusername(request.url.substring(23,request.url.length),conn,function(err){
        if(err){
          response.writeHead(400);
          response.end();
        }else{
          response.writeHead(200);
          response.end(); 
        }           
      });
    }*/
    if(request.method == "POST"){
      conn.query("UPDATE users SET users.email = ?,users.name = ? WHERE users.id_user = ? ",[request.body.email,request.body.name,request.user.id_user],function(err){
        conn.release();
        if(err){
          response.writeHead(400);
          response.end();
          console.log("MYSQL: ERROR: ",err);
        }else{
          response.writeHead(200);
          response.end();
        }
      });
    }
  });
  }
  if(request.method == "POST" && request.body.name == null){
    var form = new formidable.IncomingForm();
console.log("about to parse");
    form.parse(request, function(error, fields, files) {
console.log("parsing done");
      fs.rename(files.upload.path,"user/"+request.user.table_name+"/ava.png", function(err) {
        if (err) {
          fs.unlink("user/"+request.user.table_name+"/ava.png");
          fs.rename(files.upload.path,"user/"+request.user.table_name+"/ava.png");
        }
      });
      response.writeHead(200, {"Content-Type": "text/html"});
      response.end();
    });
  }
}

function projectsettings(fs,response,request,pool){
  if(request.method == "POST" && request.body.name != null){
    pool.getConnection(function(err,conn){
    if(err){
      console.log("MYSQL: can't get connection from pool:",err);
      response.writeHead(400);
      response.end();
      return;
      //throw err;
    }
    if(request.body.name != "none"){
      conn.query("UPDATE ?? SET ??.name = ? WHERE ??.id_project = ?  ",[request.user.table_name,request.user.table_name,request.body.name,request.user.table_name,request.body.id_project],function(err){
        if(err){
          response.writeHead(400);
          response.end();
          console.log("MYSQL: ERROR: ",err);
        }else{
          response.writeHead(200);
          response.end();
        }
      });
    }
    if(request.body.about != "none"){
      conn.query("UPDATE ?? SET ??.about = ? WHERE ??.id_project = ? ",[request.user.table_name,request.user.table_name,request.body.about,request.user.table_name,request.body.id_project],function(err){
        if(err){
          response.writeHead(400);
          response.end();
          console.log("MYSQL: ERROR: ",err);
        }else{
          response.writeHead(200);
          response.end();
        }
      });
    }
    conn.release();
  });
  }
  if(request.method == "POST" && request.query.id_project != null && request.query.name != null ){
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
      fs.rename(files.upload.path,"user/"+request.user.table_name +"/"+ request.query.id_project+request.query.name+"/ava.png", function(err) {
        if (err) {
          fs.unlink("user/"+request.user.table_name +"/"+ request.query.id_project+request.query.name+"/ava.png");
          fs.rename(files.upload.path,"user/"+request.user.table_name +"/"+ request.query.id_project+request.query.name+"/ava.png");
        }
      });
      response.writeHead(200, {"Content-Type": "text/html"});
      response.end();
    });
  }
}

function createnewproject(fs,response, request,pool){
  if(request.method == "POST"){
    pool.getConnection(function(err,conn){
      if(err){
        console.log("MYSQL: can't get connection from pool:",err);
        response.writeHead(400);
        response.end();
        return;
      }
      conn.query("INSERT INTO ?? SET ?",[request.user.table_name,{name:request.body.name,theme:request.body.theme,format:request.body.format,about:request.body.about}],function(err,result){
        conn.release();
        if(err){
          console.log("MYSQL: can't get connection from pool:",err);
          response.writeHead(400);
          response.end();
          return;
        } else {
          makedir(fs,("user/"+request.user.table_name+"/"+(result.insertId+request.body.name)),function(er){
            if(er){
              console.log("FS: can`t create user`s project path:",er);
              response.writeHead(400);
              response.end();
            } else{
              fs.link("images/defaultprojectava.png",("user/"+request.user.table_name+"/"+(result.insertId+request.body.name))+"/ava.png");
              response.writeHead(200);
              response.end();
            }
          });
        }
      });
    });
  }
}

function makedir(fs,path,callback){
  fs.mkdir(path,function(err){
    if(err){
      callback(err);
    }else{
      callback(null);
    }
  });
}

exports.upload = upload;
exports.show = show;
exports.start = start;
exports.siteuploaddata = siteuploaddata;
exports.singin = singin;
exports.createnewproject = createnewproject;
exports.usersettings=usersettings;
exports.projectsettings=projectsettings;