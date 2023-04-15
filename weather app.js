const apikey = "863242cfb2b1d357e6093d9a4df19a4b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const defaultCity = "New York"; // Define a default city name
const weathericon = document.querySelector(".weather-icon");

const searchinput = document.querySelector(".search input");
const searchbutton = document.querySelector(".search button");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);
    if (!response.ok) {
      throw new Error('Error fetching weather data');
    }
    const data = await response.json();
    // console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weathericon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weathericon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weathericon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weathericon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weathericon.src = "images/mist.png";
    }
  } catch (error) {
    console.error(error);
  }
}

checkWeather(defaultCity); // Use the default city in the initial call

searchbutton.addEventListener("click", () => {
  checkWeather(searchinput.value);
});
