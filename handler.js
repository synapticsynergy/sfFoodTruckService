"use-strict";
const axios = require('axios');

function fetchFoodTrucks(event) {
  if (typeof event !== 'object' || Array.isArray(event)){
    const err = new Error('Function fetchFoodTrucks expects an event as an argument');
    console.error(err);
    throw err;
  }
  return new Promise((resolve,reject)=>{
    axios.get('https://data.sfgov.org/resource/6a9r-agq8.json?status=APPROVED')
    .then((truckList)=>{
      const resp = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          message: truckList.data,
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

module.exports = {
  getSFFoodTrucks,
  fetchFoodTrucks,
}
