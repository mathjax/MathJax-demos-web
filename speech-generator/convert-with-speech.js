let Convert = {};

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
  for (let key of Object.keys(Convert.textAreas)) {
    Convert.textAreas[key] = document.getElementById(key);
  }
  for (let key of Object.keys(Convert.selectors)) {
    Convert.selectors[key] = document.getElementById(key);
  }
  for (let key of Object.keys(Convert.divs)) {
    Convert.divs[key] = document.getElementById(key);
  }
  for (let key of Object.keys(Convert.radios)) {
    Convert.radios[key] = Array.from(document.getElementsByName(key));
  }
};

Convert.setupSre = function() {
  for (let loc of sre.Variables.LOCALES) {
    let option = document.createElement('option');
    option.innerHTML = loc.toUpperCase();
    option.setAttribute('value', loc);
    if (loc === 'en') {
      option.setAttribute('selected', true);
    }
    Convert.selectors.locale.appendChild(option);
  }
  return Convert.updatePreferences('en');
};

Convert.init = function() {
  Convert.getElements();
  Convert.setupSre();
};


Convert.setPreferences = function(locale) {
  Convert.divs.preferences.innerHTML = '';
  Convert.state.preferences = [];
  let prefs = sre.ClearspeakPreferences.getLocalePreferences()[locale];
  if (!prefs) {
    Convert.state.clearspeak = false;
    Convert.textAreas.clearspeak.innerHTML = '';
    return;
  }
  Convert.state.clearspeak = true;
  let table = document.createElement('table');
  let count = 0;
  let row = null;
  let multiline = {};
  for (let [pref, values] of Object.entries(prefs)) {
    if (pref.match(/^MultiLine/)) {
      multiline[pref] = values;
      continue;
    }
    if (count % 3 === 0) {
      row = document.createElement('tr');
      table.appendChild(row);
    }
    let cell1 = document.createElement('td');
    row.appendChild(cell1);
    let label = document.createElement('label');
    label.innerHTML = pref;
    label.setAttribute('for', pref);
    cell1.appendChild(label);
    let cell2 = document.createElement('td');
    row.appendChild(cell2);
    let select = document.createElement('select');
    Convert.state.preferences.push(select);
    select.setAttribute('onchange', 'Convert.computeClearspeak()');
    select.id = pref;
    for (let value of values) {
      let option = document.createElement('option');
      option.setAttribute('value', value);
      option.innerHTML = value.replace(RegExp(`^${pref}_`), '');
      select.appendChild(option);
    }
    cell2.appendChild(select);
    count++;
  }
  Convert.divs.preferences.appendChild(table);
  let label = document.createElement('label');
  label.innerHTML = 'Multiline:';
  Convert.divs.preferences.appendChild(label);
  for (let [pref, values] of Object.entries(multiline)) {
    let mlabel = document.createElement('label');
    mlabel.innerHTML = pref.replace('MultiLine', '');
    let select = document.createElement('select');
    Convert.state.preferences.push(select);
    select.setAttribute('onchange', 'Convert.computeClearspeak()');
    select.id = pref;
    for (let value of values) {
      let option = document.createElement('option');
      option.setAttribute('value', value);
      option.innerHTML = value.replace(RegExp(`^${pref}_`), '');
      select.appendChild(option);
    }
    mlabel.appendChild(select);
    label.appendChild(mlabel);
  }
};


Convert.updatePreferences = async function(locale) {
  sre.System.getInstance().setupEngine({locale: locale});
  let promise = new Promise((resolve) => {
    const checkSre = function() {
      if (sre.Engine.isReady()) {
        resolve();
      } else {
        setTimeout(checkSre, 100);
      }};
    checkSre();
  });
  return promise.then(() => {Convert.setPreferences(locale);});
};


Convert.computeClearspeak = function() {
  Convert.textAreas.clearspeak.innerHTML =
    Convert.computeSpeech('clearspeak', Convert.state.preferences.map((x) => x.value).join(':'));
};


Convert.computeMathspeak = function() {
  Convert.textAreas.mathspeak.innerHTML =
    Convert.computeSpeech('mathspeak', Convert.selectors.style.value);
};


Convert.computeSpeech = function(domain, style) {
  let locale = Convert.selectors.locale.value;
  let modality = locale === 'nemeth' ? 'braille' : 'speech';
  sre.System.getInstance().setupEngine(
    {locale: locale, domain: domain, modality: modality,
     style: style, markup: Convert.selectors.markup.value, pprint: true
    });
  return sre.System.getInstance().toSpeech(Convert.input2Mathml());
};


Convert.input2Mathml = function() {
  let input = Convert.textAreas.input.value;
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
  for (let radio of radios) {
    if (radio.checked) {
      return radio.value;
    }
  }
  return '';
};


Convert.convertExpression = function() {
  Convert.render();
  Convert.computeMathspeak();
  if (Convert.state.clearspeak) {
    Convert.computeClearspeak();
  }
};


Convert.render = function() {
  let input = Convert.textAreas.input.value;
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
