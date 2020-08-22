const express = require("express");
const path = require("path");
const morgan = require("morgan");
const hbs = require("hbs");
const axios = require("axios");
const weatherData = require("./models/Search");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/map", (req, res) => {
  res.render("map", {
    title: "Weather App | Map",
  });
});

////

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    res.send("Input a location!!!");
  }

  weatherData(address, (error, { temp, desc, city, lat, lon } = {}) => {
    if (error) {
      res.send(error);
    }
    res.send({
      temp,
      desc,
      city,
      lat,
      lon,
    });
  });
});

app.all("*", (req, res, next) => {
  res.send(`Can't find ${req.originalUrl} on this server!`);
});

module.exports = app;
