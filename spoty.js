var express = require('express');
var router = express.Router();
 require("dotenv").config();
//Import the Spotify API
var Spotify = require('node-spotify-api');
 
//Import our Keys File
var keys = require('./keys.js');
 
//Create a Spotify Client
var spotify = new Spotify(keys.spotify);
 
//Store the results of a request to spotify
var results = [];
 
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Spotify', results: results});
});
 
router.post('/', function (req, res) {
    //Get the type of Query from the User
    var type = track;
 
    //Get the query from the user
    var query = "The Sign";
 
    //Clear out old results
    results = [];
 
    //Make a request to Spotify
    spotify.search({type: type, query: query})
        .then(function (spotRes) {
 
            //Store the artist, song, preview link, and album in the results array
            spotRes.tracks.items.forEach(function(ea){
                results.push({artist: ea.artists[0].name,
                              song: ea.name,
                              preview: ea.external_urls.spotify,
                              album: ea.album.name});
            });
            //Render the homepage and return results to the view
            res.render('index', {title: 'Spotify', results: results});
        })
        .catch(function (err) {
            console.log(err);
            throw err;
        });
});
 
module.exports = router;
//This code sets up two handlers for GET and POST requests. More details about how to do this can be found in this post. We begin on line 5 by importing the Spotify API into our script. Then we pull in the keys.js file we created earlier so that we can authenticate with Spotify. The next line creates a spotify object and we pass our creditionals to its constructor.

//The next point of interest is the spotify.search found on line 32. The spotify.search function takes in two arguments, type and query. The type argument specifies the type of query and the query is the actual search criteria that we are going to send to the API. The spotify library will make correct rest calls to the Spotify API and it will return a response.

//Inside of the body of the promise function, we push some information about the song to the results array so that we can display it to the view. In this case, we are going to grab the artist, song, a preview url, and the song’s album. We then return it to the view for display in a table.

