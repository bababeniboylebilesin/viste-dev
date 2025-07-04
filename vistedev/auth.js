// Auth modüllerinin ortak işlevleri (şu an sadece updateNavbar var, ayrıca login ve register sayfalarında inline kullanılıyor)
// Ek işlevler buraya eklenebilir, şimdilik boş bırakıyorum.
// auth.js

// Navbar güncelleme
function updateNavbar() {
  const navLinks = document.querySelector('.nav-links');
  const isLoggedIn = localStorage.getItem("adminLoggedIn");

  if (isLoggedIn) {
    // Giriş yaptıysa Giriş/Kayıt butonlarını gizle, Çıkış göster
    navLinks.innerHTML = `
      <li><a href="index.html">Anasayfa</a></li>
      <li><a href="hakkimizda.html">Hakkımızda</a></li>
      <li><a href="hizmetler.html">Hizmetler</a></li>
      <li><a href="fiyatlandirma.html">Fiyatlandırma</a></li>
      <li><a href="iletisim.html">İletişim</a></li>
      <li><a href="admin.html">Admin Panel</a></li>
      <li><button onclick="logout()">Çıkış Yap</button></li>
    `;
  }
}

// Giriş kontrolü (admin.html içinde çağrılır)
function checkAdminAuth() {
  if (!localStorage.getItem("adminLoggedIn")) {
    window.location.href = "giris.html";
  }
}

// Çıkış
function logout() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "index.html";
}

// Sayfa yüklendiğinde navbar'ı güncelle
document.addEventListener("DOMContentLoaded", updateNavbar);function updateNavbar() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const navLinks = document.querySelector(".nav-links");
  
  if (!navLinks) return;

  if (user) {
    // Giriş yapılmış: Giriş/Kayıt butonlarını gizle, çıkış yap butonu göster
    navLinks.innerHTML = `
      <li><a href="index.html">Anasayfa</a></li>
      <li><a href="hakkimizda.html">Hakkımızda</a></li>
      <li><a href="hizmetler.html">Hizmetlerimiz</a></li>
      <li><a href="fiyatlandirma.html">Fiyatlandırma</a></li>
      <li><a href="iletisim.html">İletişim</a></li>
      <li><button id="logout-btn">Çıkış Yap</button></li>
    `;

    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      updateNavbar();
      window.location.href = "index.html";
    });

  } else {
    // Giriş yapılmamış: Giriş ve Kayıt linklerini göster, çıkış yap butonunu gizle
    navLinks.innerHTML = `
      <li><a href="index.html">Anasayfa</a></li>
      <li><a href="hakkimizda.html">Hakkımızda</a></li>
      <li><a href="hizmetler.html">Hizmetlerimiz</a></li>
      <li><a href="fiyatlandirma.html">Fiyatlandırma</a></li>
      <li><a href="iletisim.html">İletişim</a></li>
      <li><a href="giris.html">Giriş</a></li>
      <li><a href="kayit.html">Kayıt</a></li>
    `;
  }
}

// Sayfa yüklendiğinde navbar güncelle
document.addEventListener("DOMContentLoaded", updateNavbar);

