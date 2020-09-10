const {MongoClient} = require("mongodb");


let db;
!async function(){
    // CONNECTING MONGODB
    let uri = "mongodb://localhost:27017";
    let client = new MongoClient(uri, {useUnifiedTopology: true});
    await client.connect();
    db = client.db("superselectos");
}();

// OPERATIONS CRUD
class CRUD{
    static create(collname, data, many = false){
        let collection = db.collection(collname);
        if(!many){
            return collection.insertOne(data);
        }else{
            return collection.insertMany(data);
        }
    }
    static read(collname, data, many = false){
        let collection = db.collection(collname);
        if(!many){
            return collection.findOne(data);
        }else{
            return collection.find(data);
        }
    }
    static delete(collname, data, many = false){
        let collection = db.collection(collname);
        if(!many){
            return collection.deleteOne(data);
        }else{
            return collection.deleteMany(data);
        }
    }
    static update(collname, data, many = false){
        let collection = db.collection(collname);
        if(!many){
            return collection.updateOne(data);
        }else{
            return collection.updateMany(data);
        }
    } 
    static collection(name){
        return db.collection(name);
    }
}

// EXPORTS OPERATIONS CRUD
module.exports = CRUD;