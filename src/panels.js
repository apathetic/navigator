/**
 * Simple Panels
 * @constructor
 * @param {HTMLElement} container A DOM element that is a parent to the panels.
 * @param {Object} options   Configuration options
 */
export default class Panels {

  constructor(container, options) {
    const defaults = {
      activeClass: 'active',
      beforeClass: 'before',
      afterClass: 'after',
      animateClass: 'animating',
      slides: '.slide',
      initialPanel: 0,
      infinite: true,
      speed: 400
    };

    this.options = Object.assign(defaults, options);
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.slides = this.container.querySelectorAll(this.options.slides);
    this.numSlides = this.slides.length;
    this.current = this.options.initialPanel;

    if (!this.numSlides) { return; }

    this.slides[this.current].classList.add(this.options.activeClass);
  };

  /**
   * Transition from one slide to another
   * @param  {integer} to The index of the slide to go to
   * @return {void}
   */
  go(to) {
    // determine direction:  1: backward, -1: forward. Do this before we % it
    const direction = Math.abs(this.current - to) / (this.current - to);
    const options = this.options;

    // calculate where we're going
    if (options.infinite) {
      to = (this.numSlides + (to % this.numSlides)) % this.numSlides;  // eslint-disable-line no-extra-parens
    } else {
      to = Math.max(Math.min(this.numSlides - 1, to), 0);
    }

    // dont do nuthin if we dont need to
    if (to === this.current || this.sliding) { return; }

    // Call onSlide function, if it exists. Note: doesn't check if is a function
    if (options.onSlide) { options.onSlide.call(this, to, this.current); }

    // do animation
    this.animate(to, direction);
    this.current = to;
  }

  /**
   * Facilitate slide animation by adding / removing relevant CSS classes.
   * @param  {Integer} to        The slide index to transition to.
   * @param  {Integer} direction Positive for forward / negative for reverse.
   * @return {void}
   */
  animate(to, direction) {
    const slides = this.slides;
    const currentSlide = slides[this.current];
    const toSlide = slides[to];
    const options = this.options;

    // prime the slides: position the ones we're going to and moving from
    if (direction > 0) {
      toSlide.classList.add(options.beforeClass);
      currentSlide.classList.add(options.afterClass);
    } else {
      toSlide.classList.add(options.afterClass);
      currentSlide.classList.add(options.beforeClass);
    }

    // force a repaint to actually position "to" slide. *Important*
    toSlide.offsetHeight;  // eslint-disable-line

    // start the transition
    currentSlide.classList.add(options.animateClass);
    toSlide.classList.add(options.animateClass);
    toSlide.classList.add(options.activeClass);

    currentSlide.classList.remove(options.activeClass);
    toSlide.classList.remove(options.beforeClass);
    toSlide.classList.remove(options.afterClass);

    // clean up afterwards
    setTimeout(function() {
      Array.prototype.forEach.call(slides, function(slide) {
        slide.classList.remove(options.animateClass);
        slide.classList.remove(options.beforeClass);
        slide.classList.remove(options.afterClass);
      });
    }, options.speed);
  }

  /**
   * Go to the next slide
   * @return {void}
   */
  next() {
    if (this.options.infinite || this.current !== this.numSlides - 1) {
      this.go(this.current + 1);
    }
  }

  /**
   * Go to the previous slide
   * @return {void}
   */
  prev() {
    if (this.options.infinite || this.current !== 0) {
      this.go(this.current - 1);
    }
  }
};
