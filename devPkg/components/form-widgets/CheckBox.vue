<template>
    <label class="check-box" @click="checkEvt">
        <span class="check-input" :class="{checked:isChecked,disabled:isDisabled}"></span>
        <span v-if="label" class="check-text">{{label}}</span>
    </label>
</template>

<script>
    import {Component} from "vue-property-decorator";
    import FormWidget from '../base/FormWidget.vue';

    @Component({
        props: {
            checked: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: ''
            }
        }
    })
    export default class CheckBox extends FormWidget {
        widgetName = 'checkbox';

        isChecked = this.checked;
        isDisabled = this.disabled;

        checkEvt() {
            if (this.isDisabled) {  //disable不让点击
                return;
            }
            this.isChecked = !this.isChecked;
            this.emitEvent({action: 'check', checked: this.isChecked});
        }
    }
</script>