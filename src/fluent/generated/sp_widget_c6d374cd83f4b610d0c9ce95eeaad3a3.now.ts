import { SPWidget } from '@servicenow/sdk/core'

SPWidget({
    $id: Now.ID['c6d374cd83f4b610d0c9ce95eeaad3a3'],
    name: 'Custom Search and Carousel',
    clientScript: `api.controller = function($scope, $timeout) {
  /* widget controller */
  var c = this;

  // ==== CUSTOM HOMEPAGE SEARCH LOGIC ====
  var today = new Date();
  var hour = today.getHours();
  var greeting;

  // Determine the correct greeting based on the time of day
  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  // If the user's first name was successfully retrieved, create the personalized greeting
  if (c.data.firstName) {
    c.greeting = greeting + ", " + c.data.firstName + "!";
  }

  // ==== GOLD CAROUSEL LOGIC ====
  let slideIndex = 0;
  let timer = 7; // sec
  const _timer = timer;
  let autoPlayInterval;

  function showSlides() {
    // using angular.element to be safe inside servicenow
    let slides = angular.element(".mySlides");
    let dots = angular.element(".dots");

    if (slideIndex > slides.length - 1) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;

    // hide all slides
    slides.each(function() {
      angular.element(this).css('display', 'none');
    });

    // remove active class from all dots
    dots.each(function() {
      angular.element(this).removeClass('active');
    });

    // show one slide and set dot to active
    if (slides[slideIndex]) {
      angular.element(slides[slideIndex]).css('display', 'block');
    }
    if (dots[slideIndex]) {
      angular.element(dots[slideIndex]).addClass('active');
    }
  }

  // Next-previous control
  $scope.nextSlide = function() {
    slideIndex++;
    showSlides();
    timer = _timer; // reset timer
  };

  $scope.prevSlide = function() {
    slideIndex--;
    showSlides();
    timer = _timer;
  };

  // Thumbnail image controlls
  $scope.currentSlide = function(n) {
    slideIndex = n - 1;
    showSlides();
    timer = _timer;
  };

  // Autoplay slides --------
  function startAutoPlay() {
    autoPlayInterval = $timeout(function() {
      timer--;
      if (timer < 1) {
        $scope.nextSlide();
        timer = _timer; // reset timer
      }
      startAutoPlay(); // loop the timeout
    }, 1000); // 1sec
  }

  // Initial call to show the first slide and start the autoplay
  // We wrap this in a $timeout to ensure the DOM is rendered first
  $timeout(function() {
    showSlides();
    startAutoPlay();
  }, 0);


  // Clean up the timer when the widget is destroyed
  $scope.$on('$destroy', function() {
    $timeout.cancel(autoPlayInterval);
  });
};`,
    serverScript: `(function() {
  /* populate the 'data' object */
  
  // --- From Custom Homepage Search ---
  var aisEnabled = $sp.isAISearchEnabled();
  data.firstName = gs.getUserDisplayName();

  if (aisEnabled) {
    options['utterancePlacement'] = 'body';
    options['placement'] = 'dynamic-landing';
    data.typeAheadSearch = $sp.getWidget('typeahead-search', options);
  } else {
    data.typeAheadSearch = $sp.getWidget('typeahead-search', options.typeahead_search);
  }
  
  // --- From Gold Carousel (was empty) ---
  
})();`,
    htmlTemplate: `<div>
  <div id="homepage-search" class="hidden-xs wrapper-xl">
    <div class="wrapper-xl">
      <h1 class="text-center text-2xl m-b-md sp-tagline-color" ng-if="c.greeting">{{c.greeting}}</h1>
      <div ng-if="options.short_description" class="text-center h4 m-b-lg sp-tagline-color" ng-bind="options.short_description"></div>
      
      <div class="search-bar-container">
        <sp-widget widget="data.typeAheadSearch"></sp-widget>
      </div>
    </div>
  </div>

  <div class="carousel-container">
    <div class="mySlides animate">
      <img src="gl_img_1.jpg" />
      <div class="number"></div>
      <div class="text"></div>
    </div>

    <div class="mySlides animate">
      <img src="gl_img_2.jpg" />
      <div class="number"></div>
      <div class="text"></div>
    </div>

    <div class="mySlides animate">
      <img src="gl_img_3.jpg" />
      <div class="number"></div>
      <div class="text"></div>
    </div>

    <div class="mySlides animate">
      <img src="gl_img_5.jpg" />
      <div class="number"></div>
      <div class="text"></div>
    </div>

    <a class="prev" ng-click="prevSlide()">❮</a>
    <a class="next" ng-click="nextSlide()">❯</a>

    <div class="dots-container">
      <span class="dots" ng-click="currentSlide(1)"></span>
      <span class="dots" ng-click="currentSlide(2)"></span>
      <span class="dots" ng-click="currentSlide(3)"></span>
      <span class="dots" ng-click="currentSlide(4)"></span>
    </div>
  </div>
</div>`,
    customCss: `/* ==== CUSTOM HOMEPAGE SEARCH CSS ==== */&#13;
.sp-tagline-color {&#13;
  color: $sp-tagline-color;&#13;
}&#13;
&#13;
@media (forced-colors: active) {&#13;
  .sp-search-heading {&#13;
    background-color: Canvas;&#13;
  }&#13;
}&#13;
&#13;
#homepage-search .aisearch {&#13;
  --classicsponlydonotuse--rem-multipy: 1.6;&#13;
}&#13;
&#13;
/* New CSS to control the size of the search bar */&#13;
.search-bar-container {&#13;
  max-width: 650px; /* You can adjust this value to make it smaller or larger */&#13;
  margin: 0 auto; /* This centers the search bar horizontally */&#13;
}&#13;
&#13;
&#13;
/* ==== GOLD CAROUSEL CSS ==== */&#13;
.container {&#13;
  font-family: "@Microsoft YaHei Light";&#13;
  background: #fafafa;&#13;
  display: flex;&#13;
  justify-content: center;&#13;
  align-items: center;&#13;
  height: 70%;&#13;
  overflow: hidden;&#13;
}&#13;
&#13;
.carousel-container {&#13;
  overflow: hidden;&#13;
  width: 100%;&#13;
  position: relative;&#13;
  box-shadow: 0 0 60px -20px #223344;&#13;
  z-index: 0;&#13;
}&#13;
&#13;
/* Hide the images by default */&#13;
.mySlides {&#13;
  display: none;&#13;
}&#13;
.mySlides img {&#13;
  display: block;&#13;
  width: 100%;&#13;
}&#13;
&#13;
/* Next & previous buttons */&#13;
.prev,&#13;
.next {&#13;
  cursor: pointer;&#13;
  position: absolute;&#13;
  top: 50%;&#13;
  transform: translate(0, -50%);&#13;
  width: auto;&#13;
  padding: 20px;&#13;
  color: white;&#13;
  font-weight: bold;&#13;
  font-size: 24px;&#13;
  border-radius: 0 8px 8px 0;&#13;
  background: rgba(173, 216, 230, 0.1);&#13;
  user-select: none;&#13;
}&#13;
.next {&#13;
  right: 0;&#13;
  border-radius: 8px 0 0 8px;&#13;
}&#13;
.prev:hover,&#13;
.next:hover {&#13;
  background-color: rgba(173, 216, 230, 0.3);&#13;
}&#13;
&#13;
/* Caption text */&#13;
.text {&#13;
  color: #f2f2f2;&#13;
  max-width: 600px;&#13;
  background-color: rgba(10, 10, 20, 0.1);&#13;
  border-radius: 10px;&#13;
  font-size: 30px;&#13;
  padding: 8px 12px;&#13;
  position: absolute;&#13;
  top: 250px;&#13;
  left: 40%;&#13;
  transform: translate(-50%);&#13;
  text-align: left;&#13;
}&#13;
&#13;
/* Number text (1/3 etc) */&#13;
.number {&#13;
  color: #f2f2f2;&#13;
  font-size: 16px;&#13;
  background-color: rgba(173, 216, 230, 0.15);&#13;
  backdrop-filter: blur(6px);&#13;
  border-radius: 10px;&#13;
  padding: 8px 12px;&#13;
  position: absolute;&#13;
  top: 20px;&#13;
  left: 20px;&#13;
}&#13;
.dots-container {&#13;
  position: absolute;&#13;
  bottom: 10px;&#13;
  left: 50%;&#13;
  transform: translate(-50%);&#13;
}&#13;
&#13;
/* The dots/bullets/indicators */&#13;
.dots {&#13;
  cursor: pointer;&#13;
  height: 14px;&#13;
  width: 14px;&#13;
  margin: 0 4px;&#13;
  background-color: rgba(173, 216, 230, 0.2);&#13;
  backdrop-filter: blur(2px);&#13;
  border-radius: 50%;&#13;
  display: inline-block;&#13;
  transition: background-color 0.3s ease;&#13;
}&#13;
.active,&#13;
.dots:hover {&#13;
  background-color: rgba(173, 216, 230, 0.8);&#13;
}&#13;
&#13;
/* transition animation */&#13;
.animate {&#13;
  -webkit-animation-name: animate;&#13;
  -webkit-animation-duration: 1s;&#13;
  animation-name: animate;&#13;
  animation-duration: 2s;&#13;
}&#13;
&#13;
@keyframes animate {&#13;
  from {&#13;
    transform: scale(1.1) rotateY(10deg);&#13;
  }&#13;
  to {&#13;
    transform: scale(1) rotateY(0deg);&#13;
  }&#13;
}`,
    dataTable: 'sp_instance_ais',
    fields: [
        'title',
        'short_description',
        'search_application',
        'search_results_configuration',
        'disable_all_suggestions',
        'placeholder',
        'ai_search_source_filter',
    ],
    id: 'custom-search-carousel',
    linkScript: `function link(scope, element, attrs, controller) {
  var geckoRegex = /Gecko\\/\\d+/; // Remove forced-colors css for Gecko engine (Firefox) as they already handle it
  if (geckoRegex.test(navigator.userAgent)) {
    $('.sp-search-heading').removeClass('sp-search-heading');
  }
}`,
    optionSchema: [
        {
            name: 'typeahead_search',
            default_value: "{title: 'How can we help?', size: 'lg', color: 'default'}",
            section: 'Presentation',
            label: 'Typeahead Search',
            type: 'string',
        },
    ],
})
