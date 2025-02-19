let currentIndex = 0;

const questions = [
  "How do you prefer to collaborate?",
  // "How do you prefer to collaborate?",
  // "How do you prefer to collaborate?",
  // "How do you prefer to collaborate?",
];

const colors = [
  "var(--color-blue)",
  "var(--color-orange)",
  "var(--color-grey)",
  "var(--color-black)"
];

const container = document.getElementById("form-container");
const template = document.getElementById("question-page-template");

questions.forEach(question => {
  const clone = template.content.cloneNode(true);
  clone.querySelector(".question").textContent = question;
  clone.querySelectorAll("input[type='radio']").forEach((input, i) => input.name = 'question' + (i + 1));
  container.appendChild(clone);
});

const pages = document.querySelectorAll(".page");

document.getElementById("form-container").style.height = pages.length * 100 + "vh";
pages.forEach((page, index) => page.style.background = colors[index % colors.length]);

function updateView() {
  document.getElementById("form-container").style.transform = `translateY(-${currentIndex * 100}vh)`;
  updateProgressBar();
}

function updateProgressBar() {
  const progress = (currentIndex + 1) / pages.length * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
}

function nextPage() {
  if (currentIndex < pages.length - 1) {
    currentIndex++;
    updateView();
  }
}

function prevPage() {
  if (currentIndex > 0) {
    currentIndex--;
    updateView();
  }
}
