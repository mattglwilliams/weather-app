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
    todaysIcon.innerHTML = "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>"
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

submitBtn.addEventListener('click', formSubmitHandler);