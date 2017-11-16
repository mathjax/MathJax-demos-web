# [mj3-demos](https://github.com/mathjax/mj3-demos)

A repository with examples using [mathjax-v3](https://github.com/mathjax/mathjax-v3).

## NOTE

Mathjax v3 is in early alpha. **Do not use this in production** but please test it and report issues at https://github.com/mathjax/mathjax-v3!

Thanks!

## Live demo

Start [mathjax.github.io/mj3-demos](https://mathjax.github.io/mj3-demos) or see below.

## Getting started

* Install NodeJS (8+ recommended) and npm (5.2+).
* Install this repository via npm:
  *  `$ npm install https://github.com/mathjax/mj3-demos.git`
* This should automatically run the post-installation script `install.sh` which will clone the mathjax-v3 repository, checkout the `alpha` branch, compile Typescript, and then build the webpack distributions specified in this repo.
* Load any of the HTML files into your browser.
  * **Note** they'll be in `./node_modules/mj3-demos/`


## Sample setups

There are two basic examples for each input available:

* simple "render the page" setup
  * Implements a simple conversion pass on load.
  * mj3-mml2html.js - [LIVE DEMO](https://mathjax.github.io/mj3-demos/mj3-mml2html.html)
  * mj3-tex2html.js - [LIVE DEMO](https://mathjax.github.io/mj3-demos/mj3-tex2html.html)
  * The demo html pages contain a few samples
* simple global method for rendering individual equations
  * mj3-mml2html-global.js - [LIVE DEMO](https://mathjax.github.io/mj3-demos/mj3-mml2html-global.html)
  * mj3-tex2html-global.js - [LIVE DEMO](https://mathjax.github.io/mj3-demos/mj3-tex2html-global.html)
  * implements `window.Typeset(string, boolean)`
    * accepts an input string and a Boolean (to set/override display `block`).
    * Returns the resulting HTML node
  * The demo html pages contain a simple textarea input example


## Webfonts

The `./mathjax2` folder contains the webfonts (and their location is hard-coded right now).
