const apiKey = "YOUR_API_KEY";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  if (!city) return;

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
      alert("Invalid city name");
      return;
    }

    const data = await response.json();

    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
    document.querySelector(".condition").innerText = data.weather[0].description;
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".wind").innerText = data.wind.speed + " km/h";

    const mainCondition = data.weather[0].main.toLowerCase();

    if (mainCondition.includes("clear")) {
      weatherIcon.src = "images/sun.png";
    } else if (mainCondition.includes("cloud")) {
      weatherIcon.src = "images/cloud.png";
    } else if (mainCondition.includes("rain") || mainCondition.includes("drizzle")) {
      weatherIcon.src = "images/rain.png";
    } else if (mainCondition.includes("snow")) {
      weatherIcon.src = "images/snow.png";
    } else {
      weatherIcon.src = "images/cloud.png";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
