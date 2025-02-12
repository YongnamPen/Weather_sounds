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

    // SVG-иконки для кнопок "Play"
    const playIcons = [
        `<img src="./img/sun.svg" width="30" height="30" alt="Лето">`,
        `<img src="./img/cloud-rain.svg" width="30" height="30" alt="Дождь">`,
        `<img src="./img/cloud-snow.svg" width="30" height="30" alt="Зима">`
    ];

    // SVG-иконки для кнопок "Pause"
    const pauseIcons = [
        `<img src="./img/pause.svg" width="30" height="30" alt="Пауза">`,
        `<img src="./img/pause.svg" width="30" height="30" alt="Пауза">`,
        `<img src="./img/pause.svg" width="30" height="30" alt="Пауза">`
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

    // Функция смены фона и управления музыкой
    function changeBackgroundAndMusic(index, container) {
        document.body.style.backgroundImage = backgrounds[index];

        if (activeContainer && activeContainer !== container) {
            activeContainer.classList.remove("playing");
            activeContainer.querySelector(".play-button").innerHTML = playIcons[containerClasses.indexOf(activeContainer.classList[1])];
        }

        if (currentAudio.src !== new URL(audioFiles[index], window.location).href) {
            currentAudio.pause();
            currentAudio = new Audio(audioFiles[index]);
            currentAudio.volume = volumeSlider.value; // Устанавливаем громкость с ползунка
            isPlaying = false;
        }

        if (!isPlaying) {
            currentAudio.play();
            isPlaying = true;
            container.classList.add("playing");
            container.querySelector(".play-button").innerHTML = pauseIcons[index]; // Меняем иконку на "Пауза"
        } else {
            currentAudio.pause();
            isPlaying = false;
            container.classList.remove("playing");
            container.querySelector(".play-button").innerHTML = playIcons[index]; // Возвращаем иконку "Play"
        }

        activeContainer = container;
    }

    for (let i = 0; i < 3; i++) {
        let container = document.createElement("div");
        container.classList.add("container", containerClasses[i]);

        // Создаём кнопку управления музыкой (SVG-иконка)
        let playButton = document.createElement("div");
        playButton.classList.add("play-button");
        playButton.innerHTML = playIcons[i]; // Начальная иконка

        container.appendChild(playButton);

        // Добавляем обработчик клика на контейнер
        container.addEventListener("click", () => {
            changeBackgroundAndMusic(i, container);
        });

        // Добавляем обработчик клика на SVG-кнопку воспроизведения
        playButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Чтобы клик не срабатывал на родительский контейнер
            changeBackgroundAndMusic(i, container);
        });

        wrapper.appendChild(container);
    }

    // Добавляем обёртку в body
    document.body.appendChild(wrapper);

    // Создаём общий ползунок громкости
    const volumeSlider = document.createElement("input");
    volumeSlider.classList.add("global-volume-slider");
    volumeSlider.type = "range";
    volumeSlider.min = "0";
    volumeSlider.max = "1";
    volumeSlider.step = "0.05";
    volumeSlider.value = "1"; // По умолчанию громкость 100%

    // Обработчик изменения громкости
    volumeSlider.addEventListener("input", (event) => {
        currentAudio.volume = event.target.value;
    });

    // Добавляем ползунок в body
    document.body.appendChild(volumeSlider);

    // Обработчик нажатия пробела
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            event.preventDefault();

            if (isPlaying) {
                currentAudio.pause();
                isPlaying = false;
                if (activeContainer) {
                    activeContainer.classList.remove("playing");
                    activeContainer.querySelector(".play-button").innerHTML = playIcons[containerClasses.indexOf(activeContainer.classList[1])];
                }
            } else {
                currentAudio.play();
                isPlaying = true;
                if (activeContainer) {
                    activeContainer.classList.add("playing");
                    activeContainer.querySelector(".play-button").innerHTML = pauseIcons[containerClasses.indexOf(activeContainer.classList[1])];
                }
            }
        }
    });
});
