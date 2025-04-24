document.querySelector('.hamburger').addEventListener('click', function() {
	this.classList.toggle('cross')
	document.querySelector('nav.menu').classList.toggle('active')
	const img = document.querySelector('img');
	img.style.transform = this.classList.contains('cross') ? 'rotate(720deg)' : '';
})
