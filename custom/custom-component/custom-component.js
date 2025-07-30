//
// Initialize the MathJax startup code.
//
import {startup} from '@mathjax/src/components/js/startup/init.js';

//
// Set up the MathJax path, if it isn't already.
//
import './custom-component-path.js';

//
// Load the components needed for this combined component.
//
import {Loader} from '@mathjax/src/js/components/loader.js';
import '@mathjax/src/components/js/core/core.js';
import '@mathjax/src/components/js/input/tex-base/tex-base.js';
import '@mathjax/src/components/js/input/tex/extensions/ams/ams.js';
import '@mathjax/src/components/js/input/tex/extensions/newcommand/newcommand.js';
import '@mathjax/src/components/js/input/tex/extensions/configmacros/configmacros.js';
import '@mathjax/src/components/js/input/tex/extensions/action/action.js';
import {registerTeX} from '@mathjax/src/components/js/input/tex/register.js';
import {loadFont} from '@mathjax/src/components/js/output/chtml/chtml.js';
import '@mathjax/src/components/js/ui/menu/menu.js';
import '@mathjax/src/components/js/a11y/util.js';

//
// Record the components that have been loaded.
//
Loader.preLoaded(
  'loader', 'startup',
  'core',
  'input/tex',
  '[tex]/ams',
  '[tex]/newcommand',
  '[tex]/configmacros',
  '[tex]/action',
  'output/chtml',
  'ui/menu'
);

//
// Add these packages to the default TeX package list.
//
registerTeX([
  'base',
  'ams',
  'newcommand',
  'configmacros',
  'action'
], false);

//
// Avoid the version number warning if this component is loaded by node-main.
//
Loader.saveVersion('custom-component');

//
// Load the font specified in the configuration (if any)
// and do the usual startup.
//
loadFont(startup, true);
