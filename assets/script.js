// DOM elements for the city form and submit button
var cityForm = document.querySelector(".city-form");
var cityInput = document.querySelector(".city");
var submitBtn = document.querySelector(".submit-button");

// DOM elements for the current day data
var todaysEl = document.querySelector(".today")
var cityName = document.querySelector(".todays-city");
var todaysIcon = document.querySelector(".todays-icon")
var todaysTemp = document.querySelector(".todays-temp");
var todaysWind = document.querySelector(".todays-wind");
var todaysHumidity = document.querySelector(".todays-humidity");
var todaysUV = document.querySelector(".todays-uv-index");

// DOM elements for the 5 day forecast
var forecastHeader = document.querySelector(".forecast-header");
var dayOne = document.querySelector(".day-one")
var dayTwo = document.querySelector(".day-two")
var dayThree = document.querySelector(".day-three")
var dayFour = document.querySelector(".day-four")
var dayFive = document.querySelector(".day-five")
var firstCard = document.querySelector(".first-card")
var firstIcon = document.querySelector(".first-icon")
var firstTemp = document.querySelector(".first-temp")
var firstWind = document.querySelector(".first-wind")
var firstHumidity = document.querySelector(".first-humidity")
var secondCard = document.querySelector(".second-card")
var secondIcon = document.querySelector(".second-icon")
var secondTemp = document.querySelector(".second-temp")
var secondWind = document.querySelector(".second-wind")
var secondHumidity = document.querySelector(".second-humidity")
var thirdCard = document.querySelector(".third-card")
var thirdIcon = document.querySelector(".third-icon")
var thirdTemp = document.querySelector(".third-temp")
var thirdWind = document.querySelector(".third-wind")
var thirdHumidity = document.querySelector(".third-humidity")
var forthCard = document.querySelector(".forth-card")
var forthIcon = document.querySelector(".forth-icon")
var forthTemp = document.querySelector(".forth-temp")
var forthWind = document.querySelector(".forth-wind")
var forthHumidity = document.querySelector(".forth-humidity")
var fifthCard = document.querySelector(".fifth-card")
var fifthIcon = document.querySelector(".fifth-icon")
var fifthTemp = document.querySelector(".fifth-temp")
var fifthWind = document.querySelector(".fifth-wind")
var fifthHumidity = document.querySelector(".fifth-humidity")

// DOM elements for the saved city buttons
var cityBtns = document.querySelector(".city-buttons")
var cityBtn = document.querySelector("city-btn")

// Array to store the cities the user searches for
var cities = []

// The first function that loads when the user clicks the submit button
var formSubmitHandler = function (event) {
    event.preventDefault();

    // Variable to hold the city they have searched for
    var city = cityInput.value.trim();

    // If they have entered a city name and it is valid, it will run the functions that
    // collect the current day and 5 day forecase data via the Open Weather API and pass
    // the city they entered.
    if (city) {
        fetchWeather(city);
        fetchForecast(city);
    } else {
        // If they haven't entered anything, it will alert them to do so.
        alert("Please enter a city name")
    }
}
// This function fetches the current day weather data from the Open Weather API
var fetchWeather = function (city) {
    // Variable to hold the api URL. In it, we add the city that the user has passed.
    var currentApiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=84c00db9e01356b453b2190ad1be323f"

    // Here, we fetch that URL and GET the data.
    fetch(currentApiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // Calls the displayWeather function and passes the API data and the city provided
                    displayWeather(data, city);
                });
            } else {
                alert('Error: ' + response.statusText)
            }
        })
        .catch(function (error) {
            alert('Please select a valid city');
        });
}
// This function takes the current day weather data we have just fetched and displays it
var displayWeather = function (data, city) {
    console.log(data)
    // Variables getting the data we want from both moment.js and the Open Weather API
    var today = moment().format("DD/MM/YYYY");
    var temp = data.main.temp;
    var wind = data.wind.speed;
    var humidity = data.main.humidity;
    // Here, we take the data we have stored in the above variables and pass it to the relevent DOM elements.
    // We also set some class attributes for styling purposes.
    todaysEl.setAttribute("class", "current-day")
    cityName.textContent = data.name + " - " + today
    todaysIcon.innerHTML = "<img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>"
    todaysTemp.textContent = "Temp: " + temp;
    todaysWind.textContent = "Wind Speed: " + wind;
    todaysHumidity.textContent = "Humidity: " + humidity;
    // Here, we call the UV index function and pass it the latitude and logitude from the data
    uvIndex(data.coord.lat, data.coord.lon);
}
// This function gets the UV index
var uvIndex = function (lat, lon) {
    // Variable to hold the api URL. In it, we add the longitude and latitude. 
    var getUvIndex = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=84c00db9e01356b453b2190ad1be323f";

    // Here, we fetch that URL and GET the data. 
    fetch(getUvIndex)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    todaysUV.textContent = "UV Index = " + data.value
                    if (data.value < 2) {
                        todaysUV.setAttribute("class", "low-uv")
                    } else if (data.value < 5) {
                        todaysUV.setAttribute("class", "med-uv")
                    } else if (data.value < 7) {
                        todaysUV.setAttribute("class", "high-uv")
                    } else if (data.value > 7.1) {
                        todaysUV.setAttribute("class", "extr-uv")
                    }
                })
                    .catch(function (error) {
                        console.log('No UV Data');
                    });
            }
        })
}
// This function fetches the five day forecast data from the Open Weather API
var fetchForecast = function (city) {
    var forecastApiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=84c00db9e01356b453b2190ad1be323f"

    fetch(forecastApiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // Calls the displayForecast function and passes the API data
                    displayForecast(data);
                });
            } else {
                alert('Error: ' + response.statusText)
            }
        })
        .catch(function (error) {
            alert('Please select a valid city');
        });
}
// This function takes the five day forecast data we have just fetched and displays it
var displayForecast = function (data) {
    console.log(data)
    // Firstly, we set the date for each card using moment.js
    var firstDay = moment().add(1, 'd').format("DD/MM/YYYY");
    var secondDay = moment().add(2, 'd').format("DD/MM/YYYY");
    var thirdDay = moment().add(3, 'd').format("DD/MM/YYYY");
    var forthDay = moment().add(4, 'd').format("DD/MM/YYYY");
    var fifthDay = moment().add(5, 'd').format("DD/MM/YYYY");
    // Setting the forecast header text
    forecastHeader.textContent = "5-Day Forecast:"
    // Applying some classes to the cards for styling purposes
    dayOne.setAttribute("class", "individual-forecast")
    dayTwo.setAttribute("class", "individual-forecast")
    dayThree.setAttribute("class", "individual-forecast")
    dayFour.setAttribute("class", "individual-forecast")
    dayFive.setAttribute("class", "individual-forecast")
    // Getting the objects from the array we want and passing the data we need to the relevent DOM elements 
    if (data.list[6]) {
        firstCard.textContent = firstDay
        firstIcon.innerHTML = "<img src='https://openweathermap.org/img/w/" + data.list[6].weather[0].icon + ".png'>"
        firstTemp.textContent = "Temp: " + data.list[6].main.temp
        firstWind.textContent = "Wind Speed: " + data.list[6].wind.speed
        firstHumidity.textContent = "Humidity: " + data.list[6].main.humidity
    }

    if (data.list[14]) {
        secondCard.textContent = secondDay
        secondIcon.innerHTML = "<img src='https://openweathermap.org/img/w/" + data.list[14].weather[0].icon + ".png'>"
        secondTemp.textContent = "Temp: " + data.list[14].main.temp
        secondWind.textContent = "Wind Speed: " + data.list[14].wind.speed
        secondHumidity.textContent = "Humidity: " + data.list[14].main.humidity
    }

    if (data.list[22]) {
        thirdCard.textContent = thirdDay
        thirdIcon.innerHTML = "<img src='https://openweathermap.org/img/w/" + data.list[22].weather[0].icon + ".png'>"
        thirdTemp.textContent = "Temp: " + data.list[22].main.temp
        thirdWind.textContent = "Wind Speed: " + data.list[22].wind.speed
        thirdHumidity.textContent = "Humidity: " + data.list[22].main.humidity
    }

    if (data.list[30]) {
        forthCard.textContent = forthDay
        forthIcon.innerHTML = "<img src='https://openweathermap.org/img/w/" + data.list[30].weather[0].icon + ".png'>"
        forthTemp.textContent = "Temp: " + data.list[30].main.temp
        forthWind.textContent = "Wind Speed: " + data.list[30].wind.speed
        forthHumidity.textContent = "Humidity: " + data.list[30].main.humidity
    }

    if (data.list[38]) {
        fifthCard.textContent = fifthDay
        fifthIcon.innerHTML = "<img src='https://openweathermap.org/img/w/" + data.list[38].weather[0].icon + ".png'>"
        fifthTemp.textContent = "Temp: " + data.list[38].main.temp
        fifthWind.textContent = "Wind Speed: " + data.list[38].wind.speed
        fifthHumidity.textContent = "Humidity: " + data.list[38].main.humidity
    }

}
// Event listener on the submit button to run the formSubmitHandler function
submitBtn.addEventListener('click', formSubmitHandler);
// This function renders the previously searched for city buttons on the page
function renderCities() {
    cityBtns.innerHTML = "";
    // Loop to go through the cities array where the searches are stored and create a button for each
    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];

        var cityBtn = document.createElement("button")
        cityBtn.textContent = city;
        cityBtn.setAttribute("class", "btn btn-info btn-block city-btn");
        cityBtn.setAttribute("value", city);

        cityBtns.appendChild(cityBtn);
    }
}
// This function gets the item from local storage and if there are any, it runs the renderCities function.
function init() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        cities = storedCities;
    }

    renderCities();

    // Click listener on the newly created buttons
    document.addEventListener('click', function (event) {
        event.preventDefault();
        if (event.target && event.target.closest('.city-btn')) {
            var city = event.target.value;

            if (city !== null) {
                fetchWeather(city);
                fetchForecast(city);
            } else {
                console.log("error")
            }
        }
    })
}
// This function stores the cities that have been searched for in local storage
function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
}
// Event listener on the submit button that passes the city to the cities array and runs the
// storeCities and renderCities functions
submitBtn.addEventListener('click', function (event) {
    event.preventDefault();

    var chosenCity = cityInput.value.trim();

    if (chosenCity === "") {
        return;
    }

    cities.push(chosenCity)
    cityInput.value = "";

    storeCities();
    renderCities();
});

init()