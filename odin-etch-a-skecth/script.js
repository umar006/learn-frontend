const grids = [];

for(let i = 0; i < 16; i++) {
    const grid = document.createElement("div");
    grid.setAttribute("id", i + 1);
    grid.style.width = "200px";
    grid.style.height = "200px";
    grids.push(grid);
}

const container = document.querySelector(".container");
container.append(...grids);
