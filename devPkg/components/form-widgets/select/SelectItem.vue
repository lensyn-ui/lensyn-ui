/***********************************************
* Created by zhangtao on 2018/05/09
************************************************
<template>
    <div class="select-item" :class="{'select-item--checked': isChecked}" @mousedown="onClickItem($event)">
        <slot></slot>
    </div>
</template>

<script>
    import { Component } from "vue-property-decorator";
    import Widget from "../../base/Widget.vue";

    @Component({
        props: {
            value: {
                type: [Number, String],
                required: true
            },

            id: {
                type: [Number, String],
                required: true
            },

            isChecked: {
                type: Boolean,
                default: false
            }
        }
    })
    export default class SelectItem extends Widget {
        onClickItem($event) {
            let parent = this.$parent.$parent;

            parent.$emit("clickSelectItem", {id: this.id, value: this.value, $event});
        }
    };
</script>