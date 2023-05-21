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

//*table
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

  //* calculator

  if (document.querySelector("#calc-display")) {
    let getCount = () => {
      let inchesBetween = document.querySelector("#in-between").value;
      let rowLength = document.querySelector("#length").value;
      let numOfRows = document.querySelector("#rows").value;

      let inches = rowLength * 12;
      let seedPerRow = inches / inchesBetween;
      let totalSeed = seedPerRow * numOfRows;

      return totalSeed;
    };

    let calculateButton = document.querySelector("#calculate");

    calculateButton.addEventListener("click", () => {
      let totalCount = getCount();
      document.querySelector("#calc-display").innerText = totalCount;
    });
  }
});

//* zip code zone

if (document.querySelector("#zone")) {
  document.querySelector("#zone").addEventListener("click", getZone);

  function getZone() {
    let code = document.querySelector("#code").value;

    fetch(`https://phzmapi.org/${code}.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.zone);
        document.querySelector("#zone-display").innerText = data.zone;
      })
      .catch((err) => {
        console.log("error");
      });
  }
}

//* dashboard sidebar
document.addEventListener("DOMContentLoaded", function () {
  function loadContent(url) {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("content").innerHTML = data;
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  let sidebarLinks = document.querySelectorAll(".sidebar-link");
  sidebarLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      let url = this.getAttribute("href");
      loadContent(url);
      history.pushState({ url: url }, "", url);
    });
  });

  window.addEventListener("popstate", function (e) {
    let url = e.state.url;
    loadContent(url);
  });
});
