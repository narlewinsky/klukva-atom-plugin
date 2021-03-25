"use babel";

import KlukvaAtomPluginView from "./klukva-atom-plugin-view";
import {CompositeDisposable} from "atom";

import latinize from 'klukva-core';

export default {
    klukvaAtomPluginView: null,
    modalPanel: null,
    subscriptions: null,

    activate(state) {
        this.klukvaAtomPluginView = new KlukvaAtomPluginView(
            state.klukvaAtomPluginViewState
        );
        this.modalPanel = atom.workspace.addModalPanel({
            item: this.klukvaAtomPluginView.getElement(),
            visible: false
        });

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(
            atom.commands.add("atom-workspace", {
                "klukva-atom-plugin:toggle": () => this.toggle()
            })
        );
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.klukvaAtomPluginView.destroy();
    },

    serialize() {
        return {
            klukvaAtomPluginViewState: this.klukvaAtomPluginView.serialize()
        };
    },

    toggle() {
        let editor;
        if ((editor = atom.workspace.getActiveTextEditor())) {
            editor.insertText(latinize(editor.getSelectedText()));
        }
    }
};
