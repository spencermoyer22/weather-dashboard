var searchCity = function() {
    var city = $("#search").val();

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
        // clear old data
        $("#current-weather-container").text("");
        $("")

        console.log(data);
        // get city name
        var cityName = $("#search").val();

        // clear input
        $("#search").val('');

        // capitalize the first letter of each word in the city
        var upperCityName = uppercase(cityName);
        
        // get today's date
        var date = moment().format("M/DD/YYYY");

        // get current weather icon

        // create container for current weather
        $("<div>")
        .addClass("card border-right-0 pt-3 pb-4 pl-3")
        .attr("id", "current-weather")
        .appendTo("#current-weather-container");

        // apply name, date and icon to current weather title
        $("<h2>")
        .addClass("mb-4")
        .text(upperCityName + " (" + date + ")")
        .appendTo("#current-weather");

        // create p elements for current weather
        $("<p>")
        .text("Temperature: " + data.current.temp + " °F") 
        .appendTo("#current-weather");

        $("<p>")
        .text("Humidity: " + data.current.humidity + "%")
        .appendTo("#current-weather");

        $("<p>")
        .text("Wind Speed: " + data.current.wind_speed + " MPH")
        .appendTo("#current-weather");

        $("<p>")
        .html("UV Index: <span id='uv-index'></span>")
        .appendTo("#current-weather");

        if (data.current.uvi < 3) {
            $("#uv-index")
            .addClass("bg-success text-white p-2")
            .text(data.current.uvi);
        }
        else if (data.current.uvi >= 3 && data.current.uvi < 7) {
            $("#uv-index")
            .addClass("bg-warning text-white p-2")
            .text(data.current.uvi);
        }
        else {
            $("#uv-index")
            .addClass("bg-danger text-white p-2")
            .text(data.current.uvi);
        }

        // create elements for 5 day forecast


    })
};

var uppercase = function(string) {
    // split city name into array by space
    var splitCity = string.toLowerCase().split(" ");

    for (var i = 0; i < splitCity.length; i++) {
        splitCity[i] = splitCity[i].charAt(0).toUpperCase() + splitCity[i].substring(1);
    }

    return splitCity.join(" ");
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