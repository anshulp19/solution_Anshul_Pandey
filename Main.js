/**
 * entry point for the application
 */
const ClickCounter = require('./ClickCounter.js');
const cfg = require('./config');

const clickCounter = new ClickCounter();
clickCounter.fetchClicksData(cfg.inputFile);
clickCounter.processClicksData();
clickCounter.saveResult();