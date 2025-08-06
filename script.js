let searchCity = document.getElementById("searchCity");
let degreeCelcius = document.getElementById("degreeCelcius");
let locationCity = document.getElementById("location");
let day = document.getElementById("day");
let aboutWeather = document.getElementById("aboutWeather");
let minTemp = document.getElementById("minTemp");
let maxTemp = document.getElementById("maxTemp");
let percentageHumi = document.getElementById("percentage");
let kmph = document.getElementById("kmph");

searchCity.addEventListener("change", (e) => {
  const city = e.target.value.trim();
  if (city) fetchWeather(city);
});

async function fetchWeather(city) {
  let url = `http://api.weatherapi.com/v1/forecast.json?key=f07153dd50a34faba2453414250608&q=${city}&days=7`;
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
  locationCity.textContent = data.location.name;
  aboutWeather.innerHTML = `<i class="ri-cloud-line"></i> ${data.current.condition.text}`;
  percentageHumi.textContent = `${data.current.humidity}%`;
  kmph.textContent = `${data.current.wind_kph}km/h`;
  // let dateObj = new Date().getDay({weekday:"long"});
  // day.innerText = dateObj;
  let dateObj = new Date(data.location.localtime);
  let options = { weekday: "long" };
  day.textContent = dateObj.toLocaleDateString("en-US", options);
}

