/**
* Template Name: MyResume - v3.0.0
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Hero typed
  if ($('.typed').length) {
    var typed_strings = $(".typed").data('typed-items');
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  });

  $(document).click(function(e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 300;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 200) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $('.venobox').venobox({
      'share': false
    });

    // Initiate aos_init() function
    aos_init();

  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Subtle reveal animation for cards and content blocks.
  if ('IntersectionObserver' in window) {
    var revealItems = document.querySelectorAll('.count-box, .portfolio-wrap, .icon-box, .resume-item, .testimonial-item, .contact .info, .skills-content, .about .content, .about-portrait-card, .about-highlight, .about-metrics div, .about-info-grid div');
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.16
    });

    revealItems.forEach(function(item, index) {
      item.classList.add('reveal-ready');
      item.style.transitionDelay = Math.min(index % 6, 5) * 70 + 'ms';
      revealObserver.observe(item);
    });
  }

  // Neural constellation + circuit data pulse hero background.
  (function initHeroNeuralBackground() {
    var canvas = document.querySelector('.hero-neural-canvas');
    var hero = document.getElementById('hero');

    if (!canvas || !hero || !canvas.getContext) {
      return;
    }

    var ctx = canvas.getContext('2d');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var width = 0;
    var height = 0;
    var dpr = 1;
    var nodes = [];
    var pulses = [];
    var mouse = { x: 0, y: 0, active: false };
    var frameId;
    var lastTime = 0;

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function resizeCanvas() {
      var bounds = hero.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedScene();
    }

    function seedScene() {
      var nodeCount = Math.min(76, Math.max(38, Math.floor(width / 24)));
      var pulseCount = Math.min(12, Math.max(7, Math.floor(width / 128)));
      nodes = [];
      pulses = [];

      for (var i = 0; i < nodeCount; i += 1) {
        var zone = Math.random();
        nodes.push({
          x: zone < 0.34 ? rand(width * 0.02, width * 0.34) : zone < 0.58 ? rand(width * 0.34, width * 0.62) : rand(width * 0.62, width * 0.98),
          y: rand(height * 0.08, height * 0.92),
          vx: rand(-0.1, 0.1),
          vy: rand(-0.08, 0.08),
          r: rand(1, 2.7),
          phase: rand(0, Math.PI * 2)
        });
      }

      for (var p = 0; p < pulseCount; p += 1) {
        pulses.push({
          lane: Math.floor(rand(0, 7)),
          x: rand(-width * 0.35, width),
          y: rand(height * 0.18, height * 0.86),
          speed: rand(38, 92),
          length: rand(70, 150),
          delay: rand(0, 6)
        });
      }
    }

    function drawCircuitGrid(time) {
      var spacing = width < 768 ? 58 : 76;
      var offset = (time * 8) % spacing;
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.15)';

      for (var x = -spacing - offset; x < width + spacing; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, height * 0.04);
        ctx.lineTo(x + spacing * 0.36, height * 0.22);
        ctx.lineTo(x + spacing * 0.36, height * 0.72);
        ctx.lineTo(x + spacing * 0.82, height * 0.9);
        ctx.stroke();
      }

      for (var y = height * 0.14; y < height * 0.92; y += spacing * 0.72) {
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.1)';
        ctx.beginPath();
        ctx.moveTo(width * 0.02, y);
        ctx.lineTo(width * 0.98, y + Math.sin(time + y * 0.01) * 18);
        ctx.stroke();
      }

      ctx.restore();
    }

    function drawPulses(delta) {
      ctx.save();
      ctx.lineCap = 'round';

      pulses.forEach(function(pulse, index) {
        pulse.x += pulse.speed * delta;

        if (pulse.x - pulse.length > width + 120) {
          pulse.x = -rand(140, 360);
          pulse.y = rand(height * 0.16, height * 0.88);
          pulse.speed = rand(38, 92);
        }

        var laneLift = Math.sin((pulse.x + index * 90) * 0.008) * 16;
        var y = pulse.y + laneLift;
        var gradient = ctx.createLinearGradient(pulse.x - pulse.length, y, pulse.x, y);
        gradient.addColorStop(0, 'rgba(6, 182, 212, 0)');
        gradient.addColorStop(0.55, 'rgba(6, 182, 212, 0.16)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.72)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = index % 3 === 0 ? 1.8 : 1.1;
        ctx.beginPath();
        ctx.moveTo(pulse.x - pulse.length, y);
        ctx.lineTo(pulse.x, y);
        ctx.stroke();
      });

      ctx.restore();
    }

    function drawNodes(time, delta) {
      var maxDistance = width < 768 ? 112 : 156;

      nodes.forEach(function(node) {
        node.x += node.vx * delta * 60;
        node.y += node.vy * delta * 60;

        if (node.x < width * 0.04 || node.x > width * 0.98) {
          node.vx *= -1;
        }

        if (node.y < height * 0.05 || node.y > height * 0.95) {
          node.vy *= -1;
        }

        if (mouse.active) {
          var dx = mouse.x - node.x;
          var dy = mouse.y - node.y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 190 && dist > 1) {
            node.x -= (dx / dist) * 0.28;
            node.y -= (dy / dist) * 0.28;
          }
        }
      });

      ctx.save();
      for (var i = 0; i < nodes.length; i += 1) {
        for (var j = i + 1; j < nodes.length; j += 1) {
          var a = nodes[i];
          var b = nodes[j];
          var lineDx = a.x - b.x;
          var lineDy = a.y - b.y;
          var lineDistance = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

          if (lineDistance < maxDistance) {
            var alpha = (1 - lineDistance / maxDistance) * 0.28;
            ctx.strokeStyle = 'rgba(125, 211, 252, ' + alpha + ')';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach(function(node) {
        var glow = 0.45 + Math.sin(time * 1.7 + node.phase) * 0.25;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (0.5 + glow * 0.22) + ')';
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'rgba(6, 182, 212, ' + (0.08 + glow * 0.12) + ')';
        ctx.arc(node.x, node.y, node.r * 5.8, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    }

    function render(timestamp) {
      var time = timestamp * 0.001;
      var delta = lastTime ? Math.min(0.04, time - lastTime) : 0.016;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      drawCircuitGrid(time);
      drawPulses(reduceMotion ? 0 : delta);
      drawNodes(time, reduceMotion ? 0 : delta);

      if (!reduceMotion) {
        frameId = window.requestAnimationFrame(render);
      }
    }

    hero.addEventListener('mousemove', function(event) {
      var bounds = hero.getBoundingClientRect();
      mouse.x = event.clientX - bounds.left;
      mouse.y = event.clientY - bounds.top;
      mouse.active = true;
    });

    hero.addEventListener('mouseleave', function() {
      mouse.active = false;
    });

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    frameId = window.requestAnimationFrame(render);

    window.addEventListener('beforeunload', function() {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    });
  })();

  // Gentle hero parallax, disabled on touch-heavy devices by the media query.
  if (window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
    var hero = document.getElementById('hero');
    var ambientOne = document.querySelector('.hero-ambient-one');
    var ambientTwo = document.querySelector('.hero-ambient-two');
    var heroBg = document.querySelector('.hero-bg-image');
    var heroMark = document.querySelector('.hero-tech-orbit');

    if (hero && ambientOne && ambientTwo) {
      hero.addEventListener('mousemove', function(event) {
        var bounds = hero.getBoundingClientRect();
        var x = (event.clientX - bounds.left) / bounds.width - 0.5;
        var y = (event.clientY - bounds.top) / bounds.height - 0.5;

        ambientOne.style.transform = 'translate3d(' + (x * 26) + 'px, ' + (y * 26) + 'px, 0)';
        ambientTwo.style.transform = 'translate3d(' + (x * -18) + 'px, ' + (y * -18) + 'px, 0)';

        if (heroBg) {
          heroBg.style.transform = 'scale(1.07) translate3d(' + (x * -14) + 'px, ' + (y * -10) + 'px, 0)';
        }

        if (heroMark) {
          heroMark.style.transform = 'translate3d(' + (x * 18) + 'px, ' + (y * 14) + 'px, 0)';
        }
      });
    }
  }

})(jQuery);
