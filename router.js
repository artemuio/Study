
function route(fs,handle, pathname, response, request,pool) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] == 'function') {
    handle[pathname](fs,response, request,pool);
  } else {
  	pathname=pathname.substring(1,pathname.length);
  	if(fs.existsSync(pathname) && ((pathname.substring(pathname.length-5,pathname.length)==".html")||(pathname.substring(0,6)=="fonts/")||(pathname.substring(0,4)=="css/")|| (pathname.substring(0,3)=="js/") || (pathname.substring(0,7)=="images/"))) {
  		handle["/siteuploaddata"](fs,pathname,response);
  	} else {  	
    	response.writeHead(404, {"Content-Type": "text/html"});
   		response.write("404 Not found");
    	response.end();
    }
  }
}

exports.route = route;