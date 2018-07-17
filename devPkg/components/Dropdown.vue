/***********************************************
* Created by zhangtao on 2018/06/10
************************************************/
<template>
    <div class="dropdown" :class="{'dropdown--expand': isExpand}">
        <div class="dropdown__input" ref="input" @click="onClickInput">
            <slot name="input" />
        </div>

        <div class="dropdown__list" ref="list" :style="listStyle">
            <slot name="list" />
        </div>
    </div>
</template>

<script>
    import { Component, Watch } from "vue-property-decorator";
    import { mixins } from "vue-class-component";
    import { debounce } from "./helper/util";
    import Widget from "./base/Widget.vue";
    import PopupMixin from "./mixins/PopupMixin";

    const REPOSITION_DELAY_TIME = 50;

    @Component({
        props: {
            isAllowExpand: {
                type: Boolean,
                default: true
            },

            isAutoWidth: {
                type: Boolean,
                default: false
            },

            isTrackInputPosition: {
                type: Boolean,
                default: true
            }
        }
    })
    export default class Dropdown extends mixins(PopupMixin, Widget) {
        isExpand = false;
        onClickDocListener = null;
        onDocScrollListener = null;
        listStyle = {};

        widgetName = "dropdown";

        @Watch("isExpand")
        onIsExpandChange(currentValue) {
            if (currentValue) {
                this.$nextTick(() => {
                    this.repositionList();
                });
            }
        }

        mounted() {
            this.bindEventHandler();
        }

        repositionList() {
            let input = this.$el,
                list = this.$refs.list;

            this.listStyle = { width: this.isAutoWidth ? "auto" : input.offsetWidth + "px" };
            this.$nextTick(() => {
                this.showPopup(list, input);
            })
        }

        beforeDestroy() {
            window.document.removeEventListener("click", this.onClickDocListener);
            window.document.removeEventListener("scroll", this.onDocScrollListener);
        }

        bindEventHandler() {
            this.onClickDocListener = this.onClickDoc.bind(this);
            if (this.isTrackInputPosition) {
                this.onDocScrollListener =  this.onDocScroll.bind(this);
            } else {
                this.onDocScrollListener =  debounce(this.onDocScroll.bind(this), REPOSITION_DELAY_TIME);
            }

            window.document.addEventListener("click", this.onClickDocListener);
            window.document.addEventListener("scroll", this.onDocScrollListener);
        }

        onClickInput() {
            if (this.isAllowExpand && !this.disabled) {
                this.isExpand = true;
                this.emitEvent({action: "expand"});
            }
        }

        onClickDoc(event) {
            let list = this.$refs.list,
                input = this.$refs.input,
                target = event.target;

            if (this.isExpand && !list.contains(target) && target !== input && !input.contains(target)) {
                this.isExpand = false;
                this.emitEvent({action: "close"});
            }
        }

        onDocScroll() {
            if (this.isExpand) {
                this.repositionList();
            }
        }

        collapse() {
            this.isExpand = false;
        }
    };
</script>
