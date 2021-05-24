# vmap-svg

<br/>

**formform** module to draw [*vmap*](https://observablehq.com/@formsandlines/recursive-mapping-of-4-valued-forms-with-vmaps) trees in SVG format for visualization in the browser, in PDFs, etc.

## Usage

Install [formform](https://github.com/formsandlines/formform) if you haven't already.

Then install the module:

```bash
npm install vmap_svg
```

```js
// ES6:
import vmap_svg from 'vmap-svg';

// CommonJS:
let vmap_svg = require('vmap-svg');
```

You can then use the module like this:

```js
const vmap = formform.dna.vmap('((a)b)');
const vmapSVG = vmap_svg.draw(vmap.tree, vmap.input, vmap.varorder, vmap.options);

document.body.appendChild(document.createElement('div')).innerHTML = vmapSVG.elem;
```

<br/>

## Documentation

Comming soon…