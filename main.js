document.addEventListener("DOMContentLoaded", function () {
  // Массив с изображениями фона
  const backgrounds = [
    "url('./img/summer-bg.jpg')",
    "url('./img/rainy-bg.jpg')",
    "url('./img/winter-bg.jpg')",
  ];

  // Массив с музыкой
  const audioFiles = [
    "./sounds/summer.mp3",
    "./sounds/rain.mp3",
    "./sounds/winter.mp3"
];

let currentAudio = new Audio(audioFiles[0]); // Текущий аудиофайл
let isPlaying = false; // Флаг воспроизведения
let activeContainer = null; // Контейнер с активной музыкой

  // Устанавливаем фон .sun при загрузке страницы
  document.body.style.backgroundImage = backgrounds[0];

  // Создаём обёртку для контейнеров
  const wrapper = document.createElement("div");
  wrapper.classList.add("container-wrapper");

  // Массив классов контейнеров
  const containerClasses = ["sun", "rain", "snow"];

  for (let i = 0; i < 3; i++) {
    let container = document.createElement("div");
    container.classList.add("container", containerClasses[i]); // Добавляем общий и уникальный класс

    // Создаём кнопку управления музыкой
    let playButton = document.createElement("div");
    playButton.classList.add("play-button");

    // Создаём ползунок громкости
    let volumeSlider = document.createElement("input");
    volumeSlider.classList.add("volume-slider");
    volumeSlider.type = "range";
    volumeSlider.min = "0";
    volumeSlider.max = "1";
    volumeSlider.step = "0.01";
    volumeSlider.value = "1"; // По умолчанию громкость 100%

    container.appendChild(playButton);
    container.appendChild(volumeSlider);

    container.appendChild(playButton); // Добавляем кнопку в контейнер

    // Добавляем обработчик клика, который меняет фон и музыку
    container.addEventListener("click", () => {
        document.body.style.backgroundImage = backgrounds[i];

        // Если выбрали новый контейнер, выключаем старый звук
        if (activeContainer && activeContainer !== container) {
            activeContainer.classList.remove("playing");
        }

        // Если музыка поменялась, загружаем новый трек
        if (currentAudio.src !== new URL(audioFiles[i], window.location).href) {
            currentAudio.pause();
            currentAudio = new Audio(audioFiles[i]);
            isPlaying = false;
        }

        // Включаем музыку или ставим на паузу
        if (!isPlaying) {
            currentAudio.play();
            isPlaying = true;
            container.classList.add("playing");
        } else {
            currentAudio.pause();
            isPlaying = false;
            container.classList.remove("playing");
        }

        activeContainer = container;
    });

    // Добавляем обработчик клика на кнопку воспроизведения
    playButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Чтобы клик не срабатывал на родительский контейнер

        if (isPlaying) {
            currentAudio.pause();
            isPlaying = false;
            container.classList.remove("playing");
        } else {
            currentAudio.play();
            isPlaying = true;
            container.classList.add("playing");
        }
    });

    // Добавляем обработчик клика, который меняет фон
    container.addEventListener("click", () => {
      document.body.style.backgroundImage = backgrounds[i];
    });

    // Добавляем обработчик изменения громкости
    volumeSlider.addEventListener("input", (event) => {
        currentAudio.volume = event.target.value;
    });

    // Добавляем контейнер в обёртку
    wrapper.appendChild(container);
}

// Добавляем обёртку в body
document.body.appendChild(wrapper);

// Обработчик нажатия пробела
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault(); // Чтобы не скроллилась страница

        if (isPlaying) {
            currentAudio.pause();
            isPlaying = false;
            if (activeContainer) activeContainer.classList.remove("playing");
        } else {
            currentAudio.play();
            isPlaying = true;
            if (activeContainer) activeContainer.classList.add("playing");
        }
    }
});
});