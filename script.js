
      // Stockage des états des sliders
const sliderStates = {};

// Initialisation d'un slider
function initSlider(sliderId) {

    const slider = document.getElementById(sliderId);

    if (!slider) {
        console.error("Slider introuvable :", sliderId);
        return;
    }

    const slides = slider.querySelectorAll("img");

    sliderStates[sliderId] = {
        current: 0,
        total: slides.length
    };

    updateSlider(sliderId);
}

// Mise à jour de l'affichage
function updateSlider(sliderId) {

    const slider = document.getElementById(sliderId);
    const state = sliderStates[sliderId];

    if (!slider || !state) return;

    slider.style.transform =
        translateX(-${state.current * 100}%);

    // Mise à jour des points
    const dotsContainer =
        document.getElementById(
            "dots-" + sliderId.replace("slider-", "")
        );

    if (dotsContainer) {

        const dots =
            dotsContainer.querySelectorAll(".slider-dot");

        dots.forEach((dot, index) => {

            if (index === state.current) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }

        });
    }
}

// Bouton suivant/précédent
function moveSlide(sliderId, direction) {

    const state = sliderStates[sliderId];

    if (!state) return;

    state.current =
        (state.current + direction + state.total)
        % state.total;

    updateSlider(sliderId);
}

// Aller directement à une image
function goToSlide(sliderId, index) {

    const state = sliderStates[sliderId];

    if (!state) return;

    state.current = index;

    updateSlider(sliderId);
}

// Défilement automatique
function autoPlay(sliderId) {

    setInterval(() => {

        moveSlide(sliderId, 1);

    }, 5000);

}

// Chargement de la page
document.addEventListener("DOMContentLoaded", () => {

    // Toyota
    initSlider("slider-toyota");

    // Pajero
    initSlider("slider-pajero");

    // Galloper
    initSlider("slider-galloper");

    // Lecture automatique
    autoPlay("slider-toyota");
    autoPlay("slider-pajero");
    autoPlay("slider-galloper");

});