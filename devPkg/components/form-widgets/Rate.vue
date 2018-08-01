/***********************************************
* Created by zhangtao on 2018/08/01
************************************************
<template>
    <div class="rate">
        <ul class="rate__list">
            <li class="rate__item"
                v-for="item in rateCount"
                @mouseenter="onMouseEnterItem(item)"
                @mouseleave="onMouseLeaveItem(item)"
                @click="onClickItem(item)"
                :key="item"
                :class="getItemModifier(item)"></li>
        </ul>
    </div>
</template>

<script>
    import {Component, Watch} from "vue-property-decorator";

    import FormWidget from "../base/FormWidget";

    @Component({
        props: {
            value: {
                type: Number
            },

            rateCount: {
                type: Number,
                default: 5
            },

            isEnableEdit: {
                type: Boolean,
                default: false
            },

            isEnableHover: {
                type: Boolean,
                default: false
            }
        }
    })
    export default class Rate extends FormWidget {
        widgetName = "rate";

        activeCount = 0;
        currentHoverIndex = 0;

        @Watch("value")
        onValueChange(currentValue) {
            if (currentValue !== this.activeCount) {
                this.activeCount = currentValue;
            }
        }

        mounted() {
            this.activeCount = this.value;
        }

        getItemModifier(index) {
            let result = [];

            if (this.isItemActive(index)) {
                result.push("rate__item--checked");
            }

            if (this.isEnableHover) {
                if (this.isItemHover(index)) {
                    result.push("rate__item--hover")
                } else {
                    if (this.currentHoverIndex !== 0) {
                        result.push("rate__item--no-hover");
                    }
                }
            }

            return result;
        }

        isItemActive(index) {
            return index <= this.activeCount;
        }

        isItemHover(index) {
            return index <= this.currentHoverIndex;
        }

        onMouseEnterItem(index) {
            if (this.isEnableHover) {
                this.currentHoverIndex = index;
            }
        }

        onMouseLeaveItem() {
            if (this.isEnableHover) {
                this.currentHoverIndex = 0;
            }
        }

        onClickItem(index) {
            if (this.isEnableEdit) {
                this.updateModel(index);
            }
        }
    };
</script>
