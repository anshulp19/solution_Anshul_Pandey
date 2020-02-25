module.exports = {
  isCandidateClick: (c, dmap) => {
    dmap[c.ip] = (dmap[c.ip] + 1) || 1;
    return dmap[c.ip] <= 11 ? true : false;
  },
  getProcessedClick: (dClicks, key, c) => {
    if (!dClicks.hasOwnProperty(key))
    return c;
  
  const prevClick = dClicks[key];
  if (prevClick.amount !== c.amount) {
    return prevClick.amount >= c.amount ? prevClick : c; 
  }
  return (new Date(prevClick.timestamp) < new Date(c.timestamp)) ? prevClick : c;
  }
};
