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
  const el = document.querySelector('form')
  const url = new URL(el.action);
  url.searchParams.set(name, change_func(url.searchParams.get(name)));
  el.action = url.toString();
}

function calcCost() {
  const start_el = document.querySelector('#start-cost');
  let total = Number(start_el.dataset.startCost);
  if (!total) {
    console.error('No start amount!');
  }
  document.querySelectorAll('input:checked, input[type="range"]').forEach(el => {
    if (el.dataset.cost && el.dataset.cost != 0) {
      const op = el.dataset.cost[0];
      const num = el.dataset.cost.slice(1);
      switch (op) {
        case 'x':
          total *= num;
          break;
        case '+':
          total += num;
          break;
        case '-':
          total -= num;
          break;
        case '=':
          total = num;
          return;
        default:
          console.warn(`wrong cost for ${el.id}: ${el.dataset.cost}`);
          break;
      }
    }
  });

  return total;
}

function roundCost(cost) {
  return Math.round(cost / 5) * 5;
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
	if (el.type === 'radio') {
		const fieldset = el.closest('fieldset');
		nextPage(fieldset.id);
	} else if (el.type === 'range') {
    const value = el.value;
    const cost = el.dataset[`cost-${value}`];
    el.dataset.cost = cost;
  }
  thanksPage('cost', (_) => calcCost());
}

(function init() {
  const minDate = (new Date()).toISOString().substring(0,10);
  const dates = document.querySelectorAll('input[type="date"]');
  dates.forEach((d) => d.setAttribute('min', minDate));

  document.querySelector('button[type="submit"]').onmouseenter = function() {
    const cost = calcCost();
    thanksPage('cost', (_) => roundCost(cost * 1.15));
    window.onbeforeunload = null;
  }

  document.getElementById('dynamicForm').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      let focus = document.activeElement
      let nextButtons = Array.from(document.querySelectorAll(".next"))
      let next = nextButtons.find(btn => btn.compareDocumentPosition(focus) & Node.DOCUMENT_POSITION_PRECEDING)
      if (next) next.click()
    }
  })

  document.querySelector('fieldset .prev').disabled = true;
})();
