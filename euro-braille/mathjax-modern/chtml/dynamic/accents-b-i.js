!function(){"use strict";var t={115:function(t,r){r.q=void 0,r.q="4.0.0-alpha.1"},309:function(t,r){var e=this&&this.__values||function(t){var r="function"==typeof Symbol&&Symbol.iterator,e=r&&t[r],n=0;if(e)return e.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(r?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(r,"__esModule",{value:!0}),r.AddFontIds=void 0,r.AddFontIds=function(t,r){var n,o,d,a,i,c,x={};try{for(var l=e(Object.keys(t)),f=l.next();!f.done;f=l.next()){var u=f.value,s=t[u];try{for(var v=(d=void 0,e(Object.keys(s))),y=v.next();!y.done;y=v.next()){var h=y.value;x[h]||(x[h]={});var M=s[h];if(u)try{for(var b=(i=void 0,e(Object.keys(M))),p=b.next();!p.done;p=b.next()){var m=p.value,j=M[parseInt(m)];j[3]||(j[3]={}),r?j[3].F=r+"-"+u:j[3].f=u}}catch(t){i={error:t}}finally{try{p&&!p.done&&(c=b.return)&&c.call(b)}finally{if(i)throw i.error}}Object.assign(x[h],M)}}catch(t){d={error:t}}finally{try{y&&!y.done&&(a=v.return)&&a.call(v)}finally{if(d)throw d.error}}}}catch(t){n={error:t}}finally{try{f&&!f.done&&(o=l.return)&&o.call(l)}finally{if(n)throw n.error}}return x}},498:function(t,r){Object.defineProperty(r,"__esModule",{value:!0}),r.MathJaxModernFont=MathJax._.output.fonts["mathjax-modern"].chtml_ts.MathJaxModernFont},12:function(t,r,e){var n=e(309);e(498).MathJaxModernFont.dynamicSetup("","accents-b-i",n.AddFontIds({AB:{bold:{184:[.005,.2,.511],702:[.656,-.314,.456],703:[.656,-.314,.456],731:[.005,.206,.575],733:[.704,-.509,.575],777:[.703,-.51,0,{dx:.28}],779:[.704,-.509,0,{dx:.252}],783:[.704,-.509,0,{dx:.307}],785:[.7,-.513,0,{dx:.279}],803:[-.044,.2,0,{dx:.279}],806:[-.033,.295,0,{dx:.28}],814:[-.028,.215,0,{dx:.279}],815:[-.028,.215,0,{dx:.279}],816:[-.068,.176,0,{dx:.279}],817:[-.096,.148,0,{dx:.279}],818:[-.096,.148,0,{dx:.279}]}},AI:{italic:{184:[.01,.192,.46],702:[.667,-.33,.386,{ic:.079}],703:[.667,-.33,.386,{ic:.055}],731:[.005,.211,.511],733:[.696,-.506,.511,{ic:.065}],777:[.705,-.496,0,{dx:.095}],779:[.696,-.506,0,{ic:.065,dx:.088}],783:[.696,-.506,0,{dx:.126}],785:[.686,-.516,0,{ic:.021,dx:.12}],803:[-.094,.2,0,{dx:.292}],806:[-.066,.29,0,{dx:.3}],814:[-.062,.232,0,{dx:.277}],815:[-.062,.232,0,{dx:.307}],816:[-.096,.197,0,{dx:.292}],817:[-.132,.162,0,{dx:.292}],818:[-.132,.162,0,{dx:.292}]}},ABI:{"bold-italic":{184:[.005,.2,.532],702:[.656,-.314,.457,{ic:.068}],703:[.656,-.314,.457,{ic:.038}],731:[.005,.204,.591],733:[.699,-.503,.591,{ic:.049}],777:[.702,-.5,0,{dx:.136}],779:[.699,-.503,0,{ic:.049,dx:.129}],783:[.699,-.503,0,{dx:.168}],785:[.69,-.511,0,{ic:.006,dx:.161}],803:[-.053,.2,0,{dx:.327}],806:[-.051,.307,0,{dx:.338}],814:[-.036,.215,0,{dx:.31}],815:[-.036,.215,0,{dx:.342}],816:[-.066,.185,0,{dx:.327}],817:[-.101,.151,0,{dx:.326}],818:[-.101,.151,0,{dx:.326}]}}}),{},["MJX-MM-AB","MJX-MM-AI","MJX-MM-ABI"])}},r={};function e(n){var o=r[n];if(void 0!==o)return o.exports;var d=r[n]={exports:{}};return t[n].call(d.exports,d,d.exports,e),d.exports}!function(){e(12);var t=e(115);MathJax.loader&&MathJax.loader.checkVersion("[mathjax-modern]/chtml/dynamic/accents-b-i",t.q,"dynamic-font")}()}();