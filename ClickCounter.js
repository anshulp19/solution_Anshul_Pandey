const fs = require('fs');
const path = require('path');
const cfg = require('./config');
const clickProcessor = require('./util/ClicksProcessor.js');

class ClicksCounter {
  constructor() {
    this.clicksPeriodMap = {};
    this.clicksCountMap = {};
    this.clicksData = [];
    this.clicksResult = [];
  }

  /**
   * Helper function to read the array of clicks from clicks.json
   */
  readFile (fileName) {
    const filePath = path.join(__dirname, fileName);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath);
    }
    throw new Error('Cannot find file ' + filename);
  }

  /**
   * Read the array of clicks and stores them
   */
  fetchClicksData(fileName) {
    console.log('reading from file ' + fileName);
    try {
      const data = this.readFile(fileName);
      this.clicksData = JSON.parse(data);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Create a map of clicks.
   */
  processClicksData() {
    this.clicksData.forEach((click) => {
      const timeStampDate = click.timestamp.split(' ')[0]
      const clickDate = new Date(click.timestamp)
      // Prepare the key for the map
      const clickKey = click.ip + '#' + timeStampDate + '#' + clickDate.getHours();
      // this is to ensure a click does not appear more than 10 times
      if (clickProcessor.isCandidateClick(click, this.clicksCountMap)) {
        this.clicksPeriodMap[clickKey] = clickProcessor.getProcessedClick(this.clicksPeriodMap, clickKey, click);
      }
    });
  }

  getClicksCounterMap() {
    return this.clicksCountMap;
  }

  getReadContent() {
    return this.clicksData;
  }

  getClicksResult() {
    return this.clicksResult;
  }

  getClicksPeriodMap() {
    return this.clicksPeriodMap;
  }

  setClicksData(data) {
    this.clicksData = data;
  }

  /**
   * take the clicks from the clicks map and store them in the resultset.json
   */
  saveResult() {
    if (Object.keys(this.clicksPeriodMap).length === 0 && this.clicksPeriodMap.constructor === Object) {
      console.log('clicks files hasn\'t been read!!');
    } else {
      for(let key in this.clicksPeriodMap) {
        this.clicksResult.push(this.clicksPeriodMap[key]);
      }
      fs.writeFileSync(cfg.outputFile, JSON.stringify(this.clicksResult));
      console.log('output written to ' + cfg.outputFile);
    }
  }
};

module.exports = ClicksCounter;
