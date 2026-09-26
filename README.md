# Movie Library Web Application

A modern, responsive movie library web application built with **HTML5**, **CSS3**, **JavaScript (ES6+)**, and **PHP**. The application allows users to explore movie collections, search movies dynamically via the TVMaze API, check cinema screen details and showtimes, find locations, and submit inquiries through a validated contact form.

---

## 🌟 Key Features

- **Homepage Hero Banner**: Fully responsive main visual banner.
- **Collect Your Favourites (Movie Library)**:
  - Dynamic live movie search powered by the [TVMaze API](https://www.tvmaze.com/api).
  - Instant dropdown search suggestions as you type.
  - One-click addition of movies to your collection grid with custom poster, title, and summary.
  - Ability to remove added movies dynamically.
- **Our Screens Page**: Displays cinema theaters/screens fetched dynamically from the backend PHP service (`backend/screens.php`).
- **Schedule Page**: Displays current showtimes and cinema schedules fetched from `backend/schedule.php`.
- **Location & Contact Page**:
  - Cinema location details dynamically fetched from `backend/locations.php`.
  - Interactive map integration.
  - Full front-end and back-end form validation on the Contact Us form (`backend/submit.php`).
- **Responsive Navigation**: Mobile-friendly navigation with an animated hamburger toggle menu.
- **Footer Social Links**: External direct links to YouTube (`@ebeyondsDM`) and X/Twitter (`@ebeyonds`).

---

## 📁 Project Structure

```text
movie-library/
├── assets/
│   └── images/             # Image assets (hero banner, movie posters, screen shots, logo.svg)
├── backend/
│   ├── data/               # Local JSON/data storage if applicable
│   ├── locations.php       # PHP API endpoint returning cinema locations JSON
│   ├── schedule.php        # PHP API endpoint returning today's showtimes JSON
│   ├── screens.php         # PHP API endpoint returning cinema screen details JSON
│   └── submit.php          # PHP endpoint handling contact form submission & validation
├── css/
│   └── style.css           # Global stylesheet with modern styling & responsive queries
├── js/
│   ├── location.js         # Fetch logic & interactivity for Location & Contact page
│   ├── main.js             # Core JS: navigation, TVMaze movie search, contact form submit
│   ├── schedule.js         # Fetch logic & rendering for Schedule page
│   └── screens.js          # Fetch logic & rendering for Our Screens page
├── index.html              # Homepage
├── location-contact.html   # Location & Contact page
├── movie-library.html      # Dedicated Movie Library search & collection page
├── our-screens.html        # Cinema screens & auditorium gallery
├── schedule.html           # Showtimes and daily schedule page
├── terms-and-conditions.html # Terms & Conditions legal page
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- Any modern Web Browser (Chrome, Firefox, Edge, Safari).
- A web server with **PHP 7.4+** support (e.g., Apache, Nginx, XAMPP, WAMP, or PHP Built-in CLI server) to execute the backend endpoints.

### Running Locally with PHP Built-in Server

1. Open your terminal/command prompt and navigate to the project root directory:
   ```bash
   cd path/to/movie-library
   ```

2. Start the PHP built-in web server:
   ```bash
   php -S localhost:8000
   ```

3. Open your browser and navigate to:
   ```text
   http://localhost:8000
   ```

---

## 🛠️ Technologies Used

- **Frontend**: HTML5, Vanilla CSS3, Modern JavaScript (Fetch API, DOM manipulation).
- **Backend**: PHP (JSON REST endpoints, form processing).
- **External API**: [TVMaze API](https://www.tvmaze.com/api) for live movie/show search.
- **Design & Icons**: Custom SVG vector logo and social media icons.

---
