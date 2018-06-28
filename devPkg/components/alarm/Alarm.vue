<template>
    <div ref="alarm" v-if="isShow" class="alarm-box" :class="msgType">
        <i v-if="!isAutoClose" class="close" @click="closeEvt($event)"></i>

        <div class="text-box" v-if="isHaveCustomContent">
            <slot></slot>
        </div>

        <div class="text-box" v-else>
            <h3 class="text">
                <i class="icon"></i>
                {{msg}}
            </h3>
            <div v-if="subMsg !== ''" class="sub-text">{{subMsg}}</div>
        </div>
    </div>
</template>

<script>
    import {Component, Watch} from "vue-property-decorator";
    import Popup from '../base/Popup';

    @Component({
        props: {
            isShow: {
                type: Boolean,
                default: false
            },

            msg: {
                type: String,
                default: ''
            },

            subMsg: {
                type: String,
                default: ''
            },

            isAutoClose: {
                type: Boolean,
                default: true
            },

            msgType: {
                type: String,
                default: 'danger'
            },

            popupPosition: {  //位置
                type: [String, Array],
                default: "windowTop"
            },

            verticalOffset: {
                type: Number,
                default: 80
            }
        }
    })
    export default class Alarm extends Popup {
        widgetName = 'alarm';

        get isHaveCustomContent() {
            return !!this.$slots.default;
        }

        @Watch('isShow')
        onShowAlarm(val) {
            if (val === true) {
                this.show();
            }
        }

        mounted() {
            if (this.isShow) {
                this.show();
            }
        }

        closeEvt($event) {
            this.$emit("update:isShow", false);
            this.emitEvent({action: "hide", $event});
        }

        show() {
            this.$nextTick(() => {
                this.showPopup(this.$refs.alarm);
            });
        }

    }
</script>