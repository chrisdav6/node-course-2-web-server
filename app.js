var express = require("express");
var hbs = require("hbs");
var fs = require("fs");

//Init App
var app = express();

//View Engine
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

//Middleware
app.use(function(req, res, next) {
  var now = new Date().toString();
  var log = req.url + " was accessed via " + req.method + " request on " + now;
  console.log(log);
  fs.appendFile("server.log", log + "\n");
  next();
});

// app.use(function(req, res, next) {
//   res.render("maintenance");
// });

//Static Directory
app.use(express.static(__dirname + "/public"));

//Helper Functions-------------------------------
//Get Year
hbs.registerHelper("getCurrentYear", function() {
  return new Date().getFullYear();
});

//Uppercase Letters
hbs.registerHelper("screamIt", function(text) {
  return text.toUpperCase();
});
//-----------------------------------------------

//Routes
app.get("/", function(req, res) {
  res.render("home", {
    pageTitle: "Home Page",
    welcomeMessage: "Hi There Visitor"
  });  
});

app.get("/about", function(req, res) {
  res.render("about", {
    pageTitle: "About Page"
  });  
});

app.get("/bad", function(req, res) {
  res.send({
    error: "Something went wrong!"
  });
});

//Server Start
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("App Started!");
});