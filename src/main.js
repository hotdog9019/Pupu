const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;
openBtn.addEventListener('click', () => {
    lastActive = document.activeElement;
    dlg.showModal();                               // модальный режим + 
    затемнение
    dlg.querySelector('input,select,textarea,button')?.focus();
});
closeBtn.addEventListener('click', () => dlg.close('cancel'));
form?.addEventListener('submit', (e) => {
    const form = document.getElementById('contactForm');
    form?.addEventListener('submit', (e) => {
        // 1) Сброс кастомных сообщений 
        [...form.elements].forEach(el => el.setCustomValidity?.(''));
        // 2) Проверка встроенных ограничений 
        if (!form.checkValidity()) {
            e.preventDefault();
            // Пример: таргетированное сообщение 
            const email = form.elements.email;
            if (email?.validity.typeMismatch) {
                email.setCustomValidity('Введите корректный e-mail, например  name@example.com');
            }
            form.reportValidity(); // показать браузерные подсказки 
            // A11y: подсветка проблемных полей 
            [...form.elements].forEach(el => {
                if (el.willValidate) el.toggleAttribute('aria-invalid',
                    !el.checkValidity());
            });
            return;
        }
        // 3) Успешная «отправка» (без сервера) 
        e.preventDefault();
        // Если форма внутри <dialog>, закрываем окно: 
        document.getElementById('contactDialog')?.close('success');
        form.reset();
    });
});
// main.js
document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.getElementById("themeToggle");

  if (!themeButton) return; // если на странице нет кнопки, выходим

  // Получаем тему из localStorage или ставим светлую по умолчанию
  let currentTheme = localStorage.getItem("theme") || "light";

  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.style.background = "linear-gradient(135deg, #f44336, #000)";
      document.body.style.color = "#fff";
    } else {
      document.body.style.background = "linear-gradient(135deg, #4CAF50, #2196F3)";
      document.body.style.color = "#fff";
    }
    localStorage.setItem("theme", theme);
  }

  // Применяем тему при загрузке страницы
  applyTheme(currentTheme);

  // Переключение темы при клике
  themeButton.addEventListener("click", () => {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(currentTheme);
  });
});
