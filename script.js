// Store searched city
var city = "";

// Declaration
var findCity = $('#search-city');
var searchBtn = $('#search-button');
var clearSavedCityBtn = $('#clear-cities');
var currentCityEl = $('#current-city');
var currentTempEl = $('#temp');
var currentWindEl = $('#wind');
var currentHumidityEl = $('#humid');
var uvIndexEl = $('#uv');
var xCity = [];

// search city
function find(x) {
    for (var i = 0; i < xCity.length; i++) {
        if (x.toUpperCase() === xCity[i]) {
            return -1;
        }
    }
    return 1;
}

// API Key
var APIKey = "94db56ea5c188e040498ca253c22154b";
 
//Display today's weather and forecasted weather after searching a city
function todaysWeather(event){
    event.preventDefault();
    if(findCity.val().trim()!==""){
        city=findCity.val().trim();
        currentWeather(city);
    }
}


