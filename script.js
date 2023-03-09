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