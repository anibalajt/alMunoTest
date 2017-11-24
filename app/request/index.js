'use strict'

const axios              = require('axios');

function apiLocation(location,cb) {
  // axios.get(`http:192.168.1.53:3002/api/getLocation?location=${location}`)
  axios.get(`http:192.168.5.18:3002/api/getLocation?location=${location}`)
  .then(function (response) {
    cb(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}
function apiHotels(data,cb){
  axios.get(`http:192.168.5.18:3002/api/getHotels?date=${data.date}&rooms=2&type=CITY&city=${data.city}&offset=${data.offset}&limit=20`)
  .then(function (response) {
    cb(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}
function apiHotel(data,cb){
  axios.get(`http:192.168.5.18:3002/api/getHotel?date=${data.date}&rooms=2&type=CITY&city=${data.city}`)
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
