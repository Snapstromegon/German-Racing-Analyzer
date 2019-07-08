
function zahlProJahr(jahr){

  const results = require(`./result_${jahr}.json`);
  const horseNames = new Set();
  let horseStarts = 0;
  let gefallen = 0;
  let angehalten = 0;
  let ungewertet = 0;
  for(const result of results){
    for(const horse of result.result){
      horseNames.add(horse.name);
      horseStarts++;
      if(horse.interesting){
        if(horse.info.includes("gef.")){
          gefallen++;
        }
        if(horse.info.includes("agh.")){
          angehalten++;
        }
        ungewertet++;
      }
    }
  }
  return {jahr, names:horseNames.size, starts:horseStarts, races:results.length, startsPerRace:horseStarts/results.length, gefallen, angehalten, ungewertet, rennenProUngewertet: results.length/ungewertet};
}

const numbers = [];

for(let i=2015; i<=2019; i++){
  numbers.push(zahlProJahr(i));
}

console.table(numbers);