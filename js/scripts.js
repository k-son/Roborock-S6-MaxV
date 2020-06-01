/// VARIABLES
// 01 Header
const headerRoborockImages = document.querySelectorAll('.s6MaxV__01-header__img');
const headerRoborockImage = document.querySelector('.s6MaxV__01-header__img');
let headerRoborockImageTop = headerRoborockImage.offsetTop;

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
const mappingBackground = document.querySelector('.s6MaxV__09-mapping__background');
const mappingContainer = document.querySelector('.s6MaxV__09-mapping__container')

// 10 Learning
const learningContainer = document.querySelector('.s6MaxV__10-learning__container');

// 11 Features
const section11Features = document.querySelector('.s6MaxV__11-features');
const featuresSection11 = document.querySelectorAll('.s6MaxV__11-features__feature');

// Tooltips
let tooltips = document.querySelectorAll('.tooltip');
let tooltipTexts = document.querySelectorAll('.tooltiptext');
const closeTooltipBtns = document.querySelectorAll('.tooltipCloseBtn');


/// HELPER FUNCTIONS
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

function isElementFullyInViewportABC(el) {
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


/// MAIN SCRIPTS

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
  const rect = penultimateH2.getBoundingClientRect();

  if (rect.top < 0 && rect.bottom <= window.innerHeight) {
    section03.classList.add('s6MaxV-slideUpAndShow');
    section03.addEventListener('transitionend', () => {
      textSection03.classList.add('s6MaxV-slideUpAndShow');
      videoSection03.play();
    });
    section03OffsetTop = section03.offsetTop;
  } else {
    section03.classList.remove('s6MaxV-slideUpAndShow');
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
    privacyText.classList.add('s6MaxV-slideUpAndShow');
  } else {
    privacyText.classList.remove('s6MaxV-slideUpAndShow');
  }
});

// animation lock
const animateLock = throttled(200, function() {
  if (isElementFullyInViewportABC(privacyRoborockImage)) {
    privacyLockTop.classList.add('rotate-lock');
  } else {
    privacyLockTop.classList.remove('rotate-lock');
  }
});

window.addEventListener('scroll', showPrivacyText);
window.addEventListener('scroll', animateLock);
//// ** END OF: 06 PRIVACY **


//// *** 07 FLOOR ***
const slideUpImageSection07Floor = throttled(200, function() {
  if (isElementInViewport(imageSection07Floor)) {
    imageSection07Floor.classList.add('s6MaxV-slideUpAndShow');
  } else {
    imageSection07Floor.classList.remove('s6MaxV-slideUpAndShow');
  }
});

window.addEventListener('scroll', slideUpImageSection07Floor);
//// ** END OF: 07 FLOOR **


//// *** 08 SUCTION ***
const slideUpFeaturesSection08Suction = throttled(200, function() {
  if (isElementInViewport(suctionFeatures)) {
    suctionFeatures.classList.add('s6MaxV-slideUpAndShow');
  } else {
    suctionFeatures.classList.remove('s6MaxV-slideUpAndShow');
  }
});

const playVideoSuction = throttled(200, function() {
  const suctionVideoHeight = suctionVideo.clientHeight;
  const height = suctionVideoHeight * .75;
  
  if (ifElementScrolledUpIntoView(suctionVideo, height)) {
    suctionVideo.play();
    window.removeEventListener('scroll', playVideoSuction);
  }
});

window.addEventListener('scroll', slideUpFeaturesSection08Suction);
window.addEventListener('scroll', playVideoSuction);
//// ** END OF: 08 SUCTION **


//// *** 09 MAPPING ***
/*
const abc = function() {
  const mappingContainerBounds = mappingContainer.getBoundingClientRect();
  if (mappingContainerBounds.top > 50) {
    mappingContainer.classList.remove('s6MaxV-slideUpAndShow');
  }
};

const handleSectionMapping = throttled(100, function() {
  const backgroundPosition = mappingBackground.getBoundingClientRect();
  if (backgroundPosition.top < 0) {
    mappingBackground.classList.add('positionFixedTop');
    mappingContainer.classList.add('s6MaxV-slideUpAndShow');
    setTimeout(() => {
      window.addEventListener('sroll', abc);
    })
  }
});

window.addEventListener('scroll', handleSectionMapping);
*/
//// ** END OF: 09 MAPPING **


//// *** 10 LEARNING ***
const slideUpLearningContainer = throttled(200, function() {
  if (ifElementScrolledUpIntoView(learningContainer, 300)) {
    learningContainer.classList.add('s6MaxV-slideUpAndShow');
  } else {
    learningContainer.classList.remove('s6MaxV-slideUpAndShow');
  }
})

window.addEventListener('scroll', slideUpLearningContainer);
//// ** END OF: 10 LEARNING **


//// *** 11 FEATURES ***
const slideUpFeatures = throttled(200, function() {
  if (ifElementScrolledUpIntoView(section11Features, 300)) {
    featuresSection11.forEach(el => el.classList.add('s6MaxV-slideUpAndShow'))
  } else {
    featuresSection11.forEach(el => el.classList.remove('s6MaxV-slideUpAndShow'));
  }
});

window.addEventListener('scroll', slideUpFeatures);
//// ** END OF: 11 FEATURES **


//// *** TOOLTIPS ***
tooltips = Array.from(tooltips);

for (let i=0; i<tooltips.length; i++) {
  tooltips[i].addEventListener('click', function() {

    // close any other open tooltip
    const index = tooltips.indexOf(tooltips[i]);
    const clonedTooltips = tooltips.slice(0);
    clonedTooltips.splice(index, 1);

    clonedTooltips.forEach(el => {
      const tooltipBox = el.nextElementSibling.nextElementSibling;
      const closeBtn = tooltipBox.firstChild;
      tooltipBox.classList.remove('showTooltipText');
      closeBtn.classList.add('displayNone'); // make closeBtn keyboard unaccessible
      el.classList.remove('colorInfo');
    });

    // open selected tooltip
    const tooltipBox = tooltips[i].nextElementSibling.nextElementSibling;
    tooltipBox.classList.toggle('showTooltipText');
    tooltips[i].classList.toggle('colorInfo');
    closeTooltipBtns[i].classList.toggle('displayNone');

    // close tooltip on close button press
    closeTooltipBtns[i].addEventListener('click', function() {
      tooltipBox.classList.remove('showTooltipText');
      tooltips[i].classList.remove('colorInfo');
      this.classList.add('displayNone');
    })
  })
}
//// ** END OF: TOOLTIPS **