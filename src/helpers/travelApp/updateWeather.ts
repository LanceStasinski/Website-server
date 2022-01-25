import axios from "axios";

const updateWeatherRoute = async (
  lat: string | number,
  lng: string | number,
  key: string,
  forecastType: string
) => {
  try {
    const weather = await axios.get(
      `https://api.weatherbit.io/v2.0/${forecastType}?lat=${lat}&lon=${lng}&units=I&key=${key}`
    );
    return weather;
  } catch (error) {
    console.log("error", error);
  }
};

export const updateWeatherCurrent = async (
  lat: string | number,
  lng: string | number,
  key: string
) => {
  const forecastType = "current";
  try {
    const currentForecast: any = await updateWeatherRoute(
      lat,
      lng,
      key,
      forecastType
    );
    const { datetime, temp, weather } = currentForecast.data[0];
    let day = {
      date: datetime,
      temp,
      sky: weather.description,
      icon: weather.icon,
    };
    return day;
  } catch (error) {
    console.log(error);
  }
};

export const updateWeatherForecast = async (
  lat: string | number,
  lng: string | number,
  key: string
) => {
  const tripWeather = [];
  const forecastType = "forecast/daily";
  try {
    const weather: any = await updateWeatherRoute(lat, lng, key, forecastType);
    const weatherData = weather.data;
    for (const data of weatherData) {
      const day = {
        date: data.datetime,
        temp: data.temp,
        sky: data.weather.description,
        icon: data.weather.icon,
      };
      tripWeather.push(day);
    }
    return tripWeather;
  } catch (error) {
    console.log(error);
  }
};
