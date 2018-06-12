<template>
    <div class="confirm-box" v-if="isShow">
        <div class="confirm-body">
            <slot v-if="isHaveCustomContent"></slot>
            <div class="confirm-content" v-else>
                <div class="body">
                    <h3>
                        <span class="icon" :class="icon"></span>
                        <span>{{title}}</span>
                    </h3>
                    <p>{{text}}</p>
                </div>
                <div class="footer">
                    <ls-button :text="'取消'" @buttonEvent="clickEvt('cancel')"></ls-button>
                    <ls-button :text="'确认'" :type="'primary'" @buttonEvent="clickEvt('confirm')"></ls-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Component} from "vue-property-decorator";
    import Widget from './base/Widget.vue';
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
            }
        }
    })
    export default class Confirm extends Widget {
        widgetName = 'confirm';

        get isHaveCustomContent() {
            return !!this.$slots.default;
        }

        clickEvt(type) {
            this.emitEvent({type: type});
        }
    }
</script>