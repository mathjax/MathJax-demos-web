# mj3-demos

A repository with examples using mathjax-v3

## Getting started

* Install NodeJS (8+ recommended) and npm (5.2+).
* Install this repository via npm:
  *  `$ npm install https://github.com/pkra/mj3-demos.git`
* This should automatically run the post-installation script `install.sh` which will clone the mathjax-v3 repository, create a suitable branch, compile Typescript, and build the webpack distributions specified here.
* Load any of the HTML files into your browser.


## Sample setups

There are two basic examples for each input available:

* simple "render the page" setup
  * Implements a simple conversion pass on load.
  * mj3-mml2html-global.js .html
  * mj3-tex2html-global.js / .html
* simple global method for rendering individual equations
  * mj3-mml2html-global.js
  * mj3-tex2html-global.js
  * implements `window.Typeset(string, boolean)`
    * accepts an input string and a Boolean (to set/override display `block`).
    * Returns the resulting HTML node
  * The .html samples contain a simple textarea input


## Webfonts

The `./mathjax2` folder contains the webfonts (and their location is hard-coded right now).
