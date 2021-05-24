(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vmap-svg"] = factory();
	else
		root["vmap-svg"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common/helper.js":
/*!******************************!*\
  !*** ./src/common/helper.js ***!
  \******************************/
/*! exports provided: processLabel, getSvgSize, breakStr, svgLinebreak */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processLabel", function() { return processLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSvgSize", function() { return getSvgSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "breakStr", function() { return breakStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svgLinebreak", function() { return svgLinebreak; });
const processLabel = (label, mode='html') => {
    /* Label processing to handle sub/superscript */

    let tagRev = []; // tagRev resets y-position of label after subscripts (needed for svg)
    if (mode === 'svg') tagRev = ['<tspan y="0">','</tspan>'];
    else tagRev = ['',''];

    if (label.length > 1) {
        const labelParts = label.split('_');

        let tagSub = [];
        if (mode === 'svg') tagSub = [`<tspan style="font-size: .8em;" dx="0" dy="6">`,'</tspan>'];
        else tagSub = ['<sub>','</sub>'];

        return (labelParts.length > 1) ? `${tagRev[0] + labelParts[0] + tagRev[1] + tagSub[0] + labelParts[1] + tagSub[1]}` : tagRev[0]+label+tagRev[1];
    }
    else return tagRev[0]+label+tagRev[1];
};

function getSvgSize(svgText) {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.innerHTML = svgText;
	svg.setAttribute('x','-9999');
	svg.setAttribute('y','-9999');

	const container = document.querySelector('body').appendChild(svg);

	const size = svg.getBBox();
	container.remove();
	return { w: size.width, h: size.height };
}

const breakStr = (str,n=1) => [...new Array(Math.ceil(str.length/n))].map((d,i) => str.substr(n*i,n));

const svgLinebreak = (str, lineShift) => `<tspan x="0" dy="${lineShift}">${str}</tspan>`;

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: default, draw, drawPersp, drawList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "draw", function() { return draw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawPersp", function() { return drawPersp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawList", function() { return drawList; });
/* harmony import */ var _common_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/helper */ "./src/common/helper.js");
/* harmony import */ var _styles_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.js */ "./src/styles.js");




/* harmony default export */ __webpack_exports__["default"] = ({ draw, drawPersp, drawList });

// ===================================================================
//     formform core module 'vmap-svg'
//     -- since 2020, by Peter Hofmann (formsandlines.eu)
// ===================================================================

function draw (vmapTree, input, varorder, options) {
	/* Generates SVG output for a given vmap tree */

	// option defaults
	const {vmapPad, strokeC, vmapC, figPad, figC, hideInputLabel, hideOrderLabel, customLabel, fullInputLabel, inputLabelMax, styleClass} = {
		vmapPad: 0, strokeC: `#fff`, vmapC: `none`, figPad: 0, figC: `#fff`,
		hideInputLabel: false, hideOrderLabel: false, fullInputLabel: false, inputLabelMax: 200, 
		customLabel: undefined, styleClass: 'basic',
		...options};

	const design = _styles_js__WEBPACK_IMPORTED_MODULE_1__["vmap"][styleClass];
	const [textSize, font] = [design.textSize, design.font.base];

	const {vnum, margins} = vmapTree.data;
	const scale = vmapTree.scale;
	const strokeW = margins[0];
	// const len = Math.sqrt(4**vnum); // length of dna without '::'
	const bounds = {w: scale[0] + strokeW, h: scale[1] + strokeW};
	const rhomb = {w: Math.sqrt(2 * (bounds.w**2)), h: Math.sqrt(2 * (bounds.h**2))};


	const caption = (input, customLabel) => {
		if (customLabel !== undefined) return customLabel;

		let label = '';
		if (!hideOrderLabel && vnum > 0) {
			const pos = `y="0"`;

			label += orderLabel(varorder, pos, {font: font, textSize: textSize.base});
		}
		if (!hideInputLabel) {
			const isFormDNA = input.includes('::');

			const prefix = isFormDNA ? '' : `ƒ = `;
			const truncMax = isFormDNA ? (input.split('::')[0].length + 4**4) : inputLabelMax;
			const truncSuffix = isFormDNA ? `…(${4**vnum})` : `… <tspan style="font-style: italic">+more</tspan>`;

			const pos = `y="0"` + (label.length > 0 ? ` dy="${textSize.base + textSize.sm - 2}px"` : '');

			label += inputLabel(input, pos, {prefix: prefix, truncated: !fullInputLabel, truncMax: truncMax, truncSuffix: truncSuffix, font: font, textSize: textSize.sm});
		}
		return label;
	}

	const vmap = {w: (scale[0] + vmapPad), h: (scale[1] + vmapPad)};

	vmap.elem = `<svg class="vmap" width=${vmap.w} height=${vmap.h} viewBox="-${strokeW/2 + vmapPad/2} -${strokeW/2 + vmapPad/2} ${rhomb.w + vmapPad} ${rhomb.h + vmapPad}">
		<rect x="-${vmapPad/2}" y="-${vmapPad/2}" width="${rhomb.w + vmapPad}" height="${rhomb.h + vmapPad}" fill="${vmapC}"></rect>
		<g transform="translate(0,${rhomb.h/2}) rotate(-45,0,0)" stroke="${strokeC}" stroke-width="${strokeW}">${ constructSVG(vmapTree) }</g>
	</svg>`;

	const figCaption = {elem: caption(input, customLabel), pos: {x: 0, y: (vmap.h + 10)}};
	figCaption.size = Object(_common_helper__WEBPACK_IMPORTED_MODULE_0__["getSvgSize"])(figCaption.elem);

	const appendSize = [Math.max(0, (figCaption.size.w - vmap.w)),
						(figCaption.size.h > 0 ? (figCaption.size.h + (figCaption.pos.y - vmap.h)) : 0)];

	const chart = {};

	chart.size = {w: (vmap.w + appendSize[0] + figPad), h: (vmap.h + appendSize[1] + figPad)};

	chart.elem = `<svg class="vmap-figure" xmlns="http://www.w3.org/2000/svg" width="${chart.size.w}" height="${chart.size.h}" viewBox="-${figPad/2} -${figPad/2} ${chart.size.w} ${chart.size.h}">
		<rect x="-${figPad/2}" y="-${figPad/2}" width="${chart.size.w}" height="${chart.size.h}" fill="${figC}"></rect>
		<g>${ vmap.elem }</g>
		<g transform="translate(${figCaption.pos.x},${figCaption.pos.y})">${ figCaption.elem }</g>
	</svg>`;

	return chart;
}

function orderLabel (varorder, pos='x="0" y="0"', options=undefined) {
	/* Generates an order label (e.g. "a > b > c") from variable order */
	const {maxLineWidth, font, textSize, leading} = 
		{ maxLineWidth: 60, font: 'inherit', textSize: 12, leading: 4, ...options };
	const style = `font-family: ${font}; font-size: ${textSize}px; dominant-baseline: hanging;`;

	let output = varorder.reduce((acc,curr,i) => acc + (i > 0 ? '<tspan y="0"> > </tspan>' : '') + Object(_common_helper__WEBPACK_IMPORTED_MODULE_0__["processLabel"])(curr, 'svg'),'' );

	// output = breakStr(output, maxLineWidth) // <-- fix tag breaks
	// 	.reduce((str,curr,i) => str + (i > 0 ? svgLinebreak(curr, (textSize + leading + 'px')) : curr), '');

	return `<text ${pos} style="${style}">${output}</text>`;
}

function inputLabel (input, pos='x="0" y="0"', options=undefined) {
	/* Generates an input label (e.g. "ƒ = ((a)b)" or "::3210") */
	const {prefix, maxLineWidth, truncated, truncMax, truncSuffix, font, textSize, leading} = 
		{prefix: '', maxLineWidth: 60, truncated: false, truncMax: 1000, truncSuffix: '…', font: 'inherit', textSize: 12, leading: 4, ...options };
	const style = `font-family: ${font}; font-size: ${textSize}px; dominant-baseline: hanging;`;

	let output = prefix + input;
	let appendix = '';

	if (truncated && (output.length > truncMax)) {
		output = output.substr(0,truncMax);
		appendix += truncSuffix;
	}
	output = Object(_common_helper__WEBPACK_IMPORTED_MODULE_0__["breakStr"])(output, maxLineWidth)
		.reduce((str,curr,i) => str + (i > 0 ? Object(_common_helper__WEBPACK_IMPORTED_MODULE_0__["svgLinebreak"])(curr, (textSize + leading + 'px')) : curr), '');

	return `<text ${pos} style="${style}">${output + appendix}</text>`;
}

function constructSVG(subTree, mapSVG='') {
	/* Recursive function to construct svg markup from vmap tree structure */

	if(subTree !== null && typeof subTree == "object") {
		if(subTree.children) {
			mapSVG += `<g transform="translate(${subTree.position[0]}, ${subTree.position[1]})">`;

			subTree.children.forEach(child => {
				mapSVG += constructSVG(child);
			});
			mapSVG += `</g>`;
			return mapSVG;
		}
		else {				
			mapSVG += `<rect x="${subTree.position[0]}" y="${subTree.position[1]}" width="${subTree.scale[0]}" height="${subTree.scale[1]}" fill="${vColor(subTree.value)}"></rect>`;
			return mapSVG;
		}
	}
	else {
		throw new Error('Not a subtree!');
	};
}


function drawPersp (vmapPermutations, input, globalOptions=undefined) {
	/* Constructs vmap perspectives as HTML output (flex list) */

	const {figPad, figC, margin, customLabel, styleClass} = 
		{ figPad: 0, figC: `#fff`,
		  margin: 20, customLabel: undefined, styleClass: 'basic', ...globalOptions };

	const design = _styles_js__WEBPACK_IMPORTED_MODULE_1__["vmap"][styleClass];
	const [textSize, font] = [design.textSize, design.font.base];

	const chart = {vmaps: vmapPermutations, input: input, options: globalOptions};


	const padding = {x: (Math.floor(margin/4)), y: (Math.floor(margin/2))};
	const count = vmapPermutations.length;
	const vmapSize = vmapPermutations[0].size;

	const colNum = Math.min(count, 6);
	const rowNum = Math.floor(count/colNum);
	const tableSize = { w: vmapSize.w * colNum + (padding.x*2) * (colNum-1),
						h: vmapSize.h * rowNum + (padding.y*2) * (rowNum-1) };

	const vmapItems = vmapPermutations.map(vmap => {
		
		return {elem: vmap.elem};
	}).reduce((str,item,i) => {
		const x = i%colNum;
		const y = Math.floor(i/colNum);

		const coords = [vmapSize.w * x + (padding.x*2) * x,
						vmapSize.h * y + (padding.y*2) * y];
		return str+ `<g class="vmap-item" transform="translate(${coords[0]},${coords[1]})">${item.elem}</g>`;
	},'');

	const caption = (input, customLabel) => {
		if (customLabel !== undefined) return customLabel;

		const isFormDNA = input.includes('::');
		const prefix = isFormDNA ? '' : `ƒ = `;
		const pos = `y="0"`; //  dy="${textSize.base + textSize.sm - 2}px"

		return inputLabel(input, pos, {prefix: prefix, truncated: false, font: font, textSize: textSize.base});
	}

	const figCaption = {elem: caption(input, customLabel), pos: {x: 0, y: tableSize.h + padding.y}, lineSpacing: padding.y};
	figCaption.size = Object(_common_helper__WEBPACK_IMPORTED_MODULE_0__["getSvgSize"])(figCaption.elem);

	const appendSize = [Math.max(0, (figCaption.size.w - tableSize.w)),
						figCaption.size.h + (figCaption.pos.y - tableSize.h) + figCaption.lineSpacing];

	// const listMargin = {x: 0, y: Math.floor(margin/2)};

	chart.size = {w: (tableSize.w + appendSize[0] + figPad), 
					h: (tableSize.h + appendSize[1] + figPad)};

	chart.elem = `<svg class="vmap-perspectives-figure" xmlns="http://www.w3.org/2000/svg" width="${chart.size.w}" height="${chart.size.h}" viewBox="-${figPad/2} -${figPad/2} ${chart.size.w} ${chart.size.h}">
		<rect x="-${figPad/2}" y="-${figPad/2}" width="${chart.size.w}" height="${chart.size.h}" fill="${figC}"></rect>
		<g class="vmap-perspectives vmap-table">${ vmapItems }</g>
		<g transform="translate(${figCaption.pos.x},${figCaption.pos.y})">
			<line x1="0" y1="0" x2="${tableSize.w}" y2="0" stroke="black" stroke-width="0.5" />
			<g transform="translate(0,${figCaption.lineSpacing})">${ figCaption.elem }</g>
		</g>
	</svg>`;

	return chart;
}


function drawList (vmaps_svg, globalOptions=undefined) {
	/* Constructs multiple vmaps as SVG output */

	const {margin, vAlign} = { margin: 20, vAlign: 'bottom', ...globalOptions }

	// const vmapItems = vmapPermutations_svg.map(draw => {
			
	// 	return {size: draw.size, elem: draw.elem};
	// }).reduce((str,item,i,arr) => {

	// 	// const shiftX = (i > 0) ? ( arr[0].size.w * i + (padding.x*2) * i ) : 0;
	// 	return str+ `<g class="vmap-item" transform="translate(${shiftX},0)">${item.elem}</g>`;
	// },'');

	return `<div class="vmap-list" style="display: flex; flex-wrap: wrap; ${getVAlign(vAlign)} margin: 0 -${Math.floor(margin/2)}px">
			${ vmaps_svg.reduce((str, draw) => `${str}<div class="vmap-item" style="padding: ${Math.floor(margin/4)}px ${Math.floor(margin/2)}px">${draw.elem}</div>`,'') }
			</div>`
};

// -----------------------------------------------------------
//                         Helper
// -----------------------------------------------------------

const getVAlign = vAlign => {
	// >>> as helper
	const alignItems = vAlign === 'top'    ? 'flex-start'
				 	 : vAlign === 'center' ? 'center'
				 	 : vAlign === 'bottom' ? 'flex-end' : 'flex-end';
	return `align-items: ${alignItems};`;
}

const vColor = val => {
	/* Value to color map for vmap */
	return val == 0 ? '#000000'
		 : val == 1 ? '#4757ff'
		 : val == 2 ? '#ff0044'
		 : val == 3 ? '#00ff5f'
		 : NaN;
};

/***/ }),

/***/ "./src/styles.js":
/*!***********************!*\
  !*** ./src/styles.js ***!
  \***********************/
/*! exports provided: vmap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vmap", function() { return vmap; });
// -----------------------
// global styles

const global = {
    common: {
        // font: {family: 'sans-serif', size: '14px', style: 'normal'},
    }
};
global.basic = {
    ...global.common,
};
const [basic] = [global.basic];

const vmap = {
    common: {
        font: {base: `'IBM Plex Mono', 'SFMono-Regular', 'Andale Mono', AndaleMono, 'Lucida Console', 'Lucida Sans Typewriter', Consolas, monospace`},
        textSize: {base: 12, sm: 10},
    }
};

vmap.basic = {
    ...basic,
    ...vmap.common,
};
vmap.basic.applyStyles = function() {

}

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92bWFwLXN2Zy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdm1hcC1zdmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdm1hcC1zdmcvLi9zcmMvY29tbW9uL2hlbHBlci5qcyIsIndlYnBhY2s6Ly92bWFwLXN2Zy8uL3NyYy9tYWluLmpzIiwid2VicGFjazovL3ZtYXAtc3ZnLy4vc3JjL3N0eWxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU87QUFDUDs7QUFFQSxvQkFBb0I7QUFDcEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUVBQXFFO0FB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Q0E7O0FBRUEsQyIsImZpbGUiOiJ2bWFwX3N2Zy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInZtYXAtc3ZnXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInZtYXAtc3ZnXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluLmpzXCIpO1xuIiwiZXhwb3J0IGNvbnN0IHByb2Nlc3NMYWJlbCA9IChsYWJlbCwgbW9kZT0naHRtbCcpID0+IHtcbiAgICAvKiBMYWJlbCBwcm9jZXNzaW5nIHRvIGhhbmRsZSBzdWIvc3VwZXJzY3JpcHQgKi9cblxuICAgIGxldCB0YWdSZXYgPSBbXTsgLy8gdGFnUmV2IHJlc2V0cyB5LXBvc2l0aW9uIG9mIGxhYmVsIGFmdGVyIHN1YnNjcmlwdHMgKG5lZWRlZCBmb3Igc3ZnKVxuICAgIGlmIChtb2RlID09PSAnc3ZnJykgdGFnUmV2ID0gWyc8dHNwYW4geT1cIjBcIj4nLCc8L3RzcGFuPiddO1xuICAgIGVsc2UgdGFnUmV2ID0gWycnLCcnXTtcblxuICAgIGlmIChsYWJlbC5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbnN0IGxhYmVsUGFydHMgPSBsYWJlbC5zcGxpdCgnXycpO1xuXG4gICAgICAgIGxldCB0YWdTdWIgPSBbXTtcbiAgICAgICAgaWYgKG1vZGUgPT09ICdzdmcnKSB0YWdTdWIgPSBbYDx0c3BhbiBzdHlsZT1cImZvbnQtc2l6ZTogLjhlbTtcIiBkeD1cIjBcIiBkeT1cIjZcIj5gLCc8L3RzcGFuPiddO1xuICAgICAgICBlbHNlIHRhZ1N1YiA9IFsnPHN1Yj4nLCc8L3N1Yj4nXTtcblxuICAgICAgICByZXR1cm4gKGxhYmVsUGFydHMubGVuZ3RoID4gMSkgPyBgJHt0YWdSZXZbMF0gKyBsYWJlbFBhcnRzWzBdICsgdGFnUmV2WzFdICsgdGFnU3ViWzBdICsgbGFiZWxQYXJ0c1sxXSArIHRhZ1N1YlsxXX1gIDogdGFnUmV2WzBdK2xhYmVsK3RhZ1JldlsxXTtcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gdGFnUmV2WzBdK2xhYmVsK3RhZ1JldlsxXTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdmdTaXplKHN2Z1RleHQpIHtcblx0Y29uc3Qgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKTtcblx0c3ZnLmlubmVySFRNTCA9IHN2Z1RleHQ7XG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3gnLCctOTk5OScpO1xuXHRzdmcuc2V0QXR0cmlidXRlKCd5JywnLTk5OTknKTtcblxuXHRjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQoc3ZnKTtcblxuXHRjb25zdCBzaXplID0gc3ZnLmdldEJCb3goKTtcblx0Y29udGFpbmVyLnJlbW92ZSgpO1xuXHRyZXR1cm4geyB3OiBzaXplLndpZHRoLCBoOiBzaXplLmhlaWdodCB9O1xufVxuXG5leHBvcnQgY29uc3QgYnJlYWtTdHIgPSAoc3RyLG49MSkgPT4gWy4uLm5ldyBBcnJheShNYXRoLmNlaWwoc3RyLmxlbmd0aC9uKSldLm1hcCgoZCxpKSA9PiBzdHIuc3Vic3RyKG4qaSxuKSk7XG5cbmV4cG9ydCBjb25zdCBzdmdMaW5lYnJlYWsgPSAoc3RyLCBsaW5lU2hpZnQpID0+IGA8dHNwYW4geD1cIjBcIiBkeT1cIiR7bGluZVNoaWZ0fVwiPiR7c3RyfTwvdHNwYW4+YDsiLCJpbXBvcnQgeyBwcm9jZXNzTGFiZWwsIGdldFN2Z1NpemUsIGJyZWFrU3RyLCBzdmdMaW5lYnJlYWsgfSBmcm9tICcuL2NvbW1vbi9oZWxwZXInO1xuXG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9zdHlsZXMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7IGRyYXcsIGRyYXdQZXJzcCwgZHJhd0xpc3QgfTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gICAgIGZvcm1mb3JtIGNvcmUgbW9kdWxlICd2bWFwLXN2Zydcbi8vICAgICAtLSBzaW5jZSAyMDIwLCBieSBQZXRlciBIb2ZtYW5uIChmb3Jtc2FuZGxpbmVzLmV1KVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhdyAodm1hcFRyZWUsIGlucHV0LCB2YXJvcmRlciwgb3B0aW9ucykge1xuXHQvKiBHZW5lcmF0ZXMgU1ZHIG91dHB1dCBmb3IgYSBnaXZlbiB2bWFwIHRyZWUgKi9cblxuXHQvLyBvcHRpb24gZGVmYXVsdHNcblx0Y29uc3Qge3ZtYXBQYWQsIHN0cm9rZUMsIHZtYXBDLCBmaWdQYWQsIGZpZ0MsIGhpZGVJbnB1dExhYmVsLCBoaWRlT3JkZXJMYWJlbCwgY3VzdG9tTGFiZWwsIGZ1bGxJbnB1dExhYmVsLCBpbnB1dExhYmVsTWF4LCBzdHlsZUNsYXNzfSA9IHtcblx0XHR2bWFwUGFkOiAwLCBzdHJva2VDOiBgI2ZmZmAsIHZtYXBDOiBgbm9uZWAsIGZpZ1BhZDogMCwgZmlnQzogYCNmZmZgLFxuXHRcdGhpZGVJbnB1dExhYmVsOiBmYWxzZSwgaGlkZU9yZGVyTGFiZWw6IGZhbHNlLCBmdWxsSW5wdXRMYWJlbDogZmFsc2UsIGlucHV0TGFiZWxNYXg6IDIwMCwgXG5cdFx0Y3VzdG9tTGFiZWw6IHVuZGVmaW5lZCwgc3R5bGVDbGFzczogJ2Jhc2ljJyxcblx0XHQuLi5vcHRpb25zfTtcblxuXHRjb25zdCBkZXNpZ24gPSBzdHlsZXMudm1hcFtzdHlsZUNsYXNzXTtcblx0Y29uc3QgW3RleHRTaXplLCBmb250XSA9IFtkZXNpZ24udGV4dFNpemUsIGRlc2lnbi5mb250LmJhc2VdO1xuXG5cdGNvbnN0IHt2bnVtLCBtYXJnaW5zfSA9IHZtYXBUcmVlLmRhdGE7XG5cdGNvbnN0IHNjYWxlID0gdm1hcFRyZWUuc2NhbGU7XG5cdGNvbnN0IHN0cm9rZVcgPSBtYXJnaW5zWzBdO1xuXHQvLyBjb25zdCBsZW4gPSBNYXRoLnNxcnQoNCoqdm51bSk7IC8vIGxlbmd0aCBvZiBkbmEgd2l0aG91dCAnOjonXG5cdGNvbnN0IGJvdW5kcyA9IHt3OiBzY2FsZVswXSArIHN0cm9rZVcsIGg6IHNjYWxlWzFdICsgc3Ryb2tlV307XG5cdGNvbnN0IHJob21iID0ge3c6IE1hdGguc3FydCgyICogKGJvdW5kcy53KioyKSksIGg6IE1hdGguc3FydCgyICogKGJvdW5kcy5oKioyKSl9O1xuXG5cblx0Y29uc3QgY2FwdGlvbiA9IChpbnB1dCwgY3VzdG9tTGFiZWwpID0+IHtcblx0XHRpZiAoY3VzdG9tTGFiZWwgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGN1c3RvbUxhYmVsO1xuXG5cdFx0bGV0IGxhYmVsID0gJyc7XG5cdFx0aWYgKCFoaWRlT3JkZXJMYWJlbCAmJiB2bnVtID4gMCkge1xuXHRcdFx0Y29uc3QgcG9zID0gYHk9XCIwXCJgO1xuXG5cdFx0XHRsYWJlbCArPSBvcmRlckxhYmVsKHZhcm9yZGVyLCBwb3MsIHtmb250OiBmb250LCB0ZXh0U2l6ZTogdGV4dFNpemUuYmFzZX0pO1xuXHRcdH1cblx0XHRpZiAoIWhpZGVJbnB1dExhYmVsKSB7XG5cdFx0XHRjb25zdCBpc0Zvcm1ETkEgPSBpbnB1dC5pbmNsdWRlcygnOjonKTtcblxuXHRcdFx0Y29uc3QgcHJlZml4ID0gaXNGb3JtRE5BID8gJycgOiBgxpIgPSBgO1xuXHRcdFx0Y29uc3QgdHJ1bmNNYXggPSBpc0Zvcm1ETkEgPyAoaW5wdXQuc3BsaXQoJzo6JylbMF0ubGVuZ3RoICsgNCoqNCkgOiBpbnB1dExhYmVsTWF4O1xuXHRcdFx0Y29uc3QgdHJ1bmNTdWZmaXggPSBpc0Zvcm1ETkEgPyBg4oCmKCR7NCoqdm51bX0pYCA6IGDigKYgPHRzcGFuIHN0eWxlPVwiZm9udC1zdHlsZTogaXRhbGljXCI+K21vcmU8L3RzcGFuPmA7XG5cblx0XHRcdGNvbnN0IHBvcyA9IGB5PVwiMFwiYCArIChsYWJlbC5sZW5ndGggPiAwID8gYCBkeT1cIiR7dGV4dFNpemUuYmFzZSArIHRleHRTaXplLnNtIC0gMn1weFwiYCA6ICcnKTtcblxuXHRcdFx0bGFiZWwgKz0gaW5wdXRMYWJlbChpbnB1dCwgcG9zLCB7cHJlZml4OiBwcmVmaXgsIHRydW5jYXRlZDogIWZ1bGxJbnB1dExhYmVsLCB0cnVuY01heDogdHJ1bmNNYXgsIHRydW5jU3VmZml4OiB0cnVuY1N1ZmZpeCwgZm9udDogZm9udCwgdGV4dFNpemU6IHRleHRTaXplLnNtfSk7XG5cdFx0fVxuXHRcdHJldHVybiBsYWJlbDtcblx0fVxuXG5cdGNvbnN0IHZtYXAgPSB7dzogKHNjYWxlWzBdICsgdm1hcFBhZCksIGg6IChzY2FsZVsxXSArIHZtYXBQYWQpfTtcblxuXHR2bWFwLmVsZW0gPSBgPHN2ZyBjbGFzcz1cInZtYXBcIiB3aWR0aD0ke3ZtYXAud30gaGVpZ2h0PSR7dm1hcC5ofSB2aWV3Qm94PVwiLSR7c3Ryb2tlVy8yICsgdm1hcFBhZC8yfSAtJHtzdHJva2VXLzIgKyB2bWFwUGFkLzJ9ICR7cmhvbWIudyArIHZtYXBQYWR9ICR7cmhvbWIuaCArIHZtYXBQYWR9XCI+XG5cdFx0PHJlY3QgeD1cIi0ke3ZtYXBQYWQvMn1cIiB5PVwiLSR7dm1hcFBhZC8yfVwiIHdpZHRoPVwiJHtyaG9tYi53ICsgdm1hcFBhZH1cIiBoZWlnaHQ9XCIke3Job21iLmggKyB2bWFwUGFkfVwiIGZpbGw9XCIke3ZtYXBDfVwiPjwvcmVjdD5cblx0XHQ8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwke3Job21iLmgvMn0pIHJvdGF0ZSgtNDUsMCwwKVwiIHN0cm9rZT1cIiR7c3Ryb2tlQ31cIiBzdHJva2Utd2lkdGg9XCIke3N0cm9rZVd9XCI+JHsgY29uc3RydWN0U1ZHKHZtYXBUcmVlKSB9PC9nPlxuXHQ8L3N2Zz5gO1xuXG5cdGNvbnN0IGZpZ0NhcHRpb24gPSB7ZWxlbTogY2FwdGlvbihpbnB1dCwgY3VzdG9tTGFiZWwpLCBwb3M6IHt4OiAwLCB5OiAodm1hcC5oICsgMTApfX07XG5cdGZpZ0NhcHRpb24uc2l6ZSA9IGdldFN2Z1NpemUoZmlnQ2FwdGlvbi5lbGVtKTtcblxuXHRjb25zdCBhcHBlbmRTaXplID0gW01hdGgubWF4KDAsIChmaWdDYXB0aW9uLnNpemUudyAtIHZtYXAudykpLFxuXHRcdFx0XHRcdFx0KGZpZ0NhcHRpb24uc2l6ZS5oID4gMCA/IChmaWdDYXB0aW9uLnNpemUuaCArIChmaWdDYXB0aW9uLnBvcy55IC0gdm1hcC5oKSkgOiAwKV07XG5cblx0Y29uc3QgY2hhcnQgPSB7fTtcblxuXHRjaGFydC5zaXplID0ge3c6ICh2bWFwLncgKyBhcHBlbmRTaXplWzBdICsgZmlnUGFkKSwgaDogKHZtYXAuaCArIGFwcGVuZFNpemVbMV0gKyBmaWdQYWQpfTtcblxuXHRjaGFydC5lbGVtID0gYDxzdmcgY2xhc3M9XCJ2bWFwLWZpZ3VyZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIiR7Y2hhcnQuc2l6ZS53fVwiIGhlaWdodD1cIiR7Y2hhcnQuc2l6ZS5ofVwiIHZpZXdCb3g9XCItJHtmaWdQYWQvMn0gLSR7ZmlnUGFkLzJ9ICR7Y2hhcnQuc2l6ZS53fSAke2NoYXJ0LnNpemUuaH1cIj5cblx0XHQ8cmVjdCB4PVwiLSR7ZmlnUGFkLzJ9XCIgeT1cIi0ke2ZpZ1BhZC8yfVwiIHdpZHRoPVwiJHtjaGFydC5zaXplLnd9XCIgaGVpZ2h0PVwiJHtjaGFydC5zaXplLmh9XCIgZmlsbD1cIiR7ZmlnQ31cIj48L3JlY3Q+XG5cdFx0PGc+JHsgdm1hcC5lbGVtIH08L2c+XG5cdFx0PGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKCR7ZmlnQ2FwdGlvbi5wb3MueH0sJHtmaWdDYXB0aW9uLnBvcy55fSlcIj4keyBmaWdDYXB0aW9uLmVsZW0gfTwvZz5cblx0PC9zdmc+YDtcblxuXHRyZXR1cm4gY2hhcnQ7XG59XG5cbmZ1bmN0aW9uIG9yZGVyTGFiZWwgKHZhcm9yZGVyLCBwb3M9J3g9XCIwXCIgeT1cIjBcIicsIG9wdGlvbnM9dW5kZWZpbmVkKSB7XG5cdC8qIEdlbmVyYXRlcyBhbiBvcmRlciBsYWJlbCAoZS5nLiBcImEgPiBiID4gY1wiKSBmcm9tIHZhcmlhYmxlIG9yZGVyICovXG5cdGNvbnN0IHttYXhMaW5lV2lkdGgsIGZvbnQsIHRleHRTaXplLCBsZWFkaW5nfSA9IFxuXHRcdHsgbWF4TGluZVdpZHRoOiA2MCwgZm9udDogJ2luaGVyaXQnLCB0ZXh0U2l6ZTogMTIsIGxlYWRpbmc6IDQsIC4uLm9wdGlvbnMgfTtcblx0Y29uc3Qgc3R5bGUgPSBgZm9udC1mYW1pbHk6ICR7Zm9udH07IGZvbnQtc2l6ZTogJHt0ZXh0U2l6ZX1weDsgZG9taW5hbnQtYmFzZWxpbmU6IGhhbmdpbmc7YDtcblxuXHRsZXQgb3V0cHV0ID0gdmFyb3JkZXIucmVkdWNlKChhY2MsY3VycixpKSA9PiBhY2MgKyAoaSA+IDAgPyAnPHRzcGFuIHk9XCIwXCI+ID4gPC90c3Bhbj4nIDogJycpICsgcHJvY2Vzc0xhYmVsKGN1cnIsICdzdmcnKSwnJyApO1xuXG5cdC8vIG91dHB1dCA9IGJyZWFrU3RyKG91dHB1dCwgbWF4TGluZVdpZHRoKSAvLyA8LS0gZml4IHRhZyBicmVha3Ncblx0Ly8gXHQucmVkdWNlKChzdHIsY3VycixpKSA9PiBzdHIgKyAoaSA+IDAgPyBzdmdMaW5lYnJlYWsoY3VyciwgKHRleHRTaXplICsgbGVhZGluZyArICdweCcpKSA6IGN1cnIpLCAnJyk7XG5cblx0cmV0dXJuIGA8dGV4dCAke3Bvc30gc3R5bGU9XCIke3N0eWxlfVwiPiR7b3V0cHV0fTwvdGV4dD5gO1xufVxuXG5mdW5jdGlvbiBpbnB1dExhYmVsIChpbnB1dCwgcG9zPSd4PVwiMFwiIHk9XCIwXCInLCBvcHRpb25zPXVuZGVmaW5lZCkge1xuXHQvKiBHZW5lcmF0ZXMgYW4gaW5wdXQgbGFiZWwgKGUuZy4gXCLGkiA9ICgoYSliKVwiIG9yIFwiOjozMjEwXCIpICovXG5cdGNvbnN0IHtwcmVmaXgsIG1heExpbmVXaWR0aCwgdHJ1bmNhdGVkLCB0cnVuY01heCwgdHJ1bmNTdWZmaXgsIGZvbnQsIHRleHRTaXplLCBsZWFkaW5nfSA9IFxuXHRcdHtwcmVmaXg6ICcnLCBtYXhMaW5lV2lkdGg6IDYwLCB0cnVuY2F0ZWQ6IGZhbHNlLCB0cnVuY01heDogMTAwMCwgdHJ1bmNTdWZmaXg6ICfigKYnLCBmb250OiAnaW5oZXJpdCcsIHRleHRTaXplOiAxMiwgbGVhZGluZzogNCwgLi4ub3B0aW9ucyB9O1xuXHRjb25zdCBzdHlsZSA9IGBmb250LWZhbWlseTogJHtmb250fTsgZm9udC1zaXplOiAke3RleHRTaXplfXB4OyBkb21pbmFudC1iYXNlbGluZTogaGFuZ2luZztgO1xuXG5cdGxldCBvdXRwdXQgPSBwcmVmaXggKyBpbnB1dDtcblx0bGV0IGFwcGVuZGl4ID0gJyc7XG5cblx0aWYgKHRydW5jYXRlZCAmJiAob3V0cHV0Lmxlbmd0aCA+IHRydW5jTWF4KSkge1xuXHRcdG91dHB1dCA9IG91dHB1dC5zdWJzdHIoMCx0cnVuY01heCk7XG5cdFx0YXBwZW5kaXggKz0gdHJ1bmNTdWZmaXg7XG5cdH1cblx0b3V0cHV0ID0gYnJlYWtTdHIob3V0cHV0LCBtYXhMaW5lV2lkdGgpXG5cdFx0LnJlZHVjZSgoc3RyLGN1cnIsaSkgPT4gc3RyICsgKGkgPiAwID8gc3ZnTGluZWJyZWFrKGN1cnIsICh0ZXh0U2l6ZSArIGxlYWRpbmcgKyAncHgnKSkgOiBjdXJyKSwgJycpO1xuXG5cdHJldHVybiBgPHRleHQgJHtwb3N9IHN0eWxlPVwiJHtzdHlsZX1cIj4ke291dHB1dCArIGFwcGVuZGl4fTwvdGV4dD5gO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RTVkcoc3ViVHJlZSwgbWFwU1ZHPScnKSB7XG5cdC8qIFJlY3Vyc2l2ZSBmdW5jdGlvbiB0byBjb25zdHJ1Y3Qgc3ZnIG1hcmt1cCBmcm9tIHZtYXAgdHJlZSBzdHJ1Y3R1cmUgKi9cblxuXHRpZihzdWJUcmVlICE9PSBudWxsICYmIHR5cGVvZiBzdWJUcmVlID09IFwib2JqZWN0XCIpIHtcblx0XHRpZihzdWJUcmVlLmNoaWxkcmVuKSB7XG5cdFx0XHRtYXBTVkcgKz0gYDxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgke3N1YlRyZWUucG9zaXRpb25bMF19LCAke3N1YlRyZWUucG9zaXRpb25bMV19KVwiPmA7XG5cblx0XHRcdHN1YlRyZWUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG5cdFx0XHRcdG1hcFNWRyArPSBjb25zdHJ1Y3RTVkcoY2hpbGQpO1xuXHRcdFx0fSk7XG5cdFx0XHRtYXBTVkcgKz0gYDwvZz5gO1xuXHRcdFx0cmV0dXJuIG1hcFNWRztcblx0XHR9XG5cdFx0ZWxzZSB7XHRcdFx0XHRcblx0XHRcdG1hcFNWRyArPSBgPHJlY3QgeD1cIiR7c3ViVHJlZS5wb3NpdGlvblswXX1cIiB5PVwiJHtzdWJUcmVlLnBvc2l0aW9uWzFdfVwiIHdpZHRoPVwiJHtzdWJUcmVlLnNjYWxlWzBdfVwiIGhlaWdodD1cIiR7c3ViVHJlZS5zY2FsZVsxXX1cIiBmaWxsPVwiJHt2Q29sb3Ioc3ViVHJlZS52YWx1ZSl9XCI+PC9yZWN0PmA7XG5cdFx0XHRyZXR1cm4gbWFwU1ZHO1xuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ05vdCBhIHN1YnRyZWUhJyk7XG5cdH07XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdQZXJzcCAodm1hcFBlcm11dGF0aW9ucywgaW5wdXQsIGdsb2JhbE9wdGlvbnM9dW5kZWZpbmVkKSB7XG5cdC8qIENvbnN0cnVjdHMgdm1hcCBwZXJzcGVjdGl2ZXMgYXMgSFRNTCBvdXRwdXQgKGZsZXggbGlzdCkgKi9cblxuXHRjb25zdCB7ZmlnUGFkLCBmaWdDLCBtYXJnaW4sIGN1c3RvbUxhYmVsLCBzdHlsZUNsYXNzfSA9IFxuXHRcdHsgZmlnUGFkOiAwLCBmaWdDOiBgI2ZmZmAsXG5cdFx0ICBtYXJnaW46IDIwLCBjdXN0b21MYWJlbDogdW5kZWZpbmVkLCBzdHlsZUNsYXNzOiAnYmFzaWMnLCAuLi5nbG9iYWxPcHRpb25zIH07XG5cblx0Y29uc3QgZGVzaWduID0gc3R5bGVzLnZtYXBbc3R5bGVDbGFzc107XG5cdGNvbnN0IFt0ZXh0U2l6ZSwgZm9udF0gPSBbZGVzaWduLnRleHRTaXplLCBkZXNpZ24uZm9udC5iYXNlXTtcblxuXHRjb25zdCBjaGFydCA9IHt2bWFwczogdm1hcFBlcm11dGF0aW9ucywgaW5wdXQ6IGlucHV0LCBvcHRpb25zOiBnbG9iYWxPcHRpb25zfTtcblxuXG5cdGNvbnN0IHBhZGRpbmcgPSB7eDogKE1hdGguZmxvb3IobWFyZ2luLzQpKSwgeTogKE1hdGguZmxvb3IobWFyZ2luLzIpKX07XG5cdGNvbnN0IGNvdW50ID0gdm1hcFBlcm11dGF0aW9ucy5sZW5ndGg7XG5cdGNvbnN0IHZtYXBTaXplID0gdm1hcFBlcm11dGF0aW9uc1swXS5zaXplO1xuXG5cdGNvbnN0IGNvbE51bSA9IE1hdGgubWluKGNvdW50LCA2KTtcblx0Y29uc3Qgcm93TnVtID0gTWF0aC5mbG9vcihjb3VudC9jb2xOdW0pO1xuXHRjb25zdCB0YWJsZVNpemUgPSB7IHc6IHZtYXBTaXplLncgKiBjb2xOdW0gKyAocGFkZGluZy54KjIpICogKGNvbE51bS0xKSxcblx0XHRcdFx0XHRcdGg6IHZtYXBTaXplLmggKiByb3dOdW0gKyAocGFkZGluZy55KjIpICogKHJvd051bS0xKSB9O1xuXG5cdGNvbnN0IHZtYXBJdGVtcyA9IHZtYXBQZXJtdXRhdGlvbnMubWFwKHZtYXAgPT4ge1xuXHRcdFxuXHRcdHJldHVybiB7ZWxlbTogdm1hcC5lbGVtfTtcblx0fSkucmVkdWNlKChzdHIsaXRlbSxpKSA9PiB7XG5cdFx0Y29uc3QgeCA9IGklY29sTnVtO1xuXHRcdGNvbnN0IHkgPSBNYXRoLmZsb29yKGkvY29sTnVtKTtcblxuXHRcdGNvbnN0IGNvb3JkcyA9IFt2bWFwU2l6ZS53ICogeCArIChwYWRkaW5nLngqMikgKiB4LFxuXHRcdFx0XHRcdFx0dm1hcFNpemUuaCAqIHkgKyAocGFkZGluZy55KjIpICogeV07XG5cdFx0cmV0dXJuIHN0cisgYDxnIGNsYXNzPVwidm1hcC1pdGVtXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKCR7Y29vcmRzWzBdfSwke2Nvb3Jkc1sxXX0pXCI+JHtpdGVtLmVsZW19PC9nPmA7XG5cdH0sJycpO1xuXG5cdGNvbnN0IGNhcHRpb24gPSAoaW5wdXQsIGN1c3RvbUxhYmVsKSA9PiB7XG5cdFx0aWYgKGN1c3RvbUxhYmVsICE9PSB1bmRlZmluZWQpIHJldHVybiBjdXN0b21MYWJlbDtcblxuXHRcdGNvbnN0IGlzRm9ybUROQSA9IGlucHV0LmluY2x1ZGVzKCc6OicpO1xuXHRcdGNvbnN0IHByZWZpeCA9IGlzRm9ybUROQSA/ICcnIDogYMaSID0gYDtcblx0XHRjb25zdCBwb3MgPSBgeT1cIjBcImA7IC8vICBkeT1cIiR7dGV4dFNpemUuYmFzZSArIHRleHRTaXplLnNtIC0gMn1weFwiXG5cblx0XHRyZXR1cm4gaW5wdXRMYWJlbChpbnB1dCwgcG9zLCB7cHJlZml4OiBwcmVmaXgsIHRydW5jYXRlZDogZmFsc2UsIGZvbnQ6IGZvbnQsIHRleHRTaXplOiB0ZXh0U2l6ZS5iYXNlfSk7XG5cdH1cblxuXHRjb25zdCBmaWdDYXB0aW9uID0ge2VsZW06IGNhcHRpb24oaW5wdXQsIGN1c3RvbUxhYmVsKSwgcG9zOiB7eDogMCwgeTogdGFibGVTaXplLmggKyBwYWRkaW5nLnl9LCBsaW5lU3BhY2luZzogcGFkZGluZy55fTtcblx0ZmlnQ2FwdGlvbi5zaXplID0gZ2V0U3ZnU2l6ZShmaWdDYXB0aW9uLmVsZW0pO1xuXG5cdGNvbnN0IGFwcGVuZFNpemUgPSBbTWF0aC5tYXgoMCwgKGZpZ0NhcHRpb24uc2l6ZS53IC0gdGFibGVTaXplLncpKSxcblx0XHRcdFx0XHRcdGZpZ0NhcHRpb24uc2l6ZS5oICsgKGZpZ0NhcHRpb24ucG9zLnkgLSB0YWJsZVNpemUuaCkgKyBmaWdDYXB0aW9uLmxpbmVTcGFjaW5nXTtcblxuXHQvLyBjb25zdCBsaXN0TWFyZ2luID0ge3g6IDAsIHk6IE1hdGguZmxvb3IobWFyZ2luLzIpfTtcblxuXHRjaGFydC5zaXplID0ge3c6ICh0YWJsZVNpemUudyArIGFwcGVuZFNpemVbMF0gKyBmaWdQYWQpLCBcblx0XHRcdFx0XHRoOiAodGFibGVTaXplLmggKyBhcHBlbmRTaXplWzFdICsgZmlnUGFkKX07XG5cblx0Y2hhcnQuZWxlbSA9IGA8c3ZnIGNsYXNzPVwidm1hcC1wZXJzcGVjdGl2ZXMtZmlndXJlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiJHtjaGFydC5zaXplLnd9XCIgaGVpZ2h0PVwiJHtjaGFydC5zaXplLmh9XCIgdmlld0JveD1cIi0ke2ZpZ1BhZC8yfSAtJHtmaWdQYWQvMn0gJHtjaGFydC5zaXplLnd9ICR7Y2hhcnQuc2l6ZS5ofVwiPlxuXHRcdDxyZWN0IHg9XCItJHtmaWdQYWQvMn1cIiB5PVwiLSR7ZmlnUGFkLzJ9XCIgd2lkdGg9XCIke2NoYXJ0LnNpemUud31cIiBoZWlnaHQ9XCIke2NoYXJ0LnNpemUuaH1cIiBmaWxsPVwiJHtmaWdDfVwiPjwvcmVjdD5cblx0XHQ8ZyBjbGFzcz1cInZtYXAtcGVyc3BlY3RpdmVzIHZtYXAtdGFibGVcIj4keyB2bWFwSXRlbXMgfTwvZz5cblx0XHQ8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoJHtmaWdDYXB0aW9uLnBvcy54fSwke2ZpZ0NhcHRpb24ucG9zLnl9KVwiPlxuXHRcdFx0PGxpbmUgeDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIke3RhYmxlU2l6ZS53fVwiIHkyPVwiMFwiIHN0cm9rZT1cImJsYWNrXCIgc3Ryb2tlLXdpZHRoPVwiMC41XCIgLz5cblx0XHRcdDxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLCR7ZmlnQ2FwdGlvbi5saW5lU3BhY2luZ30pXCI+JHsgZmlnQ2FwdGlvbi5lbGVtIH08L2c+XG5cdFx0PC9nPlxuXHQ8L3N2Zz5gO1xuXG5cdHJldHVybiBjaGFydDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd0xpc3QgKHZtYXBzX3N2ZywgZ2xvYmFsT3B0aW9ucz11bmRlZmluZWQpIHtcblx0LyogQ29uc3RydWN0cyBtdWx0aXBsZSB2bWFwcyBhcyBTVkcgb3V0cHV0ICovXG5cblx0Y29uc3Qge21hcmdpbiwgdkFsaWdufSA9IHsgbWFyZ2luOiAyMCwgdkFsaWduOiAnYm90dG9tJywgLi4uZ2xvYmFsT3B0aW9ucyB9XG5cblx0Ly8gY29uc3Qgdm1hcEl0ZW1zID0gdm1hcFBlcm11dGF0aW9uc19zdmcubWFwKGRyYXcgPT4ge1xuXHRcdFx0XG5cdC8vIFx0cmV0dXJuIHtzaXplOiBkcmF3LnNpemUsIGVsZW06IGRyYXcuZWxlbX07XG5cdC8vIH0pLnJlZHVjZSgoc3RyLGl0ZW0saSxhcnIpID0+IHtcblxuXHQvLyBcdC8vIGNvbnN0IHNoaWZ0WCA9IChpID4gMCkgPyAoIGFyclswXS5zaXplLncgKiBpICsgKHBhZGRpbmcueCoyKSAqIGkgKSA6IDA7XG5cdC8vIFx0cmV0dXJuIHN0cisgYDxnIGNsYXNzPVwidm1hcC1pdGVtXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKCR7c2hpZnRYfSwwKVwiPiR7aXRlbS5lbGVtfTwvZz5gO1xuXHQvLyB9LCcnKTtcblxuXHRyZXR1cm4gYDxkaXYgY2xhc3M9XCJ2bWFwLWxpc3RcIiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGZsZXgtd3JhcDogd3JhcDsgJHtnZXRWQWxpZ24odkFsaWduKX0gbWFyZ2luOiAwIC0ke01hdGguZmxvb3IobWFyZ2luLzIpfXB4XCI+XG5cdFx0XHQkeyB2bWFwc19zdmcucmVkdWNlKChzdHIsIGRyYXcpID0+IGAke3N0cn08ZGl2IGNsYXNzPVwidm1hcC1pdGVtXCIgc3R5bGU9XCJwYWRkaW5nOiAke01hdGguZmxvb3IobWFyZ2luLzQpfXB4ICR7TWF0aC5mbG9vcihtYXJnaW4vMil9cHhcIj4ke2RyYXcuZWxlbX08L2Rpdj5gLCcnKSB9XG5cdFx0XHQ8L2Rpdj5gXG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgSGVscGVyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jb25zdCBnZXRWQWxpZ24gPSB2QWxpZ24gPT4ge1xuXHQvLyA+Pj4gYXMgaGVscGVyXG5cdGNvbnN0IGFsaWduSXRlbXMgPSB2QWxpZ24gPT09ICd0b3AnICAgID8gJ2ZsZXgtc3RhcnQnXG5cdFx0XHRcdCBcdCA6IHZBbGlnbiA9PT0gJ2NlbnRlcicgPyAnY2VudGVyJ1xuXHRcdFx0XHQgXHQgOiB2QWxpZ24gPT09ICdib3R0b20nID8gJ2ZsZXgtZW5kJyA6ICdmbGV4LWVuZCc7XG5cdHJldHVybiBgYWxpZ24taXRlbXM6ICR7YWxpZ25JdGVtc307YDtcbn1cblxuY29uc3QgdkNvbG9yID0gdmFsID0+IHtcblx0LyogVmFsdWUgdG8gY29sb3IgbWFwIGZvciB2bWFwICovXG5cdHJldHVybiB2YWwgPT0gMCA/ICcjMDAwMDAwJ1xuXHRcdCA6IHZhbCA9PSAxID8gJyM0NzU3ZmYnXG5cdFx0IDogdmFsID09IDIgPyAnI2ZmMDA0NCdcblx0XHQgOiB2YWwgPT0gMyA/ICcjMDBmZjVmJ1xuXHRcdCA6IE5hTjtcbn07IiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIGdsb2JhbCBzdHlsZXNcblxuY29uc3QgZ2xvYmFsID0ge1xuICAgIGNvbW1vbjoge1xuICAgICAgICAvLyBmb250OiB7ZmFtaWx5OiAnc2Fucy1zZXJpZicsIHNpemU6ICcxNHB4Jywgc3R5bGU6ICdub3JtYWwnfSxcbiAgICB9XG59O1xuZ2xvYmFsLmJhc2ljID0ge1xuICAgIC4uLmdsb2JhbC5jb21tb24sXG59O1xuY29uc3QgW2Jhc2ljXSA9IFtnbG9iYWwuYmFzaWNdO1xuXG5leHBvcnQgY29uc3Qgdm1hcCA9IHtcbiAgICBjb21tb246IHtcbiAgICAgICAgZm9udDoge2Jhc2U6IGAnSUJNIFBsZXggTW9ubycsICdTRk1vbm8tUmVndWxhcicsICdBbmRhbGUgTW9ubycsIEFuZGFsZU1vbm8sICdMdWNpZGEgQ29uc29sZScsICdMdWNpZGEgU2FucyBUeXBld3JpdGVyJywgQ29uc29sYXMsIG1vbm9zcGFjZWB9LFxuICAgICAgICB0ZXh0U2l6ZToge2Jhc2U6IDEyLCBzbTogMTB9LFxuICAgIH1cbn07XG5cbnZtYXAuYmFzaWMgPSB7XG4gICAgLi4uYmFzaWMsXG4gICAgLi4udm1hcC5jb21tb24sXG59O1xudm1hcC5iYXNpYy5hcHBseVN0eWxlcyA9IGZ1bmN0aW9uKCnCoHtcblxufSJdLCJzb3VyY2VSb290IjoiIn0=