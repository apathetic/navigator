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
		slides: '.step',
		speed: 400
	};

	this.options = this._extend(defaults, options);
	this.container = (typeof container === 'string') ? document.querySelector(container) : container;
	this.slides = this.container.querySelectorAll(this.options.slides);

	if ( !this.slides ) { return; }

	this.current = 0;
};

Nav.prototype = {
	/**
	 * Transition from one slide to another
	 * @param  {integer} to The index of the slide to go to
	 * @return {void}
	 */
	go: function(to) {

		if (to === this.current) { return; }

		var currentSlide = this.slides[this.current];
		var nextSlide = this.slides[to];
		var options = this.options;

		// prime the slides: position the ones we're going to and moving from
		if (this.current > to) {
			nextSlide.classList.add(options.beforeClass);
			currentSlide.classList.add(options.afterClass);
		} else {
			nextSlide.classList.add(options.afterClass);
			currentSlide.classList.add(options.beforeClass);
		}

		// force a repaint to actually position "to" slide. *Important*
		nextSlide.offsetHeight;	// jshint ignore:line

		// Call onSlide function, if it exists. Note: doesn't check if is a function
		if (options.onSlide) { options.onSlide.call(this, to, this.current); }

		// start the transition
		currentSlide.classList.add(options.animateClass);
		nextSlide.classList.add(options.animateClass);
		nextSlide.classList.add(options.activeClass);

		currentSlide.classList.remove(options.activeClass);
		nextSlide.classList.remove(options.beforeClass);
		nextSlide.classList.remove(options.afterClass);

		this.current = to;

		setTimeout(this._update.bind(this), options.speed);
	},

	/**
	 * Update slide classes when done animating
	 * @return {void}
	 */
	_update: function() {
		var options = this.options;
		Array.prototype.forEach.call(this.slides, function(slide){
			slide.classList.remove(options.animateClass);
			slide.classList.remove(options.beforeClass);
			slide.classList.remove(options.afterClass);
		});
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
