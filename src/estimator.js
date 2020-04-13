const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  let period;

  // challenge 1
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  // resolve to days
  if (data.periodType === 'days')
    period = 2 ** Math.trunc(data.timeToElapse / 3);
  else if (data.periodType === 'weeks')
    period = 2 ** Math.trunc((data.timeToElapse * 7) / 3);
  else if (data.periodType === 'months')
    period = 2 ** Math.trunc((data.timeToElapse * 30) / 3);

  impact.infectionsByRequestedTime = impact.currentlyInfected * period;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * period;

  // challenge 2
  impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime =
    0.15 * severeImpact.infectionsByRequestedTime;

  const bedAvailability = 0.35 * data.totalHospitalBeds;
  // reduce length
  const iscbrt = impact.severeCasesByRequestedTime;
  const siscbrt = severeImpact.severeCasesByRequestedTime;
  // calculate
  impact.hospitalBedsByRequestedTime = Math.trunc(bedAvailability - iscbrt);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(
    bedAvailability - siscbrt
  );

  // challenge 3
  const icuSevere = 0.05 * severeImpact.infectionsByRequestedTime;
  const ventilators = 0.02 * severeImpact.infectionsByRequestedTime;

  impact.casesForICUByRequestedTime = Math.trunc(
    0.05 * impact.infectionsByRequestedTime
  );
  severeImpact.casesForICUByRequestedTime = Math.trunc(icuSevere);
  impact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * impact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(ventilators);
  // reduce length
  const pop = data.region.avgDailyIncomePopulation;
  const avg = data.region.avgDailyIncomeInUSD;
  const sev = severeImpact.infectionsByRequestedTime;
  let time = 0;
  if (data.periodType === 'days') time = data.timeToElapse;
  else if (data.periodType === 'weeks') time = data.timeToElapse * 7;
  else if (data.periodType === 'months') time = data.timeToElapse * 30;

  impact.dollarsInFlight = Math.trunc(
    (impact.infectionsByRequestedTime * pop * avg) / time
  );
  severeImpact.dollarsInFlight = Math.trunc((sev * pop * avg) / time);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
