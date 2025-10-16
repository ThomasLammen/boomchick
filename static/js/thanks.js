const params = new URLSearchParams(window.location.search);

if (params.get('theme')) {
	const input_theme = params.get('theme');
	for (var theme of window.themes) {
		if (theme.name == input_theme) {
			const c = document.createElement('iframe');
			c.setAttribute('src', `https://open.spotify.com/embed/album/${theme.spotify}`);
			c.setAttribute('width', '90%');
			c.setAttribute('height', '400');
			c.setAttribute('frameborder', '0');
			c.setAttribute('allowtransparency', 'true');
			c.setAttribute('allow', 'encrypted-media');
			document.querySelector('main section ul').insertAdjacentElement('beforebegin', c);

			if (theme.video) {
				const vid = document.createElement('video');
				vid.setAttribute('autoplay', true);
				vid.setAttribute('controls', true);
				const src = document.createElement('source');
				src.setAttribute('src', `/media/${theme.video}`);
				vid.appendChild(src);
				document.querySelector('aside').appendChild(vid);
			}
		}
	}
}

if (params.get('cost')) {
	const c = document.createElement('h3');
	const cost = params.get('cost');
	c.innerHTML = `Perfecte live muziek voor <em>€${Math.floor(cost)},-</em>`
	document.querySelector('main section ul').insertAdjacentElement('afterend', c);
}
