const expect = require('chai').expect;
const handler = require('./handler');
const getSFFoodTrucks = handler.getSFFoodTrucks;
const fetchFoodTrucks = handler.fetchFoodTrucks;

describe('handler.js',()=>{
  it('should exist',()=>{
    expect(handler).to.be.an('object');
  });
  it('should have two functions',()=>{
    expect(handler).to.have.keys(['getSFFoodTrucks', 'fetchFoodTrucks']);
  });

  describe('fetchFoodTrucks()',()=>{
    it('should be a function',()=>{
      expect(fetchFoodTrucks).to.be.a('function');
    });
    it('should accept an event as an argument',()=>{
      expect(
        ()=>{
          fetchFoodTrucks()
        }
      ).to.throw('Function fetchFoodTrucks expects an event as an argument');
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
});
