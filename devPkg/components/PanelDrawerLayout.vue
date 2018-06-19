/***********************************************
* Created by zhangtao on 2018/06/19
************************************************
<template>
    <ls-drawer-layout class="panel-drawer-layout" :isShow="isPanelShow" :expandWidth="panelWidth">
        <ls-panel>
            <div slot="header">
                {{title}}
                <i class="panel-drawer-layout__close"></i>
            </div>

            <slot name="content" slot="body"></slot>
        </ls-panel>
        <span v-if="isEnableResize" class="panel-drawer-layout__resize-handler"
              @mousedown="onResizeMouseDown($event)">
        </span>
    </ls-drawer-layout>

</template>

<script>
    import {Component, Watch} from "vue-property-decorator";
    import Widget from "./base/Widget";
    import DrawerLayout from "./DrawerLayout.vue";
    import Panel from "./Panel";

    @Component({
        components: {
            "ls-drawer-layout": DrawerLayout,
            "ls-panel": Panel
        },

        props: {
            isShow: {
                type: Boolean,
                default: false
            },

            title: {
                type: String,
                default: ""
            },

            expandWidth: {
                type: [Number, String],
                default: 300
            },

            isEnableResize: {
                type: Boolean,
                default: false
            }
        }
    })
    export default class PanelDrawerLayout extends Widget {
        widgetName = "panelDrawerLayout";

        isPanelShow = false;

        panelWidth = "";
        initPanelWidth = 0;

        dockClickHandler = null;
        closeElement = null;

        isBeginDrag = false;
        dragBeginClientX = 0;
        dragEndClientX = 0;
        docMouseMoveHandler = null;
        docMouseUpHandler = null;

        @Watch("isShow")
        onShowChange(currentValue) {
            this.isPanelShow = currentValue;
        }

        @Watch("expandWidth")
        onExpandWidthChange(currentValue) {
            this.panelWidth = currentValue;
        }

        mounted() {
            this.isPanelShow = this.isShow;
            this.bindEventHandler();
            this.closeElement = this.$el.querySelector(".panel-drawer-layout__close");
            this.panelWidth = this.expandWidth;
        }

        beforeDestroy() {
            if (this.dockClickHandler !== null) {
                document.removeEventListener("click", this.dockClickHandler);
            }

            if (this.docMouseMoveHandler !== null) {
                document.removeEventListener("mousemove", this.docMouseMoveHandler);
            }

            if (this.docMouseUpHandler !== null) {
                document.removeEventListener("mouseup", this.docMouseUpHandler);
            }
        }

        bindEventHandler() {
            this.dockClickHandler = this.onClickDoc.bind(this);
            document.addEventListener("click", this.dockClickHandler);

            if (this.isEnableResize) {
                this.docMouseMoveHandler = this.onMouseMoveDoc.bind(this);
                this.docMouseUpHandler = this.onMouseUpDoc.bind(this);

                document.addEventListener("mousemove", this.docMouseMoveHandler);
                document.addEventListener("mouseup", this.docMouseUpHandler);
            }
        }

        onClickDoc({target}) {
            if (this.isPanelShow) {
                let el = this.$el;
                if (target === this.closeElement || !el.contains(target)) {
                    this.emitEvent({action: "close"});
                }
            }
        }

        updatePanelWidthByDrag() {
            let distance = this.dragBeginClientX - this.dragEndClientX;

            if (this.initPanelWidth === 0) {
                this.initPanelWidth = this.$el.offsetWidth;
            }

            this.panelWidth = this.initPanelWidth + distance;
        }

        onResizeMouseDown($event) {
            this.isBeginDrag = true;
            this.dragBeginClientX = $event.clientX;
        }

        onMouseMoveDoc($event) {
            if (this.isBeginDrag) {
                this.dragEndClientX = $event.clientX;
                this.updatePanelWidthByDrag();
            }
        }

        onMouseUpDoc() {
            this.isBeginDrag = false;
            this.initPanelWidth = 0;
        }
    };
</script>
