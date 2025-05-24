import { animate, createTimeline, utils } from 'https://assets.codepen.io/1137/anime.esm.min.js';

const [ $digitalClock ] = utils.$('#digital');

const s = 1000;
const m = 60*s;
const h = 60*m;
const oneday = h * 24;

const masterTL = createTimeline({ defaults: { ease: 'linear' }, autoplay: false });

[h * 10, h, 0, m * 10, m, 0, s * 10, s, 0, 100, 10].forEach(d => {
  const $el = document.createElement('div');
  $digitalClock.appendChild($el);
  $el.classList.add('slot');
  if (!d) {
    $el.classList.add('colon');
    $el.textContent = ':';
  } else {
    $el.classList.add('numbers');
    for (let i = 0; i < 10; i++) {
      const $num = document.createElement('div');
      $num.textContent = `${i}`;
