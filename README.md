# sfFoodTruckService
Lambda function to get food truck data from a San Francisco database.

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Serving in Development](#serving-in-development)
    1. [Testing](#testing)
    1. [Style Guide](#style-guide)
1. [Given More Time](#given-more-time)
1. [Roadmap](#roadmap)
1. [Notes On Data Filtering](#notes-on-data-filtering)

## Usage

>The purpose of this service is to filter approved food truck permits in SF. 

## Requirements

- Node 8.10
- serverless 1.38.0 or higher: [serverless docs](#https://serverless.com)

## Development

### Installing Dependencies

From within the root directory:

```
yarn
```

## Create a .config.dev.json for API keys

```
touch .config.dev.json
```

Then add something like the following:

```
{
  "dev": {
    "GOOGLE_MAPS_APIKEY": "Replace this with your api key"
  },
  "prod" : {
    "GOOGLE_MAPS_APIKEY": "Replace this with your api key"
  }
}

```

## Serving in Development

From within the root directory:

```
sls deploy
```

For more information check the [serverless docs](#https://serverless.com)

## Testing

From within the root directory:

Server side testing:
```
yarn test
```

### Style Guide

For this project I'm using the popular [Standard JS Style Guide](https://standardjs.com). Eslint is installed to help keep styles consistent. 

### Given More Time

Given more time, I would impliment integration tests for the AWS Lambda service. If this were a production quality service the integration tests would be a necessity.

If I could start this project over again, I would have prioritized integration testing sooner. I would use the popular supertest module for this.

### Roadmap

- Add ability map Yelp data to a business before returning results. 
- Include a deeplink to Yelp for more information. 

### Notes on Data Filtering:

 - This service will only return food trucks located in San Francisco that have currently approved permits.
 