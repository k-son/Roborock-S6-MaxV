"use strict";

///// VARIABLES
// 00 Video
var videoSection00 = document.querySelector('.s6MaxV__00-video-main video'); // 01 Header

var headerRoborockImages = document.querySelectorAll('.s6MaxV__01-header__img');
var headerRoborockImageContainer = document.querySelector('.s6MaxV__01-header__image-container');
var headerRoborockImageContainerTop = headerRoborockImageContainer.offsetTop; // 02 Texts

var penultimateH2 = document.querySelector('.s6MaxV__02-texts__text h2:nth-last-child(2)'); // acts as an anchor for showing up section 03
// 03 Video and text

var section03 = document.querySelector('.s6MaxV__03-video');
var textSection03 = document.querySelector('.s6MaxV__03-video__text');
var videoSection03 = document.querySelector('.s6MaxV__03-video__video');
var section03OffsetTop = section03.offsetTop; // 04 Seeing

var imageSection04NoToolpit = document.querySelector('.s6MaxV__04-seeing__img--plain');
var imageSection04Toolpit = document.querySelector('.s6MaxV__04-seeing__img--tooltip'); // 05 Seeing

var imageSection05NoToolpit = document.querySelector('.s6MaxV__05-seeing__img--plain');
var imageSection05Toolpit = document.querySelector('.s6MaxV__05-seeing__img--tooltip'); // 06 Privacy

var section06Privacy = document.querySelector('.s6MaxV__06-privacy');
var privacyText = document.querySelector('.s6MaxV__06-privacy__text');
var privacyRoborockImage = document.querySelector('.s6MaxV__06-privacy__images__roborock');
var privacyLockTop = document.querySelector('.s6MaxV__06-privacy__lock__top'); // 07 Floor

var imageSection07Floor = document.querySelector('.s6MaxV__07-floor__image'); // 08 Suction

var suctionFeatures = document.querySelector('.s6MaxV__08-suction__features');
var suctionVideo = document.querySelector('.s6MaxV__08-suction__suction__video');
var section08Suction = document.querySelector('.s6MaxV__08-suction__suction'); // 09 Mapping

var mappingBoxes = document.querySelectorAll('.s6MaxV__09-mapping__box'); // 10 Learning

var learningContainer = document.querySelector('.s6MaxV__10-learning__container'); // 11 Features

var section11Features = document.querySelector('.s6MaxV__11-features');
var featuresSection11 = document.querySelectorAll('.s6MaxV__11-features__feature'); // Tooltips

var tooltips = document.querySelectorAll('.tooltip');
var tooltipTexts = document.querySelectorAll('.tooltiptext');
var closeTooltipBtns = document.querySelectorAll('.tooltipCloseBtn'); ///// REUSABLE FUNCTIONS

function throttled(delay, fn) {
  var lastCall = 0;
  return function () {
    var now = new Date().getTime();

    if (now - lastCall < delay) {
      return;
    }

    lastCall = now;
    return fn.apply(void 0, arguments);
  };
}

function debounced(delay, fn) {
  var timerId;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(function () {
      fn.apply(void 0, args);
      timerId = null;
    }, delay);
  };
}

function isElementInViewport(el) {
  if (el) {
    var rect = el.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom >= 0 || rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight) || rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  }
}

function isElementFullyInViewport(el) {
  if (el) {
    var position = el.getBoundingClientRect();
    return position.top >= 0 && position.bottom <= window.innerHeight;
  }
} //checks if element has emerged from the bottom certain number of pixels


function ifElementScrolledUpIntoView(el, pixels) {
  if (el) {
    var position = el.getBoundingClientRect();
    return position.top >= 0 && position.top <= window.innerHeight - pixels || position.top < 0;
  }
} ///// MAIN SCRIPTS
//// *** 00 VIDEO ***


var playVideo00 = throttled(200, function () {
  if (isElementInViewport(videoSection00)) {
    videoSection00.play();
  }
});
window.addEventListener('scroll', playVideo00); //// ** END OF: 00 VIDEO **
//// *** 01 HEADER ***
// after scroll down more than 'headerRoborockImageContainerTop' value, change container's position to fixed 

var fixedHeaderRoborockImageContainer = throttled(100, function () {
  if (window.pageYOffset > headerRoborockImageContainerTop) {
    headerRoborockImageContainer.classList.add('fixedRoborockImage');
  } else {
    headerRoborockImageContainer.classList.remove('fixedRoborockImage');
  }
});
window.addEventListener('scroll', fixedHeaderRoborockImageContainer); // after scroll down more than 'headerRoborockImageContainerTop' value, start repleacing images

var replaceHeaderRoborockImages = throttled(100, function () {
  var distanceFromTop = headerRoborockImageContainerTop;

  for (var i = 0; i < headerRoborockImages.length; i++) {
    distanceFromTop += 30;

    if (window.pageYOffset >= distanceFromTop) {
      headerRoborockImages.forEach(function (el) {
        return el.classList.add('displayNone');
      });
      headerRoborockImages[i].classList.remove('displayNone');
    }
  }
});
window.addEventListener('scroll', replaceHeaderRoborockImages); // update headerRoborockImageContainerTop value on window resize

window.addEventListener('resize', function () {
  return headerRoborockImageContainerTop = headerRoborockImageContainer.offsetTop;
}); //// ** END OF: 01 HEADER **
//// *** 03 VIDEO AND TEXT ***
// when 'section03' comes into view, slide it up and read it offsetTop

var slideUpSection03 = function slideUpSection03() {
  var rect = penultimateH2.getBoundingClientRect();

  if (rect.top < 0 && rect.bottom <= window.innerHeight) {
    section03.classList.add('slideUpAndShow');
    section03.addEventListener('transitionend', function () {
      textSection03.classList.add('slideUpAndShow');
      videoSection03.play();
    });
    section03OffsetTop = section03.offsetTop;
  } else {
    section03.classList.remove('slideUpAndShow');
  }
};

window.addEventListener('scroll', slideUpSection03); // hide headerRoborockImages when pageYOffset value is higher than section03 offsetTop

var hideHeaderRoborockImages = function hideHeaderRoborockImages() {
  if (window.pageYOffset > section03OffsetTop) {
    headerRoborockImages.forEach(function (el) {
      return el.classList.add('displayNone');
    });
  }
};

window.addEventListener('scroll', hideHeaderRoborockImages); //// ** END OF: 03 VIDEO AND TEXT **
//// *** 04 SEEING ***

var showImageWithTooltip04 = throttled(200, function () {
  if (ifElementScrolledUpIntoView(imageSection04Toolpit, 300)) {
    imageSection04Toolpit.classList.remove('opacity0');
  } else {
    imageSection04Toolpit.classList.add('opacity0');
  }
});
window.addEventListener('scroll', showImageWithTooltip04); //// ** END OF: 04 SEEING **
//// *** 05 SEEING ***

var showImageWithTooltip05 = throttled(200, function () {
  if (ifElementScrolledUpIntoView(imageSection05Toolpit, 300)) {
    imageSection05Toolpit.classList.remove('opacity0');
  } else {
    imageSection05Toolpit.classList.add('opacity0');
  }
});
window.addEventListener('scroll', showImageWithTooltip05); //// ** END OF: 05 SEEING **
//// *** 06 PRIVACY ***
// slide up text

var showPrivacyText = throttled(100, function () {
  if (ifElementScrolledUpIntoView(section06Privacy, 300)) {
    privacyText.classList.add('slideUpAndShow');
  } else {
    privacyText.classList.remove('slideUpAndShow');
  }
});
window.addEventListener('scroll', showPrivacyText); // animation lock

var animateLock = throttled(200, function () {
  if (isElementFullyInViewport(privacyRoborockImage)) {
    privacyLockTop.classList.add('rotate-lock');
  } else {
    privacyLockTop.classList.remove('rotate-lock');
  }
});
window.addEventListener('scroll', animateLock); //// ** END OF: 06 PRIVACY **
//// *** 07 FLOOR ***

var slideUpImageSection07Floor = throttled(200, function () {
  if (isElementInViewport(imageSection07Floor)) {
    imageSection07Floor.classList.add('slideUpAndShow');
  } else {
    imageSection07Floor.classList.remove('slideUpAndShow');
  }
});
window.addEventListener('scroll', slideUpImageSection07Floor); //// ** END OF: 07 FLOOR **
//// *** 08 SUCTION ***

var slideUpFeaturesSection08Suction = throttled(200, function () {
  if (isElementInViewport(suctionFeatures)) {
    suctionFeatures.classList.add('slideUpAndShow');
  } else {
    suctionFeatures.classList.remove('slideUpAndShow');
  }
});
window.addEventListener('scroll', slideUpFeaturesSection08Suction);
var playVideoSuction = throttled(200, function () {
  var suctionVideoHeight = suctionVideo.clientHeight;
  var height = suctionVideoHeight * .75;

  if (ifElementScrolledUpIntoView(suctionVideo, height)) {
    suctionVideo.play();
    window.removeEventListener('scroll', playVideoSuction);
  }
});
window.addEventListener('scroll', playVideoSuction); //// ** END OF: 08 SUCTION **
//// *** 09 MAPPING ***

var mappingMatchMedia = window.matchMedia('(min-width: 751px)');
var mappingBoxesOpacity = throttled(100, function () {
  if (mappingMatchMedia.matches) {
    for (var i = 0; i < mappingBoxes.length; i++) {
      if (isElementInViewport(mappingBoxes[i])) {
        if (mappingBoxes[i - 1]) {
          mappingBoxes[i - 1].classList.add('opacity0');
        }
      } else {
        if (mappingBoxes[i - 1]) {
          mappingBoxes[i - 1].classList.remove('opacity0');
        }
      }
    }
  }
});
window.addEventListener('scroll', mappingBoxesOpacity); //// ** END OF: 09 MAPPING **
//// *** 10 LEARNING ***

var slideUpLearningContainer = throttled(200, function () {
  if (ifElementScrolledUpIntoView(learningContainer, 200)) {
    learningContainer.classList.add('slideUpAndShow');
  } else {
    learningContainer.classList.remove('slideUpAndShow');
  }
});
window.addEventListener('scroll', slideUpLearningContainer); //// ** END OF: 10 LEARNING **
//// *** 11 FEATURES ***

var slideUpFeatures = throttled(200, function () {
  if (ifElementScrolledUpIntoView(section11Features, 300)) {
    featuresSection11.forEach(function (el) {
      return el.classList.add('slideUpAndShow');
    });
  } else {
    featuresSection11.forEach(function (el) {
      return el.classList.remove('slideUpAndShow');
    });
  }
});
window.addEventListener('scroll', slideUpFeatures); //// ** END OF: 11 FEATURES **
//// *** TOOLTIPS ***

tooltips = Array.from(tooltips);

var _loop = function _loop(i) {
  tooltips[i].addEventListener('click', function () {
    // close any other open tooltip
    var index = tooltips.indexOf(tooltips[i]);
    var clonedTooltips = tooltips.slice(0);
    clonedTooltips.splice(index, 1);
    clonedTooltips.forEach(function (el) {
      var tooltipBox = el.nextElementSibling.nextElementSibling;
      var closeBtn = tooltipBox.firstChild;
      tooltipBox.classList.remove('showTooltipText');
      closeBtn.classList.add('displayNone'); // make closeBtn keyboard unaccessible

      el.classList.remove('colorInfo');
    }); // open selected tooltip

    var tooltipBox = tooltips[i].nextElementSibling.nextElementSibling;
    tooltipBox.classList.toggle('showTooltipText');
    tooltips[i].classList.toggle('colorInfo');
    closeTooltipBtns[i].classList.toggle('displayNone'); // close tooltip on close button press

    closeTooltipBtns[i].addEventListener('click', function () {
      tooltipBox.classList.remove('showTooltipText');
      tooltips[i].classList.remove('colorInfo');
      this.classList.add('displayNone');
    });
  });
};

for (var i = 0; i < tooltips.length; i++) {
  _loop(i);
} //// ** END OF: TOOLTIPS **