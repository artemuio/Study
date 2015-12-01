function route(fs,handle, pathname, response, request,pool) {
  if (typeof handle[pathname] == 'function') {
      console.log("About to route a request for " + pathname);
    if ((request.isAuthenticated()) || (pathname=="/" || pathname=="/registration/register.html" || pathname=="/singin")){
      handle[pathname](fs,response, request,pool);
    }else{
      response.redirect('/');  
    }
  } else {
  	pathname=pathname.substring(1,pathname.length);
  	fs.exists(pathname,function(err){
      if(err == false){
        console.log("About to route a request for " + pathname+" does not exist");
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404 Not found");
        response.end();
        return;
      }
    if((pathname.substring(pathname.length-5,pathname.length)==".html")||(pathname.substring(0,6)=="fonts/")||(pathname.substring(0,4)=="css/")|| (pathname.substring(0,3)=="js/") || (pathname.substring(0,7)=="images/") || (pathname.substring(pathname.length-8,pathname.length) == "/ava.png")) {
      handle["/siteuploaddata"](fs,pathname,response);
    } else {    
      console.log("About to route a request for " + pathname+" not found");
      response.writeHead(404, {"Content-Type": "text/html"});
      response.write("404 Not found");
      response.end();
      return;
    }
    }); 
  }
}

exports.route = route;
