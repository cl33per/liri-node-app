//Keeps API keys off repo and requires them into project file
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var band = keys.band;
var movie = keys.movies;

// Grabs the fs module to save data...
// var fs = require("fs");

// Grab the axios package to call ajax queries...
var axios = require("axios");

// Grab the moment.js package to change date formating...
var moment = require("moment");

// Assign arguments to variables
var functionCall = process.argv[2];
var functionArgument = process.argv[3];

//Start swtich for all possilbe arguments
switch (functionCall) {
    case 'concert-this':
        axios
            .get("https://rest.bandsintown.com/artists/" + functionArgument + "/events?app_id=" + band)
            // If the axios was successful...
            .then(function (response) {
                var results = response.data;
                // Loop over every result until results length is meet
                for (var i = 0; i < results.length; i++) {
                    //Display's info
                    var venueDate = moment(results[i].datetime).format("MM/DD/YY");
                    console.log("Venue: " + results[i].venue.name);
                    console.log("City: " + results[i].venue.city);
                    console.log("Date: " + venueDate);
                    console.log("------------------");
                };
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
        break;
    case 'spotify-this-song':
        //npm-package spotify used as as search query
        spotify
            .search({
                type: 'track',
                //taking userinput and injecting into query
                query: functionArgument
            })
            .then(function (response) {
                //shorten response variable
                var results = response.tracks.items[0]
                //displays info
                console.log("Artist: " + results.artists[0].name);
                console.log("Song Name: " + results.name);
                console.log("URL: " + results.external_urls.spotify);
            })
            .catch(function (err) {
                console.log(err);
            });
        break;
    case 'movie-this':
            if (functionArgument === undefined){
                functionArgument = "Mr. Nobody"
            }
        axios
            .get("http://www.omdbapi.com/?t=" + functionArgument + "&apikey=fc2c6032")
            // .get(" http://www.omdbapi.com/?"+keys.movies +"&"+functionArgument)
            // If the axios was successful...
            .then(function (response) {
                var results = response.data;
                console.log("Movie Title: " + results.Title);
                console.log("Release Date: " + results.Year);
                console.log("IMDB Rating: " + results.Ratings[0].Value);            
                console.log("Rotten Tomattos Rating: " + results.Ratings[1].Value)
                console.log("Country Produced: " + results.Country);
                console.log("Language: " + results.Language);
                console.log("Movie Plot: " + results.Plot);
                console.log("Actors: " + results.Actors);
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
        break;
    case 'do-what-it-says':

        break;
    default:
        //If none of the cases are mett then run this log. 
        console.log('Im sorry dave I cant do that...');
};