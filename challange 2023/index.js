const container = document.querySelector(".container-card");
const showMoreBtn = document.querySelector("#show-more-btn");
const darkModeToggle = document.querySelector("#theme-toggle");
const lightModeToggle = document.querySelector("#lightTheme");
const body = document.querySelector("body");

let cardsToShow = 4;
let cards = [];

function getCards() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      cards = data;
      showCards();
    })
    .catch((error) => console.error(error));
}

function showCards() {
  let output = "";
  for (let i = 0; i < cardsToShow && i < cards.length; i++) {
    const item = cards[i];
    output += generateCard(item);
  }
  container.innerHTML = output;
  if (cardsToShow >= cards.length) {
    showMoreBtn.style.display = "none";
  }
}

function generateCard(item) {
  return `
    <div id="card" class="card">
      <div class="section-one">
        <img class="profile-img" src="${item.profile_image}" alt="${item.profile_image}">
        <div class="name-date">
          <p class="name">${item.name}</p>
          <p class="date">${item.date}</p>
        </div>
      </div>
      <div class="section-two">
        <img class="img-one" src="${item.image}" alt="${item.image}">
      </div>
      <div class="section-three">
        <p class="caption">${item.caption}</p>
      </div>
      <footer class="foot">
        <img id="my-svg" class="like" src="../icons/heart.svg" alt="svg heart">
        <p class="likes">
          <span>${item.likes}</span>
        </p>
      </footer>
    </div>
  `;
}
function changeColumnNumber() {
  var input = document.getElementById("numberOfColumns");
  var div = document.getElementById("container-card");
  var style = document.createElement("style");
  style.innerHTML =
    ".container-card { grid-template-columns: repeat(" +
    input.value +
    ", 1fr); }";
  document.head.appendChild(style);
  div.classList.add(".container-card");
}
function changeMargin() {
  var input = document.getElementById("cardSpaceBetween");
  var div = document.getElementById("card");
  var style = document.createElement("style");
  style.innerHTML = ".card { margin-right: " + input.value + "px; }";
  document.head.appendChild(style);
  div.classList.add(".card");
}

function changeBackgroundColor() {
  var input = document.getElementById("cardBackgroundColor");
  var div = document.getElementById("card");
  var style = document.createElement("style");
  style.innerHTML = ".card { background: " + input.value + "; }";
  document.head.appendChild(style);
  div.classList.add("card");
}

function toggleDarkMode() {
  body.classList.toggle("dark-mode");
}

function toggleLightMode() {
  body.classList.toggle("light-mode");
}

getCards();

showMoreBtn.addEventListener("click", () => {
  cardsToShow += 4;
  showCards();
});

darkModeToggle.addEventListener("change", toggleDarkMode);
lightModeToggle.addEventListener("change", toggleLightMode);
