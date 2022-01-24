import fetch from "node-fetch";

const getWeatherRoute = async (
  lat: string | number,
  lng: string | number,
  key: string,
  forecastType: string
) => {
  const response = await fetch(
    `https://api.weatherbit.io/v2.0/${forecastType}?lat=${lat}&lon=${lng}&units=I&key=${key}`
  );
  try {
    const weather = await response.json();
    return weather;
  } catch (error) {
    console.log("error", error);
  }
};

export const requestWeatherCurrent = async (
  lat: string | number,
  lng: string | number,
  key: string
) => {
  const forecastType = "current";
  let day;
  try {
    const currentForcast: any = await getWeatherRoute(
      lat,
      lng,
      key,
      forecastType
    );
    const { datetime, temp, weather } = currentForcast.data[0];
    day = {
      date: datetime,
      temp,
      sky: weather.description,
      icon: weather.icon,
    };
  } catch (error) {
    console.log(error);
  }
  return day;
};

export const requestWeatherForecast = async (
  lat: string | number,
  lng: string | number,
  key: string
) => {
  let tripWeather = [];
  const forecastType = "forecast/daily";
  try {
    const weather: any = await getWeatherRoute(lat, lng, key, forecastType);
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
  } catch (error) {
    console.log(error);
  }

  return tripWeather;
};
