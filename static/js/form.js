function handleGoto(value) {
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
  const fieldset = input.closest('fieldset')
  const button = fieldset.querySelector('.next')
  if (button) {
    button.disabled = input.value.trim() === ''
  }
  window.onbeforeunload = function() {
      return true;
  };
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

function addCost(cost) {
  thanksPage('cost', (x) => Number(x) + cost);
}

function setTheme(theme) {
  thanksPage('theme', (_) => theme);
}

(function init() {
  const minDate = (new Date()).toISOString().substring(0,10);
  const dates = document.querySelectorAll('input[type="date"]');
  dates.forEach((d) => d.setAttribute('min', minDate));

  document.querySelector('button[type="submit"]').onmouseenter = function() {
    window.onbeforeunload = null;
  }
})();
