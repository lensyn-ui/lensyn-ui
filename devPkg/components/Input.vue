<template>
    <input class="input"
           :class="[size]"
           :placeholder="placeholder"
           :autofocus="focus"
           :style="{width:width+'px'}"
           v-model="inputValue"
           @keyup.enter="enterEvt"
           type="text"/>
</template>

<script>
    export default {
        props: {
            val: {  //值
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            size: {  //大小
                type: String,
                default: 'middle'
            },
            width: {  //宽度
                type: Number,
                default: 200
            },
            focus: {  //是否设置自动焦点
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                inputValue: ''  //双向绑定值
            }
        },
        mounted() {
            this.inputValue = this.val;
        },
        methods: {
            enterEvt() {
                this.$emit('changeEvt', this.inputValue);
            }
        }
    }
</script>