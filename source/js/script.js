// NAV
// return
let navMain = document.querySelector('.main-nav');
let navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

// SLIDER
let sliderList = document.querySelector('.slider-list');
let sliderFatCat = document.querySelector('.slider-list__fat-cat');
let sliderSkinnyCat = document.querySelector('.slider-list__skynny-cat');
let sliderButtonPosition = document.querySelector('.promo-result__range');
let sliderButton = document.querySelector('.range-button');

// Slider state
var sliderState = {
  slide: false,
  widthPx: 0,
  position: 50,
  positionPx: 0,

  mouseDownClientX: 0,
  oldPositionPx: 0,
};

if (sliderList) {
  sliderState.widthPx = sliderList.offsetWidth;
  sliderState.positionPx = sliderState.widthPx * sliderState.position / 100;

  // Event listeners
  sliderButton.addEventListener('mousedown', function(event) {
    sliderState.slide = true;
    sliderState.mouseDownClientX = event.clientX;
    sliderState.oldPositionPx = sliderState.positionPx;
  });

  document.addEventListener('mouseup', function() {
    sliderState.slide = false;
  });

  sliderList.addEventListener('mousemove', function(event) {
    if (sliderState.slide) {
      // calc mouse move px
      const movePx = event.clientX - sliderState.mouseDownClientX;
      let newPositionPx = sliderState.oldPositionPx + movePx;

      // save new position
      if (newPositionPx >= 0 && newPositionPx <= sliderState.widthPx) {
        sliderState.positionPx = newPositionPx;
        sliderState.position = parseFloat(newPositionPx / (sliderState.widthPx / 100)).toFixed(2);
      }

      sliderButtonPosition.style.left = `${sliderState.position}%`;
      sliderFatCat.style.width = `${sliderState.position}%`
      sliderSkinnyCat.style.width = `${100 - sliderState.position}%`
    }
  });
}
