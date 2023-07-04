const gridAmount = document.querySelector("input[name=grid-amount]");
const changeGrid = document.querySelector("button[name=change-grid]");
changeGrid.addEventListener("click", generateGrid);

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
