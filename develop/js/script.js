// global variables
let apiURL = 'http://http://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = "73d12f90301263ae1498b68e5abab7e5";
let locationInputEl = document.querySelector(".location");
let previousSearchEl = document.querySelector(".previous-search");
let locationSearchForm = document.querySelector(".location-search");

// user inputs information into search field
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
// user selects search button


// selecting search button triggers API information fetch request


// previous search button is created within aside div


// this previous button must be able to be clicked to redo the search request
    // local storage needs to be used for this.



// search results create new HTML elements
    //[present] current day card across the top of the page
    //[future] 5 day forcast is created below with each day being a card. 
    // information required is date, temp (C), wind (KMPH) and humidity.








// APIs
// need to add geocoding
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={"73d12f90301263ae1498b68e5abab7e5"};
// https://openweathermap.org/api/geocoding-api
