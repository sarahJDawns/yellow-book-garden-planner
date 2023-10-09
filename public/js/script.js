//* bypass login

function bypassLogin() {
  // Set email and password variables
  const email = "tomato@10.com";
  const password = "tomato@10.com";

  // Set the email and password input values
  document.querySelector('input[name="email"]').value = email;
  document.querySelector('input[name="password"]').value = password;

  // Submit the form
  document.querySelector("form").submit();
}

//* scroll to top button

let toTopButton = document.getElementById("to-top-button");

if (toTopButton) {
window.onscroll = function() {
  const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

  if (scrollPosition > 500) {
    toTopButton.classList.remove("hidden");
  } else {
    toTopButton.classList.add("hidden");
  }
};

function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
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
  const isOpen = sidebar.classList.contains("open");
  sidebarToggleClose.style.display = isOpen ? "inline-block" : "none";
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
complete: function(results) {
  const table = new Tabulator("#table", {
    data: results.data,
    layout: "fitColumns",
    autoColumns: true,
    autoWidth: true,
    headerWordWrap: true,
    headerSort: false,
    headerVertical: "flip",
    responsiveLayout: true,
    columns: results.meta.fields.map(field => ({ title: field, field })),
  });
}
    });
  }
});

//* calculator
let inchesBetween, rowLength, numOfRows;

if (document.querySelector("#calc-display")) {
  let calculateButton = document.querySelector("#calculate");
  let errMessage = document.querySelector("#error-message");

  calculateButton.addEventListener("click", () => {
    performCalculation();
  });

  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        performCalculation();
      }
    });
  });

function performCalculation() {
  const inchesBetween = document.querySelector("#in-between").value;
  const rowLength = document.querySelector("#length").value;
  const numOfRows = document.querySelector("#rows").value;
  const errMessage = document.querySelector("#err-message");

  if (inchesBetween !== "" && rowLength !== "" && numOfRows !== "") {
    const inches = rowLength * 12;
    const seedPerRow = inches / inchesBetween;
    const totalSeed = seedPerRow * numOfRows;

    document.querySelector("#calc-display").innerText = totalSeed;

    document.querySelector("#in-between").value = "";
    document.querySelector("#length").value = "";
    document.querySelector("#rows").value = "";

    errMessage.textContent = "";
  } else {
    errMessage.textContent = "All fields are required.";
  }
}
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
  const draggableElements = Array.from(category.querySelectorAll(".draggable:not(.dragging)"));

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    return offset < 0 && offset > closest.offset
      ? { offset, element: child }
      : closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

//* expenses page

const expensesForm = document.querySelector("#expenses-form");
const textInput = document.querySelector("#text");
const amountInput = document.querySelector("#amount");
const errorMessage = document.querySelector("#error-message");
if (expensesForm && textInput && amountInput) {
  expensesForm.addEventListener("submit", (event) => {
    if (!validateInputs()) {
      event.preventDefault();
    }
  });

function validateInputs() {
  const text = textInput.value.trim();
  const amount = parseFloat(amountInput.value);

  const errorMessage = text === "" || isNaN(amount) ? "All fields are required." : " ";

  return errorMessage === " ";
}

  amountInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      if (!validateInputs()) {
        event.preventDefault();
      }
    }
  });

  const addButton = document.querySelector("#add");
  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (validateInputs()) {
      expensesForm.submit();
    }
  });
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
