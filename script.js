let searchCity = document.getElementById("searchCity");
let weatherImg = document.getElementById("mainImg");
let degreeCelcius = document.getElementById("degreeCelcius");
let locationCity = document.getElementById("location");
let day = document.getElementById("day");
let aboutWeather = document.getElementById("aboutWeather");
let minTemp = document.getElementById("minTemp");
let maxTemp = document.getElementById("maxTemp");
let percentageHumi = document.getElementById("percentage");
let kmph = document.getElementById("kmph");
let airQuality = document.getElementById("airQuality");
let uvIndex = document.getElementById("uvIndex");
let uvIndexText = document.getElementById("uvIndexText");
let pressure = document.getElementById("pressure");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");
let mainDaysCard = document.getElementById("mainDaysCard");
let airQualityText = document.getElementById("airQualityText");
let pressureText = document.getElementById("pressureText");

async function fetchWeather(city) {
  let url = `http://api.weatherapi.com/v1/forecast.json?key=f07153dd50a34faba2453414250608&q=${city}&days=7&aqi=yes`;
  try {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    callWeather(data);
    // UVIndex(uvValue);
    // updateForecast(data);
  } catch (error) {
    console.error(error);
    alert("Not Found");
  }
}

searchCity.addEventListener("change", (e) => {
  const city = e.target.value.trim();
  if (city) fetchWeather(city);
});

function callWeather(data) {
  degreeCelcius.textContent = `${data.current.temp_c}°C`;
  // weatherImg.src = data.current.condition.icon;
  imageGenerator(data.current.condition.text); // custom images calling function
  locationCity.textContent = data.location.name;
  aboutWeather.innerHTML = `<i class="ri-cloud-line"></i> ${data.current.condition.text}`;
  percentageHumi.textContent = `${data.current.humidity}%`;
  kmph.textContent = `${data.current.wind_kph}km/h`;
  let dateObj = new Date();
  let options = { weekday: "long" };
  day.textContent = dateObj.toLocaleDateString("en-US", options);
  minTemp.innerHTML = `<i class="ri-temp-cold-line"></i> Min Temperature -${data.forecast.forecastday[0].day.maxtemp_c}°C`;
  maxTemp.innerHTML = `<i class="ri-temp-cold-line"></i>   Max Temperature -${data.forecast.forecastday[0].day.mintemp_c}°C`;
  const airQualityData = data.current.air_quality?.["us-epa-index"] ?? null;
  airQuality.textContent = airQualityData;
  updateAirQuality(airQualityData);
  // console.log(airQuality);

  uvIndex.textContent = data.forecast.forecastday[0].day.uv;
  const uvValue = data.forecast.forecastday[0].day.uv;
  updateUVIndex(uvValue);
  // console.log(uvValue);

  const pressureData = data.current.pressure_in;
  pressure.textContent = pressureData;
  updateAirPressure(pressureData);

  sunrise.textContent = data.forecast.forecastday[0].astro.sunrise;
  sunset.textContent = data.forecast.forecastday[0].astro.sunset;
  WeeklyForecast(data.forecast.forecastday);
  updateForecast(data);
  // UVIndex();
}

// function to update ui weather images

function imageGenerator(weather) {
  switch (weather) {
    case "Cloudy":
      weatherImg.src = "Assets/cloudyimg.svg";
      break;
    case "Partly Cloudy":
      weatherImg.src = "Assets/partlycloudyimg.svg";
      break;
    case "Sunny":
      weatherImg.src = "Assets/cleardayimg.svg";
      break;
    case "Mist":
      weatherImg.src = "Assets/lightrainimg.svg";
      break;
    case "Overcast":
      weatherImg.src = "Assets/heavyrain.svg";
      break;
    case "Patchy rain nearby":
      weatherImg.src = "Assets/lightrainimg.svg";
      break;
    case "Moderate or heavy rain with thunder":
      weatherImg.src = "Assets/windyimg.svg";
      break;
    default:
      weatherImg.src = "Assets/cloudyimg.svg";
  }
}

//Function to show weekly forecast details
function WeeklyForecast(forecastData) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  forecastData.forEach((day, index) => {
    const date = new Date(day.date);
    const dayName = days[date.getDay()];
    const iconUrl = day.day.condition.icon;
    const temp = day.day.maxtemp_c;

    const weekdays = document.querySelector(`#day-${index} .day`);
    const weekimage = document.querySelector(`#day-${index} .wimg`);
    const weektemp = document.querySelector(`#day-${index} .wtemp`);

    if (weekdays) weekdays.textContent = dayName;
    if (weekimage) weekimage.src = `${iconUrl}`;
    if (weektemp) weektemp.innerHTML = `${temp}°`;
  });
}

// function for forecast custom  images

function updateForecast(data) {
  mainDaysCard.innerHTML = "";

  data.forecast.forecastday.forEach((day) => {
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const temp = `${day.day.avgtemp_c}°C`;

    let iconSrc = "Assets/cloudyimg.svg";

    const foreCastImg = day.day.condition.text;

    switch (true) {
      case foreCastImg.includes("Cloudy"):
        iconSrc = "Assets/cloudyimg.svg";
        break;
      case foreCastImg.includes("rain"):
        iconSrc = "Assets/heavyrain.svg";
        break;
      case foreCastImg.includes("Sunny"):
        iconSrc = "Assets/cleardayimg.svg";
        break;
      case foreCastImg.includes("clear"):
        iconSrc = "Assets/cloudyimg.svg";
        break;
      case foreCastImg.includes("Mist"):
        iconSrc = "Assets/lightrainimg.svg";
        break;
      case foreCastImg.includes("Torrential rain shower"):
        iconSrc = "Assets/lightrainimg.svg";
        break;
      case foreCastImg.includes("Overcast"):
        iconSrc = "Assets/windyimg.svg";
        break;
      default:
        iconSrc = "Assets/cloudyimg.svg";
        break;
    }

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h4>${dayName}</h4>
      <img src="${iconSrc}" alt="${day.day.condition.text}" />
      <p>${temp}</p>
    `;

    mainDaysCard.appendChild(card);
  });
}

// function for UV index!

function updateUVIndex(uvValue) {
  let status = "";
  let color = "";

  switch (true) {
    case uvValue <= 2:
      status = "Good";
      color = "Green";
      break;
    case uvValue <= 3:
      status = "Moderate";
      color = "Yellow";
      break;
    case uvValue <= 4:
      status = "High";
      color = "Red";
      break;
    default:
      status = "Unknown";
      color = "gray";
  }
  uvIndexText.textContent = status;
  uvIndexText.style.color = color;
}

function updateAirQuality(airQualityData) {
  let status = "";
  let color = "";

  switch (true) {
    case airQualityData <= 2:
      status = "Good";
      color = "Green";
      break;
    case airQualityData <= 4:
      status = "Moderate";
      color = "Yellow";
      break;
    case airQualityData <= 6:
      status = "High";
      color = "Red";
      break;
    default:
      status = "Unknown";
      color = "gray";
  }
  airQualityText.textContent = status;
  airQualityText.style.color = color;
}
function updateAirPressure(pressureData) {
  let status = "";
  let color = "";

  switch (true) {
    case pressureData <= 20:
      status = "Good";
      color = "Green";
      break;
    case pressureData <= 30:
      status = "Moderate";
      color = "Yellow";
      break;
    case pressureData <= 40:
      status = "High";
      color = "Red";
      break;
    default:
      status = "Unknown";
      color = "gray";
  }
  pressureText.textContent = status;
  pressureText.style.color = color;
}
  