let currentSlide = 0;

function nextSlide() {
  currentSlide = (currentSlide + 1) % 3;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + 3) % 3;
  updateSlider();
}

function updateSlider() {
  const slides = document.querySelector(".slides");
  const slideWidth = document.querySelector(".slide").clientWidth;

  slides.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
}
