<template>
    <div ref="alarm" v-if="isShow" class="alarm-box" :class="msgType">
        <i v-if="isAutoClose" class="close" @click="closeEvt"></i>
        <div class="text-box">
            <h3 class="text">
                <i v-if="icon" :class="icon"></i>
                {{msg}}
            </h3>
            <div class="sub-text">{{subMsg}}</div>
        </div>
    </div>
</template>

<script>
    import {Component, Watch} from "vue-property-decorator";
    import {mixins} from "vue-class-component";
    import Widget from './base/Widget.vue';
    import Popup from './mixins/PopupMixin';

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
            icon: {
                type: String,
                default: 'danger'
            },
            isAutoClose: {
                type: Boolean,
                default: false
            },
            msgType: {
                type: String,
                default: 'danger'
            },
            popupPosition: {  //位置
                type: [String, Array],
                default: "windowCenter"
            }
        }
    })
    export default class Alarm extends mixins(Widget, Popup) {
        widgetName = 'alarm';

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

        closeEvt() {
            this.isShow = false;
            this.emitEvent({action:'close'});
        }

        show() {
            this.$nextTick(() => {
                this.showPopup(this.$refs.alarm);
            });
        }

    }
</script>