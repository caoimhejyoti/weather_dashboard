// global variables
let apiBaseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = '&appid=73d12f90301263ae1498b68e5abab7e5';
let locationInputEl = document.querySelector(".location");
console.log(locationInputEl); //used for debugging
let previousSearchEl = document.querySelector(".previous-search");
let locationSearchForm = document.querySelector("#location-search");
let searchResultsContainerEl = document.querySelector(".search-results-container");
let currentDayContainerEl = document.querySelector("#location-searched");
let fiveDayContainerEl = document.querySelector(".five-day-container");

// display variables
let currentWeather = JSON.parse(localStorage.getItem("currentWeatherData"));
console.log(currentWeather);
let currentTemp = currentWeather.main.temp;
console.log(currentTemp); //used for debugging

let currentHumidity = currentWeather.main.humidity;
console.log(currentHumidity); //used for debugging

let currentWind = currentWeather.wind.speed;
console.log(currentWind); //used for debugging


// TODO: REVIEW: user inputs information into search field - WORKING!
 let formSubmitLocation = function (e) {
    e.preventDefault();
    
    let location = locationInputEl.value.trim();

    console.log(location + " formSubmitLocation Function"); //used for debugging

    if (location) {
        getLocationCurrentWeather(location);

        previousSearchEl.textContent = " ";
        locationInputEl.value = " ";
    }else {
        alert("Please enter a location");
    }

    console.log("formSubmitLocation function is working"); //used for debugging
 };



// TODO: REVIEW: selecting search button triggers API information fetch request
let getLocationCurrentWeather = function (locationSearched) {
    let apiURL = apiBaseURL +locationSearched + "&limit=1" + apiKey + "&units=metric";

    console.log(apiURL); //used for debugging

    fetch (apiURL)
        .then (function (response){
            response.json().then(function (data) {
                console.log(data);



            if (response.ok) {
                localStorage.setItem("currentWeatherData", JSON.stringify(data));
                displayCurrentWeather(); //FIXME: causing an error
            }else{
            alert("Error: " + response.statusText);
            }
           });
        })
        .catch (function (error) {
            alert("Unable to connect to WeatherService");
        });
    console.log("fetch apiURL is working");
};
// previous search button is created within aside div


// this previous button must be able to be clicked to redo the search request
    // local storage needs to be used for this.



// search results create new HTML elements
    //[present] current day card across the top of the page
    //[future] 5 day forcast is created below with each day being a card. 
    // information required is date, temp (C), wind (KMPH) and humidity.

let displayCurrnetWeather = function () {

    if (currentWeather.length === 0) {
        currentDayContainerEl.textContent = "Location not found";
        return;
    }
    console.log("weather is empty");

    let location = locationInputEl.value.trim();

    console.log(location + " displayCurrentWeather Function"); //used for debugging
    // locationSearchTerm.textContent = searchTerm;

    for (var i = 0; i < weather.length; i++) {

        let locationNameEL = document.createElement("h2");
        
        let titleEL = document.createElement("span");
        titleEL.textContent = locationInputEl;

        locationNameEL.appendChild(titleEL);






    };
    console.log("weather is not empty");
};

// user selects search button
locationSearchForm.addEventListener('submit', formSubmitLocation);
// APIs
// need to add geocoding
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={"73d12f90301263ae1498b68e5abab7e5"};
// https://openweathermap.org/api/geocoding-api
