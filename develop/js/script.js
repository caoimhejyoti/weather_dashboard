// global variables
//API variables
let apiBaseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
let forecastBaseAPI = 'https://api.openweathermap.org/data/2.5/forecast?';
let apiKey = '&appid=73d12f90301263ae1498b68e5abab7e5';
let date = dayjs().format("DD/MM/YYYY");
console.log(date);
var currentHour = dayjs().hour();

//Element Variables
let locationInputEl = document.querySelector(".location");
// console.log(locationInputEl); //used for debugging
let previousSearchEl = document.querySelector(".previous-search");
let locationSearchForm = document.querySelector("#location-search");
let searchResultsContainerEl = document.querySelector(".search-results-container");
let currentDayContainerEl = document.querySelector(".current-day-container");
let fiveDayContainerEl = document.querySelector(".five-day-container");

// Display variables
let currentWeather = JSON.parse(localStorage.getItem("currentWeatherData")); // null
// console.log(currentWeather); //used for debugging
let forecastWeather = JSON.parse(localStorage.getItem("forecastAPIData")); // null
// console.log(forecastWeather); //used for debugging



// WORKING! TODO: add any additional functions created DESCRIPTION: make user inputs information into search field
 let formSubmitLocation = function (e) {
    e.preventDefault();
    
    let location = locationInputEl.value.trim();
    // console.log(location + " (source = formSubmitLocation Function)"); //used for debugging

    if (location) {
        getLocationCurrentWeather(location);
        previousSearchEl.textContent = " ";
        locationInputEl.value = " ";
    }else {
        alert("Please enter a location");
    }
    console.log("formSubmitLocation function is reading"); //used for debugging
 };

// TODO: DESCRIPTION:selecting search button triggers API information fetch request for current weather
let getLocationCurrentWeather = function (locationSearched) {
    let apiURL = apiBaseURL +locationSearched + "&limit=1" + apiKey + "&units=metric";
    // console.log(apiURL); //used for debugging

    fetch (apiURL)
        .then (function (response){
            response.json().then(function (data) {
                // console.log(data); //used for debugging 
            if (response.ok) {
                localStorage.setItem("currentWeatherData", JSON.stringify(data));
                currentWeather = JSON.parse(localStorage.getItem("currentWeatherData")); 
                // console.log(currentWeather + " (source: getLocationCurrentWeather)");  // used for debugging
                displayCurrentWeather(); 
                getLocationForecast();
            }else{
            alert("Error: " + response.statusText);
            }
           });
        })
        .catch (function (error) {
            alert("Unable to connect to WeatherService");
        });
    console.log("fetch apiURL is reading");
};

// TODO: DESCRIPTION:selecting search button triggers API information fetch request for forecast
let getLocationForecast = function (){
    // console.log("currentWeather within getLocationForecast: " + currentWeather); //used for debugging
    currentLon = currentWeather.coord.lon;
    console.log("currentLon: " + currentLon); //used for debugging
    currentLat = currentWeather.coord.lat;
    console.log("currentLat: " + currentLat); //used for debugging
    
    let forecastAPI = forecastBaseAPI + "lat=" + currentLat +  "&lon=" + currentLon + apiKey + "&units=metric";
    // console.log(forecastAPI);//used for debugging 

    fetch(forecastAPI)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data); //"forecastAPI data: +"
            if (response.ok) {
                localStorage.setItem("forecastAPIData", JSON.stringify(data));
                forecastWeather = JSON.parse(localStorage.getItem("forecastAPIData"));
                console.log("source: getLocationForecast- " + forecastWeather);
                displayFiveDayforecast();
            }else{
                alert("forecastAPI error: " + response.statusText);
            }
            })
        })
        .catch (function (error) {
            alert("Unable to connect to WeatherService");
        });
    console.log("fetch forcastAPI is reading"); //used for debugging
};

//TODO: currently has no style DESCRIPTION: search results create new HTML elements - [present] current day card across the top of the page
let displayCurrentWeather = function () {
    // console.log(currentWeather + " (source: displayCurrentWeather)");
    
    let currentId = currentWeather.id; 
    // console.log(currentId); //used for debugging
    let currentTemp = currentWeather.main.temp + "°C"; 
    // console.log(currentTemp); //used for debugging
    let currentHumidity = currentWeather.main.humidity + "%";
    // console.log(currentHumidity); //used for debugging
    let currentWind = currentWeather.wind.speed + "km/h";
    // console.log(currentWind); //used for debugging

    if (currentWeather.length === 0) { //COMPLETE!
        currentDayContainerEl.textContent = "Location not found";
        return;
        console.log("current weather is empty"); // used for debugging
    }else{ //working for current weather. FIXME: oncce the user searches again, the data is just added, not replaced.
        let location = currentWeather.name;
        // console.log(location + " (source = displayCurrentWeather Function)"); //used for debugging   
        currentDayContainerEl.classList.add("card");
        let titleEL = document.createElement("h2");
        // console.log("titleEL: " + titleEL); //used for debugging
        let currentIdEl = document.createElement("p");
        // console.log("currentIdEl: " + currentIdEl); //used for debugging
        let currentTempEl = document.createElement("p");
        // console.log("currentTempEl: " +currentTempEl); //used for debugging
        let currentHumidityEl = document.createElement("p");
        // console.log("currentHumidityEl: " + currentHumidityEl); //used for debugging
        let currentWindEl = document.createElement("p");
        // console.log("currentWindEl: " + currentWindEl); //used for debugging 
            
        titleEL.textContent = location + " - " + date;
        currentDayContainerEl.append(titleEL);
        // console.log("searchResultsContainerEl: " + currentDayContainerEl);//used for debugging
        
        currentIdEl.textContent = "ID: " + currentId;
        currentDayContainerEl.appendChild(currentIdEl);

        currentTempEl.textContent = "Temp: " + currentTemp;
        currentDayContainerEl.appendChild(currentTempEl);
        
        currentHumidityEl.textContent = "Humidity: " + currentHumidity;
        currentDayContainerEl.append(currentHumidityEl);
        
        currentWindEl.textContent = "Wind: " + currentWind;
        currentDayContainerEl.append(currentWindEl);

        console.log("weather is not empty");//used for debugging
    };
};

//TODO: Need update display to have a li not a chaion of text. CSS required DESCRIPTION: search results create new HTML elements - [future] 5 day forecast is created below with each day being a card. 
let displayFiveDayforecast = function () { 
    console.log("inside displayFiveDayforecast"); // WORKING!
    // console.log(forecastWeather + "source: displayFiveDayforecast1" ); // WORKING! 
    for (let i = 0; i < 50; i++) {
        // console.log(forecastWeather + "source: displayFiveDayforecast2" ); // WORKING!
        let hourForecast = forecastWeather.list[i].dt_txt.split(" ")[1];
        let forecastDate = forecastWeather.list[i].dt_txt.split(" ")[0];
        // console.log(hourForecast);
        if (hourForecast == "00:00:00") {
            let forecastResults = [ //WORKING!
                "Date: " + forecastDate,
                "Id: " + forecastWeather.list[i].weather[0].id,
                "Temp: " + forecastWeather.list[i].main.temp,
                "Humiditiy: " + forecastWeather.list[i].main.humidity + "%",
                "Wind: " + forecastWeather.list[i].wind.speed + "km/h",
            ];

            let forecastDayContainer = document.createElement("div");
            forecastDayContainer.classList.add("forecast-card", "card", "col-2");
            let forecastDayTitle = document.createElement("h3");
            let forecastDayContent = document.createElement("ul");


            fiveDayContainerEl.appendChild(forecastDayContainer);
            forecastDayTitle.textContent = forecastResults[0];
            console.log(forecastDayTitle); //used for debugging
            forecastDayContainer.appendChild(forecastDayTitle);
            forecastDayContent.textContent = [
                forecastResults[1],
            ];
            console.log(forecastDayContent); //used for debugging
            forecastDayContainer.appendChild(forecastDayContent);
            forecastDayContent.textContent += [
                forecastResults[2],
            ]
            forecastDayContent.textContent +=[
                forecastResults[3],
            ]
            forecastDayContent.textContent +=[
                forecastResults[4],
            ]



            console.log(forecastResults);
        };
    };
};

// COMPLETE! DESCRIPTION:previous search button is created within aside div
// previous search button is created within aside div



// this previous button must be able to be clicked to redo the search request
    // local storage needs to be used for this.



// search results create new HTML elements

    // information required is date, temp (C), wind (KMPH) and humidity.



// user selects search button
locationSearchForm.addEventListener('submit', formSubmitLocation);
