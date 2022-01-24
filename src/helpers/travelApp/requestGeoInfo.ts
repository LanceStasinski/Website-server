import fetch from "node-fetch";

//get lat/long of destination
const requestGeoInfo = async (destination: string, key: string) => {
  const response = await fetch(
    `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${key}`
  );
  try {
    const location = await response.json();
    return location;
  } catch (error) {
    console.log("error", error);
  }
};

export default requestGeoInfo;