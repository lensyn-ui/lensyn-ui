/***********************************************
* Created by zhangtao on 2018/06/19
************************************************
<template>
    <div class="panel">
        <div class="panel__header" v-if="isHaveCustomHeader">
            <slot name="header"></slot>
        </div>
        <div class="panel__header" v-else>
            {{title}}
        </div>

        <div class="panel__body">
            <slot name="body"></slot>
        </div>
        <div class="panel__footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    import { Component } from "vue-property-decorator";

    import Widget from "./base/Widget";

    @Component({
        props: {
            title: {
                type: String,
                default: ""
            }
        }
    })
    export default class Panel extends Widget {
        get isHaveCustomHeader() {
            return !! this.$slots.header;
        }
    };
</script>
