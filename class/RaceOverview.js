//https://www.german-racing.com/gr/renntage/rennkalender.php?jahr=2019,

import JSDom from 'jsdom';
import Race from './Race.js';

export const COUNTRIES = {
  Deutschland: 8,
  DE: 8
};

export default class RaceOverview {
  constructor({
    jahr = 2017,
    land = COUNTRIES.Deutschland,
    art = '',
    von_submit = '2017%2F01%2F01',
    ort = '',
    laengevon = 0,
    laengebis = 10000,
    bis_submit = '2017%2F12%2F31'
  } = {}) {
    const url = `https://www.german-racing.com/gr/renntage/rennkalender.php?jahr=${jahr}&land=${land}&art=${art}&von_submit=${von_submit}&ort=${ort}&laengevon=${laengevon}&laengebis=${laengebis}&bis_submit=${bis_submit}`;
    // console.log(url);
    this.domP = JSDom.JSDOM.fromURL(
      url
    );
  }

  async getRaces() {
    const dom = await this.domP;
    const raceTrs = dom.window.document.querySelectorAll('.tableView tbody tr');
    const races = [];
    raceTrs.forEach(raceTr => races.push(this.parseRace(raceTr)));
    return races;
  }

  parseRace(raceTr){
    const tds = raceTr.querySelectorAll('td');
    return new Race({
      datum: tds[0].innerHTML,
      ort: tds[1].innerHTML,
      rnr: tds[2].innerHTML,
      renntitel: tds[3].innerHTML,
      start: tds[4].innerHTML,
      distanz: tds[5].innerHTML,
      kategorie: tds[6].innerHTML,
      preisgeld: tds[7].innerHTML,
      starter: tds[8].innerHTML,
      url: tds[11].querySelector('a').href,
    });
  }
}
