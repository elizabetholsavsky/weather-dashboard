const API_KEY = "f18313f772d233d04e9c8cd53f36eff9";

// click event to get userCity value
var submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener('click', submitBtnEvent);
var userCity = document.getElementById("input");

function submitBtnEvent(event) {
    event.preventDefault();   
    var userCityVal = userCity.value;

    if (!userCityVal) {
        alert('Please type a city name.');
        return;
    }
    searchCoordinatesApi(userCityVal);
}

// coordinate API 
function searchCoordinatesApi(userCityVal) {
    var coordinatesUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + userCityVal + "&limit=1&appid=" + API_KEY

    fetch(coordinatesUrl)
    .then(response => response.json())
    .then(data => {
        let lat = data[0].lat.toFixed(2);
        let lon = data[0].lon.toFixed(2);
        searchWeatherApi(lat,lon);
    })
    .catch(function (error) {
        alert('There has been an error. Please try again.');
        console.log(error);
    });
};

// weather API
function searchWeatherApi(lat,lon) {
    var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY + "&units=imperial"

    fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);})
    .catch(function (error) {
        alert('There has been an error. Please try again.');
        console.log(error);
        });
};

function displayWeather(data) {
    let cityName = data.city.name;

    function displayCity() {
        var cityNameText = document.getElementById("city-name");
        cityNameText.innerHTML = cityName;
    };
    
    function displayForecast() {
        for (var i = 0; i < data.list.length; i += 7) {
            let date = new Date (data.list[i].dt*1000);
            let temperature = data.list[i].main.temp;
            let humidity = data.list[i].main.humidity;
            let windSpeed = data.list[i].wind.speed;
            
            if (i === 0) {
                currentText = `
                    <div>
                    <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="weather icon">
                    <p>${date.toDateString()}</p>
                    <p> Temp:&nbsp${temperature}&#176F</p>
                    <p> Humidity:&nbsp${humidity}%</p>
                    <p> Wind:&nbsp${windSpeed}mph</p>
                    </div>
                    `;  
                    document.getElementById("current-weather").innerHTML = currentText;
                } else {
                fiveDayText = `
                    <div class="five-day-text">
                    <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="weather icon">
                    <p>${date.toDateString()}</p>
                    <p> Temp:&nbsp${temperature}&#176F</p>
                    <p> Humidity:&nbsp${humidity}%</p>
                    <p> Wind:&nbsp${windSpeed}mph</p>
                    </div>
                    `;
                    document.getElementById("five-day-forecast").innerHTML += fiveDayText;  
            }
        }
        currentWeatherReport = currentText + fiveDayText
    };

    // save to local storage
    function saveSearches() {
    localStorage.setItem(cityName, currentWeatherReport);
 
    }

    displayCity();
    displayForecast();
    saveSearches();
};
