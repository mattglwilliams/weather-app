var cityForm = document.querySelector(".city-form");
var cityInput = document.querySelector(".city");
var submitBtn = document.querySelector(".submit-button");
var todaysEl = document.querySelector(".today")
var cityName = document.querySelector(".todays-city");
var todaysIcon = document.querySelector(".todays-icon")
var todaysTemp = document.querySelector(".todays-temp");
var todaysWind = document.querySelector(".todays-wind");
var todaysHumidity = document.querySelector(".todays-humidity");
var todaysUV = document.querySelector(".todays-uv-index");
var forecastHeader = document.querySelector(".forecast-header");

var dayOne = document.querySelector(".day-one")
var dayTwo = document.querySelector(".day-two")
var dayThree = document.querySelector(".day-three")
var dayFour = document.querySelector(".day-four")
var dayFive = document.querySelector(".day-five")
var firstCard = document.querySelector(".first-card")
var firstIcon = document.querySelector(".first-icon")
var firstTemp = document.querySelector(".first-temp")
var firstHumidity = document.querySelector(".first-humidity")
var secondCard = document.querySelector(".second-card")
var secondIcon = document.querySelector(".second-icon")
var secondTemp = document.querySelector(".second-temp")
var secondHumidity = document.querySelector(".second-humidity")
var thirdCard = document.querySelector(".third-card")
var thirdIcon = document.querySelector(".third-icon")
var thirdTemp = document.querySelector(".third-temp")
var thirdHumidity = document.querySelector(".third-humidity")
var forthCard = document.querySelector(".forth-card")
var forthIcon = document.querySelector(".forth-icon")
var forthTemp = document.querySelector(".forth-temp")
var forthHumidity = document.querySelector(".forth-humidity")
var fifthCard = document.querySelector(".fifth-card")
var fifthIcon = document.querySelector(".fifth-icon")
var fifthTemp = document.querySelector(".fifth-temp")
var fifthHumidity = document.querySelector(".fifth-humidity")

var cityBtns = document.querySelector(".city-buttons")
var cityBtn = document.querySelector("city-btn")

var cities = []

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInput.value.trim();

    if (city) {
        fetchWeather(city);
        fetchForecast(city);
    } else {
        alert("Please enter a city name")
    }
}

var fetchWeather = function (city) {
    var currentApiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=84c00db9e01356b453b2190ad1be323f"

    fetch(currentApiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
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

var displayWeather = function (data, city) {
    console.log(data)
    var today = moment().format("DD/MM/YYYY");
    var temp = data.main.temp;
    var wind = data.wind.speed;
    var humidity = data.main.humidity;
    todaysEl.setAttribute("class", "current-day")
    cityName.textContent = data.name + " - " + today
    todaysIcon.innerHTML = "<img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>"
    todaysTemp.textContent = "Temp: " + temp;
    todaysWind.textContent = "Wind Speed: " + wind;
    todaysHumidity.textContent = "Humidity: " + humidity;
    uvIndex(data.coord.lat, data.coord.lon);
}

var uvIndex = function (lat, lon) {
    var getUvIndex = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=84c00db9e01356b453b2190ad1be323f";

    fetch(getUvIndex)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    todaysUV.textContent = "UV Index = " + data.value
                })
                    .catch(function (error) {
                        console.log('No UV Data');
                    });
            }
        })
}

var fetchForecast = function (city) {
    var forecastApiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=84c00db9e01356b453b2190ad1be323f"

    fetch(forecastApiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
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

var displayForecast = function (data) {
    console.log(data)
    var firstDay = moment().add(1, 'd').format("DD/MM/YYYY");
    var secondDay = moment().add(2, 'd').format("DD/MM/YYYY");
    var thirdDay = moment().add(3, 'd').format("DD/MM/YYYY");
    var forthDay = moment().add(4, 'd').format("DD/MM/YYYY");
    var fifthDay = moment().add(5, 'd').format("DD/MM/YYYY");
    forecastHeader.textContent = "5-Day Forecast:"
    dayOne.setAttribute("class", "individual-forecast")
    dayTwo.setAttribute("class", "individual-forecast")
    dayThree.setAttribute("class", "individual-forecast")
    dayFour.setAttribute("class", "individual-forecast")
    dayFive.setAttribute("class", "individual-forecast")
    if (data.list[6]) {
        firstCard.textContent = firstDay
        firstIcon.innerHTML = "<img src='https://openweathermap.org/img/w/" + data.list[6].weather[0].icon + ".png'>"
        firstTemp.textContent = "Temp: " + data.list[6].main.temp
        firstHumidity.textContent = "Humidity: " + data.list[6].main.humidity
    }

    if (data.list[14]) {
        secondCard.textContent = secondDay
        secondIcon.innerHTML = "<img src='https://openweathermap.org/img/w/" + data.list[14].weather[0].icon + ".png'>"
        secondTemp.textContent = "Temp: " + data.list[14].main.temp
        secondHumidity.textContent = "Humidity: " + data.list[14].main.humidity
    }

    if (data.list[22]) {
        thirdCard.textContent = thirdDay
        thirdIcon.innerHTML = "<img src='https://openweathermap.org/img/w/" + data.list[22].weather[0].icon + ".png'>"
        thirdTemp.textContent = "Temp: " + data.list[22].main.temp
        thirdHumidity.textContent = "Humidity: " + data.list[22].main.humidity
    }

    if (data.list[30]) {
        forthCard.textContent = forthDay
        forthIcon.innerHTML = "<img src='https://openweathermap.org/img/w/" + data.list[30].weather[0].icon + ".png'>"
        forthTemp.textContent = "Temp: " + data.list[30].main.temp
        forthHumidity.textContent = "Humidity: " + data.list[30].main.humidity
    }

    if (data.list[38]) {
        fifthCard.textContent = fifthDay
        fifthIcon.innerHTML = "<img src='https://openweathermap.org/img/w/" + data.list[38].weather[0].icon + ".png'>"
        fifthTemp.textContent = "Temp: " + data.list[38].main.temp
        fifthHumidity.textContent = "Humidity: " + data.list[38].main.humidity
    }

}

submitBtn.addEventListener('click', formSubmitHandler);

function renderCities() {
    cityBtns.innerHTML = "";

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];

        var cityBtn = document.createElement("button")
        cityBtn.textContent = city;
        cityBtn.setAttribute("class", "btn btn-info btn-block city-btn");
        cityBtn.setAttribute("value", city);

        cityBtns.appendChild(cityBtn);
    }
}

function init() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        cities = storedCities;
    }

    renderCities();

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

function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

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