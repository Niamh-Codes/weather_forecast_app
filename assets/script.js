// Create a weather dashboard with form inputs.
// When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
// When a user views the current weather conditions for that city they are presented with:
// The city name
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// The wind speed
// When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// When a user click on a city in the search history they are again presented with current and future conditions for that city

// API details
var apiKey = "d15254dee6de61de16a78cd6e35be79e";
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast";
var todayUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
var icons = "`https://openweathermap.org/img/wn/${icon}@2x.png`";

//var
// var displayWeather = 

// saved city search
var cities = JSON.parse(localStorage.getItem("cities")) || [];

// save city to local storage
function saveCity(city) {
    if (!cities.includes(city)) {
      cities.push(city);
      localStorage.setItem("cities", JSON.stringify(cities));
      renderSearchHistory();
    }
  }

  // Render search history
function renderSearchHistory() {
    $("#history").empty();
    for (var i = 0; i < cities.length; i++) {
      var historyItem = $("<button>")
        .addClass("list-group-item")
        .text(cities[i]);
      $("#history").append(historyItem);
    }
  };
// event for search
$("#search-form").submit(function(event) {
    event.preventDefault();
    var city = $("#search-input").val().trim();
    if (city !== "") {
      saveCity(city);
      fetchWeather(city);
      $("#search-input").val("");
    }
  });
  
  // Initial rendering of search history
  renderSearchHistory();

// Function to fetch weather data
function fetchWeather(city) {
    var searchParams = {
      q: city,
      appid: apiKey,
      units: "metric" // You can change units to "imperial" for Fahrenheit
    };
 
    // query parameters
    var url = new URL(apiUrl);
    Object.keys(searchParams).forEach(key => url.searchParams.append(key, searchParams[key]));
 
    // fetch weather data
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // weather bits
        console.log("Weather Data", data);
        displayWeather(data);
      })
  };
 //adding fetched forecast data to cards
  var $forecast = $("<ul>");
  $forecast.addClass("card");

  // Add the newly created element to the DOM
  $("#forecast").append();

  // display weather data
  renderSearchHistory();