//var city = $("#search").val();
var searchCity = function() {
    var city = $("#search").val();

    $("#search").val('');

    fetch(
            "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=30e19a927b18e9081713f88faa6cee64"
        )
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            //create variables for lat and long
            var lat = data[0].lat;
            var long = data[0].lon;

            // call function to get weather forecast
            forecast(lat, long);
        })
};

var forecast = function(lat, long) {
    fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly,alerts&units=imperial&appid=30e19a927b18e9081713f88faa6cee64"
    )
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
};

$("#btnSearch").on("click", function() {
    event.preventDefault();
    searchCity();
});
// function to pull api data for searched city

// get lat and long set it for one call api

// function to display current weather from one call

// function to display 5 day forecast from one call

// grab data from first 5 days to create DOM elements