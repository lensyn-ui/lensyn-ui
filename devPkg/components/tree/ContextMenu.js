import Vue from "vue";
import ContextMenuComponent from "./ContextMenuComponent.vue";

let ContextMenuConstructor = Vue.extend(ContextMenuComponent);

class ContextMenu {
    constructor(data = null, scopedSlot = null) {
        this.containerEl = null;
        this.isInit = false;
        this.isShow = false;
        this.data = data;
        this.scopedSlot = scopedSlot;
        this.contextMenuWidget = null;
        this.docClickListener = null;
        this.contextMenuListener = null;
    }

    show(position) {
        if (!this.isInit) {
            this.init();
        }
        this.isShow = true;
        this.containerEl.setAttribute("style", `left: ${position.x}px; top: ${position.y}px`);
    }

    destroy() {
        if (this.isInit) {
            this.contextMenuWidget.$destroy();
            document.body.removeChild(this.containerEl);
            document.removeEventListener("click", this.docClickListener);
            this.containerEl = null;
            this.isInit = false;
            this.isShow = false;
        }
    }

    init() {
        let container = document.createElement("div"),
            div = document.createElement("div");

        container.setAttribute("class", "tree-context-menu-wrapper");
        container.appendChild(div);
        document.body.appendChild(container);

        this.containerEl = container;

        this.contextMenuWidget = new ContextMenuConstructor({
            el: div,
            propsData: {
                data: this.data,
                scopedSlot: this.scopedSlot
            }
        });
        this.bindEventListener();

        this.isInit = true;
    }

    bindEventListener() {
        this.docClickListener = this.handleClickDoc.bind(this);
        this.contextMenuListener = this.handleClickContextMenu.bind(this);

        document.addEventListener("click", this.docClickListener);
        document.addEventListener("contextmenu", this.contextMenuListener, true);
    }

    handleClickDoc() {
        this.destroy();
    }

    handleClickContextMenu() {
        if (this.isShow) {
            this.destroy();
        }
    }
}

export default ContextMenu;