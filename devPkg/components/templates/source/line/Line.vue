
<template>
    <div :class="wrapClasses">
        <div :class="outerClasses">
            <div :class="innerClasses">
                <div :class="bgClasses" :style="bgStyle"></div>
            </div>
        </div>
        <span v-if="!hideInfo" :class="textClasses">
            <slot>
                <span v-if="isStatus" :class="textInnerClasses">
                    <img :src='statusIcon' style="width: 16px;"/>
                </span>
                <span v-else :class="textInnerClasses">
                    {{ percent }}%
                </span>
            </slot>
        </span>
    </div>

</template>
<script>


    const prefixCls = 'ls-line';

    export default {
        props: {
            percent: {
                type: Number,
                default: 0
            },
            status: {
                validator (value) {
                    return this.oneOf(value, ['normal', 'active', 'wrong', 'success']);
                },
                default: 'normal'
            },
            hideInfo: {
                type: Boolean,
                default: false
            },
            strokeWidth: {
                type: Number,
                default: 10
            },
            vertical: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                currentStatus: this.status,
                picsrc:''
            };
        },
        computed: {
            isStatus () {
                return this.currentStatus == 'wrong' || this.currentStatus == 'success';
            },
            statusIcon () {
                switch (this.currentStatus) {
                    case 'wrong':
                        this.picsrc = 'data:image/png;base64,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';
                        break;
                    case 'success':
                        this.picsrc = 'data:image/png;base64,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';
                        break;
                }
                return  this.picsrc;
            },
            bgStyle () {
                return this.vertical ? {
                    height: `${this.percent}%`,
                    width: `${this.strokeWidth}px`
                } : {
                    width: `${this.percent}%`,
                    height: `${this.strokeWidth}px`
                };
            },
            wrapClasses () {
                return [
                    `${prefixCls}`,
                    `${prefixCls}-${this.currentStatus}`,
                    {
                        [`${prefixCls}-show-info`]: !this.hideInfo,
                        [`${prefixCls}-vertical`]: this.vertical
                    }
                ];
            },
            textClasses () {
                return `${prefixCls}-text`;
            },
            textInnerClasses () {
                return `${prefixCls}-text-inner`;
            },
            outerClasses () {
                return `${prefixCls}-outer`;
            },
            innerClasses () {
                return `${prefixCls}-inner`;
            },
            bgClasses () {
                return `${prefixCls}-bg`;
            }
        },
        created () {
            this.handleStatus();
        },
        methods: {
            oneOf(value, validList) {
                for (let i = 0; i < validList.length; i++) {
                    if (value === validList[i]) {
                        return true;
                    }
                }
                return false;
            },
            handleStatus (isDown) {
                if (isDown) {
                    this.currentStatus = 'normal';
                    this.$emit('on-status-change', 'normal');
                } else {
                    if (parseInt(this.percent, 10) == 100) {
                        this.currentStatus = 'success';
                        this.$emit('on-status-change', 'success');
                    }
                }
            }
        },
        watch: {
            percent (val, oldVal) {
                if (val < oldVal) {
                    this.handleStatus(true);
                } else {
                    this.handleStatus();
                }
            },
            status (val) {
                this.currentStatus = val;
            }
        }
    };
</script>
