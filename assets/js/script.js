var searchHistory = JSON.parse(localStorage.getItem("history")) || [];

var searchCity = function(cityValue) {
    fetch(
            "http://api.openweathermap.org/geo/1.0/direct?q=" + cityValue + "&limit=1&appid=30e19a927b18e9081713f88faa6cee64"
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

        // get city name
        var cityName = $("#search").val();

        // call function to save city and data to local storage
        saveCity(cityName);

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
        $("<div>")
        .addClass("mt-3 future-forecast")
        .appendTo("#current-weather-container");

        $("<h2>")
        .text("5-Day Forecast:")
        .appendTo(".future-forecast");

        // create container for future forecast cards
        $("<div>")
        .addClass("card-container row justify-content-around")
        .appendTo(".future-forecast")

        // use for loop to dynamically create 5 day forecast cards
        for (i = 1; i < 6; i++) {
            // create card elements
            $("<div>")
            .attr("id", "card" + i)
            .addClass("col-2 card bg-primary text-white pb-2")
            .appendTo(".card-container");

            $("<div>")
            .attr("id", "card-body" + i)
            .addClass("col card-body pl-0")
            .appendTo("#card" + i);

            $("<h3>")
            .attr("style", "font-size: 24px")
            .addClass("card-title")
            .text(moment().add(i, 'd').format("M/DD/YYYY"))
            .appendTo("#card-body" + i);

            $("<p>")
            .addClass("card-text")
            .text("Icon")
            .appendTo("#card" + i);
            
            $("<p>")
            .addClass("card-text")
            .text("Temp: " + data.daily[i].temp.day + " °F")
            .appendTo("#card" + i);

            $("<p>")
            .addClass("card-text")
            .text("Humidity: " + data.daily[i].humidity + "%")
            .appendTo("#card" + i);
        }
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

var saveCity = function(value) {
    for (var i = 0; i < searchHistory.length; i++) {
        if (searchHistory[i] === value) {
            return;
        }
    };
        
    searchHistory.push(value);
    localStorage.setItem("history", JSON.stringify(searchHistory));
};

var createCityButtons = function(array) {
    for (var i = 0; i < array.length; i++) {
        $("<button>")
        .addClass("newBtn btn bg-white border border-light text-left col-12 p-2")
        .text(uppercase(array[i]))
        .appendTo("#search-container");
    }
};

$("#btnSearch").on("click", function() {
    event.preventDefault();

    var cityValue = $("#search").val();

    searchCity(cityValue);
});

$(".newBtn").on("click", function() {
    console.log(this);
});

createCityButtons(searchHistory);