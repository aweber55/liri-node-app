require("dotenv").config();
var request = require('request');
var keys = require("./keys.js");
var Twitter = require("twitter");
var spotify = require("spotify");
var fs = require("fs");
var client = new Twitter(keys.twitterKeys);

var action = process.argv[2];
var inputs = process.argv[3];


//----switch case-----

switch (action) {
    case "my-tweets":
        twitterThis(inputs);
        break;

    case "spotify-this-song":
        spotifyMe(inputs);
        break;

    case "movie-this":
        movieThis(inputs);
        break;

    case "do-what-it-says":
        doThis(inputs);
        break;

}

//--------------------------movie omdb-------

function movieThis(inputs) {

    var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {

        if (error) {
            return console.error(error);
        }
        if (!inputs) {
            return console.log('I am Batman');
        }

        if (!error && response.statusCode === 200) {

            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomato Rating: " + JSON.parse(body).tomatoRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("The Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);

        }
    })
};

//-----spotify------


function spotifyMe(inputs) {
    console.log("music time");
    

    if (!inputs) {
        inputs = "undefined";
    }
    spotify.search({
        type: "track",
        query: inputs
    }, function (err, data) {
        if (err) {
            console.log("Error occurred: " + err);
            
            return;
        }
        console.log(data.artists);
        // var songInfo = data.tracks.items;
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        // console.log("Artist: " + songInfo[0].artists[0].name);

    })
};

//-------twitter-----

function twitterThis(inputs) {
    console.log("time to tweet");
    var params = {
        screen_name: "SamAdams"
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log("Tweet: " + "'" + tweets[i].text);
            }
        } else {
            console.log(error);
        }
    });



}


//--------do this readme function-------
function doThis() {

    console.log("here are random texts");

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
            
            var dataArr = data.split(",");
            
            spotifyMe(dataArr);
          }else {
              console.log("error");
          }
         
          console.log(data);
    })
};