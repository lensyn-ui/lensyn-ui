<template>
    <div ref="confirm" class="confirm-box" v-if="isShow">
        <div class="confirm-body">
            <slot v-if="isHaveCustomContent"></slot>
            <div class="confirm-content" v-else>
                <div class="body">
                    <h3>
                        <span class="icon" :class="icon" v-if="icon!=''"></span>
                        <span :class="icon==''?'no-icon':''">{{title}}</span>
                    </h3>
                    <p>{{text}}</p>
                </div>
                <div class="footer">
                    <ls-button :text="btnText[0]"
                               :type="btnText.length>1?'default':btnType"
                               @buttonEvent="clickEvt('cancel')"></ls-button>
                    <ls-button v-if="btnText.length>1"
                               :text="btnText[1]"
                               :type="btnType"
                               @buttonEvent="clickEvt('confirm')"></ls-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Component} from "vue-property-decorator";
    import {mixins} from "vue-class-component";
    import Widget from './base/Widget.vue';
    import Popup from './mixins/PopupMixin';
    import Button from './form-widgets/Button.vue';

    @Component({
        components: {
            'ls-button': Button
        },
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            text: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
            btnType: {
                type: String,
                default: 'primary'
            },
            btnText: {
                type: Array,
                default: () => {
                    return ['取消', '确定'];
                }
            }
        }
    })
    export default class Confirm extends mixins(Widget, Popup) {
        widgetName = 'confirm';

//        mounted() {
//            this.showPopupInWindowCenter(this.$refs.confirm, document.body);
//        }

        get isHaveCustomContent() {
            return !!this.$slots.default;
        }

        clickEvt(type) {
            this.emitEvent({action: type});
        }
    }
</script>