$(document).ready(function () {
  // Side Cart Functionality
  const $cartPanel = $("#side-cart");
  const $cartToggle = $(".cart-toggle");
  const $cartClose = $(".cart-close");

  $cartToggle.on("click", function (e) {
    e.preventDefault();
    $cartPanel.addClass("active");
  });

  $cartClose.on("click", function () {
    $cartPanel.removeClass("active");
  });

  $(document).on("mousedown", function (e) {
    if (
      !$cartPanel.is(e.target) &&
      $cartPanel.has(e.target).length === 0 &&
      !$cartToggle.is(e.target) &&
      $cartToggle.has(e.target).length === 0
    ) {
      $cartPanel.removeClass("active");
    }
  });

  $(document).on("keyup", function (e) {
    if (e.key === "Escape") {
      $cartPanel.removeClass("active");
    }
  });

  // --- Mobile Menu Panel & Accordion Functionality ---
  const $mobileNavWrapper = $("#mobileMenuWrapper");
  const $mobileMenuToggle = $(".mobile-menu-toggle");
  const $mobileMenuClose = $("#menuClose");
  const $mobileOverlay = $(".mobile-menu-overlay");
  const $mobileNavContainer = $(".mobile-nav");
  const $mobileLangContainer = $(".mobile-language");

  $mobileMenuToggle.on("click", function (e) {
    e.preventDefault();

    if ($mobileNavContainer.is(":empty")) {
      const $desktopMenu = $(".header-main-nav ul").first().clone();
      $desktopMenu.find("i, span").remove();
      $desktopMenu.attr("class", "mobile-main-menu");
      $desktopMenu
        .find(".sub-menu")
        .attr("class", "mobile-sub-menu")
        .removeAttr("style");

      $desktopMenu.find("li:has(ul)").each(function () {
        $(this).addClass("has-mobile-children");
        $(this).append(
          '<span class="dropdown-trigger"><i class="fa-solid fa-chevron-down"></i></span>',
        );
      });
      $mobileNavContainer.append($desktopMenu);
    }

    if ($mobileLangContainer.is(":empty")) {
      const $desktopLang = $(".header-selectors .custom-select-wrapper")
        .first()
        .clone();
      $desktopLang.find("select").removeAttr("id");
      $mobileLangContainer.append($desktopLang);
    }

    $mobileNavWrapper.addClass("active");
    $("body").css("overflow", "hidden");
  });

  function closeMobileMenu() {
    $mobileNavWrapper.removeClass("active");
    $("body").css("overflow", "");
  }

  $mobileMenuClose.on("click", closeMobileMenu);
  $mobileOverlay.on("click", closeMobileMenu);

  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && $mobileNavWrapper.hasClass("active")) {
      closeMobileMenu();
    }
  });

  $(document).on("click", ".dropdown-trigger", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const $parent = $(this).closest(".has-mobile-children");
    const $subMenu = $parent.find("> .mobile-sub-menu");
    $parent
      .siblings(".has-mobile-children")
      .removeClass("open")
      .find("> .mobile-sub-menu")
      .slideUp(300);
    $parent.toggleClass("open");
    $subMenu.slideToggle(300);
  });

  $(document).on(
    "click",
    ".mobile-language .custom-select-wrapper",
    function (e) {
      $(this).find(".custom-options").fadeToggle(200);
      $(this).toggleClass("open");
      e.stopPropagation();
    },
  );

  $(document).on("click", ".mobile-language .custom-option", function (e) {
    e.stopPropagation();
    const $this = $(this);
    const $wrapper = $this.closest(".custom-select-wrapper");
    const selectedFlag = $this.data("flag");
    const selectedText = $this
      .contents()
      .filter(function () {
        return this.nodeType === 3;
      })
      .text()
      .trim();

    $wrapper.find(".current-flag").attr("src", selectedFlag);
    $wrapper.find(".current-lang-text").text(selectedText);
    $("#languageSelect").val($this.data("value")).trigger("change");
    $(".custom-options").fadeOut(200);
    $wrapper.removeClass("open");
  });

  // --- Desktop Language Selector ---
  $(document).on(
    "click",
    ".header-selectors .custom-select-wrapper",
    function (e) {
      e.stopPropagation();
      const $options = $(this).find(".custom-options");

      $(".custom-options").not($options).fadeOut(200);
      $(".custom-select-wrapper").not(this).removeClass("open");

      $options.fadeToggle(200);
      $(this).toggleClass("open");
    },
  );

  $(document).on("click", ".header-selectors .custom-option", function (e) {
    e.stopPropagation();
    const $this = $(this);
    const $wrapper = $this.closest(".custom-select-wrapper");
    const selectedFlag = $this.data("flag");
    const selectedText = $this
      .contents()
      .filter(function () {
        return this.nodeType === 3;
      })
      .text()
      .trim();

    $wrapper.find(".current-flag").attr("src", selectedFlag);
    $wrapper.find(".current-lang-text").text(selectedText);

    $("#languageSelect").val($this.data("value")).trigger("change");

    $wrapper.find(".custom-options").fadeOut(200);
    $wrapper.removeClass("open");
  });

  $(document).on("click", function () {
    $(".custom-options").fadeOut(200);
    $(".custom-select-wrapper").removeClass("open");
  });

  // Search Form Toggle
  const $searchBtn = $(".header-search-btn");
  const $searchWrapper = $(".search-form-wrapper");

  $searchBtn.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).toggleClass("active");
    $searchWrapper.toggleClass("active");

    if ($searchWrapper.hasClass("active")) {
      $searchWrapper.find("input").focus();
    }
  });

  $searchWrapper.on("click", function (e) {
    e.stopPropagation();
  });

  $(document).on("click", function () {
    $searchBtn.removeClass("active");
    $searchWrapper.removeClass("active");
  });

  // Hero Slider
  if ($(".hero-slider").length) {
    const heroSwiper = new Swiper(".hero-slider", {
      loop: true,
      speed: 1000,
      parallax: true,
      autoplay: false,
      navigation: {
        nextEl: ".hero-nav-next",
        prevEl: ".hero-nav-prev",
      },
      pagination: {
        el: ".hero-pagination",
        clickable: true,
      },
    });
  }

  // Partners Slider
  const partnersSlider = $(".partners-slider");

  if (partnersSlider.length) {
    partnersSlider.slick({
      slidesToShow: 7,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 600,
      cssEase: "ease",
      arrows: false,
      dots: false,
      infinite: true,
      pauseOnHover: true,
      draggable: true,
      swipeToSlide: true,
      responsive: [
        { breakpoint: 1400, settings: { slidesToShow: 6 } },
        { breakpoint: 1200, settings: { slidesToShow: 5 } },
        { breakpoint: 992, settings: { slidesToShow: 4 } },
        { breakpoint: 767, settings: { slidesToShow: 3 } },
        { breakpoint: 575, settings: { slidesToShow: 1 } },
      ],
    });
  }

  // Stats Section Counter
  const statsSection = document.querySelector(".stats-section");

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $(".stats-counter").each(function () {
            const $this = $(this);
            const target = parseFloat($this.data("target"));
            const isDecimal = $this.data("target").toString().includes(".");

            $({ countNum: 0 }).animate(
              { countNum: target },
              {
                duration: 2000,
                easing: "swing",
                step: function () {
                  let displayNum = isDecimal
                    ? this.countNum.toFixed(1)
                    : Math.floor(this.countNum);
                  $this.text(displayNum);
                },
                complete: function () {
                  $this.text(target);
                },
              },
            );
          });
        } else {
          $(".stats-counter").text("0");
        }
      });
    },
    { threshold: 0.2 },
  );

  if (statsSection) countObserver.observe(statsSection);

  // About Section Modal
  $(".about-video-trigger").on("click", function (event) {
    event.preventDefault();

    const aboutSectionVideoId = $(this).data("about-video-id");

    const aboutModalStructure = `
      <div id="about-modal-overlay-unique" class="about-modal-overlay" role="dialog">
          <div class="about-modal-container">
              <div class="about-modal-content">
                  <div class="about-video-wrapper">
                      <iframe src="https://www.youtube.com/embed/${aboutSectionVideoId}?autoplay=1&rel=0" 
                              allow="autoplay; encrypted-media" 
                              allowfullscreen></iframe>
                      <button id="about-modal-close-unique" class="about-modal-close-btn" aria-label="Close"></button>
                  </div>
              </div>
          </div>
      </div>`;

    $("body").append(aboutModalStructure).css("overflow", "hidden");

    $(document).on(
      "click",
      "#about-modal-close-unique, #about-modal-overlay-unique",
      function (e) {
        if (e.target !== this && this.id !== "about-modal-close-unique") return;

        $("#about-modal-overlay-unique").remove();
        $("body").css("overflow", "");
        $(document).off("keydown.aboutModalUnique");
      },
    );

    $(document).on("keydown.aboutModalUnique", function (e) {
      if (e.key === "Escape") {
        $("#about-modal-overlay-unique").remove();
        $("body").css("overflow", "");
        $(document).off("keydown.aboutModalUnique");
      }
    });
  });

  // Service Video Modal Injector
  $(".service-video-trigger").on("click", function (e) {
    e.preventDefault();
    const videoId = $(this).data("service-video-id");

    const modalHtml = `
      <div id="service-video-modal-window" class="service-modal-overlay" role="dialog" aria-modal="true">
          <div class="service-modal-container">
              <div class="service-modal-content">
                  <div class="service-video-wrapper">
                      <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                              allow="autoplay; encrypted-media" 
                              allowfullscreen></iframe>
                      <button id="service-modal-close-ctrl" class="service-modal-close-btn" aria-label="Close video"></button>
                  </div>
              </div>
          </div>
      </div>`;

    $("body").append(modalHtml).css("overflow", "hidden");

    $(document).on(
      "click",
      "#service-modal-close-ctrl, #service-video-modal-window",
      function (e) {
        if (e.target !== this && this.id !== "service-modal-close-ctrl") return;
        $("#service-video-modal-window").remove();
        $("body").css("overflow", "");
        $(document).off("keydown.serviceModal");
      },
    );

    $(document).on("keydown.serviceModal", function (e) {
      if (e.key === "Escape") {
        $("#service-video-modal-window").remove();
        $("body").css("overflow", "");
        $(document).off("keydown.serviceModal");
      }
    });
  });

  // Projects Slider
  const projectsSliderSelector = $(".projects-slider");

  if (projectsSliderSelector.length) {
    projectsSliderSelector.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      arrows: true,
      appendArrows: ".projects-slider-navigation",
      prevArrow:
        '<button class="projects-prev-arrow"><i class="fa-solid fa-arrow-left"></i></button>',
      nextArrow:
        '<button class="projects-next-arrow"><i class="fa-solid fa-arrow-right"></i></button>',
      responsive: [
        {
          breakpoint: 1400,
          settings: { slidesToShow: 4 },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            arrows: false,
            dots: true,
          },
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            centerMode: false,
            arrows: false,
            dots: true,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            arrows: false,
            dots: true,
            centerMode: true,
            centerPadding: "0px",
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            arrows: false,
            dots: true,
            centerMode: false,
            centerPadding: "0px",
          },
        },
      ],
    });
  }

  // Portfolio Slider
  const portfolioSectionSlider = $(".portfolio-slider");

  if (portfolioSectionSlider.length) {
    portfolioSectionSlider.slick({
      slidesToShow: 3,
      centerMode: true,
      centerPadding: "0px",
      infinite: true,
      arrows: false,
      dots: false,
      autoplay: false,
      draggable: true,
      swipe: true,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            dots: true,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            dots: true,
          },
        },
      ],
    });
  }

  // Testimonial Slider
  const testimonialSectionSlider = $(".testimonial-slider");

  if (testimonialSectionSlider.length) {
    testimonialSectionSlider.slick({
      dots: false,
      arrows: false,
      infinite: true,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 4000,
      slidesToShow: 3,
      slidesToScroll: 1,
      draggable: true,
      swipe: true,
      responsive: [
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }
});
