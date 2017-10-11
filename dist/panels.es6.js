/*
MIT License

Copyright (c) 2017 wes hatch

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/**
 * Simple Panels
 * @constructor
 * @param {HTMLElement} container A DOM element that is a parent to the panels.
 * @param {Object} options   Configuration options
 */
class Panels {

  constructor(container, options) {
    const defaults = {
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
  };

  /**
   * Transition from one slide to another
   * @param  {integer} to The index of the slide to go to
   * @return {void}
   */
  go(to) {
    var options = this.options,
      slides = this.slides,
      currentSlide,
      nextSlide,
      direction;

    // determine direction:  1: backward, -1: forward. Do this before we % it
    direction = Math.abs(this.current - to) / (this.current - to);

    // calculate where we're going
    if (options.infinite) {
      to = (slides.length + (to % slides.length)) % slides.length;  // eslint-disable-line no-extra-parens
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
    nextSlide.offsetHeight;  // eslint-disable-line

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
    }, options.speed);

    this.current = to;

  }

}

export default Panels;
