MathJax = {
  options: {
    enableMenu: true,
    enableExplorer: true,
    menuOptions: {
      settings: {
        assistiveMml: false
      }
    },
    a11y: {
      braille: true,
      viewBraille: true
    },
    sre: {
      locale: 'de',
      domain: 'clearspeak',
      braille: 'euro'
    },
    renderActions: {
      addCopyText: [156,
                    (doc) => {
                      if (!doc.processed.isSet('addtext')) {
                        for (const math of doc.math) {
                          MathJax.config.addCopyText(math, doc);
                          if (math.typesetRoot.children[0]) {
                            math.typesetRoot.children[0].setAttribute('style', 'user-select: none');
                            math.typesetRoot.children[0].setAttribute('onselectstart', 'return false');
                          }
                        }
                        doc.processed.set('addtext');
                      }
                    },
                    // (math, doc) => {}
                    (math, doc) => MathJax.config.addCopyText(math, doc)
                   ]
    }
  },
  output: {
    fontPath: './%%FONT%%'
  },
    addCopyText(math, doc) {
    if (math.state() < MathJax.STATE.ADDTEXT) {
      if (!math.isEscaped) {
        const adaptor = doc.adaptor;
        const text = adaptor.node('mjx-copytext', {'aria-hidden': true}, [
          adaptor.text(math.start.delim + math.math + math.end.delim)
        ]);
        adaptor.append(math.typesetRoot, text);
        adaptor.append(math.typesetRoot, adaptor.text('\u200C'));
        adaptor.insert(adaptor.text('\u200C'), adaptor.firstChild(math.typesetRoot));
      }
      math.state(MathJax.STATE.ADDTEXT);
    }
  },
  startup: {
    ready() {
      const {newState, STATE} = MathJax._.core.MathItem;
      const {AbstractMathDocument} = MathJax._.core.MathDocument;
      const {CHTML} = MathJax._.output.chtml_ts;
      newState('ADDTEXT', 156);
      AbstractMathDocument.ProcessBits.allocate('addtext');
      CHTML.commonStyles['mjx-copytext'] = {
        display: 'inline-block',
        position: 'absolute',
        top: 0, left: 0, width: 0, height: 0,
        opacity: 0
      };
      MathJax.STATE = STATE;
      MathJax.startup.defaultReady();
    }
  }
};

let saved = null;
let converted = false;
function convertAll() {
  const SRE = MathJax._.a11y?.sre?.Sre || MathJax._.a11y?.sre;
  if (!MathJax.typesetPromise) return;
  MathJax.typesetPromise().then(() => {
    if (!saved) {
      saved = MathJax.startup.document.getMathItemsWithin(document.body);
    }
    if (!converted) {
      converted = true;
      let augenbit = document.getElementsByClassName('augenbit');
      let euroBraille = document.getElementsByClassName('euroBraille');
      
      let promise = SRE.setupEngine({modality: "braille", locale: "euro"});
      SRE.sreReady().then(() => {
        for (let i = 0, item, output; item = saved[i], output = euroBraille[i]; i++) {
          let node = document.createTextNode(item.typesetRoot.getAttribute('aria-braillelabel'));
          output.innerHtml = node;
          output.appendChild(node);
        }
        SRE.setupEngine({modality: "speech", locale: "de"});
      });
    }
  }).catch((e) => {});
}
function convert() {
  const SRE = MathJax._.a11y?.sre?.Sre || MathJax._.a11y?.sre;
  if (!saved) {
    saved = MathJax.startup.document.getMathItemsWithin(document.body);
  }
  //
  //  Get the TeX input
  //
  var input = document.getElementById("input").value.trim();
  //
  //  Disable the display and render buttons until MathJax is done
  //
  var display = document.getElementById("display");
  var button = document.getElementById("render");
  button.disabled = display.disabled = true;
  //
  //  Clear the old output
  //
  output = document.getElementById('output');
  output.innerHTML = '';
  //
  //  Reset the tex labels (and automatic equation numbers, though there aren't any here).
  //  Get the conversion options (metrics and display settings)
  //  Convert the input to CommonHTML output and use a promise to wait for it to be ready
  //    (in case an extension needs to be loaded dynamically).
  //
  MathJax.texReset();
  var options = MathJax.getMetricsFor(output);
  options.display = display.checked;
  MathJax.tex2chtmlPromise(input, options).then(function (node) {
    //
    //  The promise returns the typeset node, which we add to the output
    //  Then update the document to include the adjusted CSS for the
    //    content of the new equation.
    //
    output.appendChild(node);
    MathJax.startup.document.clear();
    MathJax.startup.document.updateDocument();
    // We could do something clever here, but for now we simply run SRE twice. 
    SRE.setupEngine({modality: "braille", locale: "euro"});
    SRE.sreReady().then(() => {
      let mml = MathJax.startup.toMML(MathJax.startup.input[0].mathNode);
      output = document.getElementById('braille');
      output.innerHTML = '';
      output.innerHTML = SRE.toSpeech(mml);
      SRE.setupEngine({modality: "speech", locale: "de"});
    });
  }).catch(function (err) {
    //
    //  If there was an error, put the message into the output instead
    //
    output.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message));
  }).then(function () {
    //
    //  Error or not, re-enable the display and render buttons
    //
    button.disabled = display.disabled = false;
  });
}
setTimeout(() => {
  
  document.getElementById('showBraille').disabled = false}, 2000);
