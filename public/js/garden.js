//* garden drag & drop

//* garden get

const garden = document.getElementById("garden");

function getGarden() {
 
  fetch("/garden", {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to get garden!");
      }
      return response.json();
    })
    .then((data) => {
      const garden = data.garden;
      populateGarden(garden);
    })
    .catch((error) => console.log("Failed to find garden!", error));
}

function populateGarden(garden) {
  const gardenCells = document.querySelectorAll(".garden-cell");

  gardenCells.forEach((cell) => {
    const row = cell.getAttribute("data-row");
    const col = cell.getAttribute("data-col");

    const gardenCell = garden[0].cells.find(
      (c) =>
        c.position.row === parseInt(row) && c.position.col === parseInt(col)
    );

    if (gardenCell) {
      cell.innerHTML = gardenCell.icon;
    }
  });
}

window.addEventListener("load", () => {
  getGarden();
});

//* garden save

function saveGarden() {
  const gardenCells = document.querySelectorAll(".garden-cell");
  const cells = [];

  gardenCells.forEach((cell) => {
    const row = cell.getAttribute("data-row");
    const col = cell.getAttribute("data-col");
    const icon = cell.innerHTML.trim();

    if (icon !== "") {
      cells.push({
        position: { row: parseInt(row), col: parseInt(col) },
        icon: icon,
      });
    }
  });

  const requestBody = { cells: cells };

  fetch("/garden/saveGarden", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to save garden!");
      }
      console.log("Garden saved!");
    })
    .catch((error) => console.log("Failed to save garden!"));
}

//* garden clear

function clearGarden() {
  fetch("/garden/clearGarden", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to clear garden!");
      }
      console.log("Garden cleared!");

      const gardenCells = document.querySelectorAll(".garden-cell");
      gardenCells.forEach((cell) => {
        cell.innerHTML = "";
      });
    })
    .catch((error) => console.log("Failed to clear garden!"));
}
