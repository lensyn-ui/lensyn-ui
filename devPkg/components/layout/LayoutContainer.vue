/***********************************************
* Created by zhangtao on 2018/06/11
************************************************/
<template>
    <div class="layout-container">
        <div ref="top" class="layout-container__top">
            <slot name="top"></slot>
        </div>

        <div ref="left" class="layout-container__left">
            <slot name="left"></slot>
        </div>

        <div ref="center" class="layout-container__center">
            <slot name="center"></slot>
        </div>

        <div ref="right" class="layout-container__right">
            <slot name="right"></slot>
        </div>

        <div ref="bottom" class="layout-container__bottom">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    import {Component} from "vue-property-decorator";
    import Widget from "../base/Widget.vue";

    @Component
    export default class LayoutContainer extends Widget {
        get haveTopChild() {
            return typeof this.$slots.top !== "undefined";
        }

        get haveLeftChild() {
            return typeof this.$slots.left !== "undefined";
        }

        get haveRightChild() {
            return typeof this.$slots.right !== "undefined";
        }

        get haveBottomChild() {
            return typeof this.$slots.bottom !== "undefined";
        }

        mounted() {
            setTimeout(() => {
                this.resize();
            }, 0);
        }

        resize() {
            if (this.haveLeftChild) {
                this.setLeftChildSize();
            }

            this.setCenterChildSize();
        }

        bindEventHandler() {

        }

        setCenterChildSize() {
            let topSize = this.getTopChildSize(),
                leftSize = this.getLeftChildSize(),
                rightSize = this.getRightChildSize(),
                bottomSize = this.getBottomChildSize(),
                element = this.getCenterElement(),
                top = 0,
                left = 0,
                right = 0,
                bottom = 0;

            top = topSize.height;
            left = leftSize.width;
            right = rightSize.width;
            bottom = bottomSize.height;

            element.style.top = top + "px";
            element.style.left = left + "px";
            element.style.right = right + "px";
            element.style.bottom = bottom + "px";
        }

        setLeftChildSize() {
            let size = this.getLeftChildSize(),
                topSize = this.getTopChildSize(),
                element = this.getLeftChildElement();

            element.style.width = size.width + "px";
            element.style.top = topSize.height + "px";
        }

        getCenterElement() {
            return this.$refs.center;
        }

        getTopChildElement() {
            return this.$refs.top;
        }

        getTopChildSize() {
            let size = {width: 0, height: 0};

            if (this.haveTopChild) {
                let element = this.getTopChildElement();

                if (element !== null) {
                    size.height = element.offsetHeight;
                    size.width = element.offsetWidth;
                }
            }
            return size;
        }

        getLeftChildElement() {
            return this.$refs.left;
        }

        getLeftChildSize() {
            let size = {width: 0, height: 0};

            if (this.haveLeftChild) {
                let element = this.getLeftChildElement();

                if (element !== null) {
                    size.height = element.offsetHeight;
                    size.width = element.offsetWidth;
                }
            }
            return size;
        }

        getRightChildElement() {
            return this.$refs.right;
        }

        getRightChildSize() {
            let size = {width: 0, height: 0};

            if (this.haveRightChild) {
                let element = this.getRightChildElement();

                if (element !== null) {
                    size.height = element.offsetHeight;
                    size.width = element.offsetWidth;
                }
            }
            return size;
        }

        getBottomChildElement() {
            return this.$refs.bottom;
        }

        getBottomChildSize() {
            let size = {width: 0, height: 0};

            if (this.haveRightChild) {
                let element = this.getBottomChildElement();

                if (element !== null) {
                    size.height = element.offsetHeight;
                    size.width = element.offsetWidth;
                }
            }
            return size;
        }
    };
</script>

