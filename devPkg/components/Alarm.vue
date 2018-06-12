<template>
    <div v-show="visible" class="alarm-box">
        this is alarm
    </div>
</template>

<script>
    import {Component, Watch} from "vue-property-decorator";
    import {mixins} from "vue-class-component";
    import Widget from './base/Widget.vue';
    import Popup from './mixins/PopupMixin';

    @Component({
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            msg: {
                type: String,
                default: ''
            },
            msgType: {
                type: String,
                default: 'danger'
            }
        }
    })
    export default class Alarm extends mixins(Widget, Popup) {
        widgetName = 'alarm';

    }
</script>