document.getElementById("kayitForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const kullaniciAdi = document.getElementById("kullaniciadi").value;
  const email = document.getElementById("email").value;
  const sifre = document.getElementById("sifre").value;
  const uyari = document.getElementById("kayitUyari");

  if (sifre.length < 6) {
    uyari.textContent = "Şifre en az 6 karakter olmalıdır.";
    return;
  }

  let veriler = JSON.parse(localStorage.getItem("veriler")) || [];

  if (veriler.some(u => u.email === email)) {
    uyari.textContent = "Bu mail sistemde kayıtlı.";
    return;
  }

  if (veriler.some(u => u.kullaniciAdi === kullaniciAdi)) {
    uyari.textContent = "Bu kullanıcı adı zaten alınmış.";
    return;
  }

  veriler.push({ kullaniciAdi, email, sifre });
  localStorage.setItem("veriler", JSON.stringify(veriler));

  localStorage.setItem("kullanici", kullaniciAdi);
  window.location.href = "index.html";
});
