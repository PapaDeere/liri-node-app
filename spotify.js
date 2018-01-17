
 var Spotify = require('node-spotify-api');
 var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
    // Do something with 'data' 
// Search tracks whose name, album or artist contains '()'
//function getSong(){
//spotify.searchTracks("The Sign by Ace of Base")
  //.then(function(data) {
  //  console.log('Search by "The Sign by Ace of Base"', data.body);
  //}, function(err) {
  // console.error(err);
  //});
  //}
//var SpotifyWebApi = require("../");

/*
 * This example shows how to search for a track. The endpoint is documented here:
 * https://developer.spotify.com/web-api/search-item/
 * Please note that this endpoint does not require authentication. However, using an access token
 * when making requests will give your application a higher rate limit.
 */

//var spotifyApi = new SpotifyWebApi();

//spotifyApi.searchTracks('Love', function(err, data) {
 // if (err) {
  //  console.error('Something went wrong', err.message);
  //  return;
  //}

  // Print some information about the results
  //console.log('I got ' + data.body.tracks.total + ' results!');

  // Go through the first page of results
  //var firstPage = data.body.tracks.items;
  //console.log('The tracks in the first page are.. (popularity in parentheses)');

  /*
   * 0: All of Me (97)
   * 1: My Love (91)
   * 2: I Love This Life (78)
   * ...
   */
  //firstPage.forEach(function(track, index) {
   // console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
  //});
//});

