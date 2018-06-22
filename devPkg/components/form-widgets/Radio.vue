<template>
    <label class="radio-box" @click="radioCheck">
        <span class="radio-input" :class="{checked:isChecked,disabled:isDisabled}"></span>
        <span v-if="label" class="label-text">{{label}}</span>
    </label>
</template>

<script>
    import {Component, Watch} from "vue-property-decorator";
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
            name: {
                type: String,
                required: true,
                default: ''
            },
            value: {
                type: [String, Number],
                required: true,
                default: ''
            },
            label: {
                type: String,
                default: ''
            }
        }
    })
    export default class CheckBox extends FormWidget {
        widgetName = 'radio';

        isChecked = this.checked;
        isDisabled = this.disabled;

        radioCheck() {
            if (this.isDisabled) {  //disable不让点击
                return;
            }
            this.isChecked = true;
            this.emitEvent({action: 'radio', checked: this.isChecked, name: this.name, value: this.value});
        }

        @Watch('checked')
        onCheckedChange(value) {
            this.isChecked = value;
        }

        @Watch('disabled')
        onDisabledChange(value) {
            this.isDisabled = value;
        }
    }
</script>