/***********************************************
* Created by zhangtao on 2018/06/29
************************************************/
<template>
    <div class="vue-grid-tree-label" :class="labelModifier">
        <i v-if="isParent" class="expand-icon" @click="onClickExpandIcon"></i>
        {{label}}
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: [String, Number],
                default: ""
            },

            isExpand: {
                type: Boolean,
                default: false
            },

            isParent: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            labelModifier() {
                let result = [];

                if (this.isExpand) {
                    result.push("vue-grid-tree-label--expand");
                }

                return result;
            }
        },

        methods: {
            onClickExpandIcon() {
                this.$emit("click");
            }
        }
    };
</script>
