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
    import Widget from "./base/Widget.vue";
    import PopupMixin from "./mixins/PopupMixin";

    @Component({
        props: {
            isAllowExpand: {
                type: Boolean,
                default: true
            },

            isAutoWidth: {
                type: Boolean,
                default: false
            }
        }
    })
    export default class Dropdown extends mixins(PopupMixin, Widget) {
        isExpand = false;
        onClickDocListener = null;
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

        beforeDestory() {
            window.document.removeEventListener("click", this.onClickDocListener);
        }

        bindEventHandler() {
            this.onClickDocListener = this.onClickDoc.bind(this);
            window.document.addEventListener("click", this.onClickDocListener);
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

        collapse() {
            this.isExpand = false;
        }
    };
</script>
