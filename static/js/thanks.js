const params = new URLSearchParams(window.location.search);

if (params.get('theme')) {
	const input_theme = params.get('theme');
	for (var theme of window.themes) {
		if (theme.name == input_theme) {
			const c = document.createElement('iframe');
			c.setAttribute('src', `https://open.spotify.com/embed/album/${theme.spotify}`);
			c.setAttribute('width', '70%');
			c.setAttribute('height', '200');
			c.setAttribute('frameborder', '0');
			c.setAttribute('allowtransparency', 'true');
			c.setAttribute('allow', 'encrypted-media');
			document.querySelector('main section ul').insertAdjacentElement('beforebegin', c);
		}
	}
}

if (params.get('cost')) {
	const c = document.createElement('h3');
	const cost = params.get('cost');
	c.innerHTML = `Perfecte live muziek voor <em>€${Math.floor(cost)},-</em>`
	document.querySelector('main section ul').insertAdjacentElement('afterend', c);
}
