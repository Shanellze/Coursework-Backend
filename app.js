const express = require('express');
const cors = require('cors');
const app = express();

const apiRouter = require('./routes/api_router.js');

app.use(express.json());
app.use(cors());
app.use('/api', apiRouter); 


//Sends back an error message.
app.use(function(request, response) {
    response.status(404).send("Resource not found!");
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});