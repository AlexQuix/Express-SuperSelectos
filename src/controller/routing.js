const express = require("express");
const Mongo = require("../modules/CRUD.js");
const BusBoy = require("../modules/busboy.js");



// REQUEST GET APPLICATION MAIN 
const appMain = express.Router();
appMain.get("/", (req, res)=>{
    res.render("home.html")
});
appMain.get("/login(/:login)?", (req, res)=>{
    if(req.params.login){
        res.render("login.html", {login: req.params.login});
    }else{
        res.status(302).redirect("/login/signin");
    }
});
appMain.get("/about", (req, res)=>{
    res.render("about.html")
});




// REQUEST POST THE ROUTE LOGIN
const appLoginPost = express.Router();
appLoginPost.post("/login/signup/create-user", async function(req, res){
    req.body = await BusBoy.formdata(req).catch(e=>console.log(e));
    let cursor = await Mongo.createData("user", req.body);
    if(cursor.result.n === 1 && cursor.result.ok === 1){
        let json = JSON.stringify(req.body);
        res.end(json);
    }else{
        res.end("err");
    }
});
appLoginPost.post("/login/signup/cheek-user", async function(req, res){
    res.setHeader("Content-Type", "text/plain");
    let result = await Mongo.readData("user", req.body).catch(e=>console.log(e));
    if(!result){
        res.send("ok");
    }else{
        res.send("Este nombre ya esta en uso");
    }
});



exports.appMain = appMain;
exports.loginPost = appLoginPost;

