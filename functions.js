require("dotenv").config();
const mongodb = require("mongodb"),
    MongoClient = mongodb.MongoClient,
    dbName = "e-commerce",
    collectinName = "movies",
    MongoURL=process.env.MONGO_URL ,
    // MongoURL = "mongodb://localhost:27017/",
    express = require("express");

function getAllMovies(req,res) {
    MongoClient.connect(MongoURL).then((db)=>{
        db.db(dbName).collection(collectinName).find({}).toArray().then((docs)=>{
            res.send(docs).status(200)
        })
    })
    .catch((err)=>{throw err})
}

function addMovieToCart(req,res,objmovie) {
    MongoClient.connect(MongoURL).then((db)=>{
        db.db(dbName).collection("carts").updateOne({},{$push:{products:objmovie}}).then((docs)=>{
            res.status(201)
        })
    })
    .catch((err)=>{throw err})
}

function addMovieToMovies(req,res,objmovie) {
    MongoClient.connect(MongoURL).then((db)=>{
        db.db(dbName).collection(collectinName).insertOne(objmovie).then((docs)=>{
            res.send(docs).status(200)
        })
    })
    .catch((err)=>{throw err})
}


function getMoviesCategory(req,res,category) {
    MongoClient.connect(MongoURL).then((db)=>{
        db.db(dbName).collection(collectinName).find({category:category}).toArray().then((docs)=>{
            res.send(docs).status(200)
        })
    })
    .catch((err)=>{throw err})
}

function getCart(req,res) {
    MongoClient.connect(MongoURL).then((db)=>{
        db.db(dbName).collection("carts").find({}).toArray().then((docs)=>{
            res.send(docs).status(200)
        })
    })
    .catch((err)=>{throw err})
}

function deleteCart(req,res) {
    MongoClient.connect(MongoURL).then((db)=>{
        db.db(dbName).collection("carts").findOneAndUpdate({},{$pull:{products:{cartId: Number(req.params.id)}}}).then((docs)=>{
            res.send(docs).status(200)
        })
    })
    .catch((err)=>{throw err})
}

function addMessage(req,res) {
    console.log(req.body);
    MongoClient.connect(MongoURL).then((db)=>{
        db.db(dbName).collection("contact").insertOne(req.body).then((docs)=>{
            res.send(docs).status(201)
        })
    })
    .catch((err)=>{throw err})
}

function getAllMessages(req,res) {
    MongoClient.connect(MongoURL).then((db)=>{
        db.db(dbName).collection("contact").find().toArray().then((docs)=>{
            res.send(docs).status(200)
        })
    })
    .catch((err)=>{throw err})
}

function deleteFromMovies(req,res) {
    MongoClient.connect(MongoURL).then((db)=>{
        db.db(dbName).collection(collectinName).findOneAndDelete({_id : mongodb.ObjectId(req.params.id)}).then(()=>{
            res.send("movies delete").status(200)
        })
    })
    .catch((err)=>{throw err})
}

function createMovie(req,res) {
    MongoClient.connect(MongoURL).then((db)=>{
        db.db(dbName).collection(collectinName).insertOne(req.body).then(()=>{
            res.send("adding movie").status(201)
        })
    })
    .catch((err)=>{throw err})
}

function updateMovie(req,res) {
    console.log(req.params.id);
    console.log(req.body);
    let change =req.body;   
    MongoClient.connect(MongoURL).then((db)=>{
        db.db(dbName).collection(collectinName).updateOne({_id: mongodb.ObjectId(req.params.id)},{$set:change}).then(()=>{
            res.send("update movie").status(200)
        })
    })
    .catch((err)=>{throw err})
}

module.exports= {
    getMoviesCategory,
    getAllMovies,
    getCart,
    addMovieToCart,
    deleteCart,
    addMessage,
    getAllMessages,
    deleteFromMovies,
    createMovie,
    updateMovie,
    addMovieToMovies
}