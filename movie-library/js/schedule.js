document.addEventListener("DOMContentLoaded", function () {
  var listEl = document.getElementById("schedule-list");
  var dateEl = document.getElementById("schedule-date");

  if (!listEl) return; 

  fetch("backend/schedule.php")
    .then(function (res) {
      if (!res.ok) throw new Error("Network error");
      return res.json();
    })
    .then(function (data) {
      dateEl.textContent = "Showtimes for " + data.date;
      renderSchedule(data.schedule);
    })
    .catch(function (err) {
      dateEl.textContent = "Showtimes";
      listEl.innerHTML =
        '<p class="schedule-error">Could not load the schedule right now.</p>';
      console.error(err);
    });

  function renderSchedule(items) {
    listEl.innerHTML = "";

    items.forEach(function (item) {
      var timesHtml = item.showtimes
        .map(function (t) {
          return '<span class="showtime-chip">' + t + "</span>";
        })
        .join("");

      var row = document.createElement("div");
      row.className = "schedule-row";

      row.innerHTML =
        '<div class="schedule-poster">' +
        '<img src="' +
        item.poster +
        '" alt="' +
        item.movie +
        '" ' +
        "onerror=\"this.src='https://via.placeholder.com/120x160/222/999?text=" +
        encodeURIComponent(item.movie) +
        "'\" />" +
        "</div>" +
        '<div class="schedule-details">' +
        "<h3>" +
        item.movie +
        "</h3>" +
        '<p class="schedule-meta">' +
        item.screen +
        " &middot; " +
        item.duration +
        "</p>" +
        '<div class="schedule-times">' +
        timesHtml +
        "</div>" +
        "</div>";

      listEl.appendChild(row);
    });
  }
});
