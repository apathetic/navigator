/**
 * Simple Navigation
 * @param {[type]} container [description]
 * @param {[type]} options   [description]
 */
var Nav = function(container, options) {

	var defaults = {
		activeClass: 'active',
		beforeClass: 'before',
		afterClass: 'after',
		animateClass: 'animating',
		slides: '.slide',
		infinite: true,
		speed: 400
	};

	this.options = this._extend(defaults, options);
	this.container = (typeof container === 'string') ? document.querySelector(container) : container;
	this.slides = this.container.querySelectorAll(this.options.slides);

	if ( !this.slides.length ) { return; }

	this.current = 0;
};

Nav.prototype = {
	/**
	 * Transition from one slide to another
	 * @param  {integer} to The index of the slide to go to
	 * @return {void}
	 */
	go: function(to) {
		var options = this.options,
			currentSlide,
			nextSlide,
			direction;

		// determine direction:  1: backward, -1: forward. Do this before we % it
		direction = Math.abs(this.current - to) / (this.current - to);

		// calculate where we're going
		if (this.options.infinite) {
			to = (this.slides.length + (to % this.slides.length)) % this.slides.length;
		} else {
			to = Math.max( Math.min(this.slides.length-1, to), 0);
		}

		// dont do nuthin if we dont need to
		if (to === this.current || this.sliding) { return; }

		// Call onSlide function, if it exists. Note: doesn't check if is a function
		if (options.onSlide) { options.onSlide.call(this, to, this.current); }

		currentSlide = this.slides[this.current];
		nextSlide = this.slides[to];

		// prime the slides: position the ones we're going to and moving from
		if (direction > 0) {
			nextSlide.classList.add(options.beforeClass);
			currentSlide.classList.add(options.afterClass);
		} else {
			nextSlide.classList.add(options.afterClass);
			currentSlide.classList.add(options.beforeClass);
		}

		// force a repaint to actually position "to" slide. *Important*
		nextSlide.offsetHeight;	// jshint ignore:line

	// 	this._transition();
	// },
	//
	// /**
	//  * Update slide classes to trigger transitioning
	//  * @return {void}
	//  */
	// _transition: function() {
		// start the transition
		currentSlide.classList.add(options.animateClass);
		nextSlide.classList.add(options.animateClass);
		nextSlide.classList.add(options.activeClass);

		currentSlide.classList.remove(options.activeClass);
		nextSlide.classList.remove(options.beforeClass);
		nextSlide.classList.remove(options.afterClass);

		// clean up afterwards
		var options = this.options;
		var slides = this.slides;
		setTimeout(function() {
			Array.prototype.forEach.call(slides, function(slide){
				slide.classList.remove(options.animateClass);
				slide.classList.remove(options.beforeClass);
				slide.classList.remove(options.afterClass);
			});
		}, options.speed);

		this.current = to;

	},

	/**
	 * Helper function. Simple way to merge objects
	 * @param  {object} obj A list of objects to extend
	 * @return {object}     The extended object
	 */
	_extend: function(obj) {
		var args = Array.prototype.slice.call(arguments, 1);
		for (var i = 0; i < args.length; i++) {
			var source = args[i];
			if (source) {
				for (var prop in source) {
					obj[prop] = source[prop];
				}
			}
		}
		return obj;
	}


};
