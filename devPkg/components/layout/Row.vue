/*********************************************************************
 * Vue private auto rows file
 * Created by deming-su on 2017/12/30
 *********************************************************************/

<template>
    <div class="rows-container" :style="[{'margin-left': `-${nowGutter}px`, 'margin-right': `-${nowGutter}px`}]">
        <slot><!-- 嵌入行的内容 --></slot>
    </div>
</template>
<script>
    import {Component} from "vue-property-decorator";

    import Widget from "../base/Widget";

    @Component({
        props: {
            gutter: {
                type: Number,
                default: 20
            }
        },

        provide() {
            return {
                nowGutter: this.nowGutter
            }
        }
    })
    export default class Row extends Widget {
        widgetName = "row";

        get nowGutter() {
            return parseInt(`${this.gutter / 2}`);
        }
    }
</script>