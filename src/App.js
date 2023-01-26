import "./App.css";
import CurrentWeather from "./components/current-weather/current-weather";
import Search from "./components/search/search";
import { WEATHER_API_URL, WEATHER_API_KEY, BING_MAPS_API_KEY } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeater] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [time, setTime] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const point = searchData.value.split(" ").join(",");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const timeFetch = fetch(
      `https://dev.virtualearth.net/REST/v1/TimeZone/${point}?key=${BING_MAPS_API_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastFetch, timeFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        const timeResponse = await response[2].json();

        setCurrentWeater({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        setTime({ city: searchData.label, ...timeResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} time={time}/>}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
