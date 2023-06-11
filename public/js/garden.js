//* garden drag & drop

const gardenCells = document.querySelectorAll(".garden-cell");
const gardenIcons = document.querySelectorAll(".garden-icon");

function makeDraggable(icon) {
  if (icon.hasAttribute("data-cloned")) {
    return;
  }

  icon.addEventListener("dragstart", (event) => {
    if (!icon.hasAttribute("data-dropped")) {
      event.dataTransfer.setData("text", icon.id);
    }
    event.dataTransfer.effectAllowed = "copy";
  });

  icon.addEventListener("dragend", () => {
    icon.removeAttribute("data-dropped");
  });
}

function makeDroppable(cell) {
  cell.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = cell.querySelector(".garden-icon")
      ? "none"
      : "copy";
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
        if (!isCloned) {
          const clonedElement = draggableElement.cloneNode(true);
          clonedElement.setAttribute("data-cloned", "true");
          cell.appendChild(clonedElement);
          makeDraggable(clonedElement);
        }
      }
    }
  });
}

gardenIcons.forEach(makeDraggable);

gardenCells.forEach((cell) => {
  makeDroppable(cell);
  cell.addEventListener("dblclick", (event) => {
    const icon = cell.querySelector(".garden-icon");
    if (icon) {
      icon.remove();
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
      document.getElementById("messages").textContent = "Garden saved!";
    })
    .catch((error) => {
      console.log("Failed to save garden!");
      document.getElementById("messages").textContent =
        "Failed to save garden!";
    });
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
      document.getElementById("messages").textContent = "Garden cleared!";

      const gardenCells = document.querySelectorAll(".garden-cell");
      gardenCells.forEach((cell) => {
        cell.innerHTML = "";
      });
    })
    .catch((error) => {
      console.log("Failed to clear garden!");
      document.getElementById("messages").textContent =
        "Failed to clear garden!";
    });
}

document.addEventListener("click", () => {
  let gardenMessages = document.getElementById("messages");
  gardenMessages.textContent = "";
});
