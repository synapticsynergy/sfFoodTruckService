'use-strict'
const axios = require('axios')
const geolib = require('geolib')
const NodeGeocoder = require('node-geocoder')
const GOOGLE_MAPS_APIKEY = require('./.config.dev.json').dev.GOOGLE_MAPS_APIKEY
const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_MAPS_APIKEY || GOOGLE_MAPS_APIKEY,
  formatter: null
}
const geocoder = NodeGeocoder(options)

async function getSFFoodTrucks(event, context) {
  if (typeof event !== 'object' || Array.isArray(event)) {
    const err = new Error('Function getSFFoodTrucks expects an event as an argument')
    console.error(err)
    throw err
  }
  try {
    return await respondWithFoodTrucks(event)
  } catch (err) {
    console.error(err)
    return notifyUserOfError(err, event)
  }
}

function respondWithFoodTrucks(event) {
  if (typeof event !== 'object' || Array.isArray(event)) {
    const err = new Error('Function respondWithFoodTrucks expects an event as an argument')
    console.error(err)
    throw err
  }
  return new Promise((resolve, reject) => {
    console.log(event.body)
    const eventBody = JSON.parse(event.body)

    getLatLong(eventBody).then((latLong) => {
      return fetchFoodTrucks(latLong.latitude, latLong.longitude, event)
    }).then((resp) => {
      resolve(resp)
    }).catch((err) => {
      console.error(err, ' Failed to respondWithFoodTrucks')
      reject(err)
    })
  })
}

function getLatLong(eventBody) {
  return new Promise((resolve, reject) => {
    const location = eventBody.location
    let latitude
    let longitude

    if (location !== 'Current Location') {
      geocoder.geocode({ address: location })
        .then(data => {
          latitude = data[0].latitude
          longitude = data[0].longitude
          console.log(data, ' Geocode Data Success')
          resolve({
            latitude: latitude,
            longitude: longitude
          })
        })
        .catch(err => {
          console.error(err, ' Failed to getLatLong')
          reject(new Error('Location Not Found'))
        })
    } else {
      resolve({
        latitude: eventBody.latitude,
        longitude: eventBody.longitude
      })
    }
  })
}

function fetchFoodTrucks(latitude, longitude, event) {
  return new Promise((resolve, reject) => {
    axios.get('https://data.sfgov.org/resource/6a9r-agq8.json?status=APPROVED')
      .then((data) => {
        const resp = buildUserResponse(data, latitude, longitude, event)
        console.log('Fetch was successful')
        resolve(resp)
      }).catch((err) => {
        console.error(err, ' Failed to fetch resource')
        reject(err)
      })
  })
}

function buildUserResponse(data, latitude, longitude, event) {
  let location = { latitude: String(latitude), longitude: String(longitude) }
  let truckList = data.data
  let message = filterByLocation(location, truckList)
  const resp = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      message: message,
      input: event
    })
  }
  return resp
}

function filterByLocation(location, truckList) {
  if (typeof location !== 'object' || Array.isArray(location)) {
    const err = new Error('Function filterByLocation expects an object as its first argument')
    console.error(err)
    throw err
  }
  if (!Array.isArray(truckList)) {
    const err = new Error('Function filterByLocation expects an array as its second argument')
    console.error(err)
    throw err
  }
  // //deep clone truckList to avoid mutation
  let truckListCopy = JSON.parse(JSON.stringify(truckList))
  let finalTruckList = truckListCopy.map((truck, index) => {
    if (truck.latitude !== '0' && truck.longitude !== '0') {
      // getdistance from two locations latitude longitude
      const truckLocation = {
        latitude: truck.latitude,
        longitude: truck.longitude
      };
      const distance = getDistance(location, truckLocation)
      if (distance <= 1) {
        return {
          applicant: truck.applicant,
          fooditems: truck.fooditems,
          dayshours: truck.dayshours,
          latitude: truck.latitude,
          longitude: truck.longitude,
          address: truck.address,
          distance: distance
        }
      }
    }
  })
    .filter(data => data)
    .sort((a, b) => {
      return a.distance - b.distance
    }).slice(0, 50)

  return finalTruckList
}

function getDistance(location1, location2) {
  if (
    typeof location1 !== 'object' ||
    Array.isArray(location1) ||
    typeof location2 !== 'object' ||
    Array.isArray(location2)
  ) {
    const err = new Error('Function expects two objects as arguments')
    console.error(err)
    throw err
  }
  // converts the distance to miles and rounds to the nearest hundredths place.
  const distance = geolib.convertUnit('mi', geolib.getDistance(location1, location2), 2)
  return distance
}

function notifyUserOfError(err, event) {
  const resp = {
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      message: err,
      input: event
    })
  }
  return resp
}

module.exports = {
  getSFFoodTrucks,
  respondWithFoodTrucks,
  // fetchFoodTrucks,
  filterByLocation,
  getDistance,
  notifyUserOfError
}
