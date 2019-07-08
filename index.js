import RaceOverview from './class/RaceOverview.js';
import async from 'async';
import fs from 'fs';

const START_JAHR = 2015;
const END_JAHR = 2019;

async function loadYear(year) {
  const raceOverview = new RaceOverview({
    jahr: year,
    von_submit: `${year}%2F01%2F01`,
    bis_submit: `${year}%2F12%2F31`
  });
  const races = await raceOverview.getRaces();
  console.log(`Found ${races.length} races`);
  let loading = 0;
  await async.forEachLimit(races, 25, async (r, ...args) => {
    console.log(`Loading ${year} - ${++loading} of ${races.length}`);
    await r.load().catch(e => console.error(e, r.url));
  });

  return races;
}

async function main(){
  for(let year= START_JAHR; year<=END_JAHR; year++){
    console.log(`YEAR ${year}`);
    const races = await loadYear(year);
    fs.writeFileSync(`data/result_${year}.json`, JSON.stringify(races, null, 2), console.log);
  }
}

main();
