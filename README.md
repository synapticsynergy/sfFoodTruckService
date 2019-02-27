# sfFoodTruckService
Lambda function to get food truck data from a San Francisco database.

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Serving in Development](#serving-in-development)
    1. [Testing](#testing)
1. [Roadmap](#roadmap)

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

### Roadmap

- Add ability map Yelp data to a business before returning results. 
- Include a deeplink to Yelp for more information. 
- Include a deeplink to maps.
- Include a deeplink to call an uber to your current location. 

### Notes on Data Filtering:

 - This service will only return food trucks that have currently approved permits.
 