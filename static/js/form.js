function handleGoto(value) {
  const parent = value.slice(0, -1);
  const regex = new RegExp(`^${parent}[a-z]$`);
  document.querySelectorAll('[id]').forEach(el => {
    if (regex.test(el.id)) {
      if (el.id === value) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    }
  });
}

function scrollQuestionPage(current, direction) {
  const form = document.getElementById('dynamicForm');
  const curr = document.getElementById(current);
  const questions = Array.from(form.children).filter(el =>
    getComputedStyle(el).display !== 'none'
  );
  const pos = questions.indexOf(curr) + direction;
  if (0 <= pos && pos < questions.length) {
    document.getElementById("dynamicForm").style.transform = `translateY(-${pos * 100}vh)`;
  }
  // updateProgressBar();
}

function updateProgressBar() {
  const progress = (currentIndex + 1) / pages.length * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
}

function nextPage(current) {
  scrollQuestionPage(current, 1);
}

function prevPage(current) {
  scrollQuestionPage(current, -1);
}
