// 01 Header
const headerRoborockImages = document.querySelectorAll('.s6MaxV__01-header__img');
const headerRoborockImageTop = document.querySelector('.s6MaxV__01-header__img').offsetTop;

// Helper functions
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

//// 01 HEADER
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
    distanceFromTop += 32;
    if (window.pageYOffset >= distanceFromTop) {
      headerRoborockImages.forEach(el => el.classList.add('displayNone'));
      headerRoborockImages[i].classList.remove('displayNone');
    }
  }
}

window.addEventListener('scroll', fixedPositionHeaderRoborockImages);
window.addEventListener('scroll', replaceHeaderRoborockImages);