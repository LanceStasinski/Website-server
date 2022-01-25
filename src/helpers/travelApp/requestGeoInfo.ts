import axios from "axios";

//get lat/long of destination
const requestGeoInfo = async (destination: string, key: string) => {
  try {
    const location = await axios.get(
      `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${key}`
    );
    return location;
  } catch (error) {
    console.log("error", error);
  }
};

export default requestGeoInfo;
