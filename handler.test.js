const expect = require('chai').expect;
const handler = require('./handler');
const getSFFoodTrucks = handler.getSFFoodTrucks;
const fetchFoodTrucks = handler.fetchFoodTrucks;
const filterByLocation = handler.filterByLocation;

describe('handler.js',()=>{
  it('should exist',()=>{
    expect(handler).to.be.an('object');
  });
  it('should have three functions',()=>{
    expect(handler).to.have.keys(['getSFFoodTrucks', 'fetchFoodTrucks', 'filterByLocation']);
  });

  describe('getSFFoodTrucks()',()=>{
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
      expect(getSFFoodTrucks({})).to.be.a('promise');
    });
    it('should resolve a resp object with an array of message data in the body',(done)=>{
      getSFFoodTrucks({}).then((resp)=>{
        expect(JSON.parse(resp.body).message).to.be.an('array');
      }).then(done,done);
    });
  })

  describe('fetchFoodTrucks()',()=>{
    it('should be a function',()=>{
      expect(fetchFoodTrucks).to.be.a('function');
    });
    it('should accept an event as an argument',()=>{
      expect(()=>{
          fetchFoodTrucks()
        }).to.throw('Function fetchFoodTrucks expects an event as an argument');
    });
    it('should return a promise',()=>{
      expect(fetchFoodTrucks({})).to.be.a('promise');
    });
    it('should resolve a resp object with an array of message data in the body',(done)=>{
      fetchFoodTrucks({}).then((resp)=>{
        expect(JSON.parse(resp.body).message).to.be.an('array');
      }).then(done,done);
    });
  });

  describe('filterByLocation()',()=>{
    let mockTruck = {
      "address": "1169 MARKET ST",
      "applicant": "Golden Gate Halal Food",
      "approved": "2018-12-19T00:00:00.000",
      "block": "3702",
      "blocklot": "3702051",
      "cnn": "8751101",
      "dayshours": "We/Fr/Sa:8AM-8PM",
      "expirationdate": "2019-07-15T00:00:00.000",
      "facilitytype": "Push Cart",
      "fooditems": "Pulao Plates & Sandwiches: Various Drinks",
      "latitude": "37.7901855706334",
      "location": {
        "type": "Point",
        "coordinates": [
          0,
          0
        ]
      },
      "locationdescription": "MARKET ST: 07TH ST \\ CHARLES J BRENHAM PL to 08TH ST \\ GROVE ST \\ HYDE ST (1101 - 1199) -- SOUTH --",
      "longitude": "-122.395471725809",
      "lot": "051",
      "objectid": "1012444",
      "permit": "16MFF-0094",
      "priorpermit": "0",
      "received": "2016-04-18",
      "schedule": "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=16MFF-0094&ExportPDF=1&Filename=16MFF-0094_schedule.pdf",
      "status": "APPROVED"
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
      applicant, fooditems, dayshours, lat, lng, address, distance',()=>{
      expect(filterByLocation({},[mockTruck])[0])
      .to.have.keys(['applicant', 'fooditems', 'dayshours', 'lat', 'lng', 'address', 'distance']);
    });
  });
});
