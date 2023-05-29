//* garden drag & drop

const gardenCells = document.querySelectorAll(".garden-cell");
const gardenIcons = document.querySelectorAll(".garden-icon");

function makeDraggable(icon) {
  icon.addEventListener("dragstart", (event) => {
    if (!icon.hasAttribute("data-dropped")) {
      event.dataTransfer.setData("text", icon.id);
    }
    event.dataTransfer.effectAllowed = "copy";
  });
  icon.addEventListener("dragend", () => {
    icon.removeAttribute("data-cloned");
    icon.removeAttribute("data-dropped");
  });
  // icon.addEventListener("dragend", () => {
  //   if (icon.hasAttribute("data-dropped")) {
  //     return;
  //   }
  //   icon.parentNode.removeChild(icon);
  // });
  // if (icon.parentNode && icon.parentNode.classList.contains("garden-cell")) {
  //   return;
  // }
  // icon.parentNode.removeChild(icon);
}

function makeDroppable(cell) {
  cell.addEventListener("dragover", (event) => {
    event.preventDefault();
    cell.classList.add("highlight");
  });

  cell.addEventListener("dragleave", () => {
    cell.classList.remove("highlight");
  });

  cell.addEventListener("drop", (event) => {
    event.preventDefault();
    cell.classList.remove("highlight");
    const draggableId = event.dataTransfer.getData("text");
    if (draggableId) {
      const draggableElement = document.getElementById(draggableId);
      if (draggableElement && !cell.querySelector(".garden-icon")) {
        const isCloned = draggableElement.hasAttribute("data-cloned");
        const clonedElement = isCloned
          ? draggableElement
          : draggableElement.cloneNode(true);
        cell.appendChild(clonedElement);
        clonedElement.removeAttribute("data-cloned");
        makeDraggable(clonedElement);
        if (!isCloned) {
          draggableElement.setAttribute("data-dropped", "true");
        }
      }
    }
  });

  cell.addEventListener("dragstart", (event) => {
    const icon = event.target.closest(".garden-icon");
    if (icon) {
      icon.setAttribute("data-dropped", "true");
    }
  });
}

gardenIcons.forEach(makeDraggable);

gardenCells.forEach((cell) => {
  makeDroppable(cell);
  cell.addEventListener("dragleave", () => {
    const draggable = document.querySelector(".garden-icon");
    if (draggable) {
      const draggableRect = draggable.getBoundingClientRect();
      const cellRect = cell.getBoundingClientRect();
      if (
        draggableRect.right < cellRect.left ||
        draggableRect.left > cellRect.right ||
        draggableRect.bottom < cellRect.top ||
        draggableRect.top > cellRect.bottom
      ) {
        cell.classList.remove("highlight");
      }
    }
  });
});

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
