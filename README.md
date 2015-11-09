# Flexicarousel

A carousel that'll dynamically adapt its width: it will grow or shrink alongside a site that’s resizing via css media queries. Uses CSS3 transforms (or whatever CSS you desire) for its transitions.

##Introduction

A carousel that maintains a strict separation of state and style; that is to say, the Javascript maintains the state of the carousel, while the CSS takes care of the presentation of this state. The state may be updated by swiping or dragging, or by interacting with the exposed API. Also, the carousel is fully responsive, and uses CSS -- not Javascript -- to manage its presentation across breakpoints.

###In Particular

Very lightweight (~1.8 KB), and works on both mobile and desktop. This is a basic carousel that achieves a particular use-case -- a single slide at
a time. Use whatever CSS you desire to control transitions (i.e. translate or opacity), while on mobile continuous control over a slide's position
(ie. via dragging) are possible, emulating a native UI paradigm.

## Getting Started
Download the [production version][min] or the [development version][max]. Or the [jquery version][jquery].

[min]: https://github.com/apathetic/flexicarousel-2/blob/master/dist/flexicarousel.min.js
[max]: https://github.com/apathetic/flexicarousel-2/blob/master/dist/flexicarousel.js
[jquery]: https://github.com/apathetic/flexicarousel-2/blob/master/dist/jquery.flexicarousel.min.js

Include the relevant scripts in your web page, and then:

```html
<script>

	// availble options
	var options = {
		activeClass: 'active',
		beforeClass: 'before',
		afterClass: 'after',
		slideWrap: '.wrap',
		slides: 'li',
		infinite: true,
		beforeSlide,		// function to execute before sliding
		afterSlide,			// function to execute after sliding
		noTouch: false		// if you'd like to disable the touch UI for whatever reason
	};

	// as a jQuery plugin
	jQuery(function($) {
		$('.carousel').carousel(
			options
		);
	});

	// or, without jquery if you prefer:
	var container = document.querySelector('.carousel');
	var carousel = new Carousel(container, options);

</script>
```

## Documentation

	next: advances the carousel by one slide

	prev: returns to the previous slide

	go: function(to) advances slide to the index


## Support
* IE8+
* Safari / Chrome
* Firefox
* iOS
* Android

## Known Issues
* mobile transforms are currently webkit-only

## Examples

Please see the _test / demo_ directory

## Release History

### 0.3
* Fixed: when snapping back to _same_ slide, prev / next slides were not getting class="animate"
* Fixed: uses ecma5 js (ie. bind, forEach). ==> added IE8 check

### 0.2
* add tabs demo
* Fixed: uses non-IE8 friendly class manipulation (ie. classList)
* Fixed: if mobile and not infinite, can see wrapping slides

### 0.1
* still a proof of concept
* uses ecma5 js (ie. bind, forEach)
* uses non-IE8 friendly class manipulation (ie. classList)
* uses non-IE8 friendly translate on slides
* mobile transforms are currently webkit-only
* if mobile and not infinite, can see wrapping slides
