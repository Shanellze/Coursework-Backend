// Import modules
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require('express');
const cors = require('cors');
const path = require("path");
const morgan = require("morgan");
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

// POST Route to create a document from a specified collection
app.post('/collections/:collectionName', function(req, res, next) {
    
    req.collection.insertOne(req.body, function(err, results) {
    if (err) {
        return next(err);
    }
    res.send(results);
    });
});

// DELETE Route to delete a document from a specified collection
app.delete('/collections/:collectionName/:id', function(req, res, next) {
    req.collection.deleteOne({_id: new ObjectId(req.params.id)}, function(err, result) {
        if (err) {
            return next(err);
        } else {
            res.send((result.deletedCount === 1) ? {msg: "success"} : {msg: "error"});
        }
    });
});

// PUT Route to update a document from a specified collection
app.put('/collections/:collectionName/:id', function(req, res, next) {
    
    req.collection.updateOne(
        {_id: new ObjectId(req.params.id)},
        {$set: req.body},
        {safe: true, multi: false}, function(err, result) {
            if (err) {
                return next(err);
            } else {
                res.send((result.matchedCount === 1) ? {msg: "success"} : {msg: "error"});
            }
        }
    );
});




    
// Logger middleware: Logs all incoming requests
app.use(morgan("short"));

// Static file middleware: Return the file image specified by the request url
var staticPath = path.join(__dirname, "static/images");
app.use("/images", express.static(staticPath, {
    // If the file is not found or an error occurs, pass to the next middleware
    fallthrough: true
}));


// Error handler
app.use(function(request, response) {
    response.status(404).send("Resource not found!");
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});