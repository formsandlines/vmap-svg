(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vmap-svg"] = factory();
	else
		root["vmap-svg"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/formsandlines-utils/lib/string.js":
/*!********************************************************!*\
  !*** ./node_modules/formsandlines-utils/lib/string.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pad": function() { return /* binding */ pad; },
/* harmony export */   "replaceAll": function() { return /* binding */ replaceAll; },
/* harmony export */   "escapeRegExp": function() { return /* binding */ escapeRegExp; },
/* harmony export */   "addBefore": function() { return /* binding */ addBefore; },
/* harmony export */   "replaceAt": function() { return /* binding */ replaceAt; },
/* harmony export */   "truncateStr": function() { return /* binding */ truncateStr; },
/* harmony export */   "breakStr": function() { return /* binding */ breakStr; }
/* harmony export */ });
function pad(num, size) {
    /* pads 0s before number string
       Source: https://stackoverflow.com/a/2998822
       Credits to: InfinitiesLoop */

    var s = num+""; // converts number to string if not already a string
    while (s.length < size) s = "0" + s;
    return s;
}

// former String.prototype.replaceAll
function replaceAll(str, find, replace, escapeMeta) {
    /*  Modified from: https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript 
    Credits to: Sean Bright */
    if(escapeMeta) find = escapeRegExp(find);
    return str.replace(new RegExp(find, 'g'), replace);
};

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

// former String.prototype.addBefore
function addBefore(str, index, replacement) {
    return str.substr(0, index) + replacement+ str.substr(index);
}

// former String.prototype.replaceAt
function replaceAt(str, index, replacement) {
    return str.substr(0, index) + replacement+ str.substr(index + replacement.length);
}

/*  --------------------------------------------------------
    Additions 01/2020 from:
    https://observablehq.com/@formsandlines/js-toolbox
*/

const truncateStr = (str,limit,appendix='') => str.length > limit ? (str.substr(0,limit) + appendix) : str;


/* Breaks string up in parts of length n (x <= n for the last part) 
   from: https://observablehq.com/@formsandlines/js-toolbox
*/
const breakStr = (str,n=1) => [...new Array(Math.ceil(str.length/n))].map((d,i) => str.substr(n*i,n));



/***/ }),

/***/ "./node_modules/formsandlines-utils/lib/svg.js":
/*!*****************************************************!*\
  !*** ./node_modules/formsandlines-utils/lib/svg.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSvgSize": function() { return /* binding */ getSvgSize; },
/* harmony export */   "svgLinebreak": function() { return /* binding */ svgLinebreak; },
/* harmony export */   "scaleSVG": function() { return /* binding */ scaleSVG; },
/* harmony export */   "processLabel": function() { return /* binding */ processLabel; }
/* harmony export */ });
/*  --------------------------------------------------------
    Additions 03/2021
*/

// export function fitSvg(selector, padding) {
//     // calculate real dimensions of a chart (assumes chart is a g-element wrapped inside an svg)
//     d3.select(chart.node().parentElement)
//         .attr('width', chart.node().getBBox().width + padding.left + padding.right)
//         .attr('height', chart.node().getBBox().height + padding.top + padding.bottom);
//   }

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

const svgLinebreak = (str, lineShift) => `<tspan x="0" dy="${lineShift}">${str}</tspan>`;

/*  --------------------------------------------------------
    Additions 01/2020 from:
    https://observablehq.com/@formsandlines/js-toolbox
*/

function scaleSVG(svg, container, ratio) {
    const prefixes = ['-ms-transform','-webkit-transform','-moz-transform','-o-transform','transform'];
    prefixes.forEach(prefix => {
        svg.style[prefix] = `scale(${ratio}) translate(0,0)`;
    });
    // container.style.width = parseInt(svg.getBBox().width * ratio) + 'px';
    // container.style.height = parseInt(svg.getBBox().height * ratio) + 'px';
    container.style.width = svg.getBBox().width * ratio + 'px';
    container.style.height = svg.getBBox().height * ratio + 'px';
}

/*  --------------------------------------------------------
    Additions 10/2020
*/

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

/***/ }),

/***/ "./src/styles.js":
/*!***********************!*\
  !*** ./src/styles.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vmap": function() { return /* binding */ vmap; }
/* harmony export */ });
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
vmap.basic.applyStyles = function() {

};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "draw": function() { return /* binding */ draw; },
/* harmony export */   "drawPersp": function() { return /* binding */ drawPersp; },
/* harmony export */   "drawList": function() { return /* binding */ drawList; }
/* harmony export */ });
/* harmony import */ var formsandlines_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! formsandlines-utils */ "./node_modules/formsandlines-utils/lib/svg.js");
/* harmony import */ var formsandlines_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! formsandlines-utils */ "./node_modules/formsandlines-utils/lib/string.js");
/* harmony import */ var _styles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.js */ "./src/styles.js");




/* harmony default export */ __webpack_exports__["default"] = ({ draw, drawPersp, drawList });

// ===================================================================
//     formform module 'vmap-svg'
//     -- since 2020, by Peter Hofmann (formsandlines.eu)
// ===================================================================

function draw (vmapTree, input, varorder, options) {
  /* Generates SVG output for a given vmap tree */

  // option defaults
  const {vmapPad, strokeC, vmapC, figPad, figC, hideInputLabel, hideOrderLabel, customLabel, fullInputLabel, inputLabelMax, styleClass} = {
    vmapPad: 0, strokeC: '#fff', vmapC: 'none', figPad: 0, figC: '#fff',
    hideInputLabel: false, hideOrderLabel: false, fullInputLabel: false, inputLabelMax: 200, 
    customLabel: undefined, styleClass: 'basic',
    ...options};

  const design = _styles_js__WEBPACK_IMPORTED_MODULE_0__.vmap[styleClass];
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
      const pos = 'y="0"';

      label += orderLabel(varorder, pos, {font: font, textSize: textSize.base});
    }
    if (!hideInputLabel) {
      const isFormDNA = input.includes('::');

      const prefix = isFormDNA ? '' : 'ƒ = ';
      const truncMax = isFormDNA ? (input.split('::')[0].length + 4**4) : inputLabelMax;
      const truncSuffix = isFormDNA ? `…(${4**vnum})` : `… <tspan style="font-style: italic">+more</tspan>`;

      const pos = 'y="0"' + (label.length > 0 ? ` dy="${textSize.base + textSize.sm - 2}px"` : '');

      label += inputLabel(input, pos, {prefix: prefix, truncated: !fullInputLabel, truncMax: truncMax, truncSuffix: truncSuffix, font: font, textSize: textSize.sm});
    }
    return label;
  };

  const vmap = {w: (scale[0] + vmapPad), h: (scale[1] + vmapPad)};

  vmap.elem = `<svg class="vmap" width=${vmap.w} height=${vmap.h} viewBox="-${strokeW/2 + vmapPad/2} -${strokeW/2 + vmapPad/2} ${rhomb.w + vmapPad} ${rhomb.h + vmapPad}">
    <rect x="-${vmapPad/2}" y="-${vmapPad/2}" width="${rhomb.w + vmapPad}" height="${rhomb.h + vmapPad}" fill="${vmapC}"></rect>
    <g transform="translate(0,${rhomb.h/2}) rotate(-45,0,0)" stroke="${strokeC}" stroke-width="${strokeW}">${ constructSVG(vmapTree) }</g>
  </svg>`;

  const figCaption = {elem: caption(input, customLabel), pos: {x: 0, y: (vmap.h + 10)}};
  figCaption.size = (0,formsandlines_utils__WEBPACK_IMPORTED_MODULE_1__.getSvgSize)(figCaption.elem);

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

  const output = varorder.reduce((acc,curr,i) => acc + (i > 0 ? '<tspan y="0"> > </tspan>' : '') + (0,formsandlines_utils__WEBPACK_IMPORTED_MODULE_1__.processLabel)(curr, 'svg'),'' );

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
  output = (0,formsandlines_utils__WEBPACK_IMPORTED_MODULE_2__.breakStr)(output, maxLineWidth)
    .reduce((str,curr,i) => str + (i > 0 ? (0,formsandlines_utils__WEBPACK_IMPORTED_MODULE_1__.svgLinebreak)(curr, (textSize + leading + 'px')) : curr), '');

  return `<text ${pos} style="${style}">${output + appendix}</text>`;
}

function constructSVG(subTree, mapSVG='') {
  /* Recursive function to construct svg markup from vmap tree structure */

  if(subTree !== null && typeof subTree == 'object') {
    if(subTree.children) {
      mapSVG += `<g transform="translate(${subTree.position[0]}, ${subTree.position[1]})">`;

      subTree.children.forEach(child => {
        mapSVG += constructSVG(child);
      });
      mapSVG += '</g>';
      return mapSVG;
    }
    else {				
      mapSVG += `<rect x="${subTree.position[0]}" y="${subTree.position[1]}" width="${subTree.scale[0]}" height="${subTree.scale[1]}" fill="${vColor(subTree.value)}"></rect>`;
      return mapSVG;
    }
  }
  else {
    throw new Error('Not a subtree!');
  }
}


function drawPersp (vmapPermutations, input, globalOptions=undefined) {
  /* Constructs vmap perspectives as HTML output (flex list) */

  const {figPad, figC, margin, customLabel, styleClass} = 
    { figPad: 0, figC: '#fff', margin: 20, customLabel: undefined, styleClass: 'basic', ...globalOptions };

  const design = _styles_js__WEBPACK_IMPORTED_MODULE_0__.vmap[styleClass];
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
    const prefix = isFormDNA ? '' : 'ƒ = ';
    const pos = 'y="0"'; //  dy="${textSize.base + textSize.sm - 2}px"

    return inputLabel(input, pos, {prefix: prefix, truncated: false, font: font, textSize: textSize.base});
  };

  const figCaption = {elem: caption(input, customLabel), pos: {x: 0, y: tableSize.h + padding.y}, lineSpacing: padding.y};
  figCaption.size = (0,formsandlines_utils__WEBPACK_IMPORTED_MODULE_1__.getSvgSize)(figCaption.elem);

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

  const {margin, vAlign} = { margin: 20, vAlign: 'bottom', ...globalOptions };

  // const vmapItems = vmapPermutations_svg.map(draw => {
      
  // 	return {size: draw.size, elem: draw.elem};
  // }).reduce((str,item,i,arr) => {

  // 	// const shiftX = (i > 0) ? ( arr[0].size.w * i + (padding.x*2) * i ) : 0;
  // 	return str+ `<g class="vmap-item" transform="translate(${shiftX},0)">${item.elem}</g>`;
  // },'');

  return `<div class="vmap-list" style="display: flex; flex-wrap: wrap; ${getVAlign(vAlign)} margin: 0 -${Math.floor(margin/2)}px">
      ${ vmaps_svg.reduce((str, draw) => `${str}<div class="vmap-item" style="padding: ${Math.floor(margin/4)}px ${Math.floor(margin/2)}px">${draw.elem}</div>`,'') }
      </div>`;
}

// -----------------------------------------------------------
//                         Helper
// -----------------------------------------------------------

const getVAlign = vAlign => {
  // >>> as helper
  const alignItems = vAlign === 'top'    ? 'flex-start'
            : vAlign === 'center' ? 'center'
            : vAlign === 'bottom' ? 'flex-end' : 'flex-end';
  return `align-items: ${alignItems};`;
};

const vColor = val => {
  /* Value to color map for vmap */
  return val == 0 ? '#000000'
       : val == 1 ? '#4757ff'
       : val == 2 ? '#ff0044'
       : val == 3 ? '#00ff5f'
       : NaN;
};
}();
__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92bWFwLXN2Zy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdm1hcC1zdmcvLi9ub2RlX21vZHVsZXMvZm9ybXNhbmRsaW5lcy11dGlscy9saWIvc3RyaW5nLmpzIiwid2VicGFjazovL3ZtYXAtc3ZnLy4vbm9kZV9tb2R1bGVzL2Zvcm1zYW5kbGluZXMtdXRpbHMvbGliL3N2Zy5qcyIsIndlYnBhY2s6Ly92bWFwLXN2Zy8uL3NyYy9zdHlsZXMuanMiLCJ3ZWJwYWNrOi8vdm1hcC1zdmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdm1hcC1zdmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3ZtYXAtc3ZnL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdm1hcC1zdmcvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92bWFwLXN2Zy8uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZPO0FBQ1A7QUFDQTtBQUNBOztBQUVBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUCxxQ0FBcUM7QUFDckM7O0FBRUE7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87OztBQUdQO0FBQ0E7QUFDQTtBQUNPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0NQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7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QkFBaUI7QUFDbkUsZ0NBQWdDLFlBQVk7QUFDNUMsa0NBQWtDLHVCQUF1QixLQUFLLGtCQUFrQjtBQUNoRjtBQUNBOztBQUVBO0FBQ0E7OztBQUdPO0FBQ1A7O0FBRUEsU0FBUyxlQUFlLElBQUk7O0FBRTVCOztBQUVBLGNBQWM7QUFDZCxNQUFNOztBQUVOO0FBQ0EsK0RBQStELE9BQU8sT0FBTyxVQUFVO0FBQ3ZGLE1BQU07O0FBRU4sc0RBQXNELGlCQUFpQixHQUFHLGtCQUFrQixjQUFjLHFCQUFxQjtBQUMvSCxRQUFRLG9DQUFvQyxJQUFJLHlDQUF5QyxxQkFBcUIsS0FBSyxxQkFBcUIsTUFBTSxVQUFVO0FBQ3hKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsWUFBWTtBQUNyQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEUiLCJmaWxlIjoidm1hcC1zdmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ2bWFwLXN2Z1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ2bWFwLXN2Z1wiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsImV4cG9ydCBmdW5jdGlvbiBwYWQobnVtLCBzaXplKSB7XG4gICAgLyogcGFkcyAwcyBiZWZvcmUgbnVtYmVyIHN0cmluZ1xuICAgICAgIFNvdXJjZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI5OTg4MjJcbiAgICAgICBDcmVkaXRzIHRvOiBJbmZpbml0aWVzTG9vcCAqL1xuXG4gICAgdmFyIHMgPSBudW0rXCJcIjsgLy8gY29udmVydHMgbnVtYmVyIHRvIHN0cmluZyBpZiBub3QgYWxyZWFkeSBhIHN0cmluZ1xuICAgIHdoaWxlIChzLmxlbmd0aCA8IHNpemUpIHMgPSBcIjBcIiArIHM7XG4gICAgcmV0dXJuIHM7XG59XG5cbi8vIGZvcm1lciBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2VBbGxcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlQWxsKHN0ciwgZmluZCwgcmVwbGFjZSwgZXNjYXBlTWV0YSkge1xuICAgIC8qICBNb2RpZmllZCBmcm9tOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMTQ0NzgzL2hvdy10by1yZXBsYWNlLWFsbC1vY2N1cnJlbmNlcy1vZi1hLXN0cmluZy1pbi1qYXZhc2NyaXB0IFxuICAgIENyZWRpdHMgdG86IFNlYW4gQnJpZ2h0ICovXG4gICAgaWYoZXNjYXBlTWV0YSkgZmluZCA9IGVzY2FwZVJlZ0V4cChmaW5kKTtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChmaW5kLCAnZycpLCByZXBsYWNlKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oWy4qKz9ePSE6JHt9KCl8XFxbXFxdXFwvXFxcXF0pL2csIFwiXFxcXCQxXCIpO1xufVxuXG4vLyBmb3JtZXIgU3RyaW5nLnByb3RvdHlwZS5hZGRCZWZvcmVcbmV4cG9ydCBmdW5jdGlvbiBhZGRCZWZvcmUoc3RyLCBpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gc3RyLnN1YnN0cigwLCBpbmRleCkgKyByZXBsYWNlbWVudCsgc3RyLnN1YnN0cihpbmRleCk7XG59XG5cbi8vIGZvcm1lciBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2VBdFxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VBdChzdHIsIGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHJldHVybiBzdHIuc3Vic3RyKDAsIGluZGV4KSArIHJlcGxhY2VtZW50KyBzdHIuc3Vic3RyKGluZGV4ICsgcmVwbGFjZW1lbnQubGVuZ3RoKTtcbn1cblxuLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgQWRkaXRpb25zIDAxLzIwMjAgZnJvbTpcbiAgICBodHRwczovL29ic2VydmFibGVocS5jb20vQGZvcm1zYW5kbGluZXMvanMtdG9vbGJveFxuKi9cblxuZXhwb3J0IGNvbnN0IHRydW5jYXRlU3RyID0gKHN0cixsaW1pdCxhcHBlbmRpeD0nJykgPT4gc3RyLmxlbmd0aCA+IGxpbWl0ID8gKHN0ci5zdWJzdHIoMCxsaW1pdCkgKyBhcHBlbmRpeCkgOiBzdHI7XG5cblxuLyogQnJlYWtzIHN0cmluZyB1cCBpbiBwYXJ0cyBvZiBsZW5ndGggbiAoeCA8PSBuIGZvciB0aGUgbGFzdCBwYXJ0KSBcbiAgIGZyb206IGh0dHBzOi8vb2JzZXJ2YWJsZWhxLmNvbS9AZm9ybXNhbmRsaW5lcy9qcy10b29sYm94XG4qL1xuZXhwb3J0IGNvbnN0IGJyZWFrU3RyID0gKHN0cixuPTEpID0+IFsuLi5uZXcgQXJyYXkoTWF0aC5jZWlsKHN0ci5sZW5ndGgvbikpXS5tYXAoKGQsaSkgPT4gc3RyLnN1YnN0cihuKmksbikpO1xuXG4iLCIvKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBBZGRpdGlvbnMgMDMvMjAyMVxuKi9cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGZpdFN2ZyhzZWxlY3RvciwgcGFkZGluZykge1xuLy8gICAgIC8vIGNhbGN1bGF0ZSByZWFsIGRpbWVuc2lvbnMgb2YgYSBjaGFydCAoYXNzdW1lcyBjaGFydCBpcyBhIGctZWxlbWVudCB3cmFwcGVkIGluc2lkZSBhbiBzdmcpXG4vLyAgICAgZDMuc2VsZWN0KGNoYXJ0Lm5vZGUoKS5wYXJlbnRFbGVtZW50KVxuLy8gICAgICAgICAuYXR0cignd2lkdGgnLCBjaGFydC5ub2RlKCkuZ2V0QkJveCgpLndpZHRoICsgcGFkZGluZy5sZWZ0ICsgcGFkZGluZy5yaWdodClcbi8vICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGNoYXJ0Lm5vZGUoKS5nZXRCQm94KCkuaGVpZ2h0ICsgcGFkZGluZy50b3AgKyBwYWRkaW5nLmJvdHRvbSk7XG4vLyAgIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN2Z1NpemUoc3ZnVGV4dCkge1xuXHRjb25zdCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpO1xuXHRzdmcuaW5uZXJIVE1MID0gc3ZnVGV4dDtcblx0c3ZnLnNldEF0dHJpYnV0ZSgneCcsJy05OTk5Jyk7XG5cdHN2Zy5zZXRBdHRyaWJ1dGUoJ3knLCctOTk5OScpO1xuXG5cdGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChzdmcpO1xuXG5cdGNvbnN0IHNpemUgPSBzdmcuZ2V0QkJveCgpO1xuXHRjb250YWluZXIucmVtb3ZlKCk7XG5cdHJldHVybiB7IHc6IHNpemUud2lkdGgsIGg6IHNpemUuaGVpZ2h0IH07XG59XG5cbmV4cG9ydCBjb25zdCBzdmdMaW5lYnJlYWsgPSAoc3RyLCBsaW5lU2hpZnQpID0+IGA8dHNwYW4geD1cIjBcIiBkeT1cIiR7bGluZVNoaWZ0fVwiPiR7c3RyfTwvdHNwYW4+YDtcblxuLyogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgQWRkaXRpb25zIDAxLzIwMjAgZnJvbTpcbiAgICBodHRwczovL29ic2VydmFibGVocS5jb20vQGZvcm1zYW5kbGluZXMvanMtdG9vbGJveFxuKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlU1ZHKHN2ZywgY29udGFpbmVyLCByYXRpbykge1xuICAgIGNvbnN0IHByZWZpeGVzID0gWyctbXMtdHJhbnNmb3JtJywnLXdlYmtpdC10cmFuc2Zvcm0nLCctbW96LXRyYW5zZm9ybScsJy1vLXRyYW5zZm9ybScsJ3RyYW5zZm9ybSddO1xuICAgIHByZWZpeGVzLmZvckVhY2gocHJlZml4ID0+IHtcbiAgICAgICAgc3ZnLnN0eWxlW3ByZWZpeF0gPSBgc2NhbGUoJHtyYXRpb30pIHRyYW5zbGF0ZSgwLDApYDtcbiAgICB9KTtcbiAgICAvLyBjb250YWluZXIuc3R5bGUud2lkdGggPSBwYXJzZUludChzdmcuZ2V0QkJveCgpLndpZHRoICogcmF0aW8pICsgJ3B4JztcbiAgICAvLyBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gcGFyc2VJbnQoc3ZnLmdldEJCb3goKS5oZWlnaHQgKiByYXRpbykgKyAncHgnO1xuICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9IHN2Zy5nZXRCQm94KCkud2lkdGggKiByYXRpbyArICdweCc7XG4gICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHN2Zy5nZXRCQm94KCkuaGVpZ2h0ICogcmF0aW8gKyAncHgnO1xufVxuXG4vKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBBZGRpdGlvbnMgMTAvMjAyMFxuKi9cblxuZXhwb3J0IGNvbnN0IHByb2Nlc3NMYWJlbCA9IChsYWJlbCwgbW9kZT0naHRtbCcpID0+IHtcbiAgICAvKiBMYWJlbCBwcm9jZXNzaW5nIHRvIGhhbmRsZSBzdWIvc3VwZXJzY3JpcHQgKi9cblxuICAgIGxldCB0YWdSZXYgPSBbXTsgLy8gdGFnUmV2IHJlc2V0cyB5LXBvc2l0aW9uIG9mIGxhYmVsIGFmdGVyIHN1YnNjcmlwdHMgKG5lZWRlZCBmb3Igc3ZnKVxuICAgIGlmIChtb2RlID09PSAnc3ZnJykgdGFnUmV2ID0gWyc8dHNwYW4geT1cIjBcIj4nLCc8L3RzcGFuPiddO1xuICAgIGVsc2UgdGFnUmV2ID0gWycnLCcnXTtcblxuICAgIGlmIChsYWJlbC5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbnN0IGxhYmVsUGFydHMgPSBsYWJlbC5zcGxpdCgnXycpO1xuXG4gICAgICAgIGxldCB0YWdTdWIgPSBbXTtcbiAgICAgICAgaWYgKG1vZGUgPT09ICdzdmcnKSB0YWdTdWIgPSBbYDx0c3BhbiBzdHlsZT1cImZvbnQtc2l6ZTogLjhlbTtcIiBkeD1cIjBcIiBkeT1cIjZcIj5gLCc8L3RzcGFuPiddO1xuICAgICAgICBlbHNlIHRhZ1N1YiA9IFsnPHN1Yj4nLCc8L3N1Yj4nXTtcblxuICAgICAgICByZXR1cm4gKGxhYmVsUGFydHMubGVuZ3RoID4gMSkgPyBgJHt0YWdSZXZbMF0gKyBsYWJlbFBhcnRzWzBdICsgdGFnUmV2WzFdICsgdGFnU3ViWzBdICsgbGFiZWxQYXJ0c1sxXSArIHRhZ1N1YlsxXX1gIDogdGFnUmV2WzBdK2xhYmVsK3RhZ1JldlsxXTtcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gdGFnUmV2WzBdK2xhYmVsK3RhZ1JldlsxXTtcbn07IiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIGdsb2JhbCBzdHlsZXNcblxuY29uc3QgZ2xvYmFsID0ge1xuICAgIGNvbW1vbjoge1xuICAgICAgICAvLyBmb250OiB7ZmFtaWx5OiAnc2Fucy1zZXJpZicsIHNpemU6ICcxNHB4Jywgc3R5bGU6ICdub3JtYWwnfSxcbiAgICB9XG59O1xuZ2xvYmFsLmJhc2ljID0ge1xuICAgIC4uLmdsb2JhbC5jb21tb24sXG59O1xuY29uc3QgW2Jhc2ljXSA9IFtnbG9iYWwuYmFzaWNdO1xuXG5leHBvcnQgY29uc3Qgdm1hcCA9IHtcbiAgICBjb21tb246IHtcbiAgICAgICAgZm9udDoge2Jhc2U6IGAnSUJNIFBsZXggTW9ubycsICdTRk1vbm8tUmVndWxhcicsICdBbmRhbGUgTW9ubycsIEFuZGFsZU1vbm8sICdMdWNpZGEgQ29uc29sZScsICdMdWNpZGEgU2FucyBUeXBld3JpdGVyJywgQ29uc29sYXMsIG1vbm9zcGFjZWB9LFxuICAgICAgICB0ZXh0U2l6ZToge2Jhc2U6IDEyLCBzbTogMTB9LFxuICAgIH1cbn07XG5cbnZtYXAuYmFzaWMgPSB7XG4gICAgLi4uYmFzaWMsXG4gICAgLi4udm1hcC5jb21tb24sXG59O1xudm1hcC5iYXNpYy5hcHBseVN0eWxlcyA9IGZ1bmN0aW9uKCkge1xuXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHByb2Nlc3NMYWJlbCwgZ2V0U3ZnU2l6ZSwgYnJlYWtTdHIsIHN2Z0xpbmVicmVhayB9IGZyb20gJ2Zvcm1zYW5kbGluZXMtdXRpbHMnO1xuXG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9zdHlsZXMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7IGRyYXcsIGRyYXdQZXJzcCwgZHJhd0xpc3QgfTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gICAgIGZvcm1mb3JtIG1vZHVsZSAndm1hcC1zdmcnXG4vLyAgICAgLS0gc2luY2UgMjAyMCwgYnkgUGV0ZXIgSG9mbWFubiAoZm9ybXNhbmRsaW5lcy5ldSlcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXcgKHZtYXBUcmVlLCBpbnB1dCwgdmFyb3JkZXIsIG9wdGlvbnMpIHtcbiAgLyogR2VuZXJhdGVzIFNWRyBvdXRwdXQgZm9yIGEgZ2l2ZW4gdm1hcCB0cmVlICovXG5cbiAgLy8gb3B0aW9uIGRlZmF1bHRzXG4gIGNvbnN0IHt2bWFwUGFkLCBzdHJva2VDLCB2bWFwQywgZmlnUGFkLCBmaWdDLCBoaWRlSW5wdXRMYWJlbCwgaGlkZU9yZGVyTGFiZWwsIGN1c3RvbUxhYmVsLCBmdWxsSW5wdXRMYWJlbCwgaW5wdXRMYWJlbE1heCwgc3R5bGVDbGFzc30gPSB7XG4gICAgdm1hcFBhZDogMCwgc3Ryb2tlQzogJyNmZmYnLCB2bWFwQzogJ25vbmUnLCBmaWdQYWQ6IDAsIGZpZ0M6ICcjZmZmJyxcbiAgICBoaWRlSW5wdXRMYWJlbDogZmFsc2UsIGhpZGVPcmRlckxhYmVsOiBmYWxzZSwgZnVsbElucHV0TGFiZWw6IGZhbHNlLCBpbnB1dExhYmVsTWF4OiAyMDAsIFxuICAgIGN1c3RvbUxhYmVsOiB1bmRlZmluZWQsIHN0eWxlQ2xhc3M6ICdiYXNpYycsXG4gICAgLi4ub3B0aW9uc307XG5cbiAgY29uc3QgZGVzaWduID0gc3R5bGVzLnZtYXBbc3R5bGVDbGFzc107XG4gIGNvbnN0IFt0ZXh0U2l6ZSwgZm9udF0gPSBbZGVzaWduLnRleHRTaXplLCBkZXNpZ24uZm9udC5iYXNlXTtcblxuICBjb25zdCB7dm51bSwgbWFyZ2luc30gPSB2bWFwVHJlZS5kYXRhO1xuICBjb25zdCBzY2FsZSA9IHZtYXBUcmVlLnNjYWxlO1xuICBjb25zdCBzdHJva2VXID0gbWFyZ2luc1swXTtcbiAgLy8gY29uc3QgbGVuID0gTWF0aC5zcXJ0KDQqKnZudW0pOyAvLyBsZW5ndGggb2YgZG5hIHdpdGhvdXQgJzo6J1xuICBjb25zdCBib3VuZHMgPSB7dzogc2NhbGVbMF0gKyBzdHJva2VXLCBoOiBzY2FsZVsxXSArIHN0cm9rZVd9O1xuICBjb25zdCByaG9tYiA9IHt3OiBNYXRoLnNxcnQoMiAqIChib3VuZHMudyoqMikpLCBoOiBNYXRoLnNxcnQoMiAqIChib3VuZHMuaCoqMikpfTtcblxuXG4gIGNvbnN0IGNhcHRpb24gPSAoaW5wdXQsIGN1c3RvbUxhYmVsKSA9PiB7XG4gICAgaWYgKGN1c3RvbUxhYmVsICE9PSB1bmRlZmluZWQpIHJldHVybiBjdXN0b21MYWJlbDtcblxuICAgIGxldCBsYWJlbCA9ICcnO1xuICAgIGlmICghaGlkZU9yZGVyTGFiZWwgJiYgdm51bSA+IDApIHtcbiAgICAgIGNvbnN0IHBvcyA9ICd5PVwiMFwiJztcblxuICAgICAgbGFiZWwgKz0gb3JkZXJMYWJlbCh2YXJvcmRlciwgcG9zLCB7Zm9udDogZm9udCwgdGV4dFNpemU6IHRleHRTaXplLmJhc2V9KTtcbiAgICB9XG4gICAgaWYgKCFoaWRlSW5wdXRMYWJlbCkge1xuICAgICAgY29uc3QgaXNGb3JtRE5BID0gaW5wdXQuaW5jbHVkZXMoJzo6Jyk7XG5cbiAgICAgIGNvbnN0IHByZWZpeCA9IGlzRm9ybUROQSA/ICcnIDogJ8aSID0gJztcbiAgICAgIGNvbnN0IHRydW5jTWF4ID0gaXNGb3JtRE5BID8gKGlucHV0LnNwbGl0KCc6OicpWzBdLmxlbmd0aCArIDQqKjQpIDogaW5wdXRMYWJlbE1heDtcbiAgICAgIGNvbnN0IHRydW5jU3VmZml4ID0gaXNGb3JtRE5BID8gYOKApigkezQqKnZudW19KWAgOiBg4oCmIDx0c3BhbiBzdHlsZT1cImZvbnQtc3R5bGU6IGl0YWxpY1wiPittb3JlPC90c3Bhbj5gO1xuXG4gICAgICBjb25zdCBwb3MgPSAneT1cIjBcIicgKyAobGFiZWwubGVuZ3RoID4gMCA/IGAgZHk9XCIke3RleHRTaXplLmJhc2UgKyB0ZXh0U2l6ZS5zbSAtIDJ9cHhcImAgOiAnJyk7XG5cbiAgICAgIGxhYmVsICs9IGlucHV0TGFiZWwoaW5wdXQsIHBvcywge3ByZWZpeDogcHJlZml4LCB0cnVuY2F0ZWQ6ICFmdWxsSW5wdXRMYWJlbCwgdHJ1bmNNYXg6IHRydW5jTWF4LCB0cnVuY1N1ZmZpeDogdHJ1bmNTdWZmaXgsIGZvbnQ6IGZvbnQsIHRleHRTaXplOiB0ZXh0U2l6ZS5zbX0pO1xuICAgIH1cbiAgICByZXR1cm4gbGFiZWw7XG4gIH07XG5cbiAgY29uc3Qgdm1hcCA9IHt3OiAoc2NhbGVbMF0gKyB2bWFwUGFkKSwgaDogKHNjYWxlWzFdICsgdm1hcFBhZCl9O1xuXG4gIHZtYXAuZWxlbSA9IGA8c3ZnIGNsYXNzPVwidm1hcFwiIHdpZHRoPSR7dm1hcC53fSBoZWlnaHQ9JHt2bWFwLmh9IHZpZXdCb3g9XCItJHtzdHJva2VXLzIgKyB2bWFwUGFkLzJ9IC0ke3N0cm9rZVcvMiArIHZtYXBQYWQvMn0gJHtyaG9tYi53ICsgdm1hcFBhZH0gJHtyaG9tYi5oICsgdm1hcFBhZH1cIj5cbiAgICA8cmVjdCB4PVwiLSR7dm1hcFBhZC8yfVwiIHk9XCItJHt2bWFwUGFkLzJ9XCIgd2lkdGg9XCIke3Job21iLncgKyB2bWFwUGFkfVwiIGhlaWdodD1cIiR7cmhvbWIuaCArIHZtYXBQYWR9XCIgZmlsbD1cIiR7dm1hcEN9XCI+PC9yZWN0PlxuICAgIDxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLCR7cmhvbWIuaC8yfSkgcm90YXRlKC00NSwwLDApXCIgc3Ryb2tlPVwiJHtzdHJva2VDfVwiIHN0cm9rZS13aWR0aD1cIiR7c3Ryb2tlV31cIj4keyBjb25zdHJ1Y3RTVkcodm1hcFRyZWUpIH08L2c+XG4gIDwvc3ZnPmA7XG5cbiAgY29uc3QgZmlnQ2FwdGlvbiA9IHtlbGVtOiBjYXB0aW9uKGlucHV0LCBjdXN0b21MYWJlbCksIHBvczoge3g6IDAsIHk6ICh2bWFwLmggKyAxMCl9fTtcbiAgZmlnQ2FwdGlvbi5zaXplID0gZ2V0U3ZnU2l6ZShmaWdDYXB0aW9uLmVsZW0pO1xuXG4gIGNvbnN0IGFwcGVuZFNpemUgPSBbTWF0aC5tYXgoMCwgKGZpZ0NhcHRpb24uc2l6ZS53IC0gdm1hcC53KSksXG4gICAgICAgICAgICAoZmlnQ2FwdGlvbi5zaXplLmggPiAwID8gKGZpZ0NhcHRpb24uc2l6ZS5oICsgKGZpZ0NhcHRpb24ucG9zLnkgLSB2bWFwLmgpKSA6IDApXTtcblxuICBjb25zdCBjaGFydCA9IHt9O1xuXG4gIGNoYXJ0LnNpemUgPSB7dzogKHZtYXAudyArIGFwcGVuZFNpemVbMF0gKyBmaWdQYWQpLCBoOiAodm1hcC5oICsgYXBwZW5kU2l6ZVsxXSArIGZpZ1BhZCl9O1xuXG4gIGNoYXJ0LmVsZW0gPSBgPHN2ZyBjbGFzcz1cInZtYXAtZmlndXJlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiJHtjaGFydC5zaXplLnd9XCIgaGVpZ2h0PVwiJHtjaGFydC5zaXplLmh9XCIgdmlld0JveD1cIi0ke2ZpZ1BhZC8yfSAtJHtmaWdQYWQvMn0gJHtjaGFydC5zaXplLnd9ICR7Y2hhcnQuc2l6ZS5ofVwiPlxuICAgIDxyZWN0IHg9XCItJHtmaWdQYWQvMn1cIiB5PVwiLSR7ZmlnUGFkLzJ9XCIgd2lkdGg9XCIke2NoYXJ0LnNpemUud31cIiBoZWlnaHQ9XCIke2NoYXJ0LnNpemUuaH1cIiBmaWxsPVwiJHtmaWdDfVwiPjwvcmVjdD5cbiAgICA8Zz4keyB2bWFwLmVsZW0gfTwvZz5cbiAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoJHtmaWdDYXB0aW9uLnBvcy54fSwke2ZpZ0NhcHRpb24ucG9zLnl9KVwiPiR7IGZpZ0NhcHRpb24uZWxlbSB9PC9nPlxuICA8L3N2Zz5gO1xuXG4gIHJldHVybiBjaGFydDtcbn1cblxuZnVuY3Rpb24gb3JkZXJMYWJlbCAodmFyb3JkZXIsIHBvcz0neD1cIjBcIiB5PVwiMFwiJywgb3B0aW9ucz11bmRlZmluZWQpIHtcbiAgLyogR2VuZXJhdGVzIGFuIG9yZGVyIGxhYmVsIChlLmcuIFwiYSA+IGIgPiBjXCIpIGZyb20gdmFyaWFibGUgb3JkZXIgKi9cbiAgY29uc3Qge21heExpbmVXaWR0aCwgZm9udCwgdGV4dFNpemUsIGxlYWRpbmd9ID0gXG4gICAgeyBtYXhMaW5lV2lkdGg6IDYwLCBmb250OiAnaW5oZXJpdCcsIHRleHRTaXplOiAxMiwgbGVhZGluZzogNCwgLi4ub3B0aW9ucyB9O1xuICBjb25zdCBzdHlsZSA9IGBmb250LWZhbWlseTogJHtmb250fTsgZm9udC1zaXplOiAke3RleHRTaXplfXB4OyBkb21pbmFudC1iYXNlbGluZTogaGFuZ2luZztgO1xuXG4gIGNvbnN0IG91dHB1dCA9IHZhcm9yZGVyLnJlZHVjZSgoYWNjLGN1cnIsaSkgPT4gYWNjICsgKGkgPiAwID8gJzx0c3BhbiB5PVwiMFwiPiA+IDwvdHNwYW4+JyA6ICcnKSArIHByb2Nlc3NMYWJlbChjdXJyLCAnc3ZnJyksJycgKTtcblxuICAvLyBvdXRwdXQgPSBicmVha1N0cihvdXRwdXQsIG1heExpbmVXaWR0aCkgLy8gPC0tIGZpeCB0YWcgYnJlYWtzXG4gIC8vIFx0LnJlZHVjZSgoc3RyLGN1cnIsaSkgPT4gc3RyICsgKGkgPiAwID8gc3ZnTGluZWJyZWFrKGN1cnIsICh0ZXh0U2l6ZSArIGxlYWRpbmcgKyAncHgnKSkgOiBjdXJyKSwgJycpO1xuXG4gIHJldHVybiBgPHRleHQgJHtwb3N9IHN0eWxlPVwiJHtzdHlsZX1cIj4ke291dHB1dH08L3RleHQ+YDtcbn1cblxuZnVuY3Rpb24gaW5wdXRMYWJlbCAoaW5wdXQsIHBvcz0neD1cIjBcIiB5PVwiMFwiJywgb3B0aW9ucz11bmRlZmluZWQpIHtcbiAgLyogR2VuZXJhdGVzIGFuIGlucHV0IGxhYmVsIChlLmcuIFwixpIgPSAoKGEpYilcIiBvciBcIjo6MzIxMFwiKSAqL1xuICBjb25zdCB7cHJlZml4LCBtYXhMaW5lV2lkdGgsIHRydW5jYXRlZCwgdHJ1bmNNYXgsIHRydW5jU3VmZml4LCBmb250LCB0ZXh0U2l6ZSwgbGVhZGluZ30gPSBcbiAgICB7cHJlZml4OiAnJywgbWF4TGluZVdpZHRoOiA2MCwgdHJ1bmNhdGVkOiBmYWxzZSwgdHJ1bmNNYXg6IDEwMDAsIHRydW5jU3VmZml4OiAn4oCmJywgZm9udDogJ2luaGVyaXQnLCB0ZXh0U2l6ZTogMTIsIGxlYWRpbmc6IDQsIC4uLm9wdGlvbnMgfTtcbiAgY29uc3Qgc3R5bGUgPSBgZm9udC1mYW1pbHk6ICR7Zm9udH07IGZvbnQtc2l6ZTogJHt0ZXh0U2l6ZX1weDsgZG9taW5hbnQtYmFzZWxpbmU6IGhhbmdpbmc7YDtcblxuICBsZXQgb3V0cHV0ID0gcHJlZml4ICsgaW5wdXQ7XG4gIGxldCBhcHBlbmRpeCA9ICcnO1xuXG4gIGlmICh0cnVuY2F0ZWQgJiYgKG91dHB1dC5sZW5ndGggPiB0cnVuY01heCkpIHtcbiAgICBvdXRwdXQgPSBvdXRwdXQuc3Vic3RyKDAsdHJ1bmNNYXgpO1xuICAgIGFwcGVuZGl4ICs9IHRydW5jU3VmZml4O1xuICB9XG4gIG91dHB1dCA9IGJyZWFrU3RyKG91dHB1dCwgbWF4TGluZVdpZHRoKVxuICAgIC5yZWR1Y2UoKHN0cixjdXJyLGkpID0+IHN0ciArIChpID4gMCA/IHN2Z0xpbmVicmVhayhjdXJyLCAodGV4dFNpemUgKyBsZWFkaW5nICsgJ3B4JykpIDogY3VyciksICcnKTtcblxuICByZXR1cm4gYDx0ZXh0ICR7cG9zfSBzdHlsZT1cIiR7c3R5bGV9XCI+JHtvdXRwdXQgKyBhcHBlbmRpeH08L3RleHQ+YDtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0U1ZHKHN1YlRyZWUsIG1hcFNWRz0nJykge1xuICAvKiBSZWN1cnNpdmUgZnVuY3Rpb24gdG8gY29uc3RydWN0IHN2ZyBtYXJrdXAgZnJvbSB2bWFwIHRyZWUgc3RydWN0dXJlICovXG5cbiAgaWYoc3ViVHJlZSAhPT0gbnVsbCAmJiB0eXBlb2Ygc3ViVHJlZSA9PSAnb2JqZWN0Jykge1xuICAgIGlmKHN1YlRyZWUuY2hpbGRyZW4pIHtcbiAgICAgIG1hcFNWRyArPSBgPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKCR7c3ViVHJlZS5wb3NpdGlvblswXX0sICR7c3ViVHJlZS5wb3NpdGlvblsxXX0pXCI+YDtcblxuICAgICAgc3ViVHJlZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgbWFwU1ZHICs9IGNvbnN0cnVjdFNWRyhjaGlsZCk7XG4gICAgICB9KTtcbiAgICAgIG1hcFNWRyArPSAnPC9nPic7XG4gICAgICByZXR1cm4gbWFwU1ZHO1xuICAgIH1cbiAgICBlbHNlIHtcdFx0XHRcdFxuICAgICAgbWFwU1ZHICs9IGA8cmVjdCB4PVwiJHtzdWJUcmVlLnBvc2l0aW9uWzBdfVwiIHk9XCIke3N1YlRyZWUucG9zaXRpb25bMV19XCIgd2lkdGg9XCIke3N1YlRyZWUuc2NhbGVbMF19XCIgaGVpZ2h0PVwiJHtzdWJUcmVlLnNjYWxlWzFdfVwiIGZpbGw9XCIke3ZDb2xvcihzdWJUcmVlLnZhbHVlKX1cIj48L3JlY3Q+YDtcbiAgICAgIHJldHVybiBtYXBTVkc7XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90IGEgc3VidHJlZSEnKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3UGVyc3AgKHZtYXBQZXJtdXRhdGlvbnMsIGlucHV0LCBnbG9iYWxPcHRpb25zPXVuZGVmaW5lZCkge1xuICAvKiBDb25zdHJ1Y3RzIHZtYXAgcGVyc3BlY3RpdmVzIGFzIEhUTUwgb3V0cHV0IChmbGV4IGxpc3QpICovXG5cbiAgY29uc3Qge2ZpZ1BhZCwgZmlnQywgbWFyZ2luLCBjdXN0b21MYWJlbCwgc3R5bGVDbGFzc30gPSBcbiAgICB7IGZpZ1BhZDogMCwgZmlnQzogJyNmZmYnLCBtYXJnaW46IDIwLCBjdXN0b21MYWJlbDogdW5kZWZpbmVkLCBzdHlsZUNsYXNzOiAnYmFzaWMnLCAuLi5nbG9iYWxPcHRpb25zIH07XG5cbiAgY29uc3QgZGVzaWduID0gc3R5bGVzLnZtYXBbc3R5bGVDbGFzc107XG4gIGNvbnN0IFt0ZXh0U2l6ZSwgZm9udF0gPSBbZGVzaWduLnRleHRTaXplLCBkZXNpZ24uZm9udC5iYXNlXTtcblxuICBjb25zdCBjaGFydCA9IHt2bWFwczogdm1hcFBlcm11dGF0aW9ucywgaW5wdXQ6IGlucHV0LCBvcHRpb25zOiBnbG9iYWxPcHRpb25zfTtcblxuXG4gIGNvbnN0IHBhZGRpbmcgPSB7eDogKE1hdGguZmxvb3IobWFyZ2luLzQpKSwgeTogKE1hdGguZmxvb3IobWFyZ2luLzIpKX07XG4gIGNvbnN0IGNvdW50ID0gdm1hcFBlcm11dGF0aW9ucy5sZW5ndGg7XG4gIGNvbnN0IHZtYXBTaXplID0gdm1hcFBlcm11dGF0aW9uc1swXS5zaXplO1xuXG4gIGNvbnN0IGNvbE51bSA9IE1hdGgubWluKGNvdW50LCA2KTtcbiAgY29uc3Qgcm93TnVtID0gTWF0aC5mbG9vcihjb3VudC9jb2xOdW0pO1xuICBjb25zdCB0YWJsZVNpemUgPSB7IHc6IHZtYXBTaXplLncgKiBjb2xOdW0gKyAocGFkZGluZy54KjIpICogKGNvbE51bS0xKSxcbiAgICAgICAgICAgIGg6IHZtYXBTaXplLmggKiByb3dOdW0gKyAocGFkZGluZy55KjIpICogKHJvd051bS0xKSB9O1xuXG4gIGNvbnN0IHZtYXBJdGVtcyA9IHZtYXBQZXJtdXRhdGlvbnMubWFwKHZtYXAgPT4ge1xuICAgIFxuICAgIHJldHVybiB7ZWxlbTogdm1hcC5lbGVtfTtcbiAgfSkucmVkdWNlKChzdHIsaXRlbSxpKSA9PiB7XG4gICAgY29uc3QgeCA9IGklY29sTnVtO1xuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKGkvY29sTnVtKTtcblxuICAgIGNvbnN0IGNvb3JkcyA9IFt2bWFwU2l6ZS53ICogeCArIChwYWRkaW5nLngqMikgKiB4LFxuICAgICAgICAgICAgdm1hcFNpemUuaCAqIHkgKyAocGFkZGluZy55KjIpICogeV07XG4gICAgcmV0dXJuIHN0cisgYDxnIGNsYXNzPVwidm1hcC1pdGVtXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKCR7Y29vcmRzWzBdfSwke2Nvb3Jkc1sxXX0pXCI+JHtpdGVtLmVsZW19PC9nPmA7XG4gIH0sJycpO1xuXG4gIGNvbnN0IGNhcHRpb24gPSAoaW5wdXQsIGN1c3RvbUxhYmVsKSA9PiB7XG4gICAgaWYgKGN1c3RvbUxhYmVsICE9PSB1bmRlZmluZWQpIHJldHVybiBjdXN0b21MYWJlbDtcblxuICAgIGNvbnN0IGlzRm9ybUROQSA9IGlucHV0LmluY2x1ZGVzKCc6OicpO1xuICAgIGNvbnN0IHByZWZpeCA9IGlzRm9ybUROQSA/ICcnIDogJ8aSID0gJztcbiAgICBjb25zdCBwb3MgPSAneT1cIjBcIic7IC8vICBkeT1cIiR7dGV4dFNpemUuYmFzZSArIHRleHRTaXplLnNtIC0gMn1weFwiXG5cbiAgICByZXR1cm4gaW5wdXRMYWJlbChpbnB1dCwgcG9zLCB7cHJlZml4OiBwcmVmaXgsIHRydW5jYXRlZDogZmFsc2UsIGZvbnQ6IGZvbnQsIHRleHRTaXplOiB0ZXh0U2l6ZS5iYXNlfSk7XG4gIH07XG5cbiAgY29uc3QgZmlnQ2FwdGlvbiA9IHtlbGVtOiBjYXB0aW9uKGlucHV0LCBjdXN0b21MYWJlbCksIHBvczoge3g6IDAsIHk6IHRhYmxlU2l6ZS5oICsgcGFkZGluZy55fSwgbGluZVNwYWNpbmc6IHBhZGRpbmcueX07XG4gIGZpZ0NhcHRpb24uc2l6ZSA9IGdldFN2Z1NpemUoZmlnQ2FwdGlvbi5lbGVtKTtcblxuICBjb25zdCBhcHBlbmRTaXplID0gW01hdGgubWF4KDAsIChmaWdDYXB0aW9uLnNpemUudyAtIHRhYmxlU2l6ZS53KSksXG4gICAgICAgICAgICBmaWdDYXB0aW9uLnNpemUuaCArIChmaWdDYXB0aW9uLnBvcy55IC0gdGFibGVTaXplLmgpICsgZmlnQ2FwdGlvbi5saW5lU3BhY2luZ107XG5cbiAgLy8gY29uc3QgbGlzdE1hcmdpbiA9IHt4OiAwLCB5OiBNYXRoLmZsb29yKG1hcmdpbi8yKX07XG5cbiAgY2hhcnQuc2l6ZSA9IHt3OiAodGFibGVTaXplLncgKyBhcHBlbmRTaXplWzBdICsgZmlnUGFkKSwgXG4gICAgICAgICAgaDogKHRhYmxlU2l6ZS5oICsgYXBwZW5kU2l6ZVsxXSArIGZpZ1BhZCl9O1xuXG4gIGNoYXJ0LmVsZW0gPSBgPHN2ZyBjbGFzcz1cInZtYXAtcGVyc3BlY3RpdmVzLWZpZ3VyZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIiR7Y2hhcnQuc2l6ZS53fVwiIGhlaWdodD1cIiR7Y2hhcnQuc2l6ZS5ofVwiIHZpZXdCb3g9XCItJHtmaWdQYWQvMn0gLSR7ZmlnUGFkLzJ9ICR7Y2hhcnQuc2l6ZS53fSAke2NoYXJ0LnNpemUuaH1cIj5cbiAgICA8cmVjdCB4PVwiLSR7ZmlnUGFkLzJ9XCIgeT1cIi0ke2ZpZ1BhZC8yfVwiIHdpZHRoPVwiJHtjaGFydC5zaXplLnd9XCIgaGVpZ2h0PVwiJHtjaGFydC5zaXplLmh9XCIgZmlsbD1cIiR7ZmlnQ31cIj48L3JlY3Q+XG4gICAgPGcgY2xhc3M9XCJ2bWFwLXBlcnNwZWN0aXZlcyB2bWFwLXRhYmxlXCI+JHsgdm1hcEl0ZW1zIH08L2c+XG4gICAgPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKCR7ZmlnQ2FwdGlvbi5wb3MueH0sJHtmaWdDYXB0aW9uLnBvcy55fSlcIj5cbiAgICAgIDxsaW5lIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiJHt0YWJsZVNpemUud31cIiB5Mj1cIjBcIiBzdHJva2U9XCJibGFja1wiIHN0cm9rZS13aWR0aD1cIjAuNVwiIC8+XG4gICAgICA8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwke2ZpZ0NhcHRpb24ubGluZVNwYWNpbmd9KVwiPiR7IGZpZ0NhcHRpb24uZWxlbSB9PC9nPlxuICAgIDwvZz5cbiAgPC9zdmc+YDtcblxuICByZXR1cm4gY2hhcnQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdMaXN0ICh2bWFwc19zdmcsIGdsb2JhbE9wdGlvbnM9dW5kZWZpbmVkKSB7XG4gIC8qIENvbnN0cnVjdHMgbXVsdGlwbGUgdm1hcHMgYXMgU1ZHIG91dHB1dCAqL1xuXG4gIGNvbnN0IHttYXJnaW4sIHZBbGlnbn0gPSB7IG1hcmdpbjogMjAsIHZBbGlnbjogJ2JvdHRvbScsIC4uLmdsb2JhbE9wdGlvbnMgfTtcblxuICAvLyBjb25zdCB2bWFwSXRlbXMgPSB2bWFwUGVybXV0YXRpb25zX3N2Zy5tYXAoZHJhdyA9PiB7XG4gICAgICBcbiAgLy8gXHRyZXR1cm4ge3NpemU6IGRyYXcuc2l6ZSwgZWxlbTogZHJhdy5lbGVtfTtcbiAgLy8gfSkucmVkdWNlKChzdHIsaXRlbSxpLGFycikgPT4ge1xuXG4gIC8vIFx0Ly8gY29uc3Qgc2hpZnRYID0gKGkgPiAwKSA/ICggYXJyWzBdLnNpemUudyAqIGkgKyAocGFkZGluZy54KjIpICogaSApIDogMDtcbiAgLy8gXHRyZXR1cm4gc3RyKyBgPGcgY2xhc3M9XCJ2bWFwLWl0ZW1cIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoJHtzaGlmdFh9LDApXCI+JHtpdGVtLmVsZW19PC9nPmA7XG4gIC8vIH0sJycpO1xuXG4gIHJldHVybiBgPGRpdiBjbGFzcz1cInZtYXAtbGlzdFwiIHN0eWxlPVwiZGlzcGxheTogZmxleDsgZmxleC13cmFwOiB3cmFwOyAke2dldFZBbGlnbih2QWxpZ24pfSBtYXJnaW46IDAgLSR7TWF0aC5mbG9vcihtYXJnaW4vMil9cHhcIj5cbiAgICAgICR7IHZtYXBzX3N2Zy5yZWR1Y2UoKHN0ciwgZHJhdykgPT4gYCR7c3RyfTxkaXYgY2xhc3M9XCJ2bWFwLWl0ZW1cIiBzdHlsZT1cInBhZGRpbmc6ICR7TWF0aC5mbG9vcihtYXJnaW4vNCl9cHggJHtNYXRoLmZsb29yKG1hcmdpbi8yKX1weFwiPiR7ZHJhdy5lbGVtfTwvZGl2PmAsJycpIH1cbiAgICAgIDwvZGl2PmA7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBIZWxwZXJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNvbnN0IGdldFZBbGlnbiA9IHZBbGlnbiA9PiB7XG4gIC8vID4+PiBhcyBoZWxwZXJcbiAgY29uc3QgYWxpZ25JdGVtcyA9IHZBbGlnbiA9PT0gJ3RvcCcgICAgPyAnZmxleC1zdGFydCdcbiAgICAgICAgICAgIDogdkFsaWduID09PSAnY2VudGVyJyA/ICdjZW50ZXInXG4gICAgICAgICAgICA6IHZBbGlnbiA9PT0gJ2JvdHRvbScgPyAnZmxleC1lbmQnIDogJ2ZsZXgtZW5kJztcbiAgcmV0dXJuIGBhbGlnbi1pdGVtczogJHthbGlnbkl0ZW1zfTtgO1xufTtcblxuY29uc3QgdkNvbG9yID0gdmFsID0+IHtcbiAgLyogVmFsdWUgdG8gY29sb3IgbWFwIGZvciB2bWFwICovXG4gIHJldHVybiB2YWwgPT0gMCA/ICcjMDAwMDAwJ1xuICAgICAgIDogdmFsID09IDEgPyAnIzQ3NTdmZidcbiAgICAgICA6IHZhbCA9PSAyID8gJyNmZjAwNDQnXG4gICAgICAgOiB2YWwgPT0gMyA/ICcjMDBmZjVmJ1xuICAgICAgIDogTmFOO1xufTsiXSwic291cmNlUm9vdCI6IiJ9