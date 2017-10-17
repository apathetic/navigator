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
"use strict";var Panels=function(s,t){var e={activeClass:"active",beforeClass:"before",afterClass:"after",animateClass:"animating",slides:".slide",infinite:!0,speed:400};this.options=Object.assign(e,t),this.container="string"==typeof s?document.querySelector(s):s,this.slides=this.container.querySelectorAll(this.options.slides),this.current=0,this.slides.length};Panels.prototype.go=function(s){var t,e,a,i=this.options,l=this.slides;a=Math.abs(this.current-s)/(this.current-s),(s=i.infinite?(l.length+s%l.length)%l.length:Math.max(Math.min(l.length-1,s),0))===this.current||this.sliding||(i.onSlide&&i.onSlide.call(this,s,this.current),t=l[this.current],e=l[s],a>0?(e.classList.add(i.beforeClass),t.classList.add(i.afterClass)):(e.classList.add(i.afterClass),t.classList.add(i.beforeClass)),e.offsetHeight,t.classList.add(i.animateClass),e.classList.add(i.animateClass),e.classList.add(i.activeClass),t.classList.remove(i.activeClass),e.classList.remove(i.beforeClass),e.classList.remove(i.afterClass),setTimeout(function(){Array.prototype.forEach.call(l,function(s){s.classList.remove(i.animateClass),s.classList.remove(i.beforeClass),s.classList.remove(i.afterClass)})},i.speed),this.current=s)},module.exports=Panels;
