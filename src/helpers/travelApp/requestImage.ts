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

const getImageNotUSA = async (coords: any, key: string) => {
  let image;
  let imageData = [];
  let locationParameters = `${coords.geonames[0].name}+${coords.geonames[0].countryName}`;
  try {
    const city: any = await getImageRoute(key, locationParameters);
    if (!city || city.total == 0) {
      locationParameters = `${coords.geonames[0].countryName}`;
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

const getImageUSA = async (coords: any, key: string) => {
  let locationParameters = `${coords.geonames[0].name}+${coords.geonames[0].adminName1}`;
  let image;
  let imageData = [];
  try {
    const city: any = await getImageRoute(key, locationParameters);
    if (city.total == 0) {
      locationParameters = `${coords.geonames[0].adminName1}`;
      const state: any = await getImageRoute(key, locationParameters);
      if (state.total == 0 && city.total == 0) {
        locationParameters = `${coords.geonames[0].countryName}`;
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

const requestImage = async (coords: any, key: string) => {
  let imageArray = [];
  try {
    if (coords.geonames[0].countryCode == "US") {
      imageArray = await getImageUSA(coords, key);
    } else {
      imageArray = await getImageNotUSA(coords, key);
    }
  } catch (error) {
    console.log(error);
  }

  return imageArray;
};

export default requestImage;