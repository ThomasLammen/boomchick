function handleGoto(value) {
  if (!value) return;
  const parent = value.slice(0, -1);
  const regex = new RegExp(`^${parent}[a-z]$`);
  document.querySelectorAll('[id]').forEach(el => {
    if (regex.test(el.id)) {
      if (el.id === value) {
        el.disabled = false;
        // el.required = true;
        // el.querySelector('input').required = true;
      } else {
        el.disabled = true;
        // el.required = false;
        // el.querySelector('input').required = false;
      }
    }
  });
}

function enableNextButton(input) {
  const fieldset = input.closest('fieldset');
  const button = fieldset.querySelector('.next');
  if (button) {
    button.disabled = input.value.trim() === '';
  }
  window.onbeforeunload = function() {
      return true;
  }
}

function scrollQuestionPage(current, direction) {
  const form = document.getElementById('dynamicForm');
  const curr = document.getElementById(current);
  const questions = Array.from(form.children).filter(el =>
    getComputedStyle(el).display !== 'none'
  );
  const currpos = questions.indexOf(curr);
  const pos = currpos + direction;
  if (0 <= pos && pos < questions.length) {
    document.getElementById("dynamicForm").style.transform = `translateY(-${pos * 100}vh)`;
  }

  const progress = pos / questions.length * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
}

function nextPage(current) {
  scrollQuestionPage(current, 1);
}

function prevPage(current) {
  scrollQuestionPage(current, -1);
}

function thanksPage(name, change_func) {
  const el = document.querySelector('input[name="_next"]')
  const url = new URL(el.value);
  url.searchParams.set(name, change_func(url.searchParams.get(name)));
  el.value = url.toString();
}

function calcCost() {
  let total = [...document.querySelectorAll('input:checked')]
    .map(el => Number(el.dataset.cost || 0))
    .reduce((sum, val) => sum + val, 0)

  thanksPage('cost', (_) => total);
}

function setTheme() {
  let lastTheme = [...document.querySelectorAll('input:checked')]
    .map(el => el.dataset.theme)
    .filter(v => v !== undefined && v !== '')
    .at(-1);

  thanksPage('theme', (_) => lastTheme);
}

function onChange(el, goto) {
  enableNextButton(el);
  handleGoto(goto);
  setTheme();
  calcCost();
	if (el.type === 'radio') {
		const fieldset = el.closest('fieldset');
		console.log(fieldset);
		nextPage(fieldset.id);
	}
}

(function init() {
  const minDate = (new Date()).toISOString().substring(0,10);
  const dates = document.querySelectorAll('input[type="date"]');
  dates.forEach((d) => d.setAttribute('min', minDate));

  document.querySelector('button[type="submit"]').onmouseenter = function() {
    window.onbeforeunload = null;
  }

  document.querySelector('fieldset .prev').disabled = true;
})();
