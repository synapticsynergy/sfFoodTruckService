const expect = require('chai').expect;
const testData = require('./mockTrucksTestData');
const handler = require('../handler');
const getSFFoodTrucks = handler.getSFFoodTrucks;
const fetchFoodTrucks = handler.fetchFoodTrucks;
const filterByLocation = handler.filterByLocation;
const getDistance = handler.getDistance;

describe('handler.js',()=>{
  it('should exist',()=>{
    expect(handler).to.be.an('object');
  });
  it('should have three functions',()=>{
    expect(handler).to.have.keys(['getSFFoodTrucks', 'fetchFoodTrucks', 'filterByLocation', 'getDistance']);
  });

  describe('getSFFoodTrucks()',()=>{
    const mockLoc1 = {
      lat: '37.7901855706334',
      lng: '-122.395471725809',
    }
    it('should be a function',()=>{
      expect(getSFFoodTrucks).to.be.a('function');
    });
    it('should accept an event as an argument',(done)=>{
      //testing this way because this function is an async/await function.
      getSFFoodTrucks().catch((err)=>{
        expect(err.message).to.equal('Function getSFFoodTrucks expects an event as an argument');
      })
      .then(done,done);
    });
    it('return a promise',()=>{
      expect(getSFFoodTrucks(mockLoc1)).to.be.a('promise');
    });
    it('should resolve a resp object with an array of message data in the body',(done)=>{
      getSFFoodTrucks(mockLoc1).then((resp)=>{
        expect(JSON.parse(resp.body).message).to.be.an('array');
      }).then(done,done);
    }).timeout(3000);
    it('should resolve an array message with a max of 50 results',(done)=>{
      getSFFoodTrucks(mockLoc1).then((resp)=>{
        expect(JSON.parse(resp.body).message).to.be.lengthOf(50);
      }).then(done,done);
    }).timeout(3000);
  })

  describe('fetchFoodTrucks()',()=>{
    const mockLoc1 = {
      lat: '37.7901855706334',
      lng: '-122.395471725809',
    }
    it('should be a function',()=>{
      expect(fetchFoodTrucks).to.be.a('function');
    });
    it('should accept an event as an argument',()=>{
      expect(()=>{
          fetchFoodTrucks()
        }).to.throw('Function fetchFoodTrucks expects an event as an argument');
    });
    it('should return a promise',()=>{
      expect(fetchFoodTrucks(mockLoc1)).to.be.a('promise');
    });
    it('should resolve a resp object with an array of message data in the body',(done)=>{
      fetchFoodTrucks(mockLoc1).then((resp)=>{
        expect(JSON.parse(resp.body).message).to.be.an('array');
      }).catch((err)=>{
        console.log(err,' was there an error fetching??');
      }).then(done,done)
    }).timeout(3000);
  });

  describe('filterByLocation()',()=>{
    const mockTrucks = testData.mockTrucks;
    const mockLoc1 = {
      lat: '37.7901855706334',
      lng: '-122.395471725809',
    }
    it('should be a function',()=>{
      expect(filterByLocation).to.be.a('function');
    });
    it('should accept an object as its first argument',()=>{
      expect(()=>{
        filterByLocation()
      }).to.throw('Function filterByLocation expects an object as its first argument');
    });
    it('should accept an array as its second argument',()=>{
      expect(()=>{
        filterByLocation({})
      }).to.throw('Function filterByLocation expects an array as its second argument');
    });
    it('should return an array of objects with the following keys: \
      applicant, fooditems, dayshours, latitude, longitude, address, distance',()=>{
      expect(filterByLocation(mockLoc1,mockTrucks)[0])
      .to.have.keys(['applicant', 'fooditems', 'dayshours', 'latitude', 'longitude', 'address', 'distance']);
    });
    it('should filter out locations that are greater than a mile away',()=>{
      expect(filterByLocation(mockLoc1,mockTrucks)).to.have.lengthOf(2);
    });
    it('should return an array sorted by distance',()=>{
      console.log(filterByLocation(mockLoc1,mockTrucks));
      expect(filterByLocation(mockLoc1,mockTrucks)[0].distance).to.equal(0.3);
    });
  });

  describe('getDistance()',()=>{
    const mockLoc1 = {
      lat: '37.7901855706334',
      lng: '-122.395471725809',
    }
    const mockLoc2 = {
      lat: '37.7587861623056',
      lng: '-122.390958398693',
    }
    it('should be a function',()=>{
      expect(getDistance).to.be.a('function');
    });
    it('should accept two objects as arguments',()=>{
      expect(()=>{
        getDistance();
      }).to.throw('Function expects two objects as arguments');
      expect(()=>{
        getDistance({});
      }).to.throw('Function expects two objects as arguments');
    });
    it('should return a number',()=>{
      expect(getDistance(mockLoc1,mockLoc2)).to.be.a('number');
    });
    it('should return the distance in miles between two location objects with latitude and longitude keys',()=>{
      expect(getDistance(mockLoc1,mockLoc2)).to.equal(2.18);
    });
  });
});