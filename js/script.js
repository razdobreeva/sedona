var link = document.querySelector(".booking__button");
var form = document.querySelector(".booking__form");

var checkIn = form.querySelector("[name=check-in]");
var checkOut = form.querySelector("[name=check-out]");
var adults = form.querySelector("[name=adults]");
var children = form.querySelector("[name=children]");
var search = form.querySelector(".booking__search-button");

var isStorageSupport = true;
var storage = "";

// по умолчанию форма поиска должна быть закрыта
form.classList.remove("booking__form--show");

try {
    storage = localStorage.getItem("checkIn");
    storage = localStorage.getItem("checkOut");
    storage = localStorage.getItem("adults");
    storage = localStorage.getItem("children");
  } catch (err) {
    isStorageSupport = false;
  }

// ловим событие клика по кнопке "Поиск гостиницы в Седоне"
link.addEventListener("click", function (evt) {
  // отменим стандартное действие ссылки при нажатии на неё
  evt.preventDefault();
  // с помощью метода classList.toggle переключаем этот класс по клику на ссылку
  form.classList.toggle("booking__form--show");
  if (!form.classList.contains("booking__form--show")) {
    form.classList.remove("booking__error");
  }
});

search.addEventListener("click", function(evt) {
  if (!checkIn.value || !checkOut.value || !adults.value || !children.value) {
    evt.preventDefault();
    // небольшой хак, чтобы анимация ошибки отрабатывала несколько раз, если форма не валидна
    form.classList.remove("booking__error");
    form.offsetWidth = form.offsetWidth;
    form.classList.add("booking__error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("checkIn", checkIn.value);
      localStorage.setItem("checkOut", checkOut.value);
      localStorage.setItem("adults", adults.value);
      localStorage.setItem("children", children.value);
    }
  }
});

// закрываем модальное окно при нажатии ESC
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (form.classList.contains("booking__form--show")) {
      form.classList.remove("booking__form--show");
      form.classList.remove("booking__error");
    }
  }
});
