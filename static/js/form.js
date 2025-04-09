function handleGoto(value) {
  const parent = value.slice(0, -1);
  const regex = new RegExp(`^${parent}[a-z]$`);
  document.querySelectorAll('[id]').forEach(el => {
    if (regex.test(el.id)) {
      el.style.display = el.id === value ? 'block' : 'none';
    }
  });
}

function updateView(target) {
  document.getElementById("dynamicForm").style.transform = `translateY(-${target * 100}vh)`;
  // updateProgressBar();
}

function updateProgressBar() {
  const progress = (currentIndex + 1) / pages.length * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
}

function nextPage(current) {
  // console.log(current);
  // updateView(current + 1);
  // if (currentIndex < pages.length - 1) {
  //   currentIndex++;
  //   updateView();
  // }
}

function prevPage(current) {
  if (current > 0) {
    updateView(current - 1);
  }
}
