document.getElementById("girisForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const kullaniciAdi = document.getElementById("kullaniciadi").value;
  const sifre = document.getElementById("sifre").value;
  const uyari = document.getElementById("girisUyari");

  let veriler = JSON.parse(localStorage.getItem("veriler")) || [];
  const kullanici = veriler.find(u => u.kullaniciAdi === kullaniciAdi && u.sifre === sifre);

  if (!kullanici) {
    uyari.textContent = "Kullanıcı adı veya şifre hatalı.";
    return;
  }

  localStorage.setItem("kullanici", kullaniciAdi);
  window.location.href = "index.html";
});
