/*************************************************
* Created by zhangtao on 2018/04/24
*************************************************/
<template>
    <div class="vue-grid-label" :class="status" @click="onClickEvent($event)">
        {{data}}
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: [String, Number],
                default: ""
            },

            status: {
                type: String,
                default: ""
            }
        },

        methods: {
            onClickEvent($event) {
                this.$emit("clickEvt", $event);
            }
        }
    };
</script>