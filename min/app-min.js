// Load http module.
var http=require("http"),express=require("express"),app=new express;
// Load express module.
// Basic routing.
app.get("/",function(e,r){r.send("Front page")}),
// Create server and listen on port 3030.
http.createServer(app).listen(3030,function(){console.log("Server running...")});