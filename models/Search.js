const axios = require("axios");
const key = require("../config");
const request = require("request");

const weatherData = (address, cb) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&APPID=${key}`;
  request({ url, json: true }, (error, { body }) => {
    console.log(body);
    if (error) {
      cb("Can't fetch data from open weather map api ", undefined);
    } else {
      cb(undefined, {
        temp: body.main.temp - 273,
        desc: body.weather[0].description,
        city: body.name,
        lat: body.coord.lat,
        lon: body.coord.lon,
      });
    }
  });
};

module.exports = weatherData;
