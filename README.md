# Panels

A sliding-panel, carousel-like component that transitions through a series of slides.

## Introduction

This Navigator component can move through a series of slides using whatever CSS3 transitions you desire. Additionally,
it'll dynamically adapt its width via CSS media queries.

A strict separation of state and style is maintained. That is to say, the Javascript maintains the state of the Navigator, while the CSS takes care of the presentation of this state. While this is a basic component that achieves a particular use-case (i.e. a single slide at a time), you may use whatever CSS you desire to control the transition itself.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.githubusercontent.com/apathetic/navigator/master/dist/nav.min.js
[max]: https://raw.githubusercontent.com/apathetic/navigator/master/src/nav.js

Include the relevant scripts in your web page, and then:

```html
<script>

	// availble options
	var options = {
		activeClass: 'active',
		beforeClass: 'before',
		afterClass: 'after',
		animateClass: 'animating',
		slides: '.step',
		speed: 400
	};

	// sample instantiation:
	var container = document.querySelector('.panels');
	var nav = new Nav(container, options);

</script>
```

## Methods

+ **next()** : advances the carousel by one slide
+ **prev()** : returns to the previous slide
+ **go()** : function(to) advances slide to the index


## Support
* IE9+
* Safari / Chrome
* Firefox
* iOS
* Android

## Examples

Please see the _demo_ directory

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
