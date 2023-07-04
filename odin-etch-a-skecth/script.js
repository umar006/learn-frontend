const gridAmount = document.querySelector("input[name=grid-amount]");
const changeGrid = document.querySelector("button[name=create-grid]");
changeGrid.addEventListener("click", generateGrid);

const grid = document.querySelectorAll(".container");
grid.forEach((g) => {
  g.addEventListener("mouseover", randomBg);
});

function randomBg(e) {
  const bgColor = window
    .getComputedStyle(e.target, null)
    .getPropertyValue("background-color");
  let [r, g, b, a] = bgColor.match(/[\d\.]+/g);

  r = Math.floor(Math.random() * 256);
  g = Math.floor(Math.random() * 256);
  b = Math.floor(Math.random() * 256);
  a = Number(a) + 0.1;
  e.target.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
}

function generateGrid() {
  const grids = [];
  const amount = Number(gridAmount.value);

  if (amount > 100) return alert("Cannot create grid 100x100");

  for (let i = 0; i < amount ** 2; i++) {
    const grid = document.createElement("div");
    grid.setAttribute("id", i + 1);
    grid.style.width = 800 / amount + "px";
    grid.style.height = 800 / amount + "px";
    grid.style.border = "1px solid black";
    grids.push(grid);
  }

  const container = document.querySelector(".container");

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  container.append(...grids);
}
