require("dotenv").config();
var Spotify = require("node-spotify-api")
var Twitter = require('twitter');
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

  if(userRequest === "mytweets"){
    //go do some stuff
  } else if (userRequest === "movie-this"){
    //go do some stuff
  }


  switch (userRequest) {
    case "my-tweets":
        //go do some stuff
        getTweets()
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