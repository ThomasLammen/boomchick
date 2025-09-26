document.querySelector('.hamburger').addEventListener('click', function() {
	this.classList.toggle('cross')
	document.querySelector('nav.menu').classList.toggle('active')
	const img = document.querySelector('img');
	img.style.transform = this.classList.contains('cross') ? 'rotate(720deg)' : '';

	const tagline = document.querySelector('#tagline');
	const timeout = tagline.classList.contains('withnav') ? 400 : 100;
	setTimeout(() => {
		tagline.classList.toggle('withnav');
	}, timeout);
})
