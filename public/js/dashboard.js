//* local storage

const getStoredLocation = () => {
  return localStorage.getItem("location") || "Boise";
};

const setStoredLocation = (location) => {
  localStorage.setItem("location", location);
};

const getStoredCode = () => {
  return localStorage.getItem("code") || "";
};

const setStoredCode = (code) => {
  localStorage.setItem("code", code);
};

//* weather

const currentTemperature = document.getElementById("currentTemp");
const weatherIcon = document.getElementById("weatherIcon");
const weatherDescription = document.getElementById("weatherDescription");
const windSpeed = document.getElementById("wind");
const windDirection = document.getElementById("windDir");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const userLocation = document.getElementById("location");
const time = document.getElementById("time");
const date = document.getElementById("date");
const searchInput = document.getElementById("searchInput");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getWeatherData = async () => {
  try {
    const city = searchInput.value || getStoredLocation();
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8109965e7254a469d08a746e8b210e1e&units=imperial`;
    const weatherApiData = await fetch(weatherApiUrl);
    const weatherData = await weatherApiData.json();
    setStoredLocation(city);
    updateDom([weatherData]);
  } catch (error) {
    console.log(error);
  }
};

const getDirection = (deg) => {
  switch (true) {
    case deg < 22.5:
      return "N";
    case deg < 67.5:
      return "NE";
    case deg < 112.5:
      return "E";
    case deg < 157.5:
      return "SE";
    case deg < 202.5:
      return "S";
    case deg < 247.5:
      return "SW";
    case deg < 292.5:
      return "W";
    case deg < 337.5:
      return "NW";
  }
};

const updateDom = (data) => {
  const weather = data[0];
  const sys = weather.sys;
  const wind = weather.wind;

  currentTemperature.innerText = weather.main.temp.toFixed(1);
  weatherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  weatherDescription.innerText = weather.weather[0].main;
  windSpeed.innerText = wind.speed.toFixed(1);
  windDirection.innerText = getDirection(wind.deg);

  const sunriseTs = new Date(sys.sunrise * 1000);
  const sunsetTs = new Date(sys.sunset * 1000);

  sunrise.innerText = sunriseTs.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });
  sunset.innerText = sunsetTs.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });

  userLocation.innerText = weather.name;
  time.innerText = new Date(Date.now()).toLocaleString("en-US", { hour: "numeric", minute: "numeric" });
  date.innerText = new Date(Date.now()).toLocaleString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

getWeatherData();

//* zip code zone

const codeInput = document.querySelector("#code");
const zoneButton = document.querySelector("#zone");

const getZone = () => {
  const code = codeInput.value || getStoredCode();

  fetch(`https://phzmapi.org/${code}.json`)
    .then((res) => res.json())
    .then((data) => {
      const zone = data.zone;
      document.querySelector("#zone-display").innerText = zone;
      setStoredCode(code);
    })
    .catch((err) => {
      console.log("error");
    });
};

zoneButton.addEventListener("click", getZone);

//* search

searchInput.value = getStoredLocation();
codeInput.value = getStoredCode();

codeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    getZone();
  }
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    getWeatherData();
  }
});
