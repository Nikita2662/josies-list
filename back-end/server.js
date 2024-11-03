//Database-Server
//Adding API Methods by importing MERN npm packages
var Express=require("express");
var Mongoclient=require("mongodb").MongoClient;
var cors=require("cors");
const multer=require("multer");

//Create an instance of an Express app
var app=Express();
app.use(cors());  //Adds cors module
console.log("Here we go")

//Adding routes for connection to front-end
app.get('/', (req, res) => {
  res.send('this is the root node'); 
});

const usersRoute = require('./routes/users.js');
const productsRoute = require('./routes/products.js');

app.use('/users', usersRoute)
app.use('/products', productsRoute)

const port = 3000;

app.listen(port, () => {
  console.log('Node.js HTTP server is running on port ' + port);
});
//
//Create a connection with the MongoDB
var CONNECTION_STRING="mongodb+srv://Admin:lCNavxtIML74MxCj@josies-list-cluster.o5u3b.mongodb.net/?retryWrites=true&w=majority&appName=josies-list-cluster"
console.log("hey something is right in the connection")


var DATABASENAME="sample_mflix";
var database;

//Start Express app and listen to requests
app.listen(5038, ()=> { //this number could be a potential problem
  Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
      database=client.db(DATABASENAME);
      console.log("Mongo DB Connection Successful!!!");
  })
})

//MERN App