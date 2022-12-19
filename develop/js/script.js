// global variables
let apiBaseURL = 'http://http://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = "&APPID=73d12f90301263ae1498b68e5abab7e5";
let locationInputEl = document.querySelector(".location");
let previousSearchEl = document.querySelector(".previous-search");
let locationSearchForm = document.querySelector("#location-search");
let searchResultsContainerEl = document.querySelector(".search-results-container");
let currentDayContainerEl = document.querySelector(".current-day-container");
let fiveDayContainerEl = document.querySelector(".five-day-container");

// display variables



// TODO: REVIEW: user inputs information into search field
 let formSubmitLocation = function (e) {
    e.preventDefault();
    
    let location = locationInputEl.value.trim();

    if (location) {
        getLocationWeather(location);

        previousSearchEl.textContent = " ";
        locationInputEl.value = " ";
    }else {
        alert("Please enter a location");
    }

    console.log("formSubmitLocation function is working"); //testing readability of function
 };



// TODO: REVIEW: selecting search button triggers API information fetch request
let getLocationWeather = function (locationSearched) {
    let apiURL = apiBaseURL + locationSearched + apiKey;

    fetch (apiURL)
        .then (function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeather(data, locationSearched);
                });
            }else {
                alert("Error: " + response.statusText);
            }
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
let displayWeather = function (weather, searchTerm) {

    if (weather.length === 0) {
        currentDayContainerEl.textContent = "Location not found";
        return;
    }
    console.log("weather is empty");

    locationSearchTerm.textContent = searchTerm;

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
