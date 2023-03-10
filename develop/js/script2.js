// GLOBAL VARIABLES:
//API variables
let apiBaseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
let forecastBaseAPI = 'https://api.openweathermap.org/data/2.5/forecast?';
let apiKey = '&appid=73d12f90301263ae1498b68e5abab7e5';
let date = dayjs().format("DD/MM/YYYY");
var currentHour = dayjs().hour();

//Element Variables
let locationInputEl = document.querySelector(".location"); //user input location
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
let weatherIcon = document.createElement("img");


// COMPLETE! DESCRIPTION: make user inputs information into search field
 let formSubmitLocation = function (e) {
    e.preventDefault();
    
    let location = locationInputEl.value.trim();
    // console.log(location + " (source = formSubmitLocation Function)"); //used for debugging

    if (location) {
        getLocationCurrentWeather(location);
        displayPreviousSearch();
        currentDayContainerEl.textContent = '';
        fiveDayContainerEl.textContent = '';
        locationInputEl.value = ' ';
    }else {
        alert("Please enter a location");
    }
    console.log("formSubmitLocation function is reading"); //used to confirm function is read.
 };

//COMPLETE! DESCRIPTION: function to store searched location and add to previous searches as buttons to the aside.
let displayPreviousSearch = function() {
    let location = currentWeather.name;
    // console.log("location within previous search function: " + location); //WORKING! used for debugging
    let previousSearchBtn = document.createElement("button");
    previousSearchBtn.classList.add("btn", "col-12", "btn-outline-secondary");
    previousSearchEl.setAttribute("id", "previous-search");
    // previousSearchEl.setAttribute("role", "button");

    previousSearchBtn.innerHTML = location;

    previousSearchEl.appendChild(previousSearchBtn);

    console.log("displayPreviousSearch is reading"); //used to confirm function is read.
    previousSearchBtn.addEventListener("click", function(e){
    
        e.preventDefault();
        if (location) {
            getLocationCurrentWeather(location);
            displayPreviousSearch();
            currentDayContainerEl.textContent = '';
            fiveDayContainerEl.textContent = '';
            locationInputEl.value = " ";
        }else {
            alert("Please enter a location");
        }
        console.log("previousSearchBtn eventListener function is reading"); //used to confirm function is read.
    });

};

// COMPLETE! DESCRIPTION:selecting search button triggers API information fetch request for current weather
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
            alert("Location Error: " + response.statusText);
            }
           });
        })
        .catch (function (error) {
            alert("Unable to connect to WeatherService");
        });
    console.log("fetch apiURL is reading"); //used to confirm function is read.
};

// COMPLETE! DESCRIPTION:selecting search button triggers API information fetch request for forecast
let getLocationForecast = function (){
    // console.log("currentWeather within getLocationForecast: " + currentWeather); //used for debugging
    currentLon = currentWeather.coord.lon;
    // console.log("currentLon: " + currentLon); //used for debugging
    currentLat = currentWeather.coord.lat;
    // console.log("currentLat: " + currentLat); //used for debugging
    
    let forecastAPI = forecastBaseAPI + "lat=" + currentLat +  "&lon=" + currentLon + apiKey + "&units=metric";
    // console.log(forecastAPI);//used for debugging 

    fetch(forecastAPI)
        .then(function (response) {
            response.json().then(function (data) {
                // console.log(data); // used for debugging
            if (response.ok) {
                localStorage.setItem("forecastAPIData", JSON.stringify(data));
                forecastWeather = JSON.parse(localStorage.getItem("forecastAPIData"));
                // console.log("source: getLocationForecast- " + forecastWeather); //used for debugging 
                displayFiveDayforecast();
            }else{
                alert("forecastAPI error: " + response.statusText);
            }
            })
        })
        .catch (function (error) {
            alert("Unable to connect to WeatherService");
        });
    console.log("fetch forcastAPI is reading"); //used to confirm function is read.
};

//COMPLETE! DESCRIPTION: search results create new HTML elements - [present] current day card across the top of the page
let displayCurrentWeather = function () {
    // console.log(currentWeather + " (source: displayCurrentWeather)");
    
    let currentId = currentWeather.weather[0].icon; 
    // console.log(currentID); //used for debugging
    weatherIcon.src = "http://openweathermap.org/img/wn/"+ currentId +"@2x.png"

    let currentTemp = currentWeather.main.temp + "??C"; 
    // console.log(currentTemp); //used for debugging
    let currentHumidity = currentWeather.main.humidity + "%";
    // console.log(currentHumidity); //used for debugging
    let currentWind = currentWeather.wind.speed + "km/h";
    // console.log(currentWind); //used for debugging

    if (currentWeather.length === 0) { //COMPLETE!
        currentDayContainerEl.textContent = "Location not found";
        return;
        console.log("current weather is empty"); // used for debugging
    }else{ //working for current weather. 
        let location = currentWeather.name;
        // console.log(location + " (source = displayCurrentWeather Function)"); //used for debugging   
        currentDayContainerEl.classList.add("card");
        let titleEL = document.createElement("h2");
        // console.log("titleEL: " + titleEL); //used for debugging
        // let currentIdEl = document.createElement("p");
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
        
        // currentIdEl.textContent = "ID: " + currentId; //previous iteration of images
        currentDayContainerEl.appendChild(weatherIcon);

        currentTempEl.textContent = "Temp: " + currentTemp;
        currentDayContainerEl.appendChild(currentTempEl);
        
        currentHumidityEl.textContent = "Humidity: " + currentHumidity;
        currentDayContainerEl.append(currentHumidityEl);
        
        currentWindEl.textContent = "Wind: " + currentWind;
        currentDayContainerEl.append(currentWindEl);

        // console.log("weather is not empty"); //used for debugging
    };
    console.log("displayCurrentWeather is reading"); //used to confirm function is read.
};

//FIXME: only one forecast card is being created. DESCRIPTION: search results create new HTML elements - [future] 5 day forecast is created below with each day being a card. 
let displayFiveDayforecast = function () { 
//variables for containers
    //container for heading
    let forecastHeadingContainerEl = document.createElement("div");
    forecastHeadingContainerEl.setAttribute("id", "forecast-heading-container");
    forecastHeadingContainerEl.classList.add("col-8");
    //forecast heading
    let forecastHeadingEl = document.createElement("h2");
    forecastHeadingEl.textContent = "Five day forecast: ";
    //container for cards
    let forecastCardContainerEl = document.createElement("div");
    forecastCardContainerEl.setAttribute("id", "forecast-card-container");
    forecastCardContainerEl.classList.add("col-8"); 
    //cards for each day:
    let forecastDayCard = document.createElement("div");
    forecastDayCard.setAttribute("id", "forecast-day-container");
    forecastDayCard.classList.add("card");
    //adding each element to the correct one! - russian doll
    forecastHeadingContainerEl.appendChild(forecastHeadingEl); //add title to title container
    fiveDayContainerEl.appendChild(forecastHeadingContainerEl); //adds title container to forcast
    fiveDayContainerEl.appendChild(forecastCardContainerEl); //adds card container to forecast 
    
    for (let i = 0; i < 50; i++) { 
        let hourForecast = forecastWeather.list[i].dt_txt.split(" ")[1];
        let forecastDate = forecastWeather.list[i].dt_txt.split(" ")[0]; //used in previous development.
        // console.log(hourForecast); //used for debugging
        
        if (hourForecast ==="00:00:00"){
            //add card for each day to the card container
            forecastCardContainerEl.appendChild(forecastDayCard); 
            //add classes to each card
            forecastDayCard.classList.add("forecast-card", "card") //do i need to add class col?
            //create card title (date) element + content
            let forecastDateEl = document.createElement("h3");
            let forecastUnixCode = forecastWeather.list[i].dt;
            forecastDateEl.textContent = dayjs.unix(forecastUnixCode).format("DD/MM/YYYY");
            //create forecast icon element + content:
            let forecastIconEl = document.createElement("img");
            let forecastIconId = forecastWeather.list[i].weather[0].icon;
            forecastIconEl.src = "http://openweathermap.org/img/wn/"+ forecastIconId +"@2x.png"
            //create forecast temp element:
            let forecastTempEl = document.createElement("p");
            forecastTempEl.setAttribute("id", "temperature");
            forecastTempEl.classList.add("info");
            forecastTempEl.textContent = forecastWeather.list[i].main.temp + "??C";
            //create forecast Humidity element:
            let forecastHumidityEl = document.createElement("p");
            forecastHumidityEl.setAttribute("id", "humidity");
            forecastHumidityEl.classList.add("info");
            forecastHumidityEl.textContent = forecastWeather.list[i].main.humidity + "%";
            //create forecast wind element:
            let forecastWindEl = document.createElement("p");
            forecastWindEl.setAttribute("id", "wind");
            forecastWindEl.classList.add("info");
            forecastWindEl.textContent = forecastWeather.list[i].wind.speed +"km/p";
            //add forecast data into element:
            forecastDayCard.appendChild(forecastDateEl);
            forecastDayCard.appendChild(forecastIconEl);
            forecastDayCard.appendChild(forecastTempEl);
            forecastDayCard.appendChild(forecastHumidityEl);
            forecastDayCard.appendChild(forecastWindEl);        
        };
    };
    console.log("displayFiveDayForecast is reading"); //used to confirm function is read.
};

// user selects search button
locationSearchForm.addEventListener('submit', formSubmitLocation);

//previous code for reference.

    // // console.log("inside displayFiveDayforecast"); // WORKING!
    // // let forecastHeadingContainerEl = document.createElement("div");
    // // let forecastHeadingEl = document.createElement("h2");
    // let forecastCardContainerEl = document.createElement("div");
    // forecastHeadingContainerEl.classList.add("col-8");
    // forecastCardContainerEl.classList.add("col-8", "row");
    // forecastCardContainerEl.setAttribute("id", "forecastCardContainer");
    // forecastHeadingEl.textContent = "Five day forecast: ";
    // fiveDayContainerEl.appendChild(forecastHeadingContainerEl);
    // forecastHeadingContainerEl.appendChild(forecastHeadingEl);
    // fiveDayContainerEl.appendChild(forecastCardContainerEl);



        // if (hourForecast == "00:00:00") {
        //     let forecastResults = [ //
        //         forecastDate,
        //         "Icon: " + forecastWeather.list[i].weather[0].icon,
        //         "Temp: " + forecastWeather.list[i].main.temp,
        //         "Humiditiy: " + forecastWeather.list[i].main.humidity + "%",
        //         "Wind: " + forecastWeather.list[i].wind.speed + "km/h",
        //     ];

        //     forecastIcon = forecastWeather.list[i].weather[0].icon;
        //     console.log(forecastIcon);
        //     weatherIcon.src = "http://openweathermap.org/img/wn/"+ forecastIcon +"@2x.png"

        //     let forecastDayContainer = document.createElement("div");
        //     forecastDayContainer.classList.add("forecast-card", "card", "col");
        //     let forecastDayTitle = document.createElement("h3");
        //     let forecastDayContent = document.createElement("p");
        //     let forecastDayList = document.createElement("li");

        //     // let forecastDay = dayjs().add(i, "d").format("DD/MM/YYYY");

        //     forecastCardContainerEl.appendChild(forecastDayContainer);
        //     forecastDayTitle.textContent = forecastResults[0];
        //     // console.log(forecastDayTitle); //used for debugging
        //     forecastDayContainer.appendChild(forecastDayTitle);
        //     console.log(weatherIcon);
            
        //     forecastDayContent.textContent = weatherIcon;
        //     // console.log(forecastDayContent); //used for debugging
        //     forecastDayContainer.appendChild(forecastDayContent);
        //     forecastDayContainer.appendChild(forecastDayList);

        //     forecastDayList.textContent = [
        //         forecastResults[2],
        //     ]
        //     forecastDayList.textContent +=[
        //         forecastResults[3],
        //     ]
        //     forecastDayList.textContent +=[
        //         forecastResults[4],
        //     ]
            // console.log(forecastResults); //used for debugging