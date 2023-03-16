const API_KEY = "f18313f772d233d04e9c8cd53f36eff9";
var userCity = document.getElementById("input");
var submitBtn = document.getElementById("submit-btn");
var cityNameDateText = document.getElementById("city-name-date");
var currentWeatherText = document.getElementById("current-weather");

// click event to get userCity value

submitBtn.addEventListener('click', submitBtnEvent);

function submitBtnEvent(event) {
    event.preventDefault();

    var userCityVal = userCity.value;

    if (!userCityVal) {
        console.error('Please type a city name.');
        return;
    }

    searchCoordinatesApi(userCityVal);
}

// coordinate API

function searchCoordinatesApi(userCityVal) {
    // console.log(userCityVal)
    var coordinatesUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + userCityVal + "&limit=1&appid=" + API_KEY
    // ex. http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

    fetch(coordinatesUrl)
        .then(response => response.json())

        .then(data => {
            // console.log(data);
    
            // set lat and lon, round to hundredths place
            let lat = data[0].lat.toFixed(2);
            let lon = data[0].lon.toFixed(2);
        // console.log(lat, lon);
        searchWeatherApi(lat,lon);
        })

        // .catch(function (error) {
        //     alert('There has been an error. Please try again.')
        // });
};

// weather API

function searchWeatherApi(lat,lon) {
    // console.log(lat,lon);
    var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY + "&units=imperial"
    // ex. api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

    fetch(weatherUrl)
    .then(response => response.json())

    .then(data => {
        // console.log(data);
        showCurrentConditions(data);
    });
};

function showCurrentConditions(data) {
    console.log(data);
    
    // set city name and date
    let cityName = data.city.name;
    let cityDate = (dayjs().format("MMMM D, YYYY"));
            
    $(cityNameDateText).text(cityName + "- " + cityDate);

    let weatherIcon = data.list[0].weather[0].icon;
    let weatherIconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    let temperature = data.list[0].main.temp;
    let humidity = data.list[0].main.humidity;
    let windSpeed = data.list[0].wind.speed;
 
    var currentWeatherIcon = '<img src="' + weatherIconUrl +'">'
    var currentTemperature = '<p>Temperature: ' + temperature + ' ℉</p>';
    var currentHumidity = '<p>Humidity: ' + humidity + '%</p>';
    var currentWindSpeed = '<p>Wind Speed: ' + windSpeed + ' mph</p>';
    var currentWeatherReport = currentWeatherIcon + currentTemperature + currentHumidity + currentWindSpeed;

    currentWeatherText.innerHTML = currentWeatherReport;

    //display five day forecast

    function displayFiveDayForecast() {
        for (var i = 0; i < data.list.length; i += 8) {
            let iDate = data.list[i].dt_txt.substring(0, 10);
            let iWeatherIcon = data.list[i].weather[0].icon;
            let iWeatherIconUrl = "https://openweathermap.org/img/wn/" + iWeatherIcon + "@2x.png";
            let iTemperature = data.list[i].main.temp;
            let iHumidity = data.list[i].main.humidity;
            let iWindSpeed = data.list[i].wind.speed;
            
            var futureDate = iDate;
            var futureWeatherIcon = '<img src="' + iWeatherIconUrl +'">';
            var futureTemperature = '<p>Temperature: ' + iTemperature + ' ℉</p>';
            var futureHumidity = '<p>Humidity: ' + iHumidity + '%</p>';
            var futureWindSpeed = '<p>Wind Speed: ' + iWindSpeed + ' mph</p>';
            var fiveDayForecast = futureDate + futureWeatherIcon + futureTemperature + futureHumidity + futureWindSpeed;
            console.log(fiveDayForecast);
        }
    };

    displayFiveDayForecast();

    // save to local storage

    function saveCitySearch() {
    localStorage.setItem(cityName, currentWeatherReport);
    var storedCities = localStorage.getItem(cityName)
    // console.log(storedCities);
    }
}




// *********************************************************************************************************************

// grab elements by id and create variables

// get location (user text input); need event listener and click function

// create API call (Coordinates API) with queries (user input/location var and key)

// REVISIT what happens if user submits blank field or spelling error

// fetch data

// get coordinates for location from data 

// coordinate vars (lat & long)

// weather API call (Open Weather) with queries (concat url with var; lat, long, api key)

//fetch data

// get only required items from data (city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed)

// display in html containers

// save to local storage, accessible though appended button under search bar



// OPEN WEATHER API DOC NOTES 
// https://openweathermap.org/

// ****Weather API call****
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// ex. api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}

// ****Coordinates API call****
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// ex. http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}