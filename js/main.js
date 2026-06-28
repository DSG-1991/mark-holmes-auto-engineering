/* ============================================
   MARK HOLMES AUTO ENGINEERING
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // --- Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('open');
    });

    // Close menu on link click
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  // --- Header scroll effect ---
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // --- Fade-in animations on scroll ---
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(function(el) {
    fadeObserver.observe(el);
  });

  // --- Booking Form Handler ---
  const bookingForms = document.querySelectorAll('.booking-form form');

  bookingForms.forEach(function(form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const submitBtn = form.querySelector('.form-submit');
      const successEl = form.parentElement.querySelector('.form-success');
      const formEl = form;

      // Show loading
      const originalText = submitBtn.textContent;
      submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
      submitBtn.disabled = true;

      // Clear previous errors
      form.querySelectorAll('.form-error').forEach(function(el) {
        el.classList.remove('show');
      });

      // Collect form data
      const formData = new FormData(form);
      const data = {};
      formData.forEach(function(value, key) {
        data[key] = value;
      });

      try {
        const response = await fetch('/.netlify/functions/booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.success) {
          // Show success
          formEl.style.display = 'none';
          successEl.classList.add('show');
        } else {
          throw new Error(result.error || 'Something went wrong. Please try again.');
        }
      } catch (err) {
        // Show error on form
        const errorEl = form.querySelector('.form-error');
        if (errorEl) {
          errorEl.textContent = err.message || 'Failed to send. Please try again or call us.';
          errorEl.classList.add('show');
        }
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  });

  // --- Set min date on date inputs ---
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split('T')[0];
  dateInputs.forEach(function(input) {
    input.setAttribute('min', today);
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Active nav link highlighting ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('a').forEach(function(link) {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // --- Dynamic Price Display ---
  const servicePrices = {
    "MOT Test": "£48.00",
    "MOT with Interim Service": "£48.00",
    "MOT with Full Service": "£48.00",
    "MOT with Major Service": "£48.00",
    "Pre MOT Check": "£10.00",
    "Interim Service": "£181.37",
    "Full Service": "£215.33",
    "Major Service": "£314.21",
    "Oil & Filter Change": "£160.15",
    "Air Conditioning Re-gas R134A": "£80.00",
    "Brake Fluid Replacement": "£80.00",
    "Coolant Change": "£55.00",
    "Diagnostic Check": "£45.00",
    "Front Wheel Alignment": "£50.00",
    "Summer Check": "FREE",
    "Front Brakes (Discs & Pads)": "£382.28",
    "Front Brakes (Pads)": "£114.07",
    "Rear Brakes (Discs & Pads)": "£339.89",
    "Rear Brakes (Pads)": "£123.04",
    "General Repair": "Get an estimate"
  };

  function updatePriceDisplay(selectEl, displayValueEl) {
    var selected = selectEl.value;
    var priceEl = displayValueEl;
    if (selected && servicePrices[selected]) {
      var price = servicePrices[selected];
      priceEl.textContent = price;
      priceEl.className = 'price-value';
      if (price === 'FREE') {
        priceEl.classList.add('free');
      } else if (price === 'Get an estimate') {
        priceEl.classList.add('estimate');
      }
    } else {
      priceEl.textContent = '\u2014';
      priceEl.className = 'price-value';
    }
  }

  // Services page
  var servicesSelect = document.querySelector('#servicesBookingForm #service');
  var servicesPriceValue = document.getElementById('servicesPriceValue');
  if (servicesSelect && servicesPriceValue) {
    servicesSelect.addEventListener('change', function() {
      updatePriceDisplay(servicesSelect, servicesPriceValue);
    });
  }

  // Contact page
  var contactSelect = document.querySelector('#contactBookingForm #service');
  var contactPriceValue = document.getElementById('contactPriceValue');
  if (contactSelect && contactPriceValue) {
    contactSelect.addEventListener('change', function() {
      updatePriceDisplay(contactSelect, contactPriceValue);
    });
  }

  // --- Reviews Carousel ---
  var reviewsCarousel = document.getElementById('reviewsCarousel');
  if (reviewsCarousel) {
    var track = document.getElementById('reviewsTrack');
    var dotsWrap = document.getElementById('reviewsDots');
    var cards = track.querySelectorAll('.review-card');
    var prevBtn = reviewsCarousel.querySelector('.reviews-arrow.prev');
    var nextBtn = reviewsCarousel.querySelector('.reviews-arrow.next');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function step() {
      var card = track.querySelector('.review-card');
      if (!card) return track.clientWidth;
      var gap = parseInt(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0', 10) || 0;
      return card.offsetWidth + gap;
    }

    function activeIndex() {
      return Math.round(track.scrollLeft / step());
    }

    // Build dots (one per card)
    var dots = [];
    cards.forEach(function(_, i) {
      var dot = document.createElement('button');
      dot.className = 'reviews-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Go to review ' + (i + 1));
      dot.addEventListener('click', function() {
        track.scrollTo({ left: i * step(), behavior: 'smooth' });
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    function updateDots() {
      var a = activeIndex();
      dots.forEach(function(d, i) { d.classList.toggle('active', i === a); });
    }
    updateDots();

    var scrollRaf;
    track.addEventListener('scroll', function() {
      window.cancelAnimationFrame(scrollRaf);
      scrollRaf = window.requestAnimationFrame(updateDots);
    });

    prevBtn.addEventListener('click', function() {
      track.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function() {
      track.scrollBy({ left: step(), behavior: 'smooth' });
    });

    // Auto-advance (pauses on hover/focus, respects reduced motion)
    var timer = null;
    function startAuto() {
      if (reduceMotion) return;
      stopAuto();
      timer = window.setInterval(function() {
        if (activeIndex() >= cards.length - 1) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: step(), behavior: 'smooth' });
        }
      }, 4500);
    }
    function stopAuto() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }
    reviewsCarousel.addEventListener('mouseenter', stopAuto);
    reviewsCarousel.addEventListener('mouseleave', startAuto);
    reviewsCarousel.addEventListener('focusin', stopAuto);
    reviewsCarousel.addEventListener('focusout', startAuto);
    startAuto();
  }

});
