const {MongoClient} = require("mongodb");



    // CONNECTING MONGODB
    let db;
    async function runMongo(){
        let uri = "mongodb://localhost:27017";
        let client = new MongoClient(uri, {useUnifiedTopology: true});
        await client.connect();
        db = client.db("superselectos");
    }
    runMongo();
    

    // OPERATIONS CRUD
    async function createData(dbname, data, many = false){
        let collection = db.collection(dbname);
        let cursor;
        if(!many){
            cursor = await collection.insertOne(data);
        }else{
            cursor = await collection.insertMany(data);
        }
        return cursor;
    }
    async function readData(dbname, data, many = false){
        let collection = db.collection(dbname);
        let cursor;
        if(!many){
            cursor = await collection.findOne(data);
        }else{
            cursor = await collection.find(data);
        }
        return cursor;
    }
    async function updateData(dbname, data, many = false){
        let collection = db.collection(dbname);
        let cursor;
        if(!many){
            cursor = await collection.updateOne(data);
        }else{
            cursor = await collection.updateMany(data);
        }
        return cursor;
    }
    async function deleteData(dbname, data, many = false){
        let collection = db.collection(dbname);
        let cursor;
        if(!many){
            cursor = await collection.deleteOne(data);
        }else{
            cursor = await collection.deleteMany(data);
        }
        return cursor;
    }   



// EXPORTS OPERATIONS CRUD
exports.createData = createData;
exports.readData = readData;
exports.updateData = updateData;
exports.deleteData = deleteData;
