const express = require("express");

// REQUEST GET MAIN 
const appMain = express.Router();
appMain.get("/", (req, res)=>{
    res.render("home.html")
});
appMain.get("/login/:login", (req, res)=>{
    res.render("login.html", {login: req.params.login});
});
appMain.get("/about", (req, res)=>{
    res.render("about.html")
})
exports.appMain = appMain;





