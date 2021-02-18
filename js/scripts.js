"use strict";

///// VARIABLES

// 00 Video
const videoSection00 = document.querySelector('.s6MaxV__00-video-main video');

// 01 Header
const headerRoborockImages = document.querySelectorAll('.s6MaxV__01-header__img');
const headerRoborockImageContainer = document.querySelector('.s6MaxV__01-header__image-container');
let headerRoborockImageContainerTop = headerRoborockImageContainer.offsetTop;

// 02 Texts
const penultimateH2 = document.querySelector('.s6MaxV__02-texts__text h2:nth-last-child(2)'); // acts as an anchor for showing up section 03

// 03 Video and text
const section03 = document.querySelector('.s6MaxV__03-video');
const textSection03 = document.querySelector('.s6MaxV__03-video__text');
const videoSection03 = document.querySelector('.s6MaxV__03-video__video');
let section03OffsetTop = section03.offsetTop;

// 04 Seeing
const imageSection04NoToolpit = document.querySelector('.s6MaxV__04-seeing__img--plain');
const imageSection04Toolpit = document.querySelector('.s6MaxV__04-seeing__img--tooltip');

// 05 Seeing
const imageSection05NoToolpit = document.querySelector('.s6MaxV__05-seeing__img--plain');
const imageSection05Toolpit = document.querySelector('.s6MaxV__05-seeing__img--tooltip');

// 06 Privacy
const section06Privacy = document.querySelector('.s6MaxV__06-privacy');
const privacyText = document.querySelector('.s6MaxV__06-privacy__text');
const privacyRoborockImage = document.querySelector('.s6MaxV__06-privacy__images__roborock');
const privacyLockTop = document.querySelector('.s6MaxV__06-privacy__lock__top');

// 07 Floor
const imageSection07Floor = document.querySelector('.s6MaxV__07-floor__image');

// 08 Suction
const suctionFeatures = document.querySelector('.s6MaxV__08-suction__features');
const suctionVideo = document.querySelector('.s6MaxV__08-suction__suction__video');
const section08Suction = document.querySelector('.s6MaxV__08-suction__suction');

// 09 Mapping
const mappingBoxes = document.querySelectorAll('.s6MaxV__09-mapping__box');

// 10 Learning
const learningContainer = document.querySelector('.s6MaxV__10-learning__container');

// 11 Features
const section11Features = document.querySelector('.s6MaxV__11-features');
const featuresSection11 = document.querySelectorAll('.s6MaxV__11-features__feature');



///// REUSABLE FUNCTIONS

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

function isElementInViewport(el) {
  if (el) {
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
}

function isElementFullyInViewport(el) {
  if (el) {
    const position = el.getBoundingClientRect();

    return (
      (position.top >= 0 && position.bottom <= window.innerHeight)
    );
  }
}

//checks if element has emerged from the bottom certain number of pixels
function ifElementScrolledUpIntoView(el, pixels) {
  if (el) {
    const position = el.getBoundingClientRect();

    return (
      (position.top >= 0 && position.top <= (window.innerHeight - pixels) 
      || (position.top < 0))
    );
  }
}


///// MAIN SCRIPTS

//// *** 00 VIDEO ***
const playVideo00 = throttled(200, function() {
  if (isElementInViewport(videoSection00)) {
    videoSection00.play();
  }
});

window.addEventListener('scroll', playVideo00);
//// ** END OF: 00 VIDEO **



//// *** 01 HEADER ***
// after scroll down more than 'headerRoborockImageContainerTop' value, change container's position to fixed 
const fixedHeaderRoborockImageContainer = throttled(100, function() {
  if (window.pageYOffset > headerRoborockImageContainerTop) {
    headerRoborockImageContainer.classList.add('fixed');
  } else {
    headerRoborockImageContainer.classList.remove('fixed');
  }
});

window.addEventListener('scroll', fixedHeaderRoborockImageContainer);


// after scroll down more than 'headerRoborockImageContainerTop' value, start repleacing images
const replaceHeaderRoborockImages = throttled(100, function() {
  let distanceFromTop = headerRoborockImageContainerTop;

  for (let i=0; i<headerRoborockImages.length; i++) {
    distanceFromTop += 30;
    if (window.pageYOffset >= distanceFromTop) {
      headerRoborockImages.forEach(el => el.classList.add('displayNone'));
      headerRoborockImages[i].classList.remove('displayNone');
    }
  }
});

window.addEventListener('scroll', replaceHeaderRoborockImages);


// update headerRoborockImageContainerTop value on window resize
window.addEventListener('resize', () => headerRoborockImageContainerTop = headerRoborockImageContainer.offsetTop);
//// ** END OF: 01 HEADER **


//// *** 03 VIDEO AND TEXT ***
// when 'section03' comes into view, slide it up and read it offsetTop
const slideUpSection03 = function() {
  const rect = penultimateH2.getBoundingClientRect();

  if (rect.top < 0 && rect.bottom <= window.innerHeight) {
    section03.classList.add('slideUpAndShow');
    section03.addEventListener('transitionend', () => {
      textSection03.classList.add('slideUpAndShow');
      videoSection03.play();
    });
    section03OffsetTop = section03.offsetTop;
  } else {
    section03.classList.remove('slideUpAndShow');
  }
};

window.addEventListener('scroll', slideUpSection03);


// hide headerRoborockImages when pageYOffset value is higher than section03 offsetTop
const hideHeaderRoborockImages = function() {
  if (window.pageYOffset > section03OffsetTop) {
    headerRoborockImages.forEach(el => el.classList.add('displayNone'));
  }
};

window.addEventListener('scroll', hideHeaderRoborockImages);
//// ** END OF: 03 VIDEO AND TEXT **


//// *** 04 SEEING ***
const showImageWithTooltip04 = throttled(200, function() {
  if (ifElementScrolledUpIntoView(imageSection04Toolpit, 300)) {
    imageSection04Toolpit.classList.remove('opacity0');
  } else {
    imageSection04Toolpit.classList.add('opacity0');
  }
});

window.addEventListener('scroll', showImageWithTooltip04);
//// ** END OF: 04 SEEING **


//// *** 05 SEEING ***
const showImageWithTooltip05 = throttled(200, function() {
  if (ifElementScrolledUpIntoView(imageSection05Toolpit, 300)) {
    imageSection05Toolpit.classList.remove('opacity0');
  } else {
    imageSection05Toolpit.classList.add('opacity0');
  }
});

window.addEventListener('scroll', showImageWithTooltip05);
//// ** END OF: 05 SEEING **


//// *** 06 PRIVACY ***
// slide up text
const showPrivacyText = throttled(100, function() {
  if (ifElementScrolledUpIntoView(section06Privacy, 300)) {
    privacyText.classList.add('slideUpAndShow');
  } else {
    privacyText.classList.remove('slideUpAndShow');
  }
});

window.addEventListener('scroll', showPrivacyText);


// animation lock
const animateLock = throttled(200, function() {
  if (isElementFullyInViewport(privacyRoborockImage)) {
    privacyLockTop.classList.add('rotate-lock');
  } else {
    privacyLockTop.classList.remove('rotate-lock');
  }
});

window.addEventListener('scroll', animateLock);
//// ** END OF: 06 PRIVACY **


//// *** 07 FLOOR ***
const slideUpImageSection07Floor = throttled(200, function() {
  if (isElementInViewport(imageSection07Floor)) {
    imageSection07Floor.classList.add('slideUpAndShow');
  } else {
    imageSection07Floor.classList.remove('slideUpAndShow');
  }
});

window.addEventListener('scroll', slideUpImageSection07Floor);
//// ** END OF: 07 FLOOR **


//// *** 08 SUCTION ***
const slideUpFeaturesSection08Suction = throttled(200, function() {
  if (isElementInViewport(suctionFeatures)) {
    suctionFeatures.classList.add('slideUpAndShow');
  } else {
    suctionFeatures.classList.remove('slideUpAndShow');
  }
});

window.addEventListener('scroll', slideUpFeaturesSection08Suction);


const playVideoSuction = throttled(200, function() {
  const suctionVideoHeight = suctionVideo.clientHeight;
  const height = suctionVideoHeight * .75;
  
  if (ifElementScrolledUpIntoView(suctionVideo, height)) {
    suctionVideo.play();
    window.removeEventListener('scroll', playVideoSuction);
  }
});


window.addEventListener('scroll', playVideoSuction);
//// ** END OF: 08 SUCTION **


//// *** 09 MAPPING ***
const mappingMatchMedia = window.matchMedia('(min-width: 751px)');

const mappingBoxesOpacity = throttled(100, function() {
  if (mappingMatchMedia.matches) {
    for (let i=0; i<mappingBoxes.length; i++) {
      if (isElementInViewport(mappingBoxes[i])) {
        if (mappingBoxes[i-1]) {
          mappingBoxes[i-1].classList.add('opacity0');
        }
      } else {
        if (mappingBoxes[i-1]) {
          mappingBoxes[i-1].classList.remove('opacity0');
        }
      }
    }
  }
});

window.addEventListener('scroll', mappingBoxesOpacity);
//// ** END OF: 09 MAPPING **


//// *** 10 LEARNING ***
const slideUpLearningContainer = throttled(200, function() {
  if (ifElementScrolledUpIntoView(learningContainer, 200)) {
    learningContainer.classList.add('slideUpAndShow');
  } else {
    learningContainer.classList.remove('slideUpAndShow');
  }
})

window.addEventListener('scroll', slideUpLearningContainer);
//// ** END OF: 10 LEARNING **


//// *** 11 FEATURES ***
const slideUpFeatures = throttled(200, function() {
  if (ifElementScrolledUpIntoView(section11Features, 300)) {
    featuresSection11.forEach(el => el.classList.add('slideUpAndShow'))
  } else {
    featuresSection11.forEach(el => el.classList.remove('slideUpAndShow'));
  }
});

window.addEventListener('scroll', slideUpFeatures);
//// ** END OF: 11 FEATURES **


//// *** TEXT ANNOTATIONS ***
const annotationBtn = document.querySelectorAll('.annotation-btn');
const annotationWrapper = document.querySelector('.annotation-wrapper');
const annotationCloseBtn = document.querySelector('.annotation-close-btn');
const annotationParagraph = document.querySelector('.annotation-text');

/* put here your annotations texts */
const annotationTexts = {
  "text-01": "Rzeczywiste ikony wyświetlane w aplikacji mogą różnić się od tych, przedstawionych w opisie.",
  "text-02": "Testy wewnętrzne producenta zgodnie z normami IEC 62885-5: 2016/5.8.",
  "text-03": "W oparciu o wewnętrzne testy producenta, przeprowadzone w trybie cichym, z pełną baterią i bez podłączonego mopa.",
  "text-04": "Aplikacja może zapisać maksymalnie 4 mapy. Mapa każdego piętra musi być indywidualnie ustawiona przed rozpoczęciem sprzątania.",
  "text-05": " Na podstawie wewnętrznego testu producenta, wykonanego na twardych podłogach, z pełnym zbiornikiem wody, pełnym akumulatorem i niskim przepływem wody. Rzeczywiste wyniki mogą się różnić w zależności od charakterystyki pomieszczenia. Zasięg jest wartością szacunkową, opartą na założeniu, że 20% powierzchni zajmują meble i nie trzeba ich wycierać.",
  "text-06": "Testy wewnętrzne producenta, przeprowadzone w trybie zrównoważonym, zgodnie ze standardami QB / T 483.",
  "text-07": "Produkowane i testowane przez firmę niezależną, zgodnie z normami EN 1822-1: 2009."
}

/* .annotation-btn events */
annotationBtn.forEach(function(button) {
  button.addEventListener('click', function() {
    const num = this.dataset.text;
    const text = annotationTexts[num];
    /* opener indicates which button has launched the annotation */
    const opener = annotationWrapper.dataset.opener;

    if (opener === 'none') {
      annotationParagraph.innerHTML = text;
      this.setAttribute('aria-describedby', 'annotation-text');
      annotationWrapper.dataset.opener = this.id;
      annotationWrapper.classList.add('show-annotation');
      this.classList.add('annotation-btn--active');

    } else if (opener === this.getAttribute('id')) {
      annotationWrapper.classList.remove('show-annotation');
      setTimeout(function() {
        annotationParagraph.innerHTML = '';
      }, 300);
      this.setAttribute('aria-describedby', '');
      annotationWrapper.dataset.opener = 'none';
      this.classList.remove('annotation-btn--active');
      
    } else if ((opener !== annotationWrapper.getAttribute('id') && (opener !== 'none'))) {
      annotationParagraph.innerHTML = text;
      annotationBtn.forEach(function(btn) {btn.setAttribute('aria-describedby', '')});
      this.setAttribute('aria-describedby', 'annotation-text');
      annotationWrapper.dataset.opener = this.id;
      annotationBtn.forEach(function(btn) {btn.classList.remove('annotation-btn--active')});
      this.classList.add('annotation-btn--active');
    }
  })
})

/* .annotation-close-btn events */
annotationCloseBtn.addEventListener('click', function() {
  annotationWrapper.classList.remove('show-annotation');
  setTimeout(function() {
    annotationParagraph.innerHTML = '';
  }, 300);
  annotationBtn.forEach(function(btn) {btn.setAttribute('aria-describedby', '')});
  annotationWrapper.dataset.opener = 'none';
  annotationBtn.forEach(function(btn) {btn.classList.remove('annotation-btn--active')});
});
//// ** END OF: TEXT ANNOTATIONS **