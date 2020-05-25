// 01 Header
const headerRoborockImages = document.querySelectorAll('.s6MaxV__01-header__img');
const headerRoborockImage = document.querySelector('.s6MaxV__01-header__img');
let headerRoborockImageTop = headerRoborockImage.offsetTop;

// 03 Video and text
const section03 = document.querySelector('.s6MaxV__03-video');
const textSection03 = document.querySelector('.s6MaxV__03-video__text');
const videoSection03 = document.querySelector('.s6MaxV__03-video__video');
let section03OffsetTop;


// Helper functions
function debounced(delay, fn) {
  let timerId;
  return function (...args) {
      if (timerId) {
          clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
          fn(...args);
          timerId = null;
      }, delay);
  }
}

function throttled(delay, fn) {
  let lastCall = 0;
  return function (...args) {
      const now = (new Date).getTime();
      if (now - lastCall < delay) {
          return;
      }
      lastCall = now;
      return fn(...args);
  }
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

//// *** 01 HEADER ***
// update headerRoborockImageTop value on window resize
window.addEventListener('resize', () => headerRoborockImageTop = headerRoborockImage.offsetTop);

// after scroll down more than 'headerRoborockImageTop' value, change images' position to fixed and center them in viewport
function fixedPositionHeaderRoborockImages() {
  if (window.pageYOffset > headerRoborockImageTop) {
    headerRoborockImages.forEach(el => el.classList.add('fixedRoborockImage'));
  } else {
    headerRoborockImages.forEach(el => el.classList.remove('fixedRoborockImage'));
  }
}

// after scroll down more than 'headerRoborockImageTop' value, start repleacing images
function replaceHeaderRoborockImages() {
  let distanceFromTop = headerRoborockImageTop;
  for (let i=0; i<headerRoborockImages.length; i++) {
    distanceFromTop += 30;
    if (window.pageYOffset >= distanceFromTop) {
      headerRoborockImages.forEach(el => el.classList.add('displayNone'));
      headerRoborockImages[i].classList.remove('displayNone');
    }
  }
}

window.addEventListener('scroll', fixedPositionHeaderRoborockImages);
window.addEventListener('scroll', replaceHeaderRoborockImages);
//// ** END OF: 01 HEADER **


//// *** 03 VIDEO AND TEXT ***
// when 'section03' comes into view, slide it up and read it offsetTop
const slideUpSection03 = function() {
  if (isElementInViewport(section03)) {
    section03.classList.add('slideUp03ToTop');
    section03.addEventListener('transitionend', () => {
      textSection03.classList.add('slideUp03ToTop');
      videoSection03.play();
    });
    section03OffsetTop = section03.offsetTop;
  }
};

// hide headerRoborockImages when pageYOffset value is higher than section03 offsetTop
const hideHeaderRoborockImages = function() {
  if (window.pageYOffset > section03OffsetTop) {
    headerRoborockImages.forEach(el => el.classList.add('displayNone'));
  }
};

window.addEventListener('scroll', slideUpSection03);
window.addEventListener('scroll', hideHeaderRoborockImages);
