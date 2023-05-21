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

Papa.parse("seedRateRange.csv", {
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

//* calculator

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

//* zip code zone

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
