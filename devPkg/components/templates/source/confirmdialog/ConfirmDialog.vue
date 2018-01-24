<template>
    <div class="confirm-dialog">
        <div class="content">
            <div class="msg">{{msg}}</div>
            <div class="footer">
                <ls-button v-show="isShowConfirm" @clickEvt="onClickConfirm" name="确定"></ls-button>
                <ls-button v-show="isShowCancel" @clickEvt="onClickCancel" name="取消"></ls-button>            
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            msg: {
                type: String,
                required: true
            },

            onClickConfirm: {
                type: Function,
                default: () => {}
            },

            onClickCancel: {
                type: Function,
                default: () => {}
            },

            isShowConfirm: {
                type: Boolean,
                default: true
            },

            isShowCancel: {
                type: Boolean,
                default: true
            }
        }
    };
</script>

