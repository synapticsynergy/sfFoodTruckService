"use-strict";
const axios = require('axios');

function fetchFoodTrucks(event) {
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
      console.log(truckList,' Fetch was successful');
      resolve(resp);
    }).catch((err)=>{
      console.error(err, ' Failed to fetch resource');
      reject(err);
    });
  });
}

module.exports.getSFFoodTrucks = async (event, context) => {
  try {
    return await fetchFoodTrucks(event);
    console.log(resp, ' resp finished in getSFFoodTrucks');
    } catch(err) {
      console.error(err);
    };
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
