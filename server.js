require("dotenv").config();
const mongodb = require("mongodb"),
    MongoClient = mongodb.MongoClient,
    MongoURL=process.env.MONGO_URL ,
    dbName = "e-commerce";
const path = require("path"),
express = require("express"),
app = express(),
pathPublic = path.join(__dirname,"public"),
functions = require("./functions");
app.use(express.json())
app.use(express.static(pathPublic))
let cartId ;

    app.get("/movies",(req,res)=>{
        functions.getAllMovies(req,res)
    })

    app.get("/movies/:id",(req,res)=>{
        functions.getMoviesCategory(req,res,req.params.id)
    })
    
    app.post("/movies",(req,res)=>{
        let objmovie = req.body;
        console.log(objmovie);
        functions.addMovieToMovies(req,res,objmovie)
    })
    
    app.post("/carts",(req,res)=>{
        MongoClient.connect(MongoURL).then((db)=>{
        db.db(dbName).collection("carts").find({}).toArray().then((docs)=>{
            let chack_id = docs[0].products.length;
            if (chack_id == 0) {
                cartId = 0;
            }
            else{
                cartId = Number(docs[0].products[chack_id-1].cartId)+1;
            }
            let objmovie = req.body;
            objmovie.cartId = cartId;
            functions.addMovieToCart(req,res,objmovie)
        })
    })
    .catch((err)=>{console.log(err,"hhhhh"); })
})

app.get("/cart",(req,res)=>{
    functions.getCart(req,res)
})

app.patch("/cart/:id",(req,res)=>{
    functions.deleteCart(req,res)
})

app.post("/contact",(req,res)=>{
    console.log(req.body);
    functions.addMessage(req,res)
})

app.get("/contact",(req,res)=>{
    functions.getAllMessages(req,res)
})

app.delete("/products/:id",(req,res)=>{
    console.log(req.params.id);
    functions.deleteFromMovies(req,res)
})

app.post("/movies",(req,res)=>{
    functions.createMovie(req,res)
})


app.patch("/movies/update/:id",(req,res)=>{
    functions.updateMovie(req,res)
})
const PORT = process.env.PORT ;

app.listen(PORT,()=>{
    console.log("listen");
})













