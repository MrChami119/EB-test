document.addEventListener("DOMContentLoaded", function () {
  /* ============================================
     HAMBURGER MENU TOGGLE
     ============================================ */
  var hamburgerBtn = document.getElementById("hamburger-btn");
  var mainNav = document.getElementById("main-nav");

  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-active");
      hamburgerBtn.classList.toggle("is-open", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* ============================================
     MOVIE SEARCH (TVMaze API) + ADD TO GRID
     ============================================ */
  var searchInput = document.getElementById("movie-search");
  var searchBtn = document.getElementById("search-btn");
  var searchResults = document.getElementById("search-results");
  var movieGrid = document.getElementById("movie-grid");
  var addedShowIds = new Set(); // track shows already added, to disable duplicate "add"

  function runSearch() {
    var query = searchInput.value.trim();
    if (!query) {
      searchResults.hidden = true;
      searchResults.innerHTML = "";
      return;
    }

    fetch("https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(query))
      .then(function (res) {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then(function (data) {
        renderSearchResults(data);
      })
      .catch(function (err) {
        searchResults.hidden = false;
        searchResults.innerHTML =
          '<div class="search-no-results">Something went wrong. Please try again.</div>';
        console.error(err);
      });
  }

  function renderSearchResults(results) {
    searchResults.innerHTML = "";

    if (!results || results.length === 0) {
      searchResults.hidden = false;
      searchResults.innerHTML =
        '<div class="search-no-results">No movies found.</div>';
      return;
    }

    results.slice(0, 8).forEach(function (result) {
      var show = result.show;
      var posterUrl =
        show.image && show.image.medium
          ? show.image.medium
          : "https://via.placeholder.com/72x96/222/999?text=No+Image";

      var item = document.createElement("div");
      item.className = "search-result-item";

      var isAdded = addedShowIds.has(show.id);

      item.innerHTML =
        '<img src="' +
        posterUrl +
        '" alt="' +
        show.name +
        '" />' +
        '<span class="result-title">' +
        show.name +
        "</span>" +
        '<button type="button" ' +
        (isAdded ? "disabled" : "") +
        ">" +
        (isAdded ? "Added" : "Add") +
        "</button>";

      var addButton = item.querySelector("button");
      addButton.addEventListener("click", function () {
        addMovieToGrid(show);
        addedShowIds.add(show.id);
        addButton.disabled = true;
        addButton.textContent = "Added";
      });

      searchResults.appendChild(item);
    });

    searchResults.hidden = false;
  }

  function addMovieToGrid(show) {
    var posterUrl =
      show.image && show.image.medium
        ? show.image.medium
        : "https://via.placeholder.com/300x400/222/999?text=No+Image";

    var summary = show.summary
      ? show.summary.replace(/<[^>]*>/g, "")
      : "No description available.";

    var card = document.createElement("div");
    card.className = "movie-card";
    card.dataset.showId = show.id;

    card.innerHTML =
      '<button type="button" class="movie-card-remove" aria-label="Remove">&times;</button>' +
      '<div class="movie-card-image"><img src="' +
      posterUrl +
      '" alt="' +
      show.name +
      '" /></div>' +
      "<h3>" +
      show.name +
      "</h3>" +
      "<p>" +
      summary +
      "</p>";

    card
      .querySelector(".movie-card-remove")
      .addEventListener("click", function () {
        card.remove();
        addedShowIds.delete(show.id);
      });

    movieGrid.appendChild(card);
  }

  if (searchBtn) searchBtn.addEventListener("click", runSearch);
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      runSearch();
    });
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        runSearch();
      }
    });
  }

  document.addEventListener("click", function (e) {
    if (
      searchResults &&
      !searchResults.contains(e.target) &&
      e.target !== searchInput &&
      e.target !== searchBtn
    ) {
      searchResults.hidden = true;
    }
  });

  /* ============================================
     CONTACT FORM VALIDATION + BACKEND SUBMISSION
     ============================================ */
  var form = document.getElementById("contact-form");
  var formStatus = document.getElementById("form-status");

  function setError(fieldId, message) {
    var fieldEl = document.getElementById(fieldId);
    var group = fieldEl ? fieldEl.closest(".form-group") : null;
    var errorEl = document.getElementById("error-" + fieldId);
    if (group) group.classList.toggle("has-error", !!message);
    if (errorEl) errorEl.textContent = message || "";
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var isValid = true;

      var firstName = document.getElementById("first-name");
      var lastName = document.getElementById("last-name");
      var email = document.getElementById("email");
      var comments = document.getElementById("comments");
      var terms = document.getElementById("terms");

      if (!firstName.value.trim()) {
        setError("first-name", "First name is required.");
        isValid = false;
      } else {
        setError("first-name", "");
      }

      if (!lastName.value.trim()) {
        setError("last-name", "Last name is required.");
        isValid = false;
      } else {
        setError("last-name", "");
      }

      if (!email.value.trim()) {
        setError("email", "Email is required.");
        isValid = false;
      } else if (!isValidEmail(email.value.trim())) {
        setError("email", "Please enter a valid email address.");
        isValid = false;
      } else {
        setError("email", "");
      }

      if (!comments.value.trim()) {
        setError("comments", "Comments are required.");
        isValid = false;
      } else {
        setError("comments", "");
      }

      if (!terms.checked) {
        setError("terms", "You must agree to the Terms & Conditions.");
        isValid = false;
      } else {
        setError("terms", "");
      }

      formStatus.hidden = true;

      if (!isValid) return;

      var submitBtn = form.querySelector(".btn-submit");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      fetch("backend/submit.php", {
        method: "POST",
        body: new FormData(form),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          formStatus.hidden = false;
          if (data.success) {
            formStatus.className = "form-status success";
            formStatus.textContent =
              data.message || "Thanks! Your message has been received.";
            form.reset();
          } else {
            if (data.errors) {
              Object.keys(data.errors).forEach(function (key) {
                var fieldId = key.replace(/([A-Z])/g, "-$1").toLowerCase();
                setError(fieldId, data.errors[key]);
              });
            }
            formStatus.className = "form-status error";
            formStatus.textContent =
              (data.errors && data.errors.general) ||
              "Something went wrong. Please try again.";
          }
        })
        .catch(function (err) {
          formStatus.hidden = false;
          formStatus.className = "form-status error";
          formStatus.textContent =
            "Could not reach the server. Please try again later.";
          console.error(err);
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit";
        });
    });
  }
});
