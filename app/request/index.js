'use strict'

const axios              = require('axios');
const Config              = require('../config');

function apiLocation(location,cb) {
  axios.get(`${Config.apiHeroku}api/getLocation?location=${location}`)
  .then(function (response) {
    cb(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}
function apiHotels(data,cb){
  axios.get(`${Config.apiHeroku}api/getHotels?date=${data.date}&rooms=2&type=CITY&city=${data.city}&offset=${data.offset}&limit=20`)
  .then(function (response) {
    cb(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}
function apiHotel(data,cb){
  axios.get(`${Config.apiHeroku}api/getHotel?date=${data.date}&rooms=2&type=CITY&city=${data.city}`)
  .then(function (response) {
    cb(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

module.exports = {
  apiLocation,
  apiHotels,
  apiHotel
};
