/* eslint-disable linebreak-style */
const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  let period;

  //Challenge 1
  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  if (data.periodType === 'days') {
    period = 2 ** Math.trunc(data.timeToElapse / 3);
  } else if (data.periodType === 'weeks') {
    period = 2 ** Math.trunc((data.timeToElapse * 7) / 3);
  } else if (data.periodType === 'months') {
    period = 2 ** Math.trunc((data.timeToElapse * 30) / 3);
  }

  impact.infectionsByRequestedTime = impact.currentlyInfected * period;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * period;

  return { data };
};
export default covid19ImpactEstimator;
