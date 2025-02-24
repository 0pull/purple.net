// Данные для сайта
const serverStatus = 0; // 1 - активно, 0 - неактивно
const serverIP = "purplenet.aternos.me:24070";
const teamCreationDate = new Date("2025-02-20"); // Дата создания команды
const admins = ["quelli", "Ниона"];
const membersCount = 12;

const birthdays = [
  { name: "@quellaw", date: "2000-09-27" },
  { name: "@Sans_Muslim", date: "2000-10-01" },
  { name: "@PoMidoR_ph", date: "2000-11-19" },
  { name: "@Bloodydemon90", date: "2000-08-03" },
  { name: "@zavnes", date: "2000-06-13" },
  { name: "Беляш", date: "2000-10-01" },
  { name: "@fracturedbody", date: "2000-02-29" },
];

// Обновление состояния сервера
const serverStatusElement = document.getElementById("server-status");
const serverIPElement = document.getElementById("server-ip");

if (serverStatus === 1) {
  serverStatusElement.textContent = "Активно";
  serverStatusElement.classList.add("active");
} else {
  serverStatusElement.textContent = "Неактивно";
}

serverIPElement.textContent = serverIP;

// Логика для дней рождения
let congratulationShown = false; // Флаг для отслеживания, было ли показано поздравление

function updateBirthdays() {
  const now = new Date();
  const upcomingBirthdays = birthdays
    .map(b => {
      const birthdayDate = new Date(b.date);
      birthdayDate.setFullYear(now.getFullYear());
      if (birthdayDate < now) {
        birthdayDate.setFullYear(now.getFullYear() + 1);
      }
      const diff = (birthdayDate - now) / 1000; // Разница в секундах
      return { ...b, date: birthdayDate, diff };
    })
    .filter(b => b.diff >= 0)
    .sort((a, b) => a.diff - b.diff);

  const mainTimer = document.getElementById("main-timer");
  const secondaryTimers = document.getElementById("secondary-timers");
  const birthdaySection = document.getElementById("birthdays");

  // Проверяем, есть ли сегодня день рождения
  const todayBirthdays = birthdays.filter(b => {
    const birthdayDate = new Date(b.date);
    return (
      birthdayDate.getDate() === now.getDate() &&
      birthdayDate.getMonth() === now.getMonth()
    );
  });

  if (todayBirthdays.length > 0 && !congratulationShown) {
    // Праздничная тема
    birthdaySection.style.backgroundColor = "#4a148c"; // Темно-фиолетовый
    birthdaySection.style.color = "#fff";

    // Поздравление
    const congratulation = document.createElement("div");
    congratulation.className = "congratulation";
    congratulation.innerHTML = `
      <h2>🎉 Сегодня день рождения у:</h2>
      <ul>
        ${todayBirthdays.map(b => `<li>${b.name}</li>`).join("")}
      </ul>
    `;
    birthdaySection.prepend(congratulation);

    congratulationShown = true; // Устанавливаем флаг, что поздравление показано
  } else if (todayBirthdays.length === 0) {
    // Обычная тема
    birthdaySection.style.backgroundColor = "#000";
    birthdaySection.style.color = "#fff";
    const congratulation = document.querySelector(".congratulation");
    if (congratulation) {
      congratulation.remove();
    }
    congratulationShown = false; // Сбрасываем флаг, если день рождения прошел
  }

  if (upcomingBirthdays.length > 0) {
    const nextBirthday = upcomingBirthdays[0];
    const days = Math.floor(nextBirthday.diff / (60 * 60 * 24));
    const hours = Math.floor((nextBirthday.diff % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((nextBirthday.diff % (60 * 60)) / 60);
    const seconds = Math.floor(nextBirthday.diff % 60);

    mainTimer.innerHTML = `
      <div class="nickname">${nextBirthday.name}</div>
      <div class="timer">${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}</div>
    `;
  }

  secondaryTimers.innerHTML = upcomingBirthdays
    .slice(1)
    .map(b => {
      const days = Math.floor(b.diff / (60 * 60 * 24));
      const hours = Math.floor((b.diff % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((b.diff % (60 * 60)) / 60);
      const seconds = Math.floor(b.diff % 60);

      return `
        <div class="birthday-card">
          <div class="nickname">${b.name}</div>
          <div class="timer">${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}</div>
        </div>
      `;
    })
    .join("");
}

setInterval(updateBirthdays, 1000);
updateBirthdays(); // Инициализация при загрузке

// Логика для статистики
function updateStats() {
  const now = new Date();
  const diff = now - teamCreationDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("team-age").textContent = `${days} дней, ${hours} часов, ${minutes} минут, ${seconds} секунд`;
  document.getElementById("admins-list").textContent = admins.join(", ");
  document.getElementById("members-count").textContent = membersCount;
}

setInterval(updateStats, 1000);
updateStats(); // Инициализация при загрузке

// Логика для вкладок
function showTab(tabName) {
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.classList.remove("active");
  });
  document.querySelectorAll(".tab-button").forEach(button => {
    button.classList.remove("active");
  });
  document.getElementById(tabName).classList.add("active");
  document.querySelector(`button[onclick="showTab('${tabName}')"]`).classList.add("active");
}

// Логика для модификаций
function downloadMod(filename) {
  const link = document.createElement("a");
  link.href = filename;
  link.download = filename;
  link.click();
}

// Навигация
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelectorAll("section").forEach(section => {
      section.classList.remove("active");
    });
    document.querySelector(this.getAttribute("href")).classList.add("active");
  });
});

// Выдвигающееся меню
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const mainContent = document.querySelector("main");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  mainContent.classList.toggle("shifted");
});

// Закрытие меню при клике вне его области
document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
    sidebar.classList.remove("active");
    mainContent.classList.remove("shifted");
  }
});