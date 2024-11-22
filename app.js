// Import modules
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require('express');
const cors = require('cors');
const path = require("path");
const propertiesReader = require("properties-reader");
const apiRouter = require('./routes/api_router.js');

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use('/api', apiRouter); 

// Load database configuration from properties file
let propertiesPath = path.resolve(__dirname, "conf/db.properties");
let properties = propertiesReader(propertiesPath);

// Retrieve database connection properties
let dbPprefix = properties.get("db.prefix");
let dbUsername = encodeURIComponent(properties.get("db.user"));
let dbPwd = encodeURIComponent(properties.get("db.pwd"));
let dbName = properties.get("db.dbName");
let dbUrl = properties.get("db.dbUrl");
let dbParams = properties.get("db.params");

// Construct the MongoDB connection URI 
const uri = dbPprefix + dbUsername + ":" + dbPwd + dbUrl + dbParams;

// Create a MongoDB client instance
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
let db = client.db(dbName);

// Middleware to handle collection name
app.param('collectionName', function(req, res, next, collectionName) {
    req.collection = db.collection(collectionName);
    return next();
});


// GET Route to retrieve all documents from a specified collection
app.get('/collections/:collectionName', function(req, res, next) {
    req.collection.find({}).toArray(function(err, results) {
        if (err) {
            return next(err);
        }
        res.send(results);
    });
});


// Error handler
app.use(function(request, response) {
    response.status(404).send("Resource not found!");
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});