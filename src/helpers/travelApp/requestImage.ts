import fetch from "node-fetch";

const getImageRoute = async (key: string, locationParameters: string) => {
  const response = await fetch(
    `https://pixabay.com/api/?key=${key}&q=${locationParameters}&image_type=photo&orientation=horizontal&category=places&safesearch=true`
  );
  try {
    const imageInfo = await response.json();
    return imageInfo;
  } catch (error) {
    console.log("error", error);
  }
};

const getImageNotUSA = async (name: string, countryName: string, key: string) => {
  let image;
  let imageData = [];
  let locationParameters = `${name}+${countryName}`;
  try {
    const city: any = await getImageRoute(key, locationParameters);
    if (!city || city.total == 0) {
      locationParameters = `${countryName}`;
      const country: any = await getImageRoute(key, locationParameters);
      if (!country || country.total == 0) {
        const map = await getImageRoute(key, "map");
        image = map;
      } else {
        image = country;
      }
    } else {
      image = city;
    }
  } catch (error) {
    console.log(error);
  }

  imageData.push(image.hits[0].tags);
  imageData.push(image.hits[0].webformatURL);
  return imageData;
};

const getImageUSA = async (
  name: string,
  adminName1: string,
  countryName: string,
  key: string
) => {
  let locationParameters = `${name}+${adminName1}`;
  let image;
  let imageData = [];
  try {
    const city: any = await getImageRoute(key, locationParameters);
    if (city.total == 0) {
      locationParameters = `${adminName1}`;
      const state: any = await getImageRoute(key, locationParameters);
      if (state.total == 0 && city.total == 0) {
        locationParameters = `${countryName}`;
        const country: any = await getImageRoute(key, locationParameters);
        image = country;
      } else {
        image = state;
      }
    } else {
      image = city;
    }
  } catch (error) {
    console.log(error);
  }
  imageData.push(image.hits[0].tags);
  imageData.push(image.hits[0].webformatURL);
  return imageData;
};

const requestImage = async (
  countryCode: string,
  name: string,
  countryName: string,
  adminName1: string,
  key: string
) => {
  let imageArray = [];
  try {
    if (countryCode == "US") {
      imageArray = await getImageUSA(name, adminName1, countryName, key);
    } else {
      imageArray = await getImageNotUSA(name, countryName, key);
    }
  } catch (error) {
    console.log(error);
  }

  return imageArray;
};

export default requestImage;
