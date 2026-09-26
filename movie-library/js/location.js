document.addEventListener("DOMContentLoaded", function () {
  var listEl = document.getElementById("locations-list");
  var mapFrame = document.getElementById("location-map");

  if (!listEl) return; 

  fetch("backend/locations.php")
    .then(function (res) {
      if (!res.ok) throw new Error("Network error");
      return res.json();
    })
    .then(function (locations) {
      renderLocations(locations);
    })
    .catch(function (err) {
      listEl.innerHTML =
        '<p class="locations-error">Could not load locations right now.</p>';
      console.error(err);
    });

  function renderLocations(locations) {
    listEl.innerHTML = "";

    locations.forEach(function (loc, index) {
      var card = document.createElement("div");
      card.className = "location-card";
      if (index === 0) card.classList.add("is-selected");

      card.innerHTML =
        "<h3>" +
        loc.name +
        "</h3>" +
        "<p>" +
        loc.address +
        "</p>" +
        "<p>" +
        loc.phone +
        " &middot; " +
        loc.email +
        "</p>" +
        '<p class="location-hours">' +
        loc.hours +
        "</p>" +
        '<button type="button" class="btn-view-map">View on map</button>';

      card
        .querySelector(".btn-view-map")
        .addEventListener("click", function () {
          mapFrame.src =
            "https://www.google.com/maps?q=" +
            loc.lat +
            "," +
            loc.lng +
            "&z=16&output=embed";

          // Update selected state styling
          document.querySelectorAll(".location-card").forEach(function (c) {
            c.classList.remove("is-selected");
          });
          card.classList.add("is-selected");
        });

      listEl.appendChild(card);
    });
  }
});
