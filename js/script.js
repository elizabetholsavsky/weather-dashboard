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
            // current conditions to searched city and date
            let cityName = (data[0].name);
            let cityDate = (dayjs().format("MMMM D, YYYY"));
            
            $(cityNameDateText).text(cityName + "- " + cityDate);

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

    let weatherIcon = data.list[0].weather[0].icon;
    let temperature = data.list[0].main.temp;
    let humidity = data.list[0].main.humidity;
    let windSpeed = data.list[0].wind.speed;
    console.log("icon " + weatherIcon);
    console.log("temp " + temperature);
    console.log("humidity " + humidity);
    console.log("speed " + windSpeed);

    // $(currentWeatherText).text();

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