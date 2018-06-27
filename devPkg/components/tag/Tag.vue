<template>
    <div class="tag" :class="[type,size]" v-if="tagShow">
        <slot></slot>
        <div class="close" v-if="close">
            <span :class="type" @click.stop="tagCloseClick($event)">
                X
            </span>
        </div>
    </div>
</template>

<script>
    import {Component} from 'vue-property-decorator'
    import Widget from "../base/Widget";

    @Component({
        props: {
            type: {
                type: String,
                default: 'primary'
            },
            size: {
                type: String,
                default: 'normal'
            },
            close: {
                type: Boolean,
                default: false
            }
        }
    })
    export default class Tag extends Widget {
        widgetName = 'click';
        tagShow = true;

        tagCloseClick($event) {
            if (!this.close) {
                return;
            }
            this.emitEvent({active: 'close', $event})
        }
    }
</script>