const express = require("express"),
        app = express(),
        ejs = require("ejs");

app.use(express.static(process.cwd() + "/src/static"));
app.set("views", (process.cwd() + "/src/views"));
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);


const { appMain } = require("./src/controller/routingExpress")
app.use(appMain);




app.listen(3000);
console.log("Success connect to Server");