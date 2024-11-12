console.log("js code is running");

const apiKey = "179b21bd46d06f60e4e11c123052aa1f";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    if (data.cod === 200) {
      // Check if API call was successful
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.trunc(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    } else {
      document.querySelector(".city").innerHTML = "City not found";
      document.querySelector(".temp").innerHTML = "";
      document.querySelector(".humidity").innerHTML = "";
      document.querySelector(".wind").innerHTML = "";
    }

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./weather-app-img/images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "./weather-app-img/images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "./weather-app-img/images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "./weather-app-img/images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

/*
In your code, you're calling checkWeather()
without providing any city argument in the last line (checkWeather();). 
This causes city to be undefined, resulting in an API request with q=undefined, 
which leads to a 400 Bad Request error.
*/
