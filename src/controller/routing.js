const express = require("express");
const CRUD = require("../modules/CRUD.js");
const BusBoy = require("../modules/busboy.js");
const Mongo = require("mongodb");




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
appMain.get("/product/clasification/:clasification", (req, res)=>{
    res.render("product.html", {clasification: req.params.clasification})
})
appMain.get("/about", (req, res)=>{
    res.render("about.html")
});




// REQUEST POST THE ROUTE LOGIN
const appLoginPost = express.Router();
appLoginPost.post("/login/signup/create-user", async function(req, res){
    req.body = await BusBoy.formdata(req).catch(e=>console.log(e));
    let cursor = await CRUD.create("user", req.body);
    if(cursor.result.n === 1 && cursor.result.ok === 1){
        let json = JSON.stringify(req.body);
        res.end(json);
    }else{
        res.end("err");
    }
});
appLoginPost.post("/login/signup/cheek-user", async function(req, res){
    res.setHeader("Content-Type", "text/plain");
    let result = await CRUD.read("user", req.body).catch(e=>console.log(e));
    if(!result){
        res.send("ok");
    }else{
        res.send("Este nombre ya esta en uso");
    }
});





// REQUEST POST THE ROUTE PRODUCT
const appProduct = express();
appProduct.post("/products/search-:operation/(:clasification)?", async function(req, res){
    let send, skip;
    switch(req.params.operation){
        case "general":
            var count = await CRUD.collection("products").countDocuments();
            let random = Math.random() * count;
            if(random > 6){
                skip = Math.floor((random - 5));
            }else{
                skip = 9;
            }
            var cursor = await CRUD.read("products", {}, true).skip(skip).limit(5);
            send = await cursor.toArray();
        break;
        case "product":
            var query = req.body;
            var cursor = await CRUD.read("products", {_id: Mongo.ObjectId(req.body.id)}).catch(e=>console.log(e));
            send = cursor;
        break;
        case "clasification":
            var cursor = await CRUD.read("products", {classification: req.params.clasification}, true)
            send = await cursor.toArray();
        break;
        case "keyword":
            var query = {name: {
                $regex: req.body.word
            }}
            var cursor = await CRUD.read("products", query, true).limit(7);
            send = await cursor.toArray();
        break;
        case "query":
            var cursor = await CRUD.read("products", {_id: Mongo.ObjectId(req.query.id)}).catch(e=>console.log(e));
            send = JSON.stringify(cursor);
        break;
    }
    res.send(send);
});


!async function(){
    // setTimeout(async function(){
    //     let cursor = await CRUD.read("products", {_id: Mongo.ObjectId("5f59a28ad786bc20880879ea")})
    //     console.log(cursor);
    // }, 3000)

}();



exports.appMain = appMain;
exports.loginPost = appLoginPost;
exports.appProduct = appProduct;

