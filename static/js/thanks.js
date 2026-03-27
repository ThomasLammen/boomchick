const params = new URLSearchParams(window.location.search);

// 1. Confetti
new JSConfetti().addConfetti();

// 2. Theme
function applyTheme(theme) {
  if (!theme) return;
  // Title
  if (theme.name == 'default') {
	const intro = document.querySelector('section h2');
	intro.textContent = 'Gefeliciteerd! Boomchick Collective komt op jouw evenement spelen!';
  } else {
	const title = document.createElement('h1');
	title.textContent = theme.name;
	document.querySelector('section h2').insertAdjacentElement('afterend', title);
  }

  // Spotify embed
  const iframe = document.createElement('iframe');
  Object.assign(iframe, {
    src: `https://open.spotify.com/embed/album/${theme.spotify}`,
    width: '90%',
    height: '300',
    frameBorder: '0',
    allow: 'encrypted-media',
  });
  iframe.setAttribute('allowtransparency', 'true');
  document.querySelector('main section ul').insertAdjacentElement('afterend', iframe);

  // Optional video
  if (theme.video) {
    const aside = document.querySelector('aside');
    const vid = Object.assign(document.createElement('video'), {
      autoplay: true,
      controls: true,
    });
	vid.style.width = '80%';
    vid.appendChild(Object.assign(document.createElement('source'), { src: theme.video }));
    aside.appendChild(vid);
    aside.insertAdjacentHTML('beforeend', '<h3>Hier alvast een speciale boodschap voor je!</h3>');
  }
}

const inputTheme = params.get('theme');
let match = window.themes.find(t => t.name === inputTheme);
let fallback = window.themes.find(t => t.name === 'default');
applyTheme(match?? fallback);

// 3. Cost
const cost = params.get('cost');
if (cost) {
  const h3 = document.createElement('h3');
  h3.innerHTML = `Perfecte live muziek voor <em>€${Math.floor(cost)},-</em> (excl. reiskosten en btw)`;
  document.querySelector('main section ul').insertAdjacentElement('afterend', h3);
}
