document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });

  // Sayfa yüklendiğinde kullanıcıları getir ve göster
  loadUsers();

  // Kullanıcı ekleme formu
  const addUserForm = document.getElementById("add-user-form");
  const addUserMessage = document.getElementById("add-user-message");

  addUserForm.addEventListener("submit", e => {
    e.preventDefault();

    const username = document.getElementById("new-username").value.trim();
    const email = document.getElementById("new-email").value.trim();
    const password = document.getElementById("new-password").value;

    if (password.length < 6) {
      addUserMessage.textContent = "Şifre en az 6 karakter olmalı.";
      addUserMessage.style.color = "red";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.username === username)) {
      addUserMessage.textContent = "Bu kullanıcı adı zaten mevcut.";
      addUserMessage.style.color = "red";
      return;
    }
    if (users.some(u => u.email === email)) {
      addUserMessage.textContent = "Bu email zaten kayıtlı.";
      addUserMessage.style.color = "red";
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    addUserMessage.textContent = "Kullanıcı başarıyla eklendi!";
    addUserMessage.style.color = "green";

    addUserForm.reset();
    loadUsers();
  });

  // Kullanıcıları yükleyip tabloya ekleyen fonksiyon
  function loadUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const tbody = document.querySelector("#user-table tbody");
    tbody.innerHTML = "";

    users.forEach((user, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td><button data-index="${index}" class="delete-btn">Sil</button></td>
      `;
      tbody.appendChild(tr);
    });

    document.getElementById("user-count").textContent = users.length;

    // Silme butonlarına event ekle
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const idx = parseInt(e.target.getAttribute("data-index"));
        if (confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) {
          users.splice(idx, 1);
          localStorage.setItem("users", JSON.stringify(users));
          loadUsers();
        }
      });
    });
  }
});
