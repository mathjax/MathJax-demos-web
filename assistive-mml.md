# [assistive-mml.html](https://mathjax.github.io/MathJax-demos-web/tex-assistive.html)

This example shows how to add hidden MathML for use in screen readers.  This is similar to the AssistiveMML extension from version 2, which is not available in version 3.

The key lines are

```
  <style>
  mjx-assistive-mml {
      position: absolute !important;
      top: 0px; left: 0px;
      clip: rect(1px, 1px, 1px, 1px);
      padding: 1px 0px 0px 0px !important;
      border: 0px !important;
      display: block !important;
      width: auto !important;
      overflow: hidden !important;
      /*
       *  Don't allow the assistive MathML to become part of the selection
       */
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
  }
  mjx-assistive-mml[display="block"] {
      width: 100% !important
  }
  </style>
  <script>
  function addAssistiveMML(math, doc) {
      const adaptor = doc.adaptor;
      //
      // Get the serialized MathML
      //
      const mml = MathJax.startup.toMML(math.root).replace(/\n */g, '').replace(/<!--.*?-->/g, '');
      //
      // Parse it as HTML and retrieve the <math> element
      //
      const mmlNodes = adaptor.firstChild(adaptor.body(adaptor.parse(mml, 'text/html')));
      //
      // Create a container for the hidden MathML
      //
      const node = adaptor.node('mjx-assistive-mml', {
          role: 'presentation', unselectable: 'on', display: (math.display ? 'block' : 'inline')
      }, [mmlNodes]);
      //
      // Hide the typeset math from assistive technology and append the MathML that is visually 
      //   hidden from other users
      //
      adaptor.setAttribute(math.typesetRoot, 'role', 'presentation');
      adaptor.setAttribute(adaptor.firstChild(math.typesetRoot), 'aria-hidden', 'true');
      adaptor.setStyle(math.typesetRoot, 'position', 'relative');
      adaptor.append(math.typesetRoot, node);
  }
  MathJax = {
    //
    //  Use dollar signs for in-line delimiters in addition to the usual ones
    //
    tex: {inlineMath: {'[+]': [['$', '$']]}},
    //
    //  Add a render action for adding the assistive MathML
    //
    options: {
      renderActions: {
        assistiveMML: [155, (doc) => {for (math of doc.math) addAssistiveMML(math, doc)}, addAssistiveMML]
      }
    }
  };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
```

which sets up some CSS to make the MathML not visible to the sited, but still available to screen readers, then sets up a function `addAssistiveMML()` that gets the MathML for the math item as a string, and then parses it into HTML nodes.  It then puts the `<math>` node into a `mjx-assistive-mml` node (which uses the CSS above), and has the attributes needed to have it act properly fort the screen reader.  Finally, it sets the needed attributes for the original MathML container and hides the visual output from the screen reader, and inserts the assistive MathML into the container.

This function is used in a new `renderAction` that has priority 155 so that will be called soon after the typesetting action (priority 150), so that the assisitve MathML is inserted into the typeset output so that it will be included in the page when the typeset math is inserted there by a later render action.

[Run the example](https://mathjax.github.io/MathJax-demos-web/assistive-mml.html)
