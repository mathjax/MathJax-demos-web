class InlineMath extends HTMLSpanElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "closed" });
        const worker = new Worker("./worker", { type: "module" });
        worker.onmessage = (event) => {
            shadow.innerHTML = event.data;
        };
        worker.postMessage({ math: this.innerHTML, display: false });
    }
}

customElements.define("inline-math", InlineMath, { extends: "span" });

class DisplayMath extends HTMLDivElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "closed" });
        const worker = new Worker("./worker", { type: "module" });
        worker.onmessage = (event) => {
            shadow.innerHTML = event.data;
        };
        worker.postMessage({ math: this.innerHTML, display: true });
    }
}

customElements.define("display-math", DisplayMath, { extends: "div" });