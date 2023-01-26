import "./current-weather.css";

const CurrentWeather = ({ data, time }) => {
  console.log(time.resourceSets[0].resources[0].timeZone.convertedTime.localTime);
  const [currDate, currTime] = time.resourceSets[0].resources[0].timeZone.convertedTime.localTime.split("T")
  return (
    <div className="weathertime">
      <div className="weather">
        <div className="top">
          <div>
            <p className="city">{data.city}</p>
            <p className="weather-description">{data.weather[0].description}</p>
          </div>
          <img
            alt="weather"
            className="weather-icon"
            src={`icons/${data.weather[0].icon}.png`}
          />
        </div>
        <div className="bottom">
          <p className="temperature">{Math.round(data.main.temp)}°C</p>

          <div className="details">
            <div className="parameter-row">
              <span className="parameter-label" id="detail">
                Details
              </span>
            </div>

            <div className="parameter-row">
              <span className="parameter-label">Feels like</span>
              <span className="parameter-value">
                {Math.round(data.main.feels_like)}°C
              </span>
            </div>

            <div className="parameter-row">
              <span className="parameter-label">Wind</span>
              <span className="parameter-value">
                {Math.round(data.wind.speed)} m/s
              </span>
            </div>

            <div className="parameter-row">
              <span className="parameter-label">Humidity</span>
              <span className="parameter-value">
                {Math.round(data.main.humidity)}%
              </span>
            </div>

            <div className="parameter-row">
              <span className="parameter-label">Pressure</span>
              <span className="parameter-value">
                {Math.round(data.main.pressure)} hPa
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="weather">
        <div className="top--time">
          
          <p>Current time & date</p>
          
        </div>
        <div className="bottom--time">
          <p>{currTime}</p>
          <p>{currDate}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
