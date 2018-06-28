(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.miner = factory());
}(this, (function () { 'use strict';

	var a = 5;
	var main = a + 10;

	return main;

})));
