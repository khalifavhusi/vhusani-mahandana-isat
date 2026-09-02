/* =========================================================
   MAIN JAVASCRIPT
   Controls the three-dash navigation menu on every page.
   ========================================================= */

/* =========================================================
   GET NAVIGATION ELEMENTS
   Finds the menu button and the hidden navigation menu.
   ========================================================= */
const menuButton = document.getElementById("menuButton");
const siteNav = document.getElementById("siteNav");

/* =========================================================
   OPEN / CLOSE NAVIGATION
   Clicking the three-dash button toggles the menu.
   ========================================================= */
if (menuButton && siteNav) {
  menuButton.addEventListener("click", function (event) {
    event.stopPropagation();
    const isOpen = siteNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  /* =======================================================
     CLOSE WHEN CLICKING OUTSIDE
     Clicking outside the menu closes it.
     ======================================================= */
  document.addEventListener("click", function (event) {
    if (!siteNav.contains(event.target) && !menuButton.contains(event.target)) {
      siteNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    }
  });
}
