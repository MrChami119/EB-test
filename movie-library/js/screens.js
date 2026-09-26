document.addEventListener("DOMContentLoaded", function () {
  var gridEl = document.getElementById("screens-grid");

  if (!gridEl) return; 

  fetch("backend/screens.php")
    .then(function (res) {
      if (!res.ok) throw new Error("Network error");
      return res.json();
    })
    .then(function (screens) {
      renderScreens(screens);
    })
    .catch(function (err) {
      gridEl.innerHTML =
        '<p class="screens-error">Could not load screens right now.</p>';
      console.error(err);
    });

  function renderScreens(screens) {
    gridEl.innerHTML = "";

    screens.forEach(function (screen) {
      var featuresHtml = screen.features
        .map(function (f) {
          return "<li>" + f + "</li>";
        })
        .join("");

      var card = document.createElement("div");
      card.className = "screen-card";

      card.innerHTML =
        '<div class="screen-card-image">' +
        '<img src="' +
        screen.image +
        '" alt="' +
        screen.name +
        '" ' +
        "onerror=\"this.src='https://via.placeholder.com/400x260/222/999?text=" +
        encodeURIComponent(screen.name) +
        "'\" />" +
        "</div>" +
        '<div class="screen-card-body">' +
        "<h3>" +
        screen.name +
        "</h3>" +
        '<p class="screen-capacity">Capacity: ' +
        screen.capacity +
        " seats</p>" +
        '<p class="screen-description">' +
        screen.description +
        "</p>" +
        '<ul class="screen-features">' +
        featuresHtml +
        "</ul>" +
        "</div>";

      gridEl.appendChild(card);
    });
  }
});
