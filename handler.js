"use-strict";
const axios = require('axios');

async function getSFFoodTrucks(event, context) {
  if (typeof event !== 'object' || Array.isArray(event)) {
    const err = new Error('Function getSFFoodTrucks expects an event as an argument');
    console.error(err);
    throw err;
  }
  try {
    return await fetchFoodTrucks(event);
  } catch (err) {
    console.error(err);
  };
}

function fetchFoodTrucks(event) {
  if (typeof event !== 'object' || Array.isArray(event)){
    const err = new Error('Function fetchFoodTrucks expects an event as an argument');
    console.error(err);
    throw err;
  }
  return new Promise((resolve,reject)=>{
    axios.get('https://data.sfgov.org/resource/6a9r-agq8.json?status=APPROVED')
    .then((data)=>{
      let location = {lat: "37.7901855706334", lng: "-122.395471725809"}
      let truckList = data.data;
      filterByLocation(location, truckList);
      const resp = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          message: truckList,
          input: event,
        })
      }
      console.log('Fetch was successful');
      resolve(resp);
    }).catch((err)=>{
      console.error(err, ' Failed to fetch resource');
      reject(err);
    });
  });
}

function filterByLocation(location, truckList){
  if (typeof location !== 'object' || Array.isArray(location)){
    const err = new Error('Function filterByLocation expects an object as its first argument');
    console.error(err);
    throw err;
  }
  if (!Array.isArray(truckList)){
    const err = new Error('Function filterByLocation expects an array as its second argument');
    console.error(err);
    throw err;
  }
  // //deep clone truckList to avoid mutation
  let truckListCopy = JSON.parse(JSON.stringify(truckList));
  let result = truckListCopy.map((truck, index)=>{
    if(index === 0) {
      // console.log(truck,' what is truck data here?');
    }
    if (truck.latitude !== '0' && truck.longitude !== '0') {
      //getdistance from two locations lat lng
      let truckLocation = {
        lat: truck.latitude, 
        lng: truck.longitude
      };
      let distance = getDistance(location, truckLocation);
      return {
        applicant: truck.applicant,
        fooditems: truck.fooditems,
        dayshours: truck.dayshours,
        lat: truck.latitude,
        lng: truck.longitude, 
        address: truck.address,
        distance: distance,
      }
    }
  });
  console.log(result);
  return result;
}

function getDistance() {
  return 1;
}

module.exports = {
  getSFFoodTrucks,
  fetchFoodTrucks,
  filterByLocation,
}
