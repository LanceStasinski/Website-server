import fetch from "node-fetch";

const requestCountryInfo = async (countryCode: string) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${countryCode}`
  );
  try {
    const imageInfo = await response.json();
    return imageInfo;
  } catch (error) {
    console.log("error", error);
  }
};

export default requestCountryInfo;
