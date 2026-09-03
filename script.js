(function ($) {
  "use strict";

  AOS.init({
    duration: window.innerWidth < 768 ? 650 : 800,
    once: true,
    offset: window.innerWidth < 768 ? 20 : 40,
    easing: "ease-out-cubic",
    disable: function () {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  });

  var mobileMenuToggle = document.getElementById("mobileMenuToggle");
  var primaryNav = document.getElementById("primaryNav");
  var mobileMenuBackdrop = document.getElementById("mobileMenuBackdrop");

  function setMobileMenu(open) {
    mobileMenuToggle.classList.toggle("is-open", open);
    primaryNav.classList.toggle("is-open", open);
    mobileMenuBackdrop.classList.toggle("is-open", open);
    document.body.classList.toggle("mobile-menu-open", open);
    mobileMenuToggle.setAttribute("aria-expanded", String(open));
    mobileMenuToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    mobileMenuBackdrop.setAttribute("aria-hidden", String(!open));
  }

  mobileMenuToggle.addEventListener("click", function () {
    setMobileMenu(!primaryNav.classList.contains("is-open"));
  });

  mobileMenuBackdrop.addEventListener("click", function () {
    setMobileMenu(false);
  });

  primaryNav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setMobileMenu(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
      setMobileMenu(false);
      mobileMenuToggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768 && primaryNav.classList.contains("is-open")) {
      setMobileMenu(false);
    }
  }, { passive: true });

  var gallerySwiper = null;
  var mobileGallery = window.matchMedia("(max-width: 767.98px)");

  function syncGallerySwiper() {
    if (mobileGallery.matches && !gallerySwiper) {
      gallerySwiper = new Swiper(".gallery-swiper", {
        slidesPerView: 1,
        centeredSlides: false,
        spaceBetween: 0,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      });
    } else if (!mobileGallery.matches && gallerySwiper) {
      gallerySwiper.destroy(true, true);
      gallerySwiper = null;
    }
  }

  syncGallerySwiper();
  if (mobileGallery.addEventListener) {
    mobileGallery.addEventListener("change", syncGallerySwiper);
  }

  $("[data-fancybox='gallery']").fancybox({
    loop: true,
    buttons: ["zoom", "slideShow", "thumbs", "close"]
  });

  var music = document.getElementById("music");
  var musicButton = document.getElementById("musicToggle");
  music.volume = 0.45;

  function syncMusicVisibility() {
    var hero = document.getElementById("home");
    var threshold = hero ? hero.getBoundingClientRect().height * 0.75 : 300;
    musicButton.classList.toggle("is-visible", window.scrollY > threshold);
  }

  syncMusicVisibility();
  window.addEventListener("scroll", syncMusicVisibility, { passive: true });
  window.addEventListener("resize", syncMusicVisibility, { passive: true });

  musicButton.addEventListener("click", function () {
    if (music.paused) {
      music.play().then(function () {
        musicButton.classList.add("is-playing");
        musicButton.setAttribute("aria-pressed", "true");
        musicButton.setAttribute("aria-label", "Jeda musik");
      }).catch(function () {
        musicButton.classList.remove("is-playing");
      });
    } else {
      music.pause();
      musicButton.classList.remove("is-playing");
      musicButton.setAttribute("aria-pressed", "false");
      musicButton.setAttribute("aria-label", "Putar musik");
    }
  });

  function updateCountdown() {
    var eventTime = new Date("2026-09-19T13:30:00+07:00").getTime();
    var distance = Math.max(0, eventTime - Date.now());
    var values = [
      Math.floor(distance / 86400000),
      Math.floor(distance % 86400000 / 3600000),
      Math.floor(distance % 3600000 / 60000),
      Math.floor(distance % 60000 / 1000)
    ];

    ["days", "hours", "minutes", "seconds"].forEach(function (id, index) {
      document.getElementById(id).textContent = String(values[index]).padStart(2, "0");
    });
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  $("#rsvp").on("submit", function (event) {
    event.preventDefault();
    $(this).find(".status").text("Terima kasih, konfirmasi Anda telah tercatat.");
  });

  $("#wishForm").on("submit", function (event) {
    event.preventDefault();
    var name = $(this).find("[name='name']").val();
    var message = $(this).find("[name='message']").val();
    var safeName = $("<div>").text(name).html();
    var safeMessage = $("<div>").text(message).html();
    $(".wish-list").prepend("<p><strong>" + safeName + "</strong><br>" + safeMessage + "</p>");
    this.reset();
  });

  $("a[href='#gift']").on("click", function (event) {
    event.preventDefault();
    document.getElementById("wishes").scrollIntoView({ behavior: "smooth" });
  });

  window.addEventListener("load", function () {
    if (!window.location.hash) return;
    window.setTimeout(function () {
      var target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView();
    }, 1500);
  });
})(jQuery);
