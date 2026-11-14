(() => {
  const header = document.querySelector('#page-header.full_page');
  if (!header || header.querySelector('.meteor-sky')) return;

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = new URL('../css/meteor-hero.css', document.currentScript.src).href;
  document.head.appendChild(css);

  const sky = document.createElement('div');
  sky.className = 'meteor-sky';
  sky.setAttribute('aria-hidden', 'true');

  const meteors = [
    [89, 12, 5.5, 0],
    [104, -8, 7, -1.8],
    [67, 24, 8, -3.1],
    [124, -5, 6.8, -4.4],
    [77, -25, 7.5, -0.9],
    [112, 22, 9, -5.2],
  ];
  for (const [left, top, duration, delay] of meteors) {
    const meteor = document.createElement('span');
    meteor.className = 'meteor-sky__meteor';
    meteor.style.setProperty('--meteor-left', `${left}%`);
    meteor.style.setProperty('--meteor-top', `${top}%`);
    meteor.style.setProperty('--meteor-duration', `${duration}s`);
    meteor.style.setProperty('--meteor-delay', `${delay}s`);
    sky.appendChild(meteor);
  }

  header.insertBefore(sky, header.firstChild);
})();
