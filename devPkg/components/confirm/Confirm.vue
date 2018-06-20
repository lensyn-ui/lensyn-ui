<template>
    <div class="confirm-box" v-if="isShow">
        <div ref="confirm" class="confirm-body">
            <div class="confirm-content">
                <div class="body">
                    <!--有slot-->
                    <slot v-if="isHaveCustomContent"></slot>
                    <!--无slot-->
                    <div v-else>
                        <h3>
                            <span class="icon" :class="icon" v-if="isHaveIcon"></span>
                            <span :class="isHaveIcon ? 'no-icon' : '' ">{{title}}</span>
                        </h3>
                        <p>{{text}}</p>
                    </div>
                </div>
                <div class="footer">
                    <ls-button v-if="leftShow"
                               :text="leftBtnText"
                               :type="leftBtnType"
                               @buttonEvent="clickEvt($event, 'cancel')"></ls-button>
                    <ls-button v-if="rightShow"
                               :text="rightBtnText"
                               :type="rightBtnType"
                               @buttonEvent="clickEvt($event, 'confirm')"></ls-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Component, Watch} from "vue-property-decorator";
    import {mixins} from "vue-class-component";
    import Widget from '../base/Widget.vue';
    import Popup from '../mixins/PopupMixin';
    import Button from '../form-widgets/Button.vue';

    @Component({
        components: {
            'ls-button': Button
        },
        props: {
            isShow: {  //弹窗show
                type: Boolean,
                default: false
            },

            title: {  //标题
                type: String,
                default: ''
            },

            text: {  //文本
                type: String,
                default: ''
            },

            icon: {  //icon
                type: String,
                default: ''
            },

            /* 左按钮 */
            leftBtnType: {
                type: String,
                default: 'default'
            },

            leftBtnText: {
                type: String,
                default: '取消'
            },

            leftShow: {
                type: Boolean,
                default: true
            },

            /* 右按钮 */
            rightBtnType: {
                type: String,
                default: 'primary'
            },

            rightBtnText: {
                type: String,
                default: '确定'
            },

            rightShow: {
                type: Boolean,
                default: true
            },

            popupPosition: {  //位置
                type: [String, Array],
                default: "windowCenter"
            }
        }
    })
    export default class Confirm extends mixins(Widget, Popup) {
        widgetName = 'confirm';

        get isHaveCustomContent() {
            return !!this.$slots.default;
        }

        get isHaveIcon() {
            return this.icon !== "";
        }

        @Watch('isShow')
        onShowConfirm(val) {
            if (val === true) {
                this.showConfirm();
            }
        }

        mounted() {
            if (this.isShow) {
                this.showConfirm();
            }
        }

        clickEvt($event, type) {
            this.emitEvent({action: type, $event: $event.$event});
        }

        showConfirm() {
            this.$nextTick(() => {
                this.showPopup(this.$refs.confirm);
            });
        }
    }
</script>