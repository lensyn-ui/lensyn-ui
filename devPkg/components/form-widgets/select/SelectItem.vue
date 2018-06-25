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
            }
        },

        inject: ["isCheckedById"]
    })
    export default class SelectItem extends Widget {
        get isChecked() {
            return this.isCheckedById(this.id);
        }

        onClickItem($event) {
            let parent = this.$parent.$parent;

            parent.$emit("clickSelectItem", {id: this.id, value: this.value, $event});
        }
    };
</script>