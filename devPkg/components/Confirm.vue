<template>
    <div class="confirm-box" v-if="isShow">
        <slot v-if="isHaveCustomContent"></slot>
        <div class="confirm-body">
            <div class="body">
                this is body
            </div>
            <div class="footer">
                <ls-button :text="'取消'"></ls-button>
                <ls-button :text="'确认'" :type="'primary'"></ls-button>
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
            }
        }
    })
    export default class Confirm extends Widget {
        widgetName = 'confirm';

        get isHaveCustomContent() {
            return !!this.$slot.default;
        }
    }
</script>