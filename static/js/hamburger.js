document.querySelector('.menu').addEventListener('click', function() {
	this.classList.toggle('cross')
	document.querySelector('nav').classList.toggle('active')
})
