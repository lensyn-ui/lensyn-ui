<template>
    <div class="loading" :style="{ backgroundColor: bgColor }" v-if="isShow" :class="{ fixed: fixed }">
        <div v-if="isHaveCustomContent" class="content" >
            <slot></slot>
        </div>
        <div v-else class="content" :style="{ height: isHaveDescribe !== '' ? '84px' : '64px' }">
            <p v-if="isHaveDescribe">{{describe}}</p>
            <img src="../../images/components/loading.gif">
        </div>
    </div>
</template>

<script>
    import {Component} from "vue-property-decorator";
    import Widget from '../base/Widget.vue'
    @Component({
        props: {
            isShow: {
                type: Boolean,
                default: false
            },

            fixed: {
                type: Boolean,
                default: true
            },

            describe: {
                type: String,
                default: ''
            },

            bgColor: {
                type: String,
                default: 'rgba(0, 0, 0, .3)'
            }
        }
    })
    export default class Loading extends Widget {
        get isHaveDescribe() {
            return !!this.describe;
        }

        get isHaveCustomContent() {
            return !!this.$slots.default;
        }
    };
</script>