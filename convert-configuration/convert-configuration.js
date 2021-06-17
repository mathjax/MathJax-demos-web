var TEXPACKAGES = ['ams', 'newcommand', 'autoload', 'require', 'noerrors', 'noundefined', 'colorv2', 'configMacros'];
var MENUZOOM = [['options.menuOptions.settings.zoom', 'DoubleClick']];

var Translate = {
  configFiles: {
    'Accessible': [['tex', 'mathml'], ['chtml'], ['ui/menu'], TEXPACKAGES, MENUZOOM],
    'AM_CHTML': [['asciimath'], ['chtml'], ['ui/menu']],
    'AM_HTMLorMML': [['asciimath'], ['chtml'], ['ui/menu']],
    'AM_SVG': [['asciimath'], ['svg'], ['ui/menu']],
    'default': [['tex'], ['chtml']],
    'MML_CHTML': [['mathml'], ['chtml'], ['ui/menu']],
    'MML_HTMLorMML': [['mathml'], ['chtml'], ['ui/menu']],
    'MML_SVG': [['mathml'], ['svg'], ['ui/menu']],
    'MMLorHTML': [[], ['chtml']],
    'Safe': [],
    'TeX-AMS_CHTML': [['tex'], ['chtml'], ['ui/menu'], TEXPACKAGES],
    'TeX-AMS_HTML': [['tex'], ['chtml'], ['ui/menu'], TEXPACKAGES],
    'TeX-AMS_SVG': [['tex'], ['svg'], ['ui/menu'], TEXPACKAGES],
    'TeX-AMS-MML_HTMLorMML': [['tex', 'mathml'], ['chtml'], ['ui/menu'], TEXPACKAGES],
    'TeX-AMS-MML_SVG': [['tex', 'mathml'], ['svg'], ['ui/menu'], TEXPACKAGES],
    'TeX-MML-AM_CHTML': [['tex', 'mathml', 'asciimath'], ['chtml'], ['ui/menu'], TEXPACKAGES],
    'TeX-MML-AM_HTMLorMML': [['tex', 'mathml', 'asciimath'], ['chtml'], ['ui/menu'], TEXPACKAGES],
    'TeX-MML-AM_SVG': [['tex', 'mathml', 'asciimath'], ['svg'], ['ui/menu'],TEXPACKAGES]
  },

  jaxFiles: {
    'input/TeX': ['input', 'tex'],
    'input/MathML': ['input', 'mathml'],
    'input/AsciiMath': ['input', 'asciimath'],
    'output/HTML-CSS': ['output', 'chtml'],
    'output/CommonHTML': ['output', 'chtml'],
    'output/SVG': ['output', 'svg'],
    'output/NativeMML': [],
    'output/PreviewHTML': [],
    'output/PlainSource': []
  },

  extensionFiles: {
    'a11y/accessibility-menu': 'ui/menu',
    'a11y/auto-collapse': {NA: ''},
    'a11y/collapsible': 'a11y/complexity',
    'a11y/explorer': 'a11y/explorer',
    'a11y/semantic-enrich': 'a11y/semantic-enrich',
    'asciimath2jax': {ignore: true},
    'AssistiveMML': {NA: ''},
    'CHTML-preview': {NI: true},
    'fast-preview': {NI: true},
    'FontWarnings': {NA: ''},
    'HelpDialog': {NA: ''},
    'HTML-CSS/handle-floats': {NA: 'Floats are handled automatically'},
    'jsMath2jax': {ignore: true},
    'MatchWebFonts': {NA: ''},
    'MathEvents': {ignore: true},
    'MathMenu': {ignore: true},
    'MathML/content-mathml': {NI: true},
    'MathML/mml3': {NI: true},
    'MathZoom': {ignore: true},
    'mml2jax': {ignore: true},
    'Safe': 'ui/safe',
    'TeX/action': '[tex]/action',
    'TeX/AMScd': '[tex]/amscd',
    'TeX/AMSmath': '[tex]/ams',
    'TeX/AMSsymbols': '[tex]/ams',
    'TeX/autobold': {NI: true},
    'TeX/autoload-all': '[tex]/autoload',
    'TeX/bbox': '[tex]/bbox',
    'TeX/begingroup': {NI: true},
    'TeX/boldsymbol': '[tex]/boldsymbol',
    'TeX/cancel': '[tex]/cancel',
    'TeX/color': '[tex]/color',
    'TeX/enclose': '[tex]/enclose',
    'TeX/extpfeil': '[tex]/extpfeil',
    'TeX/HTML': '[tex]/html',
    'TeX/mathchoice': {ignore: true},
    'TeX/mediawiki-texvc': {NI: true},
    'TeX/mhchem': '[tex]/mhchem',
    'TeX/newcommand': '[tex]/newcommand',
    'TeX/noErrors': '[tex]/noerrors',
    'TeX/noUndefined': '[tex]/noundefined',
    'TeX/text-macros': '[tex]/textmacros',
    'TeX/unicode': '[tex]/unicode',
    'TeX/verb': '[tex]/verb',
    'tex2jax': {ignore: true},
    'toMathML': {ignore: true}
  },

  set: function(name, value, config) {
    var keys = name.split(/\./), i = 0;
    while ((key = keys[i++])) {
      if (i === keys.length) {
        config[key] = (value instanceof Array ? value : [value, '']);
      } else {
        if (!config.hasOwnProperty(key)) config[key] = [{}, ''];
        config = config[key][0];
      }
    }
  },

  checkValue: function (prefix, key, value) {
    if (!value[0].match(/MathJax(?:\.[a-z0-9]+)+/i)) return true;
    Convert.convertError(prefix, key, '<code>' + RegExp.lastMatch + '</code> is no longer available (used in  %s)');
    return false;
  },

  checkEval: function (prefix, key, value) {
    if (Translate.checkValue(prefix, key, value)) {
      try {
        return eval(value[0]);
      } catch (err) {
        Convert.convertError(prefix, key, 'Can\'t determine value for %s: ' + Convert.escape(err.message));
      }
    }
    return null;
  },

  transfer: function (name, transform) {
    return function (prefix, key, value, config) {
      if (Translate.checkValue(prefix, key, value)) {
        if (transform && value instanceof Array) {
          value[0] = transform(value[0]);
        }
        Translate.set(name, value, config);
      }
    }
  },

  move: function (name) {
    return function (prefix, key, value, config) {
      Translate.set(name, value, config);
    }
  },

  message: function (message) {
    return function (prefix, key, value, config) {
      Convert.convertError(prefix, key, message || 'Configuration option %s has no version 3 equivalent');
    }
  },

  notAvailable: function (prefix, key, value, config) {
    Convert.convertError(prefix, key, 'Configuration option %s has no version 3 equivalent');
  },

  notImplemented: function (prefix, key, value, config) {
    Convert.convertError(prefix, key, 'The %s option is not yet implemented (but may be in a future release)');
  },

  augment: function (prefix, key, value, config) {
    Convert.convertError(prefix, key, '%s must be handled via subclassing in version 3');
  },

  styles: function (prefix, key, value, config) {
    Convert.convertError(prefix, key, 'Styles should be set via stylesheets rather than MathJax configuration (%s)');
  },

  jax: function (prefix, key, value, config) {
    var jax = Translate.checkEval(prefix, key, value);
    if (!jax) return;
    for (var i = 0, m = jax.length; i < m; i++) {
      if (Translate.jaxFiles.hasOwnProperty(jax[i])) {
        var data = Translate.jaxFiles[jax[i]];
        if (data.length) {
          Convert[data[0] + 'Jax'][data[1]] = true;
          if (data[0] === 'output' && !Convert.output) Convert.output = data[1];
        } else {
          Convert.convertError([], jax[i], 'Jax %s is not yet implemented');
        }
      } else {
        Convert.convertError([], jax[i], 'Unknown jax file %s');
      }
    }
  },

  extensions: function (prefix, key, value, config) {
    var extensions = Translate.checkEval(prefix, key, value);
    if (!extensions) return;
    var block = (prefix[0] ? prefix[0] + '/' : '');
    for (var i = 0, m = extensions.length; i < m; i++) {
      var extension = block + extensions[i].replace(/\.js$/, '');
      if (Translate.extensionFiles.hasOwnProperty(extension)) {
        var data = Translate.extensionFiles[extension];
        if (typeof data === 'string') {
          Convert.extensions[data] = true;
        } else if (data.NA) {
          Convert.convertError([], extension, 'Extension %s has no corresponding extension in version 3');
        } else if (data.NI) {
          Convert.convertError([], extension, 'Extension %s is not yet implemented (but may be in a future release)');
        }
      } else {
        Convert.convertError([], extension, 'Unknown extension %s');
      }
    }
  },

  outputOption: function (prefix, key, value, config) {
    if (Translate.checkValue(prefix, key, value) && Convert.output) {
      Translate.set(Convert.output + '.' + key, value, config);
    }
  },

  processing: function (prefix, key, value, config) {
    var messageStyle = Translate.checkEval(prefix, key, value);
    if (!messageStyle || messageStyle === 'none') return;
    Translate.notAvailable(prefix, key, value, config);
  },

  scale: function (jax) {
    return function (prefix, key, value, config) {
      if (Translate.checkValue(prefix, key, value)) {
        var scale = [(value[0] / 100).toFixed(8).replace(/\.?0*$/, ''), value[1]];
        Translate.set(jax + '.scale', scale, config);
      }
    }
  },

  font: function (prefix, key, value, config) {
    var font = Translate.checkEval(prefix, key, value);
    if (!font) return;
    if (font instanceof Array) font = font[0];
    if (font !== 'TeX') {
      Convert.convertError(prefix, key, 'Currently only the TeX font is available (%s not implemented)');
    }
  },

  a11y: function (prefix, key, value, config) {
    if (Translate.checkValue(prefix, key, value) && value[0] === 'false') {
      if (key === 'semantic-enrich') {
        Translate.set('options.renderActions.enrich', '[]', config);
        Translate.set('options.renderActions.attachSpeech', '[]', config);
      }
      if (key === 'collapsible') {
        Translate.set('options.renderActions.complexity', '[]', config);
      }
    }
  },

  disablePackage: function (package) {
    return function (prefix, key, value, config) {
      if (Translate.checkValue(prefix, key, value) && value[0] === 'true') {
        delete Convert.extensions['[tex]/' + package];
      }
    }
  },

  mathmlSpacing: function (prefix, key, value, config) {
    if (Translate.checkValue(prefix, key, value) && Convert.output) {
      Translate.set(Convert.output + '.mathmlSpacing', value, config);
    }
  },

  renderer: function (prefix, key, value, config) {
    var renderer = Translate.checkEval(prefix, key, value);
    if (!renderer) return;
    if (renderer === 'CommonHTML') renderer = 'CHTML';
    if (renderer !== 'CHTML' && renderer !== 'SVG') {
      Convert.convertError([], renderer, 'Renderer %s is not implemented in v3')
    } else {
      Translate.set('options.menuOptions.settings.renderer', "'" + renderer.toLowerCase() + "'", config);
    }
  },

  configParam: function (prefix, key, value, config) {
    var configs = '["' + value[0].split(/,/).join('", "') + '"]';
    Translate.config(prefix, key, [configs, ''], config);
  },

  config: function (prefix, key, value, config) {
    var configs = Translate.checkEval(prefix, key, value);
    if (!configs) return;
    while ((file = configs.shift())) {
      file = file.replace(/\.js$/, '').replace(/-full$/, '');
      if (file.match(/:\/\//) || file.match(/local\//)) continue;
      if (Translate.configFiles.hasOwnProperty(file)) {
        var data = Translate.configFiles[file];
        if (data.length === 0) {
          Convert.convertError([], file, 'Configuration file %s is not yet implemented');
          return;
        }
        Translate.setNames('inputJax', data[0]);
        Translate.setNames('outputJax', data[1]);
        Translate.setNames('extensions', data[2]);
        Translate.setNames('extensions', data[3], '[tex]/');
        Translate.merge(config, data[4]);
      } else {
        Convert.convertError([], file, 'Unrecognized configuration file %s');
      }
    }
  },

  setNames: function (key, data, prefix) {
    if (!data) return;
    var field = Convert[key];
    for (var i = 0, m = data.length; i < m; i++) {
      field[(prefix || '') + data[i]] = true;
      if (key === 'outputJax' && !Convert.output) Convert.output = data[i];
    }
  },

  merge: function (config, data) {
    if (!data) return;
    for (var i = 0, m = data.length; i < m; i++) {
      Translate.set(data[i][0], "'" + data[i][1] + "'", config);
    }
  }

};

var Convert = {
  text: '',
  i: 0,
  errors: [],
  inputJax: {},
  outputJax: {},
  extensions: {},
  output: '',

  translateParams: {
    noContrib: Translate.notAvailable,
    locale: Translate.notImplemented,
    config: Translate.configParam,
    delayStartupUntil: Translate.message('%s must be handled through the <code>startup</code> block\'s' +
                                              ' <code>ready()</code> function'),
    noDOMContentEvent: Translate.notAvailable,
    NoMathPlayer: Translate.notAvailable
  },

  translateConfig: {
    Augment: Translate.augment,
    AuthorInit: Translate.message('%s should be handled through <code>startup.ready()</code>'),
    root: Translate.transfer('loader.paths.mathjax'),
    config: Translate.config,
    styleSheets: Translate.message('Stylesheets should be loaded using <code>&lt;link&gt;</code> elements'),
    styles: Translate.styles,
    jax: Translate.jax,
    extensions: Translate.extensions,
    preJax: Translate.notAvailable,
    postJax: Translate.notAvailable,
    preRemoveClass: Translate.message('MathJax previews are not implemented (%s)'),
    showProcessingMessages: Translate.message('Processing messages are no longer used (%s)'),
    messageStyle: Translate.processing,
    displayAlign: Translate.outputOption,
    displayIndent: Translate.outputOption,
    delayStartupUntil: Translate.notAvailable,
    skipStartupTypeset: Translate.transfer('startup.typeset',
                                           function (bool) {return (bool === 'true' ? 'false' : 'true')}),
    elements: Translate.transfer('startup.elements'),
    positionToHash: Translate.notAvailable,
    showMathMenu: Translate.transfer('options.enableMenu'),
    showMathMenuMSIE: Translate.notAvailable,
    menuSettings: {
      zoom: Translate.transfer('options.menuOptions.settings.zoom'),
      CTRL: Translate.transfer('options.menuOptions.settings.ctrl'),
      ALT: Translate.transfer('options.menuOptions.settings.alt'),
      CMD: Translate.transfer('options.menuOptions.settings.cmd'),
      Shift: Translate.transfer('options.menuOptions.settings.shift'),
      discoverable: Translate.notAvailable,
      zscale: Translate.transfer('options.menuOptions.settings.zscale'),
      renderer: Translate.renderer,
      font: Translate.font,
      context: Translate.notAvailable,
      locale: Translate.notImplemented,
      mpContext: Translate.notAvailable,
      mpMouse: Translate.notAvailable,
      texHints: Translate.transfer('options.menuOptions.settings.texHints'),
      FastPreview: Translate.notAvailable,
      assistiveMML: Translate.notAvailable,
      inTabOrder: Translate.transfer('options.menuOptions.settings.inTabOrder'),
      semantics: Translate.transfer('options.menuOptions.settings.semantics')
    },
    errorSettings: Translate.message(
      '%s are handled through the <code>compileError()</code> and <code>typesetError()</code> values'
        + ' of the <code>options</code> configuration block'
    ),
    ignoreMMLattributes: Translate.notImplemented,
    tex2jax: {
      Augment: Translate.augment,
      inlineMath: Translate.transfer('tex.inlineMath'),
      displayMath: Translate.transfer('tex.displayMath'),
      skipTags: Translate.transfer('options.skipHtmlTags'),
      includeTags: Translate.transfer('options.includeHtmlTags'),
      ignoreClass: Translate.transfer('options.ignoreHtmlClass'),
      processClass: Translate.transfer('options.processHtmlClass'),
      processEscapes: Translate.transfer('tex.processEscapes'),
      processEnvironments: Translate.transfer('tex.processEnvironments'),
      processRefs: Translate.transfer('tex.processRefs'),
      preview: Translate.notImplemented
    },
    asciimath2jax: {
      Augment: Translate.augment,
      delimiters: Translate.transfer('asciimath.delimiters'),
      skipTags: Translate.transfer('options.skipHtmlTags'),
      includeTags: Translate.transfer('options.includeHtmlTags'),
      ignoreClass: Translate.transfer('options.ignoreHtmlClass'),
      processClass: Translate.transfer('options.processHtmlClass'),
      preview: Translate.notImplemented
    },
    mml2jax: {
      Augment: Translate.augment,
      preview: Translate.notImplemented
    },
    jsMath2jax: Translate.notImplemented,
    TeX: {
      Augment: Translate.augment,
      extensions: Translate.extensions,
      TagSide: Translate.transfer('tex.tagSide'),
      TagIndent: Translate.transfer('tex.tagIndent'),
      MultLineWidth: Translate.transfer('tex.multlineWidth'),
      Macros: Translate.move('tex.macros'),
      MAXMACROS: Translate.transfer('tex.maxMacros'),
      MAXBUFFER: Translate.transfer('tex.maxBuffer'),
      equationNumbers: {
        autoNumber: Translate.transfer('tex.tags', function (name) {return name.toLowerCase()}),
        useLabelIds: Translate.transfer('tex.useLabelIds'),
        formatNumber: Translate.transfer('tex.tagFormat.number'),
        formatTag: Translate.transfer('tex.tagFormat.tag'),
        formatID: Translate.transfer('tex.tagFormat.id'),
        formatURL: Translate.transfer('tex.tagFormat.url')
      },
      noErrors: {
        disabled: Translate.disablePackage('noerrors'),
        multiline: Translate.notImplemented,
        inlineDelimiters: Translate.notAvailable,
        style: Translate.notAvailable
      },
      noUndefined: {
        disabled: Translate.disablePackage('noundefined'),
        attributes: {
          mathsize: Translate.transfer('tex.noundefined.size'),
          mathcolor: Translate.transfer('tex.noundefined.color'),
          mathbackground: Translate.transfer('tex.noundefined.background'),
        }
      },
      unicode: {
        font: Translate.notAvailable
      },
      CD: {
        colspace: Translate.transfer('tex.amsCd.colspace'),
        rowspace: Translate.transfer('tex.amsCd.rowspace'),
        harrowsize: Translate.transfer('tex.amsCd.harrowsize'),
        varrowsize: Translate.transfer('tex.amsCd.varrowsize'),
        hideHorizontalLabels: Translate.transfer('tex.amsCd.hideHorizontalLabels')
      },
      mhchem: {
        legacy: Translate.notAvailable
      }
    },
    AsciiMath: {
      Augment: Translate.augment,
      fixphi: Translate.transfer('asciimath.fixphi'),                      // legacy input jax
      useMathMLspacing: Translate.transfer('asciimath.useMathMLspacing'),  // legacy input jax
      displaystyle: Translate.transfer('asciimath.displaystyle'),          // legacy input jax
      decimal: Translate.transfer('asciimath.decimalsign'),                // legacy input jax
      decimalsign: Translate.transfer('asciimath.decimalsign')             // legacy input jax
    },
    MathML: {
      Augment: Translate.augment,
      extensions: Translate.extensions,
      useMathMLspacing: Translate.mathmlSpacing,
      'content-mathml': Translate.notImplemented
    },
    CommonHTML: {
      Augment: Translate.augment,
      scale: Translate.scale('chtml'),
      minScaleAdjust: Translate.transfer('chtml.minScale'),
      font: Translate.font,
      undefinedFamily: Translate.message('%s is now handled through direct CSS'),
      mtextFontInherit: Translate.transfer('chtml.mtextInheritFont'),
      EqnChunk: Translate.notImplemented,
      EqnChunkFactor: Translate.notImplemented,
      EqnChunkDelay: Translate.notImplemented,
      matchFontHeight: Translate.transfer('chtml.matchFontHeight'),
      linebreaks: Translate.notImplemented,
      styles: Translate.styles,
      tooltip: Translate.message('Tooltip CSS can be overriden via direct CSS (%s)')
    },
    "HTML-CSS": {
      Augment: Translate.augment,
      extensions: Translate.extensions,
      scale: Translate.scale('chtml'),
      minScaleAdjust: Translate.transfer('chtml.minScale'),
      availableFonts: Translate.font,
      preferredFont: Translate.font,
      webFont: Translate.font,
      imageFont: Translate.notAvailable,
      fonts: Translate.font,
      preloadWebFonts: Translate.notAvailable,
      undefinedFamily: Translate.transfer('%s is now handled through direct CSS'),
      mtextFontInherit: Translate.transfer('chtml.mtextInheritFont'),
      EqnChunk: Translate.notImplemented,
      EqnChunkFactor: Translate.notImplemented,
      EqnChunkDelay: Translate.notImplemented,
      matchFontHeight: Translate.transfer('chtml.matchFontHeight'),
      noReflows: Translate.notAvailable,
      linebreaks: Translate.notImplemented,
      styles: Translate.styles,
      tooltip: Translate.message('Tooltip configuration currently is static and can\'t be configured (%s)')
    },
    NativeMML: Translate.message('Native MathML output currently is not implemented'),
    SVG: {
      Augment: Translate.augment,
      scale: Translate.scale('svg'),
      minScaleAdjust: Translate.transfer('svg.minScale'),
      font: Translate.font,
      blacker: Translate.notImplemented,
      undefinedFamily: Translate.transfer('%s is now handled through direct CSS'),
      mtextFontInherit: Translate.transfer('svg.mtextInheritFont'),
      addMMLclasses: Translate.message('MathML classes are always included (%s)'),
      useFontCache: Translate.fontCache,
      useGlobalCache: Translate.fontCache,
      EqnChunk: Translate.notImplemented,
      EqnChunkFactor: Translate.notImplemented,
      EqnChunkDelay: Translate.notImplemented,
      matchFontHeight: Translate.message('Font height is always matched (%s)'),
      noReflows: Translate.notAvailable,
      linebreaks: Translate.notImplemented,
      merrorStyle: Translate.notImplemented,
      styles: Translate.styles,
      tooltip: Translate.message('Tooltip configuration currently is static and can\'t be configured (%s)')
    },
    PlainSource: Translate.notImplemented,
    PreviewHTML: Translate.notImplemented,
    AssistiveMML: Translate.notImplemented,
    'CHTML-preview': Translate.notAvailable,
    'fast-preview': Translate.notAvailable,
    'auto-collapse': Translate.notImplemented,
    'collapsible': Translate.a11y,
    'semantic-enrich': Translate.a11y,
    FontWarnings: Translate.notAvailable,
    HelpDialog: Translate.notAvailable,
    MatchWebFonts: Translate.notAvailable,
    Safe: Translate.notImplemented,
    MathMenu: {
      Augment: Translate.augment,
      delay: Translate.notAvailable,
      helpURL: Translate.notAvailable,
      showRenderer: Translate.notAvailable,
      showMathPlayer: Translate.notAvailable,
      showFontMenu: Translate.notAvailable,
      showContext: Translate.notAvailable,
      showDiscoverable: Translate.notAvailable,
      showLocale: Translate.notAvailable,
      semanticsAnnotations: Translate.transfer('options.menuOptions.annotationTypes'),
      windowSettings: Translate.notAvailable,
      styles: Translate.styles
    },
    MathEvents: Translate.notAvailable,
    MMLorHTML: Translate.message('%s is deprecated and has been removed from version 3')
  },

  convertConfiguration: function () {
    this.clearResults();
    var text = document.getElementById('configuration').value;
    var config = document.getElementById('configfile').value;
    try {
      var config2 = this.parseConfiguration(text);
    } catch (err) {
      this.errors.push(this.escape(err.message));
      this.errors.push('<pre><span class="green">' + this.escape(this.text.slice(0, this.i)) +
                       '</span><span class="red">' + this.escape(this.text.slice(this.i)) + '</span></pre>');
    }
    if (this.errors.length === 0) {
      var config3 = this.convertToV3(config, config2);
      this.displayConfig(config3);
    }
    this.displayErrors();
  },

  parseConfiguration: function (text) {
    this.text = text;
    this.i = 0;
    var hasMathJax = this.removeMathJax();
    var config2 = this.parseObject();
    this.checkTail(hasMathJax);
    return config2;
  },

  removeMathJax: function () {
    if (this.text.match(/MathJax\.Hub\.(?:Register|Queue)/)) {
      this.i = RegExp.leftContext.length;
      throw Error('Version 3 uses promises rather than signals and queues');
    }
    this.skipSpaces();
    if (this.match(/(?:window\.)?MathJax\s*=\s*/)) {
      this.advance(RegExp.lastMatch.length);
      return false;
    }
    var match = this.match(/MathJax\.Hub\.Config\s*\(/);
    if (!match) return false;
    this.advance(match[0].length);
    return true;
  },

  checkTail: function (hasMathJax) {
    if (hasMathJax) {
      this.skipSpaces();
      if (this.nextChar() !== ')') throw Error('Missing close parenthesis');
      this.advance();
    }
    if (this.nextChar() === ';') this.advance();
    if (this.match(/\S/)) throw Error('Extra characters after configuration');
  },

  parseObject: function () {
    this.skipSpaces();
    if (this.nextChar() !== '{') return;
    this.advance();
    this.skipSpaces();
    var key, value, def = {};
    while ((key = this.getKey())) {
      def[key] = this.getValue();
      if (def[key].pop() !== ',') break;
    }
    if (this.nextChar() !== '}') throw Error('Missing comma or right brace');
    this.advance();
    return def;
  },

  advance: function (n, noskip) {
    if (n == null) n = 1;
    this.i += n;
    if (!noskip) this.skipSpaces();
  },

  skipSpaces: function () {
    while (this.nextChar().match(/\s/)) this.i++;
  },

  skipComments: function () {
    var match;
    while ((match = this.text.slice(this.i).match(/^(?:\/\/.*?(?:\n|$)|\/\*.*?\*\/)/))) {
      this.i += match[0].length;
    }
  },

  nextChar: function () {
    this.skipComments();
    return this.text.charAt(this.i);
  },

  match: function (pattern) {
    return this.text.slice(this.i).match(pattern);
  },

  getKey: function () {
    this.skipSpaces();
    if (this.nextChar() === ':') throw Error('Missing key name before colon');
    var match = this.match(/^(?:([a-z][a-z0-9]*)|(?:\"((?:\\.|[^\"])*)\")|(?:\'((?:\\.|[^\'])*)\'))/i);
    if (!match) return;
    this.advance(match[0].length);
    if (this.nextChar() !== ':') throw Error('An object key should be followed by a colon');
    this.advance();
    return match[1] || match[2] || match[3];
  },

  delimClose: {
    '(': ')',
    '[': ']',
    '{': '}'
  },

  getValue: function () {
    var value = this.parseObject();
    if (value) {
      var c = this.nextChar();
      return [value, '', (c === ',' ? this.advance() || c : '')];
    } else {
      return this.parseValue();
    }
  },

  parseValue: function () {
    var value = null;
    var comment = '';
    var i = this.i, commentStart = null;
    var delimiters = [];
    var match, done = false, end = '', find = '';
    while (!done && (match = this.match(/(?:\\.|\/\/|\/\*|[(){}\[\]'",:])/))) {
      var c = match[0];
      this.i += RegExp.leftContext.length;

      if (find) {
        if (c === find) find = '';
        this.advance(c.length, true);
        continue;
      }

      switch(c) {

      case '//':
      case '/*':
        commentStart = this.i;
        this.skipComments();
        break;

      case '(':
      case '[':
      case '{':
        commentStart = null;
        delimiters.push(c);
        this.advance();
        break;

      case ')':
      case ']':
      case '}':
        var d = delimiters.pop();
        if (d) {
          if (this.delimClose[d] !== c) throw Error('Mismatched delimiters: ' + d + ' and ' + c);
          this.advance(c.length, true);
          commentStart = null;
        } else {
          done = true;
        }
        break;

      case "'":
      case '"':
        commentStart = null;
        find = c;
        this.advance();
        break;

      case ',':
      case ':':
        commentStart = null;
        if (delimiters.length === 0) {
          done = true;
          end = c;
          if (c === ',') {
            value = this.text.slice(i, this.i);
            this.i++;
            while (this.text.charAt(this.i).match(/\s/)) this.i++;
            i = this.i;
            this.skipComments();
            if (i !== this.i) {
              comment = '   ' + this.text.slice(i, this.i).replace(/\s+$/, '').replace(/^\s+/, '');
            }
          }
          break;
        }
      default:
        commentStart = null;
        this.advance(c.length, true);
        break;

      }
    }

    if (find) throw Error('Unclosed string');
    if (delimiters.length) {
      d = delimiters.pop();
      throw Error('Extra ' + d + ' or missing ' + this.delimClose[d]);
    }
    if (value === null) value = this.text.slice(i, (commentStart === null ? this.i : commentStart));
    if (commentStart) comment = '   ' + this.text.slice(commentStart, this.i).replace(/\s+$/, '');
    return [value.replace(/\s+$/, ''), comment, end];
  },

  convertToV3: function (config, config2) {
    var params = this.parseParams('config=' + config);
    var config3 = this.convertBlock([], this.translateParams, params, {});
    if (config2.jax) {
      this.convertBlock([], this.translateConfig, {jax: config2.jax}, config3);
      delete config2.jax;
    }
    this.convertBlock([], this.translateConfig, config2, config3);
    this.convertFinalize(config3);
    return config3;
  },

  parseParams: function (config) {
    var params = [];
    var components = config.replace(/\s/g, '').split(/\&/);
    for (var i = 0, m = components.length; i < m; i++) {
      var KV = components[i].match(/(.*)?=(.*)/);
      if (KV) {
        params[unescape(KV[1])] = [unescape(KV[2]), ''];
      } else {
        params[components[i]] = ['true', ''];
      }
    }
    return params;
  },
  
  convertBlock: function (prefix, translate, block, config) {
    for (var key in block) {
      if (block.hasOwnProperty(key)) {
        if (translate.hasOwnProperty(key)) {
          var value = block[key][0];
          var convert = translate[key];
          if (typeof convert === 'function') {
            convert(prefix, key, block[key], config);
          } else if (typeof value === 'object') {
            this.convertBlock(prefix.concat(key), convert, value, config);
          } else {
            this.convertError(prefix, key, 'Value of %s should be an object');
          }
        } else {
          this.convertDefault(prefix, key, value, config);
        }
      }
    }
    return config;
  },

  convertDefault: function (prefix, key, value, config) {
    this.convertError(prefix, key, 'No conversion available for configuration option %s');
  },

  convertFinalize: function (config) {
    var JAX = ['tex', 'asciimath'];
    for (var i = 0; i < JAX.length; i++) {
      var jax = JAX[i];
      if (this.inputJax[jax]) {
        !(config.options && config.options[0].ignoreHtmlClass) &&
          Translate.set('options.ignoreHtmlClass', "'" + jax + "2jax_ignore'", config);
        !(config.options && config.options[0].processHtmlClass) &&
          Translate.set('options.processHtmlClass', "'" + jax + "2jax_process'", config);
      }
    }
    if (this.extensions['[tex]/color']) delete this.extensions['[tex]/colorv2'];
    if (this.extensions['[tex]/autoload'] && this.extensions['[tex]/colorv2']) {
      Translate.set('tex.autoload.color', '[]', config);
      Translate.set('tex.autoload.colorv2', '[\'color\']', config);
      delete this.extensions['[tex]/colorv2'];
    }
    if (config.tex) {
      if (config.tex[0].amscd) this.extensions['[tex]/amscd'] = true;
      if (config.tex[0].tagFormat) this.extensions['[tex]/tagFormat'] = true;
    }
    this.convertPackages(config);
  },

  convertPackages: function (config) {
    var packages = [], open = "{'[+]': ", close = '}';
    var defaults = ['ams', 'newcommand', 'autoload', 'require', 'noundefined', 'configMacros'];
    var append = true;
    for (var i = 0, m = defaults.length; i < m; i++) {
      if (!this.extensions['[tex]/' + defaults[i]]) {
        append = false;
        packages.push("'base'");
        open = close = "";
        break;
      }
    }
    if (append) {
      for (i = 0; i < m; i++) {
        delete this.extensions['[tex]/' + defaults[i]];
      }
    }
    var extensions = Object.keys(this.extensions);
    for (i = 0, m = extensions.length; i < m; i++) {
      var extension = extensions[i];
      if (extension.substr(0,6) === '[tex]/') packages.push("'" + extension.slice(6) + "'");
    }
    if (append || packages.length > 1) {
      Translate.set('tex.packages', open + '[' + packages.join(', ') + ']' + close, config);
    }
  },

  convertError: function (prefix, key, message) {
    var name = '<code>' + prefix.concat(key).join('.') + '</code>';
    this.errors.push('<li>' + message.replace(/%s/g, name) + '</li>');
  },

  displayConfig: function (config3) {
    var script = this.displayScript();
    this.loadFiles(config3);
    var config = (Object.keys(config3).length === 0 ? '' :
                  '<script>\nwindow.MathJax = ' + this.formatBlock(config3, '') + ';\n</script>\n'
                 ) + script;
    document.getElementById('v3-config').appendChild(document.createTextNode(config));
  },

  displayScript: function () {
    var file = 'startup';
    if (this.output) {
      var config = [];
      if (this.inputJax.tex) config.push('tex');
      if (this.inputJax.mathml) config.push('mml');
      if (config.length) {
        config.push(this.output);
        file = config.join('-');
        this.removeRedundancies();
      }
    }
    return '<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/' + file + '.js" id="MathJax-script"></script>';
  },

  removeRedundancies: function () {
    if (this.inputJax.tex) {
      delete this.extensions['ui/menu'];
      var remove = ['ams', 'newcommand', 'noundefined', 'require', 'autoload', 'configMacros'];
      for (var i = 0, m = remove.length; i < m; i++) {
        delete this.extensions['[tex]/' + remove[i]];
      }
    }
    delete this.inputJax.tex;
    delete this.inputJax.mathml;
    delete this.outputJax[this.output];
  },

  loadFiles: function (config) {
    var load = [];
    this.addFiles(load, Convert.inputJax, 'input/');
    this.addFiles(load, Convert.outputJax, 'output/');
    this.addFiles(load, Convert.extensions);
    if (load.length) Translate.set('loader.load', '[' + load.join(', ') + ']', config);
  },

  addFiles: function (load, data, prefix) {
    var files = Object.keys(data);
    for (var i = 0, m = files.length; i < m; i++) {
      load.push("'" + (prefix || '') + files[i] + "'");
    }
  },

  formatBlock: function (block, indent) {
    var lines = [];
    var keys = Object.keys(block);
    for (var i = 0, m = keys.length; i < m; i++) {
      var key = keys[i];
      var value = block[key][0];
      var comment = block[key][1];
      if (typeof value === 'object') value = this.formatBlock(value, indent + '  ');
      if (key.match(/[^a-z0-9]/i)) key = '"' + key.replace(/"/g, '\\"') + '"';
      lines.push(indent + '  ' + key + ': ' + value + (i < m - 1 ? ',' : comment ? ' ' : '') + comment);
    }
    return '{\n' + lines.join('\n') + '\n' + indent + '}';
  },

  displayErrors: function () {
    var display = document.getElementById("errors");
    display.innerHTML = this.errors.join('');
  },

  clearResults: function () {
    document.getElementById("v3-config").innerHTML = '';
    document.getElementById("errors").innerHTML = '';
    this.errors = [];
    this.inputJax = {};
    this.outputJax = {};
    this.extensions = {};
    this.output = '';
  },

  escape: function (text) {
    return text
      .replace(/&/g, '\&amp;')
      .replace(/</g, '\&lt;')
      .replace(/>/g, '\&gt;');
  }
};
