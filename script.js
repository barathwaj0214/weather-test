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
let pressure = document.getElementById("pressure");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");

searchCity.addEventListener("change", (e) => {
  const city = e.target.value.trim();
  if (city) fetchWeather(city);
});

async function fetchWeather(city) {
  let url = `http://api.weatherapi.com/v1/forecast.json?key=f07153dd50a34faba2453414250608&q=${city}&aqi=yes`;
  try {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    callWeather(data);
  } catch (error) {
    console.error(error);
    alert("Not Found");
  }
}

function callWeather(data) {
  degreeCelcius.textContent = `${data.current.temp_c}°C`;
  weatherImg.src = data.current.condition.icon;
  // imageGenerator(data.current.condition.text);
  locationCity.textContent = data.location.name;
  aboutWeather.innerHTML = `<i class="ri-cloud-line"></i> ${data.current.condition.text}`;
  percentageHumi.textContent = `${data.current.humidity}%`;
  kmph.textContent = `${data.current.wind_kph}km/h`;
  // let dateObj = new Date().getDay({weekday:"long"});
  // console.log(dateObj);
  let dateObj = new Date();
  let options = { weekday: "long" };
  day.textContent = dateObj.toLocaleDateString("en-US", options);
  minTemp.innerHTML = `<i class="ri-temp-cold-line"></i> Min Temperature -${data.forecast.forecastday[0].day.maxtemp_c}°C`;
  maxTemp.innerHTML = `<i class="ri-temp-cold-line"></i>   Max Temperature -${data.forecast.forecastday[0].day.mintemp_c}°C`;
  airQuality.textContent = data.current.air_quality.co;
  uvIndex.textContent = data.forecast.forecastday[0].day.uv;
  // pressure.textContent = data.current.pressure_mb;
  sunrise.textContent = data.forecast.forecastday[0].astro.sunrise;
  sunset.textContent = data.forecast.forecastday[0].astro.sunset;
}

// function imageGenerator(weather) {
//   switch (weather) {
//     case "Cloudy":
//       weatherImg.src = "Assets/cloudyimg.svg";
//       break;
//     case "Partly Cloudy":
//       weatherImg.src = "Assets/partlycloudyimg.svg";
//       break;
//     case "Sunny":
//       weatherImg.src = "Assets/cleardayimg.svg";
//       break;
//     case "Mist":
//       weatherImg.src = "Assets/lightrainimg.svg";
//       break;
//     case "Overcast":
//       weatherImg.src = "Assets/heavyrain.svg";
//       break;
//   }
// }
