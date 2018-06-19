/***********************************************
* Created by zhangtao on 2018/06/19
************************************************
<template>
    <transition name="drawerlayout">
        <div v-show="isShow" class="drawerlayout" :class="{'drawerlayout--right': position === 'right'}" :style="contentStyle">
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
    import {Component} from "vue-property-decorator";
    import Widget from "./base/Widget.vue";

    @Component({
        props: {
            position: {
                type: String,
                default: "right"
            },

            expandWidth: {
                type: [Number, String],
                default: 300
            },

            isShow: {
                type: Boolean,
                default: false
            }
        }
    })
    export default class DrawerLayout extends Widget {
        get contentStyle() {
            return {width: String(this.expandWidth).endsWith('%') ? this.expandWidth : `${this.expandWidth}px`};
        }
    };
</script>
