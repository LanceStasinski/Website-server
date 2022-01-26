import axios from "axios";

//get lat/long of destination
const requestGeoInfo = async (destination: string, key: string) => {
  try {
    const response = await axios.get(
      `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${key}`
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export default requestGeoInfo;
