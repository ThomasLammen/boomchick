const params = new URLSearchParams(window.location.search)

if (params.get('theme')) {
	const h1 = document.createElement('h1');
	h1.classList.add('theme');
	h1.innerText = params.get('theme');
	document.querySelector('main section ul').insertAdjacentElement('beforebegin', h1);
}

if (params.get('cost')) {
	const c = document.createElement('h3');
	const cost = params.get('cost');
	c.innerHTML = `Perfecte live muziek voor <em>€${Math.floor(cost)},-</em>`
	document.querySelector('main section ul').insertAdjacentElement('afterend', c);
}

// const list = document.querySelector('main section ul');
// for (const [key, value] of params.entries()) {
// 	console.log({key: value});
// 	const item = document.createElement('li')
// 	item.textContent = `${key}: ${value}`
// 	list.appendChild(item)
// }
