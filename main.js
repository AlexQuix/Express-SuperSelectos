const express = require("express"),
        app = express(),
        ejs = require("ejs");

// STATIC
app.use(express.static(process.cwd() + "/src/static"));


// TEMPLATE ENGINE
app.set("views", (process.cwd() + "/src/views"));
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);


// ANALIZING BODY
app.use(express.json());


// ROUTES THE APPLICATION
const { appMain, loginPost, appProduct } = require("./src/controller/routing");
app.use(appMain);
app.use(loginPost);
app.use(appProduct)


// PUERTO
app.listen(3000);
console.log("Success connect to Server");