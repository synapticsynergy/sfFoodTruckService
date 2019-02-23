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

## Development

### Installing Dependencies

From within the root directory:

```sh
yarn
```

## Serving in Development

From within the root directory:

```sh
yarn start
```

## Testing

From within the root directory:

Server side testing:
```sh
yarn test
```

### Roadmap

- Add ability map Yelp data to a business before returning results. 
- Include a deeplink to Yelp for more information. 
- Include a deeplink to maps.
- Include a deeplink to call an uber to your current location. 

### Notes on Data Filtering:

 - This service will only return food trucks that have currently approved permits.
 