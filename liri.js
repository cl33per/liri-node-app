//Keeps API keys off repo and requires them into project file
require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

// requrie fs module to save data
// var fs = require("fs");
// Grab the axios package...
var axios = require("axios");
var moment = require("moment");
var functionCall = process.argv[2];
var functionArgument = process.argv[3];

switch (functionCall) {
    case 'concert-this':
        axios
            .get("https://rest.bandsintown.com/artists/" + functionArgument + "/events?app_id=codingbootcamp")
            .then(function (response) {
                // If the axios was successful...
                var results = response.data;
                // Looping over every result item
                for (var i = 0; i < results.length; i++) {
                    //Display's all of bands venue
                    var venueDate = moment(results[i].datetime).format("MM/DD/YY");
                    console.log("Venue: "+results[i].venue.name);
                    console.log("City: " +results[i].venue.city);
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
    default:
        console.log('Im sorry dave I cant do that...');
};
