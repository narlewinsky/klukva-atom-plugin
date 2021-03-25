"use babel";

export default class KlukvaAtomPluginView {
    constructor(serializedState) {
        // Create root element
        this.element = document.createElement("div");
        this.element.classList.add("klukva-atom-plugin");
    }

    // Returns an object that can be retrieved when package is activated
    serialize() {}

    // Tear down any state and detach
    destroy() {
        this.element.remove();
    }

    getElement() {
        return this.element;
    }
}
