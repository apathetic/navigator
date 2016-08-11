'use strict';

/**
 * Simple Panels
 * @constructor
 * @param {[type]} container [description]
 * @param {[type]} options   [description]
 */
var Panels = function Panels(container, options) {
  var defaults = {
    activeClass: 'active',
    beforeClass: 'before',
    afterClass: 'after',
    animateClass: 'animating',
    slides: '.slide',
    infinite: true,
    speed: 400
  };

  this.options = Object.assign(defaults, options);
  this.container = typeof container === 'string' ? document.querySelector(container) : container;
  this.slides = this.container.querySelectorAll(this.options.slides);
  this.current = 0;

  if (!this.slides.length) { return; }
};;

/**
 * Transition from one slide to another
 * @param{integer} to The index of the slide to go to
 * @return {void}
 */
Panels.prototype.go = function go (to) {
  var options = this.options,
    slides = this.slides,
    currentSlide,
    nextSlide,
    direction;

  // determine direction:1: backward, -1: forward. Do this before we % it
  direction = Math.abs(this.current - to) / (this.current - to);

  // calculate where we're going
  if (options.infinite) {
    to = (slides.length + (to % slides.length)) % slides.length;// eslint-disable-line no-extra-parens
  } else {
    to = Math.max(Math.min(slides.length - 1, to), 0);
  }

  // dont do nuthin if we dont need to
  if (to === this.current || this.sliding) { return; }

  // Call onSlide function, if it exists. Note: doesn't check if is a function
  if (options.onSlide) { options.onSlide.call(this, to, this.current); }


  currentSlide = slides[this.current];
  nextSlide = slides[to];

  // prime the slides: position the ones we're going to and moving from
  if (direction > 0) {
    nextSlide.classList.add(options.beforeClass);
    currentSlide.classList.add(options.afterClass);
  } else {
    nextSlide.classList.add(options.afterClass);
    currentSlide.classList.add(options.beforeClass);
  }

  // force a repaint to actually position "to" slide. *Important*
  nextSlide.offsetHeight;// jshint ignore:line

  // start the transition
  currentSlide.classList.add(options.animateClass);
  nextSlide.classList.add(options.animateClass);
  nextSlide.classList.add(options.activeClass);

  currentSlide.classList.remove(options.activeClass);
  nextSlide.classList.remove(options.beforeClass);
  nextSlide.classList.remove(options.afterClass);

  // clean up afterwards
  setTimeout(function() {
    Array.prototype.forEach.call(slides, function(slide) {
      slide.classList.remove(options.animateClass);
      slide.classList.remove(options.beforeClass);
      slide.classList.remove(options.afterClass);
    });

    // this.sliding = false;

  }, options.speed);

  this.current = to;

};

module.exports = Panels;