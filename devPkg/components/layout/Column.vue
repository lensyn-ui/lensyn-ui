/*********************************************************************
 * Vue private auto columns file
 * Created by deming-su on 2017/12/30
 *********************************************************************/

<template>
    <div class="columns-container" :style="[{'width': `${nowColWidth}%`, 'margin-left': `${offsetCol}%`, 'padding': `0 ${gutter}px`}]">
        <div class="contaier">
            <slot><!-- 嵌入列的内容 --></slot>
        </div>
    </div>
</template>
<script>
    import {Component} from "vue-property-decorator";

    import Widget from "../base/Widget";

    @Component({
        props: {
            col: {
                type: Number,
                default: 24
            },
            offset: {
                type: Number,
                default: 0
            }
        },

        inject: {
            gutter: "nowGutter"
        }
    })
    export default class Column extends Widget {
        widgetName = "column";

        /* 计算获取列宽百分比 */
        get nowColWidth() {
            return parseFloat((this.col / 24 * 100).toFixed(4));
        }

        /* 计算获取左边距 */
        get offsetCol() {
            return parseFloat((this.offset / 24 * 100).toFixed(4));
        }
    }
</script>