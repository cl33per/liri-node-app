//Keeps API keys off repo and requires them into project file
require("dotenv").config();
var keys = require("./keys.js");
//Spotify keys
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//Bandlkey
var bandkey = keys.band.id;

//moviekey
var movie = keys.movies.id;

// Grabs the fs module to save data...
var fs = require("fs");

// Grab the axios package to call ajax queries...
var axios = require("axios");

// Grab the moment.js package to change date formating...
var moment = require("moment");

// Grabs the moment.js package for current time zones using for log.txt file
var moment = require('moment-timezone');
var timeStamp = "\n" + "REPORT LOG TIMESTAMP: " + moment.tz("America/New_York").format() + "\n" + "Command Given: " + process.argv[2] + "\n" + "************"; // 2013-12-01T00:00:00-08:00

// Assign arguments to variables
var functionCall = process.argv[2];
var functionArgument = process.argv[3];

// declaring functions 
function concert() {
    logResults(timeStamp);
    //if not argument is passed the search for Hippie Sabotage
    if (functionArgument === undefined) {
        functionArgument = "Hippie Sabotage"
    }
    // run axios query
    axios
        .get("https://rest.bandsintown.com/artists/" + functionArgument + "/events?app_id=" + bandkey)
        // If the axios was successful...
        .then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                // loop through results and display's info
                var venuName = "Venue: " + results[i].venue.name;
                var venuCity = "City: " + results[i].venue.city;
                var venueDate = "Date: " + moment(results[i].datetime).format("MM/DD/YY");
                var logdata = "\n" + venuName + "\n" + venuCity + "\n" + venueDate + "\n" + "-----------";

                // Loop over every result until results length is meet
                console.log(venuName);
                console.log(venuCity);
                console.log(venueDate);
                console.log("------------------");
                logResults(logdata);
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

};

function spotifyThisSong() {
    logResults(timeStamp);
    if (functionArgument === undefined) {
        functionArgument = "Everest"
    }
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
            var artistsName = "Artist: " + results.artists[0].name;
            var trackName = "Song Name: " + results.name;
            var trackUrl = "URL: " + results.external_urls.spotify;
            var logdata = "\n" + artistsName + "\n" + trackName + "\n" + trackUrl + "\n" + "-----------";
            //displays info
            console.log(artistsName);
            console.log(trackName);
            console.log(trackUrl);
            logResults(logdata);
        })
        .catch(function (err) {
            console.log(err);
        });
};

function movieThis() {
    logResults(timeStamp);
    if (functionArgument === undefined) {
        functionArgument = "Mr. Nobody"
    }
    axios
        .get("http://www.omdbapi.com/?t=" + functionArgument + "&apikey=" + movie)

        // If the axios was successful...
        .then(function (response) {
            var results = response.data;
            var movieTitle = "Movie Title: " + results.Title;
            var releaseDate = "Release Date: " + results.Year;
            var imdbRating = "IMDB Rating: " + results.Ratings[0].Value;
            var rottenTerminators = "Rotten Tomattos Rating: " + results.Ratings[1].Value;
            var movieCountry = "Country Produced: " + results.Country;
            var movieLang = "Language: " + results.Language;
            var moviePlot = "Movie Plot: " + results.Plot;
            var movieActors = "Actors: " + results.Actors;
            var logdata = "\n" + movieTitle +"\n" + releaseDate +"\n" + imdbRating + "\n" +rottenTerminators +"\n" + movieCountry +"\n" + movieLang +"\n" + moviePlot +"\n" + movieActors+ "\n" + "-----------";
            console.log(movieTitle);
            console.log(releaseDate);
            console.log(imdbRating);
            console.log(rottenTerminators);
            console.log(movieCountry);
            console.log(movieLang);
            console.log(moviePlot);
            console.log(movieActors);
            logResults(logdata);
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
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        //reasign the data to functionCall and functionArgument then run the function spotifyThisSong
        functionCall = dataArr[0];
        functionArgument = dataArr[1];

        switch (functionCall) {
            case 'concert-this':
                concert();
                break;
            case 'spotify-this-song':
                spotifyThisSong();
                break;
            case 'movie-this':
                movieThis();
                break;
            case 'do-what-it-says':
                doWhatItSays();
                break;
            case 'help':
                help()
                break;
            default:
                //If none of the cases are mett then run this log. 
                console.log('Im sorry dave I cant do that... type "node liri help" for more options');
        };
    });
};
function help(){
    logResults(timeStamp)
    var concertThis = "node liri concert-this <artist or band name>"
    var thisSong ="node liri spotify-this-song <song name here>"
    var thismove = "node liri movie-this <movie name here>"
    var justdoit = "node liri do-what-it-says";
    console.log(concertThis);
    console.log(thisSong);
    console.log(thismove);
    console.log(justdoit);
}
function logResults(data) {
    fs.appendFile("log.txt", data, function (err) {
        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }
    });
};

//Start swtich for all possilbe arguments
switch (functionCall) {
    case 'concert-this':
        concert();
        break;
    case 'spotify-this-song':
        spotifyThisSong();
        break;
    case 'movie-this':
        movieThis();
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
    case 'help':
            help()
        break;
    default:
        //If none of the cases are mett then run this log. 
        console.log('Im sorry dave I cant do that... type "node liri help" for more options');
};