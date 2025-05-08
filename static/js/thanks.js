const list = document.getElementById('params')
const params = new URLSearchParams(window.location.search)

for (const [key, value] of params.entries()) {
	console.log({key: value});
	const item = document.createElement('li')
	item.textContent = `${key}: ${value}`
	list.appendChild(item)
}
