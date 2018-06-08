<template>
  <i class="vue-grid-icon" :class="[iconClass, {'disabled': disabled}]" @click="onClickIcon($event)" />
</template>

<script>
    export default {
        props: {
            iconClass: {
                type: String,
                required: true
            },

            disabled: {
                type: Boolean,
                default: false
            }
        },

        methods: {
            onClickIcon($event) {
                if (!this.disabled) {
                    this.$emit("clickEvt", $event);
                }
            }
        }
    };
</script>
