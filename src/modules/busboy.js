const BusBoy = require("busboy");


exports.formdata = function(req){
    return new Promise((resolve, reject)=>{
        let body = {};
        let busboy = new BusBoy({headers: req.headers});
        busboy.on("field", (flname, value)=>{
            body[flname] = value;
        });
        busboy.on("finish", ()=>{
            resolve(body);
        })
        req.pipe(busboy);
    })
}