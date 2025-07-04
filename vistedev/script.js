document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutBtn = document.getElementById("logout-btn");
  const navLinksUl = document.querySelector(".nav-links");

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  burger.addEventListener("keydown", e => {
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      navLinks.classList.toggle("active");
    }
  });

  function updateNavbar() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
      if (loginLink) loginLink.style.display = "none";
      if (registerLink) registerLink.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "inline-block";

      // Admin linki varsa kaldır (çoğalmaması için)
      const existingAdminLi = navLinksUl.querySelector("li.admin-link");
      if (existingAdminLi) {
        existingAdminLi.remove();
      }

      if (loggedInUser.username === "admin") {
        const adminLi = document.createElement("li");
        adminLi.classList.add("admin-link");
        const adminLink = document.createElement("a");
        adminLink.href = "admin.html";
        adminLink.textContent = "Admin Paneli";
        adminLi.appendChild(adminLink);

        const iletisimLi = [...navLinksUl.children].find(li =>
          li.querySelector("a")?.getAttribute("href") === "iletisim.html"
        );

        if (iletisimLi && iletisimLi.parentNode) {
          iletisimLi.parentNode.insertBefore(adminLi, iletisimLi.nextSibling);
        } else {
          navLinksUl.appendChild(adminLi);
        }
      }
    } else {
      if (loginLink) loginLink.style.display = "inline-block";
      if (registerLink) registerLink.style.display = "inline-block";
      if (logoutBtn) logoutBtn.style.display = "none";

      // Admin linki varsa kaldır
      const existingAdminLi = navLinksUl.querySelector("li.admin-link");
      if (existingAdminLi) {
        existingAdminLi.remove();
      }
    }
  }

  updateNavbar();

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    updateNavbar();
    location.href = "index.html";
  });
});

if (loggedInUser.username === "admin") {
  const adminLi = document.createElement("li");
  adminLi.classList.add("admin-link");
  const adminLink = document.createElement("a");
  adminLink.href = "admin.html";
  adminLink.textContent = "Admin Paneli";
  adminLi.appendChild(adminLink);

  // Direkt navbar sonuna ekle
  navLinksUl.appendChild(adminLi);
}
