'use strict'

const axios              = require('axios');
const Config              = require('../config');
const url = Config.apiHeroku;
// const url = Config.apiLocal;

function apiLocation(location,cb) {// para obtener el lugar donde vamos a buscar hoteles
  axios.get(`${url}api/getLocation?location=${location}`)
  .then(function (response) {
    cb(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}
function apiHotels(data,cb){//para obtener los hoteles de un lugar
  axios.get(`${url}api/getHotels?date=${data.date}&rooms=2&type=CITY&city=${data.city}&offset=${data.offset}&limit=20`)
  .then(function (response) {
    cb(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}
function apiHotel(data,cb){// para obtener la descripcion de un hotel
  axios.get(`${url}api/getHotel?date=${data.date}&rooms=2&type=CITY&city=${data.city}`)
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
