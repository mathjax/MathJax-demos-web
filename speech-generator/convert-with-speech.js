let Convert = {};
let SRE = null;

Convert.textAreas = {
  input: null,
  mathspeak: null,
  clearspeak: null
};

Convert.radios = {
  format: null,
};

Convert.selectors = {
  locale: null,
  markup: null,
  style: null,
};

Convert.divs = {
  preferences: null,
  rendered: null
};

Convert.state = {
  clearspeak: true,
  preferences: []
};

Convert.getElements = function() {
  for (const key of Object.keys(Convert.textAreas)) {
    Convert.textAreas[key] = document.getElementById(key);
  }
  for (const key of Object.keys(Convert.selectors)) {
    Convert.selectors[key] = document.getElementById(key);
  }
  for (const key of Object.keys(Convert.divs)) {
    Convert.divs[key] = document.getElementById(key);
  }
  for (const key of Object.keys(Convert.radios)) {
    Convert.radios[key] = Array.from(document.getElementsByName(key));
  }
};

Convert.setupSre = function() {
  for (const [loc, lang] of SRE.locales.entries()) {
    const option = document.createElement('option');
    option.innerHTML = lang;
    option.setAttribute('value', loc);
    if (loc === 'en') {
      option.setAttribute('selected', true);
    }
    Convert.selectors.locale.appendChild(option);
  }
  return Convert.updatePreferences('en');
};

Convert.init = function() {
  SRE = MathJax._.a11y.sre_ts;
  MathJax.startup.document.getWebworker();
  Convert.getElements();
  Convert.setupSre();
};

Convert.createSelect = function(name, values) {
  const label = document.createElement('label');
  label.innerHTML = name;
  label.setAttribute('for', name);
  const select = document.createElement('select');
  select.id = name;
  values.forEach(x => select.appendChild(x));
  return [label, select];
};

Convert.preferenceSelection = function(pref, values) {
  return values.map(value => {
    const option = document.createElement('option');
    option.setAttribute('value', value);
    option.innerHTML = value.replace(RegExp(`^${pref}_`), '');
    return option;
  });
};

Convert.setPreferences = async function(locale) {
  const container = Convert.divs.preferences;
  container.innerHTML = '';
  Convert.state.preferences = [];

  const map = new Map();
  const mdoc= MathJax.startup.document;
  mdoc.options.sre.locale = locale
  await mdoc.webworker.Setup(mdoc.options.sre);
  await mdoc.webworker.clearspeakLocalePreferences(mdoc.options.sre, map);
  const prefs = map.get(locale);
  
  if (!prefs) {
    Convert.state.clearspeak = false;
    Convert.textAreas.clearspeak.innerHTML = '';
    return;
  }
  Convert.state.clearspeak = true;

  const multiline = {};

  // Create flex container for preferences grid
  const grid = document.createElement('div');
  grid.className = 'preferences-grid';

  for (const [pref, values] of Object.entries(prefs)) {
    if (pref.match(/^MultiLine/)) {
      multiline[pref] = values;
      continue;
    }

    const [label, select] = Convert.createSelect(
      pref,
      Convert.preferenceSelection(pref, values)
    );

    select.setAttribute('onchange', 'Convert.computeClearspeak()');
    Convert.state.preferences.push(select);

    label.setAttribute('for', select.id);

    const item = document.createElement('div');
    item.className = 'preference-item';

    item.appendChild(label);
    item.appendChild(select);

    grid.appendChild(item);
  }

  container.appendChild(grid);

  // Multiline preferences section
  if (Object.keys(multiline).length > 0) {
    const multiLabel = document.createElement('div');
    multiLabel.style.fontWeight = 'bold';
    multiLabel.style.marginTop = '1em';
    multiLabel.textContent = 'Multiline:';
    container.appendChild(multiLabel);

    const multiGrid = document.createElement('div');
    multiGrid.className = 'preferences-grid';

    for (const [pref, values] of Object.entries(multiline)) {
      const [label, select] = Convert.createSelect(
        pref.replace('MultiLine', ''),
        Convert.preferenceSelection(pref, values)
      );
      select.setAttribute('onchange', 'Convert.computeClearspeak()');
      Convert.state.preferences.push(select);

      label.setAttribute('for', select.id);

      const item = document.createElement('div');
      item.className = 'preference-item';

      item.appendChild(label);
      item.appendChild(select);

      multiGrid.appendChild(item);
    }

    container.appendChild(multiGrid);
  }
};

Convert.updatePreferences = function(locale) {
  return Convert.setPreferences(locale);
};


Convert.computeClearspeak = function() {
  return Convert.computeSpeech(
    Convert.textAreas.clearspeak, 'clearspeak',
    Convert.state.preferences.map((x) => x.value).join(':'));
};


Convert.computeMathspeak = function() {
  return Convert.computeSpeech(
    Convert.textAreas.mathspeak, 'mathspeak', Convert.selectors.style.value);
};


Convert.computeSpeech = async function(node, domain, style) {
  const locale = Convert.selectors.locale.value;
  const modality = locale === 'nemeth' ? 'braille' : 'speech';
  const mdoc = MathJax.startup.document;
  const options = mdoc.options.sre = {...mdoc.options.sre,
    locale, domain, modality, style, markup: Convert.selectors.markup.value, pprint: true
  };
  await mdoc.webworker.Setup(options);
  const data = JSON.parse(await mdoc.webworker.Post({
    cmd: 'speech',
    data: {
      mml: Convert.input2Mathml(),
      options: options
    }
  }));
  node.innerHTML = options.markup === 'ssml'
    ? [
        '<!--?xml version="1.0"?-->\n',
        '<speak version="1.1" xmlns="http://www.w3.org/2001/10/synthesis">',
        '<prosody rate="100%">',
        data.ssml,
        '</prosody>',
        '</speak>'
      ].join('')
    : data.label;
};


Convert.input2Mathml = function() {
  const input = Convert.textAreas.input.value;
  if (!input) {
    return '';
  }
  switch (Convert.radioValue(Convert.radios.format)) {
  case 'latex':
    return MathJax.tex2mml(input);
  case 'asciimath':
    return MathJax.asciimath2mml(input);
  default:
    return input;
  }
};


Convert.radioValue = function(radios) {
  for (const radio of radios) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return '';
};


Convert.convertExpression = async function() {
  Convert.render();
  await Convert.computeMathspeak();
  if (Convert.state.clearspeak) {
    Convert.computeClearspeak();
  }
};


Convert.render = function() {
  const input = Convert.textAreas.input.value;
  if (!input) {
    return '';
  }
  Convert.divs.rendered.innerHTML = '';
  switch (Convert.radioValue(Convert.radios.format)) {
  case 'latex':
    return Convert.divs.rendered.appendChild(MathJax.tex2svg(input));
  case 'asciimath':
    return Convert.divs.rendered.appendChild(MathJax.asciimath2svg(input));
  default:
    return Convert.divs.rendered.appendChild(MathJax.mathml2svg(input));
  }
};

Convert.updateLocale = function(value) {
  Convert.updatePreferences(value).then(Convert.convertExpression);
};
