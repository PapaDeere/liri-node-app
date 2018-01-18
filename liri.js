
require("dotenv").config();
var Spotify = require("node-spotify-api")
var Twitter = require('twitter');
var request = require("request");
var fs = require('fs');

var keys = require("./keys.js")

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


// my-tweets

// spotify-this-song

// movie-this

// do-what-it-says

var inquirer = require('inquirer');

inquirer.prompt([{
  type: "list",
  name: "userRequest",
  message: "what would you like me to do?",
  choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
}]).then(answers => {
  // Use user feedback for... whatever!!
  console.log(answers.userRequest)
  var userRequest = answers.userRequest

  // if(userRequest === "mytweets"){
  //   //go do some stuff
  // } else if (userRequest === "movie-this"){
  //   //go do some stuff
  // }


  switch (userRequest) {
    case "my-tweets":
        //go do some stuff
        getTweets()
      break;
    case "movie-this":
      //go do some stuff
      movieThis()
      break;
    case "spotify-this-song":
      //go do some stuff
      spotifyThis()
      break;
    case "do-what-it-says":
      //go do some stuff
      doWhat()
      break;
  
    default:
      break;
  }


});


function getTweets(){
  var params = { screen_name: 'ford' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      
      console.log(tweets);
      for(var i = 0; i < tweets.length; i++){
        console.log("=============================")
        console.log(tweets[i].created_at)
        console.log(tweets[i].user.name)
        console.log(tweets[i].text)
        console.log()
      }
    }
  });
}

function movieThis(){
  inquirer.prompt([{
    type: "input",
    name: "userMovie",
    message: "what movie would you like me to search for?",
  }]).then(function(answer){
    console.log(answer.userMovie)
    if (answer.userMovie == ""){
      var movieName = "Mr Nobody";

    }else{
      var movieName = answer.userMovie;
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
  
    // Then run a request to the OMDB API with the movie specified
    request(queryUrl, function (error, response, body) {
  
      // If the request is successful
      if (!error && response.statusCode === 200) {
  
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
  
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Title);
        console.log("Produced in: " + JSON.parse(body).Country);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Starring: " + JSON.parse(body).Actors);
  
      }  
    })
  })
}
function spotifyThis(input) {
  console.log(input)
  if(input == undefined){
    inquirer.prompt([{
      type: "input",
      name: "song",
      message: "what song would you like me to search for?",
    }]).then(function (answer) {
      console.log(answer.song);
  
      var songName = "The Sign Ace of Base";
      if (answer.song != "") {
        songName = answer.song;
      }
      spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        if (data.tracks.items[0].preview_url !== null) {
          console.log("Preview: " + data.tracks.items[0].preview_url);
        }
        console.log('From the album "' + data.tracks.items[0].album.name + '"');
      
      });
      
  
    })

  }else{


    var songName = "The Sign";
    if (input != undefined) {
      songName = input;
    }
    spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      if (data.tracks.items[0].preview_url !== null) {
        console.log("Preview: " + data.tracks.items[0].preview_url);
      }
      console.log('From the album "' + data.tracks.items[0].album.name + '"');

    });


  }

}
function doWhat () {
  fs.readFile('./random.txt', 'utf8', function (err, data) {
    console.log(data)
    var dataSplit = data.split(',')
    console.log(dataSplit);
    var command = dataSplit[0]
    var input = dataSplit[1]
    textCommands(command, input)
  });
}

function textCommands (command, input){
  // Use user feedback for... whatever!!
 
  var userRequest = command

  // if(userRequest === "mytweets"){
  //   //go do some stuff
  // } else if (userRequest === "movie-this"){
  //   //go do some stuff
  // }


  switch (userRequest) {
    case "my-tweets":
      //go do some stuff
      getTweets()
      break;
    case "movie-this":
      //go do some stuff
      movieThis()
      break;
    case "spotify-this-song":
      //go do some stuff
      spotifyThis(input)
      break;
    default:
      break;
  }


}