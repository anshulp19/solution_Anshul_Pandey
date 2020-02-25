const chai = require('chai');
const expect = chai.expect; // we are using the "expect" style of Chai
const ClickCounter = require('../ClickCounter');
const clicks = require('./clicks.js');

describe('ClickCounter initialize', () => {
  it('should return empty clicks counter map', function() {
    const clickCounter = new ClickCounter();
    expect(clickCounter.getClicksCounterMap()).to.be.empty;
  });
});

describe('ClickCounter fetch clicks data', () => {
  const clickCounter = new ClickCounter();
  beforeEach(() => {
    clickCounter.setClicksData(clicks.sampleJson());
  });

  it('fetch clicks data', () => {
    expect(clickCounter.getReadContent()).to.eql(clicks.sampleJson());
  });
});

describe('ClickCounter check clicks count map', () => {
  const clickCounter = new ClickCounter();
  beforeEach(() => {
    clickCounter.setClicksData(clicks.sampleJson());
    clickCounter.processClicksData();
  });

  it('check clicks ip count', () => {
    expect(clickCounter.getClicksCounterMap()).to.eql(clicks.ipCount());
  });
});

describe('ClickCounter check result', () => {
  const clickCounter = new ClickCounter();
  beforeEach(() => {
    clickCounter.setClicksData(clicks.sampleJson());
    clickCounter.processClicksData();
    clickCounter.saveResult();
  });

  it('check clicks to be saved', () => {
    const processedResult = clickCounter.getClicksPeriodMap();
    const result = [];
    for(let key in processedResult) {
      result.push(processedResult[key]);
    }
    expect(clickCounter.getClicksResult()).to.eql(clicks.resultClicks());
  });
});
