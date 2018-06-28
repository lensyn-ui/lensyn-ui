<template>
    <div class="modal-box" v-if="isShow">
        <div ref="modal" class="modal-main">
            <div class="modal-content">
                <div class="header" v-if="isShowHeader">
                    <h3 class="title">{{title}}</h3>
                    <i class="close" @click="modalClose"></i>
                </div>
                <div class="body">
                    <slot></slot>
                </div>
                <div class="footer" v-if="isHaveCustomContent">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Component, Watch} from "vue-property-decorator";
    import Popup from "./base/Popup";

    @Component({
        props: {
            isShow: {  //弹窗show
                type: Boolean,
                default: false
            },
            title: {  //标题
                type: String,
                default: ''
            },
            isShowHeader: {
                type: Boolean,
                default: true
            },
            isShowFooter: {
                type: Boolean,
                default: true
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
    export default class Confirm extends Popup {
        widgetName = 'modal';

        get isHaveCustomContent() {
            return !!this.$slots.footer;
        }

        modalClose() {
            this.emitEvent({action: 'close'});
        }

        @Watch('isShow')
        onShowConfirm(val) {
            if (val === true) {
                this.$nextTick(() => {
                    this.showPopup(this.$refs.modal);
                });
            }
        }
    }
</script>