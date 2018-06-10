<template>
    <div class="button-box">
        <div class="button" :class="[size,{'disable':disable},type]">
            <span>{{text}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            text: {  //按钮文字
                type: String,
                default: ''
            },
            size: {  //按钮大小
                type: String,
                default: 'middle'
            },
            disable: {  //是否禁用
                type: Boolean,
                default: false
            },
            type: {  //按钮样式
                type: String,
                default: 'default'
            }
        }
    }
</script>