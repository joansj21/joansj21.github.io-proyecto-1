let currentIndex = 0;
const items = document.querySelectorAll('.carousel__item');

function moveCarousel(direction) {
  currentIndex += direction;
  if (currentIndex < 0) {
    currentIndex = items.length - 1;
  } else if (currentIndex >= items.length) {
    currentIndex = 0;
  }
  updateCarousel();
}

function updateCarousel() {
  const distance = -currentIndex * 100;
  document.querySelector('.carousel__container').style.transform = `translateX(${distance}%)`;
}
