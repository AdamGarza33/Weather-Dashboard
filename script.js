// Store searched city
var city = '';

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
var APIKey = '94db56ea5c188e040498ca253c22154b';
 

 function grabCity(event){
    event.preventDefault();
    console.log(event);
    if(findCity.val().trim()!==""){
        city=findCity.val().trim();
         todayWeather(city); 
        
    }
}
 
function todayWeather(city) {
   
    
    // Here we build the URL so we can get a data from server side.
    var queryURL= 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + APIKey;
    $.ajax({
        url:queryURL,
        method:'GET',
    }).then(function(response){
        console.log(response);

        var wicon= response.weather[0].icon;
        var iurl="https://openweathermap.org/img/wn/"+wicon +"@2x.png";

        var date=new Date(response.dt*1000).toLocaleDateString();

        $(currentCityEl).html(response.name +"("+date+")" + "<img src="+iurl+">");

        var ferenheit = (response.main.temp - 273.15) * 1.80 + 32;

        $(currentTempEl).html((ferenheit).toFixed(2)+"&#8457");
        
        $(currentHumidityEl).html(response.main.humidity+"%");
        
        var windspeed=response.wind.speed;
        var windmph=(windspeed*2.237).toFixed(1);
        $(currentWindEl).html(windmph+"MPH");
        
        uvIndex(response.coord.lon,response.coord.lat);
        forecast(response.id);
        if(response.cod==200){
            xCity=JSON.parse(localStorage.getItem("cityname"));
            console.log(xCity);
            if (xCity==null){
                xCity=[];
                xCity.push(city.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(xCity));
                addToList(city);
            }
            else {
                if(find(city)>0){
                    xCity.push(city.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(xCity));
                    addToList(city);
                }
            }
        }

    });
}

function uvIndex(ln,lt){
    // url uvindex.
    var uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey+"&lat="+lt+"&lon="+ln;
    $.ajax({
            url:uvqURL,
            method:"GET"
            }).then(function(response){
                $(uvIndexEl).html(response.value);
            });
}

function forecast(cityid){
    var dayover = false;
    var forcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
    $.ajax({
        url:forcastURL,
        method:"GET"
    }).then(function(response){
        for (i=0;i<5;i++){
            var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            var icode= response.list[((i+1)*8)-1].weather[0].icon;
            var iconurl="https://openweathermap.org/img/wn/"+icode+".png";
            var tempK= response.list[((i+1)*8)-1].main.temp;
            var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
            var humidity= response.list[((i+1)*8)-1].main.humidity;
        
            $("#forecast-date"+i).html(date);
            $("#forecast-img"+i).html("<img src="+iconurl+">");
            $("#forecast-temp"+i).html(tempF+"&#8457");
            $("#forecast-humid"+i).html(humidity+"%");
        }
        
    });
}

function addToList(c){
    var listEl= $("<li>"+c.toUpperCase()+"</li>");
    $(listEl).attr("class","list-group-item");
    $(listEl).attr("data-value",c.toUpperCase());
    $(".list-group").append(listEl);
}

function invokePastSearch(event){
    var listEl=event.target;
    if (event.target.matches("li")){
        city=listEl.textContent.trim();
        //console.log(event);
        todayWeather(city);
    }

}

// render function
function loadlastCity(){
    $("ul").empty();
    var xCity = JSON.parse(localStorage.getItem("cityname"));
    if(xCity!==null){
        xCity=JSON.parse(localStorage.getItem("cityname"));
        for(i=0; i<xCity.length;i++){
            addToList(xCity[i]);
        }
        city=xCity[i-1];
        todayWeather(city);
    }

}
//Clear search history 
function clearSavedCityHistory(event){
    event.preventDefault();
    xCity=[];
    localStorage.removeItem("cityname");
    document.location.reload();

}
//Click Handlers
$("#search-button").on("click",todayWeather);
$(document).on("click",invokePastSearch);
$(window).on("load",loadlastCity);
$("#clear-cities").on("click",clearSavedCityHistory);