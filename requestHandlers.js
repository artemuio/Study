

var querystring = require("querystring"),
formidable = require("formidable");

function upload(fs,response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
   console.log("parsing done");

   /* Возможна ошибка в Windows: попытка переименования уже существующего файла */
   fs.rename(files.upload.path, "tmp/test.png", function(err) {
     if (err) {
      fs.unlink("tmp/test.png");
      fs.rename(files.upload.path, "tmp/test.png");
    }
  });
   response.writeHead(200, {"Content-Type": "text/html"});
   response.write("received image:<br/>");
   response.write("<img src='/show' />");
   response.end();
 });
}

function show(fs,response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("tmp/test.png", "binary", function(error, file) {
   if(error) {
     response.writeHead(500, {"Content-Type": "text/plain"});
     response.write(error + "\n");
     response.end();
   } else {
     response.writeHead(200, {"Content-Type": "image/png"});
     response.write(file, "binary");
     response.end();
   }
 });
}

//var User = require('./models/user').User;

function start(fs,response,req) {
//  console.log("Request handler 'start' was called.");
fs.readFile('index.html',function(err,info){
 if(err){
  console.log("Error in reading index.html");
  response.writeHead(500);
  response.end("Error in server");
  return;
}
  response.end(info);
});
}

function siteuploaddata(fs,pathname,response){
	fs.readFile(pathname,function(err,info){
   if(err){
    console.log("Error in reading file");
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
      throw err;
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
        conn.query("INSERT INTO users SET ?",request.body,function(er){
          if(er){
            response.writeHead(400);
            response.end();
            console.log("MYSQL: ERROR: ",er);
          } else {
           // console.log("Added user:"+obj.name+":"+obj.username+":"+obj.password+":"+obj.email);
            response.writeHead(200);
            response.end();
          }
        });
      } else {
        response.writeHead(400);
        response.end();
      }
      conn.release();
    } else if(request.method == "GET"){
      conn.query("SELECT username FROM users WHERE username = ?",request.url.substring(17,request.url.length),function(er,res){//request.url.substring(17,request.url.length)
          if(er){
            console.log("Erro is SELECT");
            response.writeHead(400);
            response.end();
          }
          if(res[0]==null){
            response.writeHead(200);
            response.end();
          } else {
            response.writeHead(400);
            response.end();
          }
      });
      conn.release();
    }
    });
//    });
};




//var app = require('./server').app;

exports.upload = upload;
exports.show = show;
exports.start = start;
exports.siteuploaddata = siteuploaddata;
exports.singin = singin;