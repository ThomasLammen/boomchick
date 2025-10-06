document.querySelector('.hamburger').addEventListener('click', function() {
	const nav = document.querySelector('nav.menu');
	nav.classList.toggle('active');
	const img = document.querySelector('img');
	img.style.transform = this.classList.contains('cross') ? 'rotate(720deg)' : '';

	setTimeout(() => {
		this.classList.toggle('cross');
	}, (nav.classList.contains('active')) ? 0 : 250);
})
