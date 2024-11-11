var express = require("express");
var ALLOWED_IPS = ["127.0.0.1", "123.456.7.89"];
var api = express.Router();

const lessons = [
    { id:1, subject: 'Math', location: 'London', price : 20, availability: 5, image: './images/mathIcon.png'},
    { id:2, subject: 'Math', location: 'Birmingham', price : 25, availability: 5, image: './images/mathIcon.png'},
    { id:3, subject: 'Math', location: 'Brighton', price : 15, availability: 5, image: './images/mathIcon.png'},
    { id:4, subject: 'Math', location: 'Liverpool', price : 25, availability: 5, image: './images/mathIcon.png'},
    { id:5, subject: 'Math', location: 'Newcastle', price : 20, availability: 5, image: './images/mathIcon.png'},

    { id:6, subject: 'English', location: 'London', price : 20, availability: 5, image: './images/englishIcon.png'},
    { id:7, subject: 'English', location: 'Birmingham', price : 25, availability: 5, image: './images/englishIcon.png'},
    { id:8, subject: 'English', location: 'Brighton', price : 15, availability: 5, image: './images/englishIcon.png'},
    { id:9, subject: 'English', location: 'Liverpool', price : 25, availability: 5, image: './images/englishIcon.png'},
    { id:10, subject: 'English', location: 'Newcastle', price : 20, availability: 5, image: './images/englishIcon.png'},

    
    { id:11, subject: 'Biology', location: 'London', price : 20, availability: 5, image: './images/biologyIcon.png'},
    { id:12, subject: 'Biology', location: 'Birmingham', price : 25, availability: 5, image: './images/biologyIcon.png'},
    { id:13, subject: 'Biology', location: 'Brighton', price : 15, availability: 5, image: './images/biologyIcon.png'},
    { id:14, subject: 'Biology', location: 'Liverpool', price : 25, availability: 5, image: './images/biologyIcon.png'},
    { id:15, subject: 'Biology', location: 'Newcastle', price : 20, availability: 5, image: './images/biologyIcon.png'},

    
    { id:16, subject: 'Chemistry', location: 'London', price : 20, availability: 5, image: './images/chemistryIcon.png'},
    { id:17, subject: 'Chemistry', location: 'Birmingham', price : 25, availability: 5, image: './images/chemistryIcon.png'},
    { id:18, subject: 'Chemistry', location: 'Brighton', price : 15, availability: 5, image: './images/chemistryIcon.png'},
    { id:19, subject: 'Chemistry', location: 'Liverpool', price : 25, availability: 5, image: './images/chemistryIcon.png'},
    { id:20, subject: 'Chemistry', location: 'Newcastle', price : 20, availability: 5, image: './images/chemistryIcon.png'},

    
    { id:21, subject: 'Physics', location: 'London', price : 20, availability: 5, image: './images/physicsIcon.png'},
    { id:22, subject: 'Physics', location: 'Birmingham', price : 25, availability: 5, image: './images/physicsIcon.png'},
    { id:23, subject: 'Physics', location: 'Brighton', price : 15, availability: 5, image: './images/physicsIcon.png'},
    { id:24, subject: 'Physics', location: 'Liverpool', price : 25, availability: 5, image: './images/physicsIcon.png'},
    { id:25, subject: 'Physics', location: 'Newcastle', price : 20, availability: 5, image: './images/physicsIcon.png'},
];

//Returning all the lessons in the server as a JSON.
api.get('/lessons', (req, res) => {
    res.json(lessons);
});

module.exports = api;
