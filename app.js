//require express for easy and flexible routing
var express= require('express');
var app = express();

var fetch  = require('node-fetch');

//to get the data in .env file
require('dotenv').config();

//bodyparser is required for retrieving the response entered by user
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({
    extended: true
}));

//make node aware of ejs files
app.set('view engine','ejs');

//make node use static files
app.use('/static',express.static('static'));

app.get('/',(req,res)=>{
  res.render('index');
})
app.post('/',(req,res)=>{
     var movie = req.body.movie;
     var plot = req.body.plot;

     //frame the complete URL
     fetch('http://www.omdbapi.com/?' + new URLSearchParams({
              apikey:process.env.API_KEY,
              t:movie,
              plot:plot
           }))
     .then(response=>{
       return response.json();
     })
     .then(data=>{
          res.render('display',{data:data});
     })
     .catch(err => console.log(err))
});

app.listen(3000);
