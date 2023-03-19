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
        alert('There has been an error. Please try again.')
    });
};

// weather API
function searchWeatherApi(lat,lon) {
    var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY + "&units=imperial"

    fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    });
};

function displayWeather(data) {

    let cityName = data.city.name;

    function displayCityAndDate() {
        let cityDate = (dayjs().format("MMMM D, YYYY"));
        var cityNameDateText = document.getElementById("city-name-date");
        cityNameDateText.innerHTML = cityName + "- " + cityDate;
    };
    
    function displayCurrentWeather() {
        let temperature = data.list[0].main.temp;
        let humidity = data.list[0].main.humidity;
        let windSpeed = data.list[0].wind.speed;
    
        currentText = `
        <div>
        <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">
        <p> Temp:&nbsp${temperature}&#176F</p>
        <p> Humidity:&nbsp${humidity}%</p>
        <p> Wind:&nbsp${windSpeed}mph</p>
        </div>
        `;  
        document.getElementById("current-weather").innerHTML = currentText;
    };

    function displayFiveDayForecast() {
        // document.getElementById("five-day-forecast").innerHTML = "";

        for (var i = 0; i < data.list.length; i += 8) {
            let iDate = data.list[i].dt_txt;
            let iTemperature = data.list[i].main.temp;
            let iHumidity = data.list[i].main.humidity;
            let iWindSpeed = data.list[i].wind.speed;

            fiveDayText = `
                <div class="five-day-text">
                <p>${iDate}</p>
                <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">
                <p> Temp:&nbsp${iTemperature}&#176F</p>
                <p> Humidity:&nbsp${iHumidity}%</p>
                <p> Wind:&nbsp${iWindSpeed}mph</p>
                </div>
                `;
                document.getElementById("five-day-forecast").innerHTML += fiveDayText;
        }
        currentWeatherReport = currentText + fiveDayText
    };

    displayCityAndDate();
    displayCurrentWeather();
    displayFiveDayForecast();

    // save to local storage

    function saveCitySearches() {
    localStorage.setItem(cityName, currentWeatherReport);
    
    let searchedCitiesData = localStorage.getItem(cityName);
    }

    saveCitySearches();
}

// *********************************************************************************************************************

// save to local storage, accessible though appended button under search bar
