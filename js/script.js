var userCity = document.getElementById("input");
var submitBtn = document.getElementById("submit-btn");
var apiKey = "18313f772d233d04e9c8cd53f36eff9";

// function searchCoordinatesApi {

// }

function submitBtnEvent(event) {
    event.preventDefault();

    var userCityVal = document.getElementById("input").value;

    if (!userCityVal) {
        console.error('Please type a city name.');
        return;
    }

    searchCoordinatesApi(userCity);
}

submitBtn.addEventListener('click', submitBtnEvent)

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

// /*