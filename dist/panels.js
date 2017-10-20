/*!
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
var Panels=function(){"use strict";var s=function(s,t){var i={activeClass:"active",beforeClass:"before",afterClass:"after",animateClass:"animating",slides:".slide",infinite:!0,speed:400};this.options=Object.assign(i,t),this.container="string"==typeof s?document.querySelector(s):s,this.slides=this.container.querySelectorAll(this.options.slides),this.numSlides=this.slides.length,this.current=0,this.numSlides&&this.slides[0].classList.add(this.options.activeClass)};return s.prototype.go=function(s){var t=Math.abs(this.current-s)/(this.current-s),i=this.options;(s=i.infinite?(this.numSlides+s%this.numSlides)%this.numSlides:Math.max(Math.min(this.numSlides-1,s),0))===this.current||this.sliding||(i.onSlide&&i.onSlide.call(this,s,this.current),this.animate(s,t),this.current=s)},s.prototype.animate=function(s,t){var i=this.slides,e=i[this.current],a=i[s],n=this.options;t>0?(a.classList.add(n.beforeClass),e.classList.add(n.afterClass)):(a.classList.add(n.afterClass),e.classList.add(n.beforeClass)),a.offsetHeight,e.classList.add(n.animateClass),a.classList.add(n.animateClass),a.classList.add(n.activeClass),e.classList.remove(n.activeClass),a.classList.remove(n.beforeClass),a.classList.remove(n.afterClass),setTimeout(function(){Array.prototype.forEach.call(i,function(s){s.classList.remove(n.animateClass),s.classList.remove(n.beforeClass),s.classList.remove(n.afterClass)})},n.speed)},s.prototype.next=function(){(this.options.infinite||this.current!==this.numSlides-1)&&this.go(this.current+1)},s.prototype.prev=function(){(this.options.infinite||0!==this.current)&&this.go(this.current-1)},s}();
