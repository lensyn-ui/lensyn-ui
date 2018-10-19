<template>
    <div class="vue-grid-checkbox" :class="{'checked': checked, disabled: disabled}" @click="onClick">
    </div>
</template>

<script>
    export default {
        props: {
            checked: {
                type: Boolean,
                default: false
            },

            disabled: {
                type: Boolean,
                default: false
            }
        },

        methods: {
            onClick($event) {
                if (!this.disabled) {
                    this.$emit("checkEvt", {$event, checked: !this.checked});
                }
            }
        }
    };
</script>
