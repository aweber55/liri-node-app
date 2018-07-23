require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var Twitter = require("twitter");

var fs = require("fs");

var Spotify = require("node-spotify-api");


var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

var action = process.argv[2];
var inputs = process.argv.slice(3).join(" ");


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
            console.log('*============================================*');
            console.log('*============================================*');
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomato Rating: " + JSON.parse(body).tomatoRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("The Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log('*============================================*');
            console.log('*============================================*');

        }
    })
};

//-----spotify------


function spotifyMe(inputs) {
    console.log("music time");






    spotify.search({
        type: 'track',
        query: inputs
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log('*============================================*');
        console.log('*============================================*');

        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url);
        console.log("Album Name: " + data.tracks.items[0].album.name);
        console.log('*============================================*');
        console.log('*============================================*');

    });
};

//-------twitter-----

function twitterThis(inputs) {


    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
    console.log("time to tweet");
    var params = {
        screen_name: "Sam Adams1"
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
           
            var tweetAmount = 0;

            if (tweets.length < 20) {
                  var tweetAmount = tweets.length;
            } else {
                tweetAmount = 20;
                console.log(error);
            }
            for (var i = 0; i < tweetAmount; i++) {
                
                console.log(tweets[i].text);
               
            }
        }
    });



}


//--------do this readme function-------
function doThis() {

    // console.log("here are random texts");

    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);

            var dataArr = data.split(",");

            spotifyMe(dataArr);
        } else {
            console.log("error");
        }

        console.log(data);
    })
};