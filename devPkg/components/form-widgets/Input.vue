<template>
    <input ref="input" class="input"
           :class="[size]"
           :autofocus="autofocus"
           :placeholder="placeholder"
           v-model="inputValue"
           @keyup.enter="enterEvt($event)"
           :readonly="widgetReadonly"
           :disabled="disabled"
           type="text"/>
</template>

<script>
    import {Component, Watch} from 'vue-property-decorator';
    import FormWidget from '../base/FormWidget.vue';

    @Component({
        props: {
            autofocus: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: ''
            }
        }
    })
    export default class Input extends FormWidget {
        widgetName = 'input';

        inputValue = '';  //双向绑定值

        @Watch('inputValue')
        onInputValueChange(value, oldValue) {
            this.updateModel(value);
            this.emitEvent({action: 'change', value, oldValue});
        }

        @Watch('value')
        onValueChange(currentValue) {
            if (currentValue !== this.inputValue) {
                this.inputValue = currentValue;
            }
        }

        mounted() {
            this.inputValue = this.value;
        }

        enterEvt($event) {
            this.emitEvent({action: 'enter', value: this.inputValue, $event});
        }

        getValue() {
            return this.inputValue;
        }

        focus() {
            this.$refs.input.focus();
        }
    }
</script>