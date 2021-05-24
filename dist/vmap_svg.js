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
/*! exports provided: formDNA_html, vmap_svg, vmapPerspectives_svg, vmapList_svg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formDNA_html", function() { return formDNA_html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vmap_svg", function() { return vmap_svg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vmapPerspectives_svg", function() { return vmapPerspectives_svg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vmapList_svg", function() { return vmapList_svg; });
/* harmony import */ var _common_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/helper */ "./src/common/helper.js");
/* harmony import */ var _styles_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.js */ "./src/styles.js");





// ===========================================================
//                      formDNA markup
// ===========================================================

function formDNA_html (formula, dna, vars) {
	/* Constructs an HTML wrapper for formDNA */

	// construct HTML markup for the formDNA
	const formStr = formula !== undefined ? `<span class="dna-form" title="FORM">${formula}</span>` : '';

	const varorderStr = vars && dna.length > 1 ? '.<span class="dna-varorder" title="Variable interpretation order">['+vars.join(',')+']</span>' : '';

	return `<div id="dna"><code>${formStr + varorderStr}::<span class="dna-code">${markupQuartCycles(dna)}</span></code></div>`;
}

// ===========================================================
//                        vmap markup
// ===========================================================

function vmap_svg (vmapTree, input, varorder, options) {
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

	const chart = {tree: vmapTree, input: input, varorder: varorder, options: options};

	// if (output == 'mixed') {
		// svg with html wrapper

		// const caption = () => {
		// 	if (customLabel !== undefined) return `<figcaption style="word-wrap: break-word;">${customLabel}</figcaption>`;
		// 	if (!(hideInputLabel && hideOrderLabel)) {
		// 		let label = '';
		// 		if (!hideOrderLabel) label += `${varorder.reduce((acc,curr,i) => acc + (i > 0 ? ' > ' : '') + processLabel(curr),'' )}${hideInputLabel || vnum < 1 ? '' : '<br/>'}`;
		// 		if (!hideInputLabel) {
		// 			const isFormDNA = input.includes('::');
		// 			if (isFormDNA) label += `<code style="font-size:0.8em;">${fullInputLabel ? input : truncateStr(input,(input.split('::')[0].length + 4**4),`…(${4**vnum})`)}</code>`;
		// 			else label += 'ƒ = '+(fullInputLabel ? input : truncateStr(input,inputLabelMax,`… <i>+more</i>`));
		// 		}
		// 		return `<figcaption style="word-wrap: break-word;">${label}</figcaption>`;
		// 	}
		// 	return '';
		// }

		// chart.elem = `<figure class="vmap-figure" style="margin: 0;">
		// 	<svg class="vmap" style="background: ${bgC}; padding: ${vmapPad};" width=${scale[0]} height=${scale[1]}
		// 	fill="white" stroke="${strokeC}" stroke-width="${strokeW}"
		// 	viewBox="-${strokeW/2} -${strokeW/2} ${rhomb.w} ${rhomb.h}">
		// 	<g transform="translate(${0},${rhomb.h/2}) rotate(-45,0,0)">${ constructSVG(vmapTree) }</g>
		// 	</svg>
		// 	${ caption() }
		// 	</figure>`;

	// } else {
		// pure svg output

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

		chart.size = {w: (vmap.w + appendSize[0] + figPad), h: (vmap.h + appendSize[1] + figPad)};

		chart.elem = `<svg class="vmap-figure" xmlns="http://www.w3.org/2000/svg" width="${chart.size.w}" height="${chart.size.h}" viewBox="-${figPad/2} -${figPad/2} ${chart.size.w} ${chart.size.h}">
			<rect x="-${figPad/2}" y="-${figPad/2}" width="${chart.size.w}" height="${chart.size.h}" fill="${figC}"></rect>
			<g>${ vmap.elem }</g>
			<g transform="translate(${figCaption.pos.x},${figCaption.pos.y})">${ figCaption.elem }</g>
		</svg>`;
	// }

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


function vmapPerspectives_svg (vmapPermutations, input, globalOptions=undefined) {
	/* Constructs vmap perspectives as HTML output (flex list) */

	const {figPad, figC, margin, customLabel, styleClass} = 
		{ figPad: 0, figC: `#fff`,
		  margin: 20, customLabel: undefined, styleClass: 'basic', ...globalOptions };

	const design = _styles_js__WEBPACK_IMPORTED_MODULE_1__["vmap"][styleClass];
	const [textSize, font] = [design.textSize, design.font.base];

	const chart = {vmaps: vmapPermutations, input: input, options: globalOptions};

	// if (output == 'mixed') {
		// const vmapItems = vmapPermutations.map(vmap => {
		// 	return `<div class="vmap-item" style="padding: ${Math.floor(margin/4)}px ${Math.floor(margin/2)}px"> 
		// 			${vmap.elem}</div>`}).reduce((str,item) => str+item,'');

		// const label = caption();

		// return `<figure class="vmap-perspectives" style="max-width: none;">
		// 		<div class="vmap-list" style="display: flex; flex-wrap: wrap; margin: 0 -${Math.floor(margin/2)}px">
		// 		${ vmapItems }
		// 		</div>
		// 		<figcaption style="border-top: 1px solid; padding-top: ${Math.floor(margin/4)}px; margin-top: ${Math.floor(margin/2)}px; word-wrap: break-word;">${label}</figcaption>
		// 		</figure>`;
	// }
	// else {
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
	// }
}


function vmapList_svg (vmaps_svg, globalOptions=undefined) {
	/* Constructs multiple vmaps as SVG output */

	const {margin, vAlign} = { margin: 20, vAlign: 'bottom', ...globalOptions }

	// const vmapItems = vmapPermutations_svg.map(vmap_svg => {
			
	// 	return {size: vmap_svg.size, elem: vmap_svg.elem};
	// }).reduce((str,item,i,arr) => {

	// 	// const shiftX = (i > 0) ? ( arr[0].size.w * i + (padding.x*2) * i ) : 0;
	// 	return str+ `<g class="vmap-item" transform="translate(${shiftX},0)">${item.elem}</g>`;
	// },'');

	return `<div class="vmap-list" style="display: flex; flex-wrap: wrap; ${getVAlign(vAlign)} margin: 0 -${Math.floor(margin/2)}px">
			${ vmaps_svg.reduce((str, vmap_svg) => `${str}<div class="vmap-item" style="padding: ${Math.floor(margin/4)}px ${Math.floor(margin/2)}px">${vmap_svg.elem}</div>`,'') }
			</div>`
};

// -----------------------------------------------------------
//                         Helper
// -----------------------------------------------------------

const markupQuartCycles = (str) => {
	/* Marks up groups of 4 numbers each for dna to be able to apply readable CSS */
	return str.split('').reduce((str,c,i,arr) => {

		return str + ((i+1)%4 === 1 ? '<span class="dna-quart1">' : '') + c + ((i+1)%4 === 0 ? '</span>' : '');
	},'');
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92bWFwLXN2Zy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdm1hcC1zdmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdm1hcC1zdmcvLi9zcmMvY29tbW9uL2hlbHBlci5qcyIsIndlYnBhY2s6Ly92bWFwLXN2Zy8uL3NyYy9tYWluLmpzIiwid2VicGFjazovL3ZtYXAtc3ZnLy4vc3JjL3N0eWxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU87QUFDUDs7QUFFQSxvQkFBb0I7QUFDcEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUVBQXFFO0FB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YSxHQUFHLGFBQWE7QUFDNU0sZUFBZSxTQUFTLFFBQVEsU0FBUyxXQUFXLGFBQWEsWUFBWSxhQUFhLFVBQVUsS0FBSztBQUN6Ryw2Q0FBNkMsWUFBWTtBQUN6RCw2QkFBNkIsaUJBQWlCLEdBQUcsaUJBQWlCO0FBQ2xFLDhCQUE4QixZQUFZO0FBQzFDLGdDQUFnQyx1QkFBdUIsS0FBSyxrQkFBa0I7QUFDOUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdPO0FBQ1A7O0FBRUEsUUFBUSxlQUFlLElBQUk7O0FBRTNCOztBQUVBLGFBQWE7QUFDYixLQUFLOztBQUVMO0FBQ0EsOERBQThELE9BQU8sT0FBTyxVQUFVO0FBQ3RGLEtBQUs7O0FBRUwscURBQXFELGlCQUFpQixHQUFHLGtCQUFrQixjQUFjLHFCQUFxQjtBQUM5SCxLQUFLLHdDQUF3QyxJQUFJLHlDQUF5QyxxQkFBcUIsS0FBSyxxQkFBcUIsTUFBTSxjQUFjO0FBQzdKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RUQTtBQUFBO0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLG9EQUFvRDtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBLGVBQWUsc0lBQXNJO0FBQ3JKLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEMiLCJmaWxlIjoidm1hcF9zdmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ2bWFwLXN2Z1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ2bWFwLXN2Z1wiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi5qc1wiKTtcbiIsImV4cG9ydCBjb25zdCBwcm9jZXNzTGFiZWwgPSAobGFiZWwsIG1vZGU9J2h0bWwnKSA9PiB7XG4gICAgLyogTGFiZWwgcHJvY2Vzc2luZyB0byBoYW5kbGUgc3ViL3N1cGVyc2NyaXB0ICovXG5cbiAgICBsZXQgdGFnUmV2ID0gW107IC8vIHRhZ1JldiByZXNldHMgeS1wb3NpdGlvbiBvZiBsYWJlbCBhZnRlciBzdWJzY3JpcHRzIChuZWVkZWQgZm9yIHN2ZylcbiAgICBpZiAobW9kZSA9PT0gJ3N2ZycpIHRhZ1JldiA9IFsnPHRzcGFuIHk9XCIwXCI+JywnPC90c3Bhbj4nXTtcbiAgICBlbHNlIHRhZ1JldiA9IFsnJywnJ107XG5cbiAgICBpZiAobGFiZWwubGVuZ3RoID4gMSkge1xuICAgICAgICBjb25zdCBsYWJlbFBhcnRzID0gbGFiZWwuc3BsaXQoJ18nKTtcblxuICAgICAgICBsZXQgdGFnU3ViID0gW107XG4gICAgICAgIGlmIChtb2RlID09PSAnc3ZnJykgdGFnU3ViID0gW2A8dHNwYW4gc3R5bGU9XCJmb250LXNpemU6IC44ZW07XCIgZHg9XCIwXCIgZHk9XCI2XCI+YCwnPC90c3Bhbj4nXTtcbiAgICAgICAgZWxzZSB0YWdTdWIgPSBbJzxzdWI+JywnPC9zdWI+J107XG5cbiAgICAgICAgcmV0dXJuIChsYWJlbFBhcnRzLmxlbmd0aCA+IDEpID8gYCR7dGFnUmV2WzBdICsgbGFiZWxQYXJ0c1swXSArIHRhZ1JldlsxXSArIHRhZ1N1YlswXSArIGxhYmVsUGFydHNbMV0gKyB0YWdTdWJbMV19YCA6IHRhZ1JldlswXStsYWJlbCt0YWdSZXZbMV07XG4gICAgfVxuICAgIGVsc2UgcmV0dXJuIHRhZ1JldlswXStsYWJlbCt0YWdSZXZbMV07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3ZnU2l6ZShzdmdUZXh0KSB7XG5cdGNvbnN0IHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJyk7XG5cdHN2Zy5pbm5lckhUTUwgPSBzdmdUZXh0O1xuXHRzdmcuc2V0QXR0cmlidXRlKCd4JywnLTk5OTknKTtcblx0c3ZnLnNldEF0dHJpYnV0ZSgneScsJy05OTk5Jyk7XG5cblx0Y29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKHN2Zyk7XG5cblx0Y29uc3Qgc2l6ZSA9IHN2Zy5nZXRCQm94KCk7XG5cdGNvbnRhaW5lci5yZW1vdmUoKTtcblx0cmV0dXJuIHsgdzogc2l6ZS53aWR0aCwgaDogc2l6ZS5oZWlnaHQgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGJyZWFrU3RyID0gKHN0cixuPTEpID0+IFsuLi5uZXcgQXJyYXkoTWF0aC5jZWlsKHN0ci5sZW5ndGgvbikpXS5tYXAoKGQsaSkgPT4gc3RyLnN1YnN0cihuKmksbikpO1xuXG5leHBvcnQgY29uc3Qgc3ZnTGluZWJyZWFrID0gKHN0ciwgbGluZVNoaWZ0KSA9PiBgPHRzcGFuIHg9XCIwXCIgZHk9XCIke2xpbmVTaGlmdH1cIj4ke3N0cn08L3RzcGFuPmA7IiwiaW1wb3J0IHsgcHJvY2Vzc0xhYmVsLCBnZXRTdmdTaXplLCBicmVha1N0ciwgc3ZnTGluZWJyZWFrIH0gZnJvbSAnLi9jb21tb24vaGVscGVyJztcblxuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vc3R5bGVzLmpzJztcblxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gICAgICAgICAgICAgICAgICAgICAgZm9ybUROQSBtYXJrdXBcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtRE5BX2h0bWwgKGZvcm11bGEsIGRuYSwgdmFycynCoHtcblx0LyogQ29uc3RydWN0cyBhbiBIVE1MIHdyYXBwZXIgZm9yIGZvcm1ETkEgKi9cblxuXHQvLyBjb25zdHJ1Y3QgSFRNTCBtYXJrdXAgZm9yIHRoZSBmb3JtRE5BXG5cdGNvbnN0IGZvcm1TdHIgPSBmb3JtdWxhICE9PSB1bmRlZmluZWQgPyBgPHNwYW4gY2xhc3M9XCJkbmEtZm9ybVwiIHRpdGxlPVwiRk9STVwiPiR7Zm9ybXVsYX08L3NwYW4+YCA6ICcnO1xuXG5cdGNvbnN0IHZhcm9yZGVyU3RyID0gdmFycyAmJiBkbmEubGVuZ3RoID4gMSA/ICcuPHNwYW4gY2xhc3M9XCJkbmEtdmFyb3JkZXJcIiB0aXRsZT1cIlZhcmlhYmxlIGludGVycHJldGF0aW9uIG9yZGVyXCI+WycrdmFycy5qb2luKCcsJykrJ108L3NwYW4+JyA6ICcnO1xuXG5cdHJldHVybiBgPGRpdiBpZD1cImRuYVwiPjxjb2RlPiR7Zm9ybVN0ciArIHZhcm9yZGVyU3RyfTo6PHNwYW4gY2xhc3M9XCJkbmEtY29kZVwiPiR7bWFya3VwUXVhcnRDeWNsZXMoZG5hKX08L3NwYW4+PC9jb2RlPjwvZGl2PmA7XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyAgICAgICAgICAgICAgICAgICAgICAgIHZtYXAgbWFya3VwXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgZnVuY3Rpb24gdm1hcF9zdmcgKHZtYXBUcmVlLCBpbnB1dCwgdmFyb3JkZXIsIG9wdGlvbnMpIHtcblx0LyogR2VuZXJhdGVzIFNWRyBvdXRwdXQgZm9yIGEgZ2l2ZW4gdm1hcCB0cmVlICovXG5cblx0Ly8gb3B0aW9uIGRlZmF1bHRzXG5cdGNvbnN0IHt2bWFwUGFkLCBzdHJva2VDLCB2bWFwQywgZmlnUGFkLCBmaWdDLCBoaWRlSW5wdXRMYWJlbCwgaGlkZU9yZGVyTGFiZWwsIGN1c3RvbUxhYmVsLCBmdWxsSW5wdXRMYWJlbCwgaW5wdXRMYWJlbE1heCwgc3R5bGVDbGFzc30gPSB7XG5cdFx0dm1hcFBhZDogMCwgc3Ryb2tlQzogYCNmZmZgLCB2bWFwQzogYG5vbmVgLCBmaWdQYWQ6IDAsIGZpZ0M6IGAjZmZmYCxcblx0XHRoaWRlSW5wdXRMYWJlbDogZmFsc2UsIGhpZGVPcmRlckxhYmVsOiBmYWxzZSwgZnVsbElucHV0TGFiZWw6IGZhbHNlLCBpbnB1dExhYmVsTWF4OiAyMDAsIFxuXHRcdGN1c3RvbUxhYmVsOiB1bmRlZmluZWQsIHN0eWxlQ2xhc3M6ICdiYXNpYycsXG5cdFx0Li4ub3B0aW9uc307XG5cblx0Y29uc3QgZGVzaWduID0gc3R5bGVzLnZtYXBbc3R5bGVDbGFzc107XG5cdGNvbnN0IFt0ZXh0U2l6ZSwgZm9udF0gPSBbZGVzaWduLnRleHRTaXplLCBkZXNpZ24uZm9udC5iYXNlXTtcblxuXHRjb25zdCB7dm51bSwgbWFyZ2luc30gPSB2bWFwVHJlZS5kYXRhO1xuXHRjb25zdCBzY2FsZSA9IHZtYXBUcmVlLnNjYWxlO1xuXHRjb25zdCBzdHJva2VXID0gbWFyZ2luc1swXTtcblx0Ly8gY29uc3QgbGVuID0gTWF0aC5zcXJ0KDQqKnZudW0pOyAvLyBsZW5ndGggb2YgZG5hIHdpdGhvdXQgJzo6J1xuXHRjb25zdCBib3VuZHMgPSB7dzogc2NhbGVbMF0gKyBzdHJva2VXLCBoOiBzY2FsZVsxXSArIHN0cm9rZVd9O1xuXHRjb25zdCByaG9tYiA9IHt3OiBNYXRoLnNxcnQoMiAqIChib3VuZHMudyoqMikpLCBoOiBNYXRoLnNxcnQoMiAqIChib3VuZHMuaCoqMikpfTtcblxuXHRjb25zdCBjaGFydCA9IHt0cmVlOiB2bWFwVHJlZSwgaW5wdXQ6IGlucHV0LCB2YXJvcmRlcjogdmFyb3JkZXIsIG9wdGlvbnM6IG9wdGlvbnN9O1xuXG5cdC8vIGlmIChvdXRwdXQgPT0gJ21peGVkJykge1xuXHRcdC8vIHN2ZyB3aXRoIGh0bWwgd3JhcHBlclxuXG5cdFx0Ly8gY29uc3QgY2FwdGlvbiA9ICgpID0+IHtcblx0XHQvLyBcdGlmIChjdXN0b21MYWJlbCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gYDxmaWdjYXB0aW9uIHN0eWxlPVwid29yZC13cmFwOiBicmVhay13b3JkO1wiPiR7Y3VzdG9tTGFiZWx9PC9maWdjYXB0aW9uPmA7XG5cdFx0Ly8gXHRpZiAoIShoaWRlSW5wdXRMYWJlbCAmJiBoaWRlT3JkZXJMYWJlbCkpIHtcblx0XHQvLyBcdFx0bGV0IGxhYmVsID0gJyc7XG5cdFx0Ly8gXHRcdGlmICghaGlkZU9yZGVyTGFiZWwpIGxhYmVsICs9IGAke3Zhcm9yZGVyLnJlZHVjZSgoYWNjLGN1cnIsaSkgPT4gYWNjICsgKGkgPiAwID8gJyA+ICcgOiAnJykgKyBwcm9jZXNzTGFiZWwoY3VyciksJycgKX0ke2hpZGVJbnB1dExhYmVsIHx8IHZudW0gPCAxID8gJycgOiAnPGJyLz4nfWA7XG5cdFx0Ly8gXHRcdGlmICghaGlkZUlucHV0TGFiZWwpIHtcblx0XHQvLyBcdFx0XHRjb25zdCBpc0Zvcm1ETkEgPSBpbnB1dC5pbmNsdWRlcygnOjonKTtcblx0XHQvLyBcdFx0XHRpZiAoaXNGb3JtRE5BKSBsYWJlbCArPSBgPGNvZGUgc3R5bGU9XCJmb250LXNpemU6MC44ZW07XCI+JHtmdWxsSW5wdXRMYWJlbCA/IGlucHV0IDogdHJ1bmNhdGVTdHIoaW5wdXQsKGlucHV0LnNwbGl0KCc6OicpWzBdLmxlbmd0aCArIDQqKjQpLGDigKYoJHs0Kip2bnVtfSlgKX08L2NvZGU+YDtcblx0XHQvLyBcdFx0XHRlbHNlIGxhYmVsICs9ICfGkiA9ICcrKGZ1bGxJbnB1dExhYmVsID8gaW5wdXQgOiB0cnVuY2F0ZVN0cihpbnB1dCxpbnB1dExhYmVsTWF4LGDigKYgPGk+K21vcmU8L2k+YCkpO1xuXHRcdC8vIFx0XHR9XG5cdFx0Ly8gXHRcdHJldHVybiBgPGZpZ2NhcHRpb24gc3R5bGU9XCJ3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XCI+JHtsYWJlbH08L2ZpZ2NhcHRpb24+YDtcblx0XHQvLyBcdH1cblx0XHQvLyBcdHJldHVybiAnJztcblx0XHQvLyB9XG5cblx0XHQvLyBjaGFydC5lbGVtID0gYDxmaWd1cmUgY2xhc3M9XCJ2bWFwLWZpZ3VyZVwiIHN0eWxlPVwibWFyZ2luOiAwO1wiPlxuXHRcdC8vIFx0PHN2ZyBjbGFzcz1cInZtYXBcIiBzdHlsZT1cImJhY2tncm91bmQ6ICR7YmdDfTsgcGFkZGluZzogJHt2bWFwUGFkfTtcIiB3aWR0aD0ke3NjYWxlWzBdfSBoZWlnaHQ9JHtzY2FsZVsxXX1cblx0XHQvLyBcdGZpbGw9XCJ3aGl0ZVwiIHN0cm9rZT1cIiR7c3Ryb2tlQ31cIiBzdHJva2Utd2lkdGg9XCIke3N0cm9rZVd9XCJcblx0XHQvLyBcdHZpZXdCb3g9XCItJHtzdHJva2VXLzJ9IC0ke3N0cm9rZVcvMn0gJHtyaG9tYi53fSAke3Job21iLmh9XCI+XG5cdFx0Ly8gXHQ8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoJHswfSwke3Job21iLmgvMn0pIHJvdGF0ZSgtNDUsMCwwKVwiPiR7IGNvbnN0cnVjdFNWRyh2bWFwVHJlZSkgfTwvZz5cblx0XHQvLyBcdDwvc3ZnPlxuXHRcdC8vIFx0JHsgY2FwdGlvbigpIH1cblx0XHQvLyBcdDwvZmlndXJlPmA7XG5cblx0Ly8gfSBlbHNlIHtcblx0XHQvLyBwdXJlIHN2ZyBvdXRwdXRcblxuXHRcdGNvbnN0IGNhcHRpb24gPSAoaW5wdXQsIGN1c3RvbUxhYmVsKSA9PiB7XG5cdFx0XHRpZiAoY3VzdG9tTGFiZWwgIT09IHVuZGVmaW5lZCkgcmV0dXJuIGN1c3RvbUxhYmVsO1xuXG5cdFx0XHRsZXQgbGFiZWwgPSAnJztcblx0XHRcdGlmICghaGlkZU9yZGVyTGFiZWwgJiYgdm51bSA+IDApIHtcblx0XHRcdFx0Y29uc3QgcG9zID0gYHk9XCIwXCJgO1xuXG5cdFx0XHRcdGxhYmVsICs9IG9yZGVyTGFiZWwodmFyb3JkZXIsIHBvcywge2ZvbnQ6IGZvbnQsIHRleHRTaXplOiB0ZXh0U2l6ZS5iYXNlfSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWhpZGVJbnB1dExhYmVsKSB7XG5cdFx0XHRcdGNvbnN0IGlzRm9ybUROQSA9IGlucHV0LmluY2x1ZGVzKCc6OicpO1xuXG5cdFx0XHRcdGNvbnN0IHByZWZpeCA9IGlzRm9ybUROQSA/ICcnIDogYMaSID0gYDtcblx0XHRcdFx0Y29uc3QgdHJ1bmNNYXggPSBpc0Zvcm1ETkEgPyAoaW5wdXQuc3BsaXQoJzo6JylbMF0ubGVuZ3RoICsgNCoqNCkgOiBpbnB1dExhYmVsTWF4O1xuXHRcdFx0XHRjb25zdCB0cnVuY1N1ZmZpeCA9IGlzRm9ybUROQSA/IGDigKYoJHs0Kip2bnVtfSlgIDogYOKApiA8dHNwYW4gc3R5bGU9XCJmb250LXN0eWxlOiBpdGFsaWNcIj4rbW9yZTwvdHNwYW4+YDtcblxuXHRcdFx0XHRjb25zdCBwb3MgPSBgeT1cIjBcImAgKyAobGFiZWwubGVuZ3RoID4gMCA/IGAgZHk9XCIke3RleHRTaXplLmJhc2UgKyB0ZXh0U2l6ZS5zbSAtIDJ9cHhcImAgOiAnJyk7XG5cblx0XHRcdFx0bGFiZWwgKz0gaW5wdXRMYWJlbChpbnB1dCwgcG9zLCB7cHJlZml4OiBwcmVmaXgsIHRydW5jYXRlZDogIWZ1bGxJbnB1dExhYmVsLCB0cnVuY01heDogdHJ1bmNNYXgsIHRydW5jU3VmZml4OiB0cnVuY1N1ZmZpeCwgZm9udDogZm9udCwgdGV4dFNpemU6IHRleHRTaXplLnNtfSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbGFiZWw7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgdm1hcCA9IHt3OiAoc2NhbGVbMF0gKyB2bWFwUGFkKSwgaDogKHNjYWxlWzFdICsgdm1hcFBhZCl9O1xuXG5cdFx0dm1hcC5lbGVtID0gYDxzdmcgY2xhc3M9XCJ2bWFwXCIgd2lkdGg9JHt2bWFwLnd9IGhlaWdodD0ke3ZtYXAuaH0gdmlld0JveD1cIi0ke3N0cm9rZVcvMiArIHZtYXBQYWQvMn0gLSR7c3Ryb2tlVy8yICsgdm1hcFBhZC8yfSAke3Job21iLncgKyB2bWFwUGFkfSAke3Job21iLmggKyB2bWFwUGFkfVwiPlxuXHRcdFx0PHJlY3QgeD1cIi0ke3ZtYXBQYWQvMn1cIiB5PVwiLSR7dm1hcFBhZC8yfVwiIHdpZHRoPVwiJHtyaG9tYi53ICsgdm1hcFBhZH1cIiBoZWlnaHQ9XCIke3Job21iLmggKyB2bWFwUGFkfVwiIGZpbGw9XCIke3ZtYXBDfVwiPjwvcmVjdD5cblx0XHRcdDxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLCR7cmhvbWIuaC8yfSkgcm90YXRlKC00NSwwLDApXCIgc3Ryb2tlPVwiJHtzdHJva2VDfVwiIHN0cm9rZS13aWR0aD1cIiR7c3Ryb2tlV31cIj4keyBjb25zdHJ1Y3RTVkcodm1hcFRyZWUpIH08L2c+XG5cdFx0PC9zdmc+YDtcblxuXHRcdGNvbnN0IGZpZ0NhcHRpb24gPSB7ZWxlbTogY2FwdGlvbihpbnB1dCwgY3VzdG9tTGFiZWwpLCBwb3M6IHt4OiAwLCB5OiAodm1hcC5oICsgMTApfX07XG5cdFx0ZmlnQ2FwdGlvbi5zaXplID0gZ2V0U3ZnU2l6ZShmaWdDYXB0aW9uLmVsZW0pO1xuXG5cdFx0Y29uc3QgYXBwZW5kU2l6ZSA9IFtNYXRoLm1heCgwLCAoZmlnQ2FwdGlvbi5zaXplLncgLSB2bWFwLncpKSxcblx0XHRcdFx0XHRcdFx0KGZpZ0NhcHRpb24uc2l6ZS5oID4gMCA/IChmaWdDYXB0aW9uLnNpemUuaCArIChmaWdDYXB0aW9uLnBvcy55IC0gdm1hcC5oKSkgOiAwKV07XG5cblx0XHRjaGFydC5zaXplID0ge3c6ICh2bWFwLncgKyBhcHBlbmRTaXplWzBdICsgZmlnUGFkKSwgaDogKHZtYXAuaCArIGFwcGVuZFNpemVbMV0gKyBmaWdQYWQpfTtcblxuXHRcdGNoYXJ0LmVsZW0gPSBgPHN2ZyBjbGFzcz1cInZtYXAtZmlndXJlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiJHtjaGFydC5zaXplLnd9XCIgaGVpZ2h0PVwiJHtjaGFydC5zaXplLmh9XCIgdmlld0JveD1cIi0ke2ZpZ1BhZC8yfSAtJHtmaWdQYWQvMn0gJHtjaGFydC5zaXplLnd9ICR7Y2hhcnQuc2l6ZS5ofVwiPlxuXHRcdFx0PHJlY3QgeD1cIi0ke2ZpZ1BhZC8yfVwiIHk9XCItJHtmaWdQYWQvMn1cIiB3aWR0aD1cIiR7Y2hhcnQuc2l6ZS53fVwiIGhlaWdodD1cIiR7Y2hhcnQuc2l6ZS5ofVwiIGZpbGw9XCIke2ZpZ0N9XCI+PC9yZWN0PlxuXHRcdFx0PGc+JHsgdm1hcC5lbGVtIH08L2c+XG5cdFx0XHQ8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoJHtmaWdDYXB0aW9uLnBvcy54fSwke2ZpZ0NhcHRpb24ucG9zLnl9KVwiPiR7IGZpZ0NhcHRpb24uZWxlbSB9PC9nPlxuXHRcdDwvc3ZnPmA7XG5cdC8vIH1cblxuXHRyZXR1cm4gY2hhcnQ7XG59XG5cbmZ1bmN0aW9uIG9yZGVyTGFiZWwgKHZhcm9yZGVyLCBwb3M9J3g9XCIwXCIgeT1cIjBcIicsIG9wdGlvbnM9dW5kZWZpbmVkKSB7XG5cdC8qIEdlbmVyYXRlcyBhbiBvcmRlciBsYWJlbCAoZS5nLiBcImEgPiBiID4gY1wiKSBmcm9tIHZhcmlhYmxlIG9yZGVyICovXG5cdGNvbnN0IHttYXhMaW5lV2lkdGgsIGZvbnQsIHRleHRTaXplLCBsZWFkaW5nfSA9IFxuXHRcdHsgbWF4TGluZVdpZHRoOiA2MCwgZm9udDogJ2luaGVyaXQnLCB0ZXh0U2l6ZTogMTIsIGxlYWRpbmc6IDQsIC4uLm9wdGlvbnMgfTtcblx0Y29uc3Qgc3R5bGUgPSBgZm9udC1mYW1pbHk6ICR7Zm9udH07IGZvbnQtc2l6ZTogJHt0ZXh0U2l6ZX1weDsgZG9taW5hbnQtYmFzZWxpbmU6IGhhbmdpbmc7YDtcblxuXHRsZXQgb3V0cHV0ID0gdmFyb3JkZXIucmVkdWNlKChhY2MsY3VycixpKSA9PiBhY2MgKyAoaSA+IDAgPyAnPHRzcGFuIHk9XCIwXCI+ID4gPC90c3Bhbj4nIDogJycpICsgcHJvY2Vzc0xhYmVsKGN1cnIsICdzdmcnKSwnJyApO1xuXG5cdC8vIG91dHB1dCA9IGJyZWFrU3RyKG91dHB1dCwgbWF4TGluZVdpZHRoKSAvLyA8LS0gZml4IHRhZyBicmVha3Ncblx0Ly8gXHQucmVkdWNlKChzdHIsY3VycixpKSA9PiBzdHIgKyAoaSA+IDAgPyBzdmdMaW5lYnJlYWsoY3VyciwgKHRleHRTaXplICsgbGVhZGluZyArICdweCcpKSA6IGN1cnIpLCAnJyk7XG5cblx0cmV0dXJuIGA8dGV4dCAke3Bvc30gc3R5bGU9XCIke3N0eWxlfVwiPiR7b3V0cHV0fTwvdGV4dD5gO1xufVxuXG5mdW5jdGlvbiBpbnB1dExhYmVsIChpbnB1dCwgcG9zPSd4PVwiMFwiIHk9XCIwXCInLCBvcHRpb25zPXVuZGVmaW5lZCkge1xuXHQvKiBHZW5lcmF0ZXMgYW4gaW5wdXQgbGFiZWwgKGUuZy4gXCLGkiA9ICgoYSliKVwiIG9yIFwiOjozMjEwXCIpICovXG5cdGNvbnN0IHtwcmVmaXgsIG1heExpbmVXaWR0aCwgdHJ1bmNhdGVkLCB0cnVuY01heCwgdHJ1bmNTdWZmaXgsIGZvbnQsIHRleHRTaXplLCBsZWFkaW5nfSA9IFxuXHRcdHtwcmVmaXg6ICcnLCBtYXhMaW5lV2lkdGg6IDYwLCB0cnVuY2F0ZWQ6IGZhbHNlLCB0cnVuY01heDogMTAwMCwgdHJ1bmNTdWZmaXg6ICfigKYnLCBmb250OiAnaW5oZXJpdCcsIHRleHRTaXplOiAxMiwgbGVhZGluZzogNCwgLi4ub3B0aW9ucyB9O1xuXHRjb25zdCBzdHlsZSA9IGBmb250LWZhbWlseTogJHtmb250fTsgZm9udC1zaXplOiAke3RleHRTaXplfXB4OyBkb21pbmFudC1iYXNlbGluZTogaGFuZ2luZztgO1xuXG5cdGxldCBvdXRwdXQgPSBwcmVmaXggKyBpbnB1dDtcblx0bGV0IGFwcGVuZGl4ID0gJyc7XG5cblx0aWYgKHRydW5jYXRlZCAmJiAob3V0cHV0Lmxlbmd0aCA+IHRydW5jTWF4KSkge1xuXHRcdG91dHB1dCA9IG91dHB1dC5zdWJzdHIoMCx0cnVuY01heCk7XG5cdFx0YXBwZW5kaXggKz0gdHJ1bmNTdWZmaXg7XG5cdH1cblx0b3V0cHV0ID0gYnJlYWtTdHIob3V0cHV0LCBtYXhMaW5lV2lkdGgpXG5cdFx0LnJlZHVjZSgoc3RyLGN1cnIsaSkgPT4gc3RyICsgKGkgPiAwID8gc3ZnTGluZWJyZWFrKGN1cnIsICh0ZXh0U2l6ZSArIGxlYWRpbmcgKyAncHgnKSkgOiBjdXJyKSwgJycpO1xuXG5cdHJldHVybiBgPHRleHQgJHtwb3N9IHN0eWxlPVwiJHtzdHlsZX1cIj4ke291dHB1dCArIGFwcGVuZGl4fTwvdGV4dD5gO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RTVkcoc3ViVHJlZSwgbWFwU1ZHPScnKSB7XG5cdC8qIFJlY3Vyc2l2ZSBmdW5jdGlvbiB0byBjb25zdHJ1Y3Qgc3ZnIG1hcmt1cCBmcm9tIHZtYXAgdHJlZSBzdHJ1Y3R1cmUgKi9cblxuXHRpZihzdWJUcmVlICE9PSBudWxsICYmIHR5cGVvZiBzdWJUcmVlID09IFwib2JqZWN0XCIpIHtcblx0XHRpZihzdWJUcmVlLmNoaWxkcmVuKSB7XG5cdFx0XHRtYXBTVkcgKz0gYDxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgke3N1YlRyZWUucG9zaXRpb25bMF19LCAke3N1YlRyZWUucG9zaXRpb25bMV19KVwiPmA7XG5cblx0XHRcdHN1YlRyZWUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG5cdFx0XHRcdG1hcFNWRyArPSBjb25zdHJ1Y3RTVkcoY2hpbGQpO1xuXHRcdFx0fSk7XG5cdFx0XHRtYXBTVkcgKz0gYDwvZz5gO1xuXHRcdFx0cmV0dXJuIG1hcFNWRztcblx0XHR9XG5cdFx0ZWxzZSB7XHRcdFx0XHRcblx0XHRcdG1hcFNWRyArPSBgPHJlY3QgeD1cIiR7c3ViVHJlZS5wb3NpdGlvblswXX1cIiB5PVwiJHtzdWJUcmVlLnBvc2l0aW9uWzFdfVwiIHdpZHRoPVwiJHtzdWJUcmVlLnNjYWxlWzBdfVwiIGhlaWdodD1cIiR7c3ViVHJlZS5zY2FsZVsxXX1cIiBmaWxsPVwiJHt2Q29sb3Ioc3ViVHJlZS52YWx1ZSl9XCI+PC9yZWN0PmA7XG5cdFx0XHRyZXR1cm4gbWFwU1ZHO1xuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ05vdCBhIHN1YnRyZWUhJyk7XG5cdH07XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHZtYXBQZXJzcGVjdGl2ZXNfc3ZnICh2bWFwUGVybXV0YXRpb25zLCBpbnB1dCwgZ2xvYmFsT3B0aW9ucz11bmRlZmluZWQpIHtcblx0LyogQ29uc3RydWN0cyB2bWFwIHBlcnNwZWN0aXZlcyBhcyBIVE1MIG91dHB1dCAoZmxleCBsaXN0KSAqL1xuXG5cdGNvbnN0IHtmaWdQYWQsIGZpZ0MsIG1hcmdpbiwgY3VzdG9tTGFiZWwsIHN0eWxlQ2xhc3N9ID0gXG5cdFx0eyBmaWdQYWQ6IDAsIGZpZ0M6IGAjZmZmYCxcblx0XHQgIG1hcmdpbjogMjAsIGN1c3RvbUxhYmVsOiB1bmRlZmluZWQsIHN0eWxlQ2xhc3M6ICdiYXNpYycsIC4uLmdsb2JhbE9wdGlvbnMgfTtcblxuXHRjb25zdCBkZXNpZ24gPSBzdHlsZXMudm1hcFtzdHlsZUNsYXNzXTtcblx0Y29uc3QgW3RleHRTaXplLCBmb250XSA9IFtkZXNpZ24udGV4dFNpemUsIGRlc2lnbi5mb250LmJhc2VdO1xuXG5cdGNvbnN0IGNoYXJ0ID0ge3ZtYXBzOiB2bWFwUGVybXV0YXRpb25zLCBpbnB1dDogaW5wdXQsIG9wdGlvbnM6IGdsb2JhbE9wdGlvbnN9O1xuXG5cdC8vIGlmIChvdXRwdXQgPT0gJ21peGVkJykge1xuXHRcdC8vIGNvbnN0IHZtYXBJdGVtcyA9IHZtYXBQZXJtdXRhdGlvbnMubWFwKHZtYXAgPT4ge1xuXHRcdC8vIFx0cmV0dXJuIGA8ZGl2IGNsYXNzPVwidm1hcC1pdGVtXCIgc3R5bGU9XCJwYWRkaW5nOiAke01hdGguZmxvb3IobWFyZ2luLzQpfXB4ICR7TWF0aC5mbG9vcihtYXJnaW4vMil9cHhcIj4gXG5cdFx0Ly8gXHRcdFx0JHt2bWFwLmVsZW19PC9kaXY+YH0pLnJlZHVjZSgoc3RyLGl0ZW0pID0+IHN0citpdGVtLCcnKTtcblxuXHRcdC8vIGNvbnN0IGxhYmVsID0gY2FwdGlvbigpO1xuXG5cdFx0Ly8gcmV0dXJuIGA8ZmlndXJlIGNsYXNzPVwidm1hcC1wZXJzcGVjdGl2ZXNcIiBzdHlsZT1cIm1heC13aWR0aDogbm9uZTtcIj5cblx0XHQvLyBcdFx0PGRpdiBjbGFzcz1cInZtYXAtbGlzdFwiIHN0eWxlPVwiZGlzcGxheTogZmxleDsgZmxleC13cmFwOiB3cmFwOyBtYXJnaW46IDAgLSR7TWF0aC5mbG9vcihtYXJnaW4vMil9cHhcIj5cblx0XHQvLyBcdFx0JHsgdm1hcEl0ZW1zIH1cblx0XHQvLyBcdFx0PC9kaXY+XG5cdFx0Ly8gXHRcdDxmaWdjYXB0aW9uIHN0eWxlPVwiYm9yZGVyLXRvcDogMXB4IHNvbGlkOyBwYWRkaW5nLXRvcDogJHtNYXRoLmZsb29yKG1hcmdpbi80KX1weDsgbWFyZ2luLXRvcDogJHtNYXRoLmZsb29yKG1hcmdpbi8yKX1weDsgd29yZC13cmFwOiBicmVhay13b3JkO1wiPiR7bGFiZWx9PC9maWdjYXB0aW9uPlxuXHRcdC8vIFx0XHQ8L2ZpZ3VyZT5gO1xuXHQvLyB9XG5cdC8vIGVsc2Uge1xuXHRcdGNvbnN0IHBhZGRpbmcgPSB7eDogKE1hdGguZmxvb3IobWFyZ2luLzQpKSwgeTogKE1hdGguZmxvb3IobWFyZ2luLzIpKX07XG5cdFx0Y29uc3QgY291bnQgPSB2bWFwUGVybXV0YXRpb25zLmxlbmd0aDtcblx0XHRjb25zdCB2bWFwU2l6ZSA9IHZtYXBQZXJtdXRhdGlvbnNbMF0uc2l6ZTtcblxuXHRcdGNvbnN0IGNvbE51bSA9IE1hdGgubWluKGNvdW50LCA2KTtcblx0XHRjb25zdCByb3dOdW0gPSBNYXRoLmZsb29yKGNvdW50L2NvbE51bSk7XG5cdFx0Y29uc3QgdGFibGVTaXplID0geyB3OiB2bWFwU2l6ZS53ICogY29sTnVtICsgKHBhZGRpbmcueCoyKSAqIChjb2xOdW0tMSksXG5cdFx0XHRcdFx0XHRcdGg6IHZtYXBTaXplLmggKiByb3dOdW0gKyAocGFkZGluZy55KjIpICogKHJvd051bS0xKSB9O1xuXG5cdFx0Y29uc3Qgdm1hcEl0ZW1zID0gdm1hcFBlcm11dGF0aW9ucy5tYXAodm1hcCA9PiB7XG5cdFx0XHRcblx0XHRcdHJldHVybiB7ZWxlbTogdm1hcC5lbGVtfTtcblx0XHR9KS5yZWR1Y2UoKHN0cixpdGVtLGkpID0+IHtcblx0XHRcdGNvbnN0IHggPSBpJWNvbE51bTtcblx0XHRcdGNvbnN0IHkgPSBNYXRoLmZsb29yKGkvY29sTnVtKTtcblxuXHRcdFx0Y29uc3QgY29vcmRzID0gW3ZtYXBTaXplLncgKiB4ICsgKHBhZGRpbmcueCoyKSAqIHgsXG5cdFx0XHRcdFx0XHQgICAgdm1hcFNpemUuaCAqIHkgKyAocGFkZGluZy55KjIpICogeV07XG5cdFx0XHRyZXR1cm4gc3RyKyBgPGcgY2xhc3M9XCJ2bWFwLWl0ZW1cIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoJHtjb29yZHNbMF19LCR7Y29vcmRzWzFdfSlcIj4ke2l0ZW0uZWxlbX08L2c+YDtcblx0XHR9LCcnKTtcblx0XG5cdFx0Y29uc3QgY2FwdGlvbiA9IChpbnB1dCwgY3VzdG9tTGFiZWwpID0+IHtcblx0XHRcdGlmIChjdXN0b21MYWJlbCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gY3VzdG9tTGFiZWw7XG5cblx0XHRcdGNvbnN0IGlzRm9ybUROQSA9IGlucHV0LmluY2x1ZGVzKCc6OicpO1xuXHRcdFx0Y29uc3QgcHJlZml4ID0gaXNGb3JtRE5BID8gJycgOiBgxpIgPSBgO1xuXHRcdFx0Y29uc3QgcG9zID0gYHk9XCIwXCJgOyAvLyAgZHk9XCIke3RleHRTaXplLmJhc2UgKyB0ZXh0U2l6ZS5zbSAtIDJ9cHhcIlxuXG5cdFx0XHRyZXR1cm4gaW5wdXRMYWJlbChpbnB1dCwgcG9zLCB7cHJlZml4OiBwcmVmaXgsIHRydW5jYXRlZDogZmFsc2UsIGZvbnQ6IGZvbnQsIHRleHRTaXplOiB0ZXh0U2l6ZS5iYXNlfSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZmlnQ2FwdGlvbiA9IHtlbGVtOiBjYXB0aW9uKGlucHV0LCBjdXN0b21MYWJlbCksIHBvczoge3g6IDAsIHk6IHRhYmxlU2l6ZS5oICsgcGFkZGluZy55fSwgbGluZVNwYWNpbmc6IHBhZGRpbmcueX07XG5cdFx0ZmlnQ2FwdGlvbi5zaXplID0gZ2V0U3ZnU2l6ZShmaWdDYXB0aW9uLmVsZW0pO1xuXG5cdFx0Y29uc3QgYXBwZW5kU2l6ZSA9IFtNYXRoLm1heCgwLCAoZmlnQ2FwdGlvbi5zaXplLncgLSB0YWJsZVNpemUudykpLFxuXHRcdFx0XHRcdFx0XHRmaWdDYXB0aW9uLnNpemUuaCArIChmaWdDYXB0aW9uLnBvcy55IC0gdGFibGVTaXplLmgpICsgZmlnQ2FwdGlvbi5saW5lU3BhY2luZ107XG5cblx0XHQvLyBjb25zdCBsaXN0TWFyZ2luID0ge3g6IDAsIHk6IE1hdGguZmxvb3IobWFyZ2luLzIpfTtcblxuXHRcdGNoYXJ0LnNpemUgPSB7dzogKHRhYmxlU2l6ZS53ICsgYXBwZW5kU2l6ZVswXSArIGZpZ1BhZCksIFxuXHRcdFx0XHRcdCAgaDogKHRhYmxlU2l6ZS5oICsgYXBwZW5kU2l6ZVsxXSArIGZpZ1BhZCl9O1xuXG5cdFx0Y2hhcnQuZWxlbSA9IGA8c3ZnIGNsYXNzPVwidm1hcC1wZXJzcGVjdGl2ZXMtZmlndXJlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiJHtjaGFydC5zaXplLnd9XCIgaGVpZ2h0PVwiJHtjaGFydC5zaXplLmh9XCIgdmlld0JveD1cIi0ke2ZpZ1BhZC8yfSAtJHtmaWdQYWQvMn0gJHtjaGFydC5zaXplLnd9ICR7Y2hhcnQuc2l6ZS5ofVwiPlxuXHRcdFx0PHJlY3QgeD1cIi0ke2ZpZ1BhZC8yfVwiIHk9XCItJHtmaWdQYWQvMn1cIiB3aWR0aD1cIiR7Y2hhcnQuc2l6ZS53fVwiIGhlaWdodD1cIiR7Y2hhcnQuc2l6ZS5ofVwiIGZpbGw9XCIke2ZpZ0N9XCI+PC9yZWN0PlxuXHRcdFx0PGcgY2xhc3M9XCJ2bWFwLXBlcnNwZWN0aXZlcyB2bWFwLXRhYmxlXCI+JHsgdm1hcEl0ZW1zIH08L2c+XG5cdFx0XHQ8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoJHtmaWdDYXB0aW9uLnBvcy54fSwke2ZpZ0NhcHRpb24ucG9zLnl9KVwiPlxuXHRcdFx0XHQ8bGluZSB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIiR7dGFibGVTaXplLnd9XCIgeTI9XCIwXCIgc3Ryb2tlPVwiYmxhY2tcIiBzdHJva2Utd2lkdGg9XCIwLjVcIiAvPlxuXHRcdFx0XHQ8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwke2ZpZ0NhcHRpb24ubGluZVNwYWNpbmd9KVwiPiR7IGZpZ0NhcHRpb24uZWxlbSB9PC9nPlxuXHRcdFx0PC9nPlxuXHRcdDwvc3ZnPmA7XG5cblx0XHRyZXR1cm4gY2hhcnQ7XG5cdC8vIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdm1hcExpc3Rfc3ZnICh2bWFwc19zdmcsIGdsb2JhbE9wdGlvbnM9dW5kZWZpbmVkKSB7XG5cdC8qIENvbnN0cnVjdHMgbXVsdGlwbGUgdm1hcHMgYXMgU1ZHIG91dHB1dCAqL1xuXG5cdGNvbnN0IHttYXJnaW4sIHZBbGlnbn0gPSB7IG1hcmdpbjogMjAsIHZBbGlnbjogJ2JvdHRvbScsIC4uLmdsb2JhbE9wdGlvbnMgfVxuXG5cdC8vIGNvbnN0IHZtYXBJdGVtcyA9IHZtYXBQZXJtdXRhdGlvbnNfc3ZnLm1hcCh2bWFwX3N2ZyA9PiB7XG5cdFx0XHRcblx0Ly8gXHRyZXR1cm4ge3NpemU6IHZtYXBfc3ZnLnNpemUsIGVsZW06IHZtYXBfc3ZnLmVsZW19O1xuXHQvLyB9KS5yZWR1Y2UoKHN0cixpdGVtLGksYXJyKSA9PiB7XG5cblx0Ly8gXHQvLyBjb25zdCBzaGlmdFggPSAoaSA+IDApID8gKCBhcnJbMF0uc2l6ZS53ICogaSArIChwYWRkaW5nLngqMikgKiBpICkgOiAwO1xuXHQvLyBcdHJldHVybiBzdHIrIGA8ZyBjbGFzcz1cInZtYXAtaXRlbVwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgke3NoaWZ0WH0sMClcIj4ke2l0ZW0uZWxlbX08L2c+YDtcblx0Ly8gfSwnJyk7XG5cblx0cmV0dXJuIGA8ZGl2IGNsYXNzPVwidm1hcC1saXN0XCIgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBmbGV4LXdyYXA6IHdyYXA7ICR7Z2V0VkFsaWduKHZBbGlnbil9IG1hcmdpbjogMCAtJHtNYXRoLmZsb29yKG1hcmdpbi8yKX1weFwiPlxuXHRcdFx0JHsgdm1hcHNfc3ZnLnJlZHVjZSgoc3RyLCB2bWFwX3N2ZykgPT4gYCR7c3RyfTxkaXYgY2xhc3M9XCJ2bWFwLWl0ZW1cIiBzdHlsZT1cInBhZGRpbmc6ICR7TWF0aC5mbG9vcihtYXJnaW4vNCl9cHggJHtNYXRoLmZsb29yKG1hcmdpbi8yKX1weFwiPiR7dm1hcF9zdmcuZWxlbX08L2Rpdj5gLCcnKSB9XG5cdFx0XHQ8L2Rpdj5gXG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgSGVscGVyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jb25zdCBtYXJrdXBRdWFydEN5Y2xlcyA9IChzdHIpID0+IHtcblx0LyogTWFya3MgdXAgZ3JvdXBzIG9mIDQgbnVtYmVycyBlYWNoIGZvciBkbmEgdG8gYmUgYWJsZSB0byBhcHBseSByZWFkYWJsZSBDU1MgKi9cblx0cmV0dXJuIHN0ci5zcGxpdCgnJykucmVkdWNlKChzdHIsYyxpLGFycikgPT4ge1xuXG5cdFx0cmV0dXJuIHN0ciArICgoaSsxKSU0ID09PSAxID8gJzxzcGFuIGNsYXNzPVwiZG5hLXF1YXJ0MVwiPicgOiAnJykgKyBjICsgKChpKzEpJTQgPT09IDAgPyAnPC9zcGFuPicgOiAnJyk7XG5cdH0sJycpO1xufVxuXG5jb25zdCBnZXRWQWxpZ24gPSB2QWxpZ24gPT4ge1xuXHQvLyA+Pj4gYXMgaGVscGVyXG5cdGNvbnN0IGFsaWduSXRlbXMgPSB2QWxpZ24gPT09ICd0b3AnICAgID8gJ2ZsZXgtc3RhcnQnXG5cdFx0XHRcdCBcdCA6IHZBbGlnbiA9PT0gJ2NlbnRlcicgPyAnY2VudGVyJ1xuXHRcdFx0XHQgXHQgOiB2QWxpZ24gPT09ICdib3R0b20nID8gJ2ZsZXgtZW5kJyA6ICdmbGV4LWVuZCc7XG5cdHJldHVybiBgYWxpZ24taXRlbXM6ICR7YWxpZ25JdGVtc307YDtcbn1cblxuY29uc3QgdkNvbG9yID0gdmFsID0+IHtcblx0LyogVmFsdWUgdG8gY29sb3IgbWFwIGZvciB2bWFwICovXG5cdHJldHVybiB2YWwgPT0gMCA/ICcjMDAwMDAwJ1xuXHRcdCA6IHZhbCA9PSAxID8gJyM0NzU3ZmYnXG5cdFx0IDogdmFsID09IDIgPyAnI2ZmMDA0NCdcblx0XHQgOiB2YWwgPT0gMyA/ICcjMDBmZjVmJ1xuXHRcdCA6IE5hTjtcbn07XG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gZ2xvYmFsIHN0eWxlc1xuXG5jb25zdCBnbG9iYWwgPSB7XG4gICAgY29tbW9uOiB7XG4gICAgICAgIC8vIGZvbnQ6IHtmYW1pbHk6ICdzYW5zLXNlcmlmJywgc2l6ZTogJzE0cHgnLCBzdHlsZTogJ25vcm1hbCd9LFxuICAgIH1cbn07XG5nbG9iYWwuYmFzaWMgPSB7XG4gICAgLi4uZ2xvYmFsLmNvbW1vbixcbn07XG5jb25zdCBbYmFzaWNdID0gW2dsb2JhbC5iYXNpY107XG5cbmV4cG9ydCBjb25zdCB2bWFwID0ge1xuICAgIGNvbW1vbjoge1xuICAgICAgICBmb250OiB7YmFzZTogYCdJQk0gUGxleCBNb25vJywgJ1NGTW9uby1SZWd1bGFyJywgJ0FuZGFsZSBNb25vJywgQW5kYWxlTW9ubywgJ0x1Y2lkYSBDb25zb2xlJywgJ0x1Y2lkYSBTYW5zIFR5cGV3cml0ZXInLCBDb25zb2xhcywgbW9ub3NwYWNlYH0sXG4gICAgICAgIHRleHRTaXplOiB7YmFzZTogMTIsIHNtOiAxMH0sXG4gICAgfVxufTtcblxudm1hcC5iYXNpYyA9IHtcbiAgICAuLi5iYXNpYyxcbiAgICAuLi52bWFwLmNvbW1vbixcbn07XG52bWFwLmJhc2ljLmFwcGx5U3R5bGVzID0gZnVuY3Rpb24oKcKge1xuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==