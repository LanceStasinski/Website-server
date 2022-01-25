import axios from "axios";

const requestCountryInfo = async (countryCode: string) => {
  try {
    const imageInfo = await axios.get(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );
    return imageInfo;
  } catch (error) {
    console.log("error", error);
  }
};

export default requestCountryInfo;
