// OpenWeatherMap credentials
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

//POST data to local server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
    alert("Cannot post to server");
  }
};

function createOldEntry(index, data) {
  const container = document.getElementById("pastEntries");
  let entryBox = document.createElement("div");
  //add unique ID to the entry
  entryBox.classList.add("entryBox");
  entryBox.id = "entryBox" + index;

  //add date, temp, weather, and feelings to card
  let date = document.createElement("h3");
  date.innerHTML = data[index].date;
  entryBox.appendChild(date);
  let temp = document.createElement("h4");
  temp.innerHTML =
    "Temperature: " +
    Math.floor((data[index].temp - 273.15) * (9 / 5) + 32) +
    " °F";
  entryBox.appendChild(temp);
  let weather = document.createElement("h4");
  weather.innerHTML = "Weather: " + data[index].weather;
  entryBox.appendChild(weather);
  let feel = document.createElement("p");
  feel.innerHTML = "Feelings: " + data[index].feelings;
  entryBox.appendChild(feel);

  //append card to container
  container.appendChild(entryBox);
}

//GET data from the local server
const getData = async (url = "") => {
  const req = await fetch(url);
  try {
    const fullData = await req.json();
    console.log(fullData);
    //add the newest information into the 'Your latest entry' section
    for (let i = 0; i < fullData.length; i++) {
      if (i === fullData.length - 1) {
        document.getElementById("entryHolder").style.display = "block";
        document.getElementById("date").innerHTML = fullData[i].date;
        document.getElementById("temp").innerHTML =
          "Temperature: " +
          Math.floor((fullData[i].temp - 273.15) * (9 / 5) + 32) +
          " °F";
        document.getElementById("weather").innerHTML =
          "Weather: " + fullData[i].weather;
        document.getElementById("content").innerHTML =
          "Feelings: " + fullData[i].feelings;
      } else {
        //add old entries to 'Your past entries' section
        document.getElementById("pastTitle").style.display = "block";
        let entry = document.getElementById("entryBox" + i);
        //code that checks if an element exists was found at
        //https://thisinterestsme.com/check-element-exists-javascript/
        if (typeof entry != "undefined" && entry != null) {
          //if entry already exists, remove and replace it. This prevents
          //duplicates of the same entry
          entry.remove();
          createOldEntry(i, fullData);
        } else {
          //create an entry if it does not exist
          createOldEntry(i, fullData);
        }
      }
    }
  } catch (error) {
    console.log("error", error);
    alert("Cannot connect to server");
  }
};

//update the UI when the generate button is clicked
const generate = document.getElementById("generate");
generate.addEventListener("click", updateJournal);

function updateJournal() {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  const date = new Date();
  const dateString = date.toDateString();
  //get weather from web api using input zip code
  getWeather(baseURL, zipCode, apiKey)
    //put data together
    .then(function (data) {
      const req = {
        date: dateString,
        temp: data.main.temp,
        weather: data.weather[0].main,
        feelings: feelings,
      };
      //send information to server
      postData("/add", req)
        //retrieve information from server
        .then(getData("/all"));
    });
}

//GET weather information from openweathermap.org using a zip code
const getWeather = async (webURL, zip, key) => {
  const res = await fetch(webURL + zip + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
    alert("Weather for that zip code is unavailable");
  }
};
