import JSDom from 'jsdom';
import Horse from './Horse.js';

export default class Race {
  constructor({
    datum,
    ort,
    rnr,
    renntitel,
    start,
    distanz,
    kategorie,
    preisgeld,
    starter,
    url
  }) {
    this.datum = datum;
    this.ort = ort;
    this.rnr = rnr;
    this.renntitel = renntitel;
    this.start = start;
    this.distanz = distanz;
    this.kategorie = kategorie;
    this.preisgeld = preisgeld;
    this.starter = starter;
    this.url = url;
    this.result = [];
  }

  async load() {
    const domP = await JSDom.JSDOM.fromURL(this.url);
    const trs = domP.window.document.querySelectorAll('#ergebnis tbody tr');

    trs.forEach(tr =>
      this.result.push(
        new Horse({
          interesting: tr.classList.contains('greyTableRow'),
          name: tr.querySelectorAll('td')[1].querySelector('a span').innerHTML
        })
      )
    );

    this.description = (domP.window.document.querySelector(
      '#ergebnis tfoot td'
    ) || {}).innerHTML || '';

    const horseInfo = this.description.split('<br')[0];
    const infos = horseInfo.split('-');

    for (const info of infos) {
      const match = info.match(/(?<name>.*):(?<info>.*)/);
      if (match) {
        const horseName = match.groups.name.trim();
        const horseInfo = match.groups.info.trim();

        const horse = this.result.find(h => h.name == horseName);
        if (horse) {
          horse.info = horseInfo;
        }
      }
    }

    return this.url;
  }
}
