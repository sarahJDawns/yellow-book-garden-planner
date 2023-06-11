//* bypass login

function bypassLogin() {
  const email = "tomato@10.com";
  const password = "tomato@10.com";

  document.querySelector('input[name="email"]').value = email;
  document.querySelector('input[name="password"]').value = password;

  document.querySelector("form").submit();
}

//* scroll to top button

let toTopButton = document.getElementById("to-top-button");

if (toTopButton) {
  window.onscroll = function () {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      toTopButton.classList.remove("hidden");
    } else {
      toTopButton.classList.add("hidden");
    }
  };

  window.goToTop = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
}

//* sidebar

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector("#separator-sidebar")) {
    const sidebar = document.getElementById("separator-sidebar");
    const sidebarToggleOpen = document.getElementById("sidebar-toggle-open");
    const sidebarToggleClose = document.getElementById("sidebar-toggle-close");

    sidebarToggleOpen.addEventListener("click", function () {
      sidebar.classList.add("open");
      sidebarToggleOpen.style.display = "none";
      sidebarToggleClose.style.display = "inline-block";
    });

    sidebarToggleClose.addEventListener("click", function () {
      sidebar.classList.remove("open");
      sidebarToggleOpen.style.display = "inline-block";
      sidebarToggleClose.style.display = "none";
    });
    function updateCloseButtonVisibility() {
      if (sidebar.classList.contains("open")) {
        sidebarToggleClose.style.display = "inline-block";
      } else {
        sidebarToggleClose.style.display = "none";
      }
    }

    updateCloseButtonVisibility();

    window.addEventListener("resize", updateCloseButtonVisibility);
  }
});

//* calculator page

//* seed & plant rate table

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector("#table")) {
    Papa.parse("/csv/seedRateRange.csv", {
      header: true,
      download: true,
      complete: function (results) {
        const table = new Tabulator("#table", {
          data: results.data,
          layout: "fitColumns",
          autoColumns: true,
          autoWidth: true,
          headerWordWrap: true,
          headerSort: false,
          headerVertical: "flip",
          responsiveLayout: true,
          columns: results.meta.fields.map(function (field) {
            return { title: field, field: field };
          }),
        });
      },
    });
  }
});

//* calculator

let inchesBetween, rowLength, numOfRows;

if (document.querySelector("#calc-display")) {
  let calculateButton = document.querySelector("#calculate");
  let errMessage = document.querySelector("#error-message");

  calculateButton.addEventListener("click", () => {
    inchesBetween = document.querySelector("#in-between").value;
    rowLength = document.querySelector("#length").value;
    numOfRows = document.querySelector("#rows").value;

    if (inchesBetween !== "" && rowLength !== "" && numOfRows !== "") {
      let inches = rowLength * 12;
      let seedPerRow = inches / inchesBetween;
      let totalSeed = seedPerRow * numOfRows;

      document.querySelector("#calc-display").innerText = totalSeed;
      errMessage.textContent = "";
    } else {
      errMessage.textContent = "All fields are required.";
    }
  });
}

//* kanban add item

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");

if (todoForm && todoInput) {
  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    todoForm.submit();
  });

  todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      todoForm.submit();
    }
  });
}

//* kanban drag & drop

const kanbanDraggables = document.querySelectorAll(".draggable");
const kanbanCategories = document.querySelectorAll(".category");

kanbanDraggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

kanbanCategories.forEach((category) => {
  category.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(category, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      category.appendChild(draggable);
    } else {
      category.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(category, y) {
  const draggableElements = [
    ...category.querySelectorAll(".draggable:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

//* expenses page

const expensesForm = document.querySelector("#expenses-form");
const textInput = document.querySelector("#text");
const amountInput = document.querySelector("#amount");
const errorMessage = document.querySelector("#error-message");

if (expensesForm && textInput && amountInput) {
  expensesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    expensesForm.submit();
  });

  if (isNaN(newAmount) || newText.trim() === "") {
    // Display an error message or perform any necessary validation handling
    console.error("Invalid amount or text value");
    // return;
  }

  // amountInput.addEventListener("keydown", (event) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //     expensesForm.submit();
  //   }
  // });
}

if (document.querySelector("#expenses")) {
  const totalDisplay = document.querySelector("#total");

  const expenseItems = document.querySelectorAll("#list li");
  let totalExpenses = 0;
  expenseItems.forEach((item) => {
    const amount = parseFloat(item.querySelector("span").textContent);
    totalExpenses += amount;
  });
  totalDisplay.textContent = totalExpenses.toFixed(2);

  const addButton = document.querySelector("#add");

  addButton.addEventListener("click", (event) => {
    event.preventDefault();

    const newAmount = parseFloat(document.querySelector("#amount").value);

    totalExpenses += newAmount;

    totalDisplay.textContent = totalExpenses.toFixed(2);

    document.querySelector("#text").value = "";
    document.querySelector("#amount").value = "";
  });
}
