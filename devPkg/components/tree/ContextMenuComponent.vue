/*************************************************
* Created by zhangtao on 2018/04/16
*************************************************/
<script>
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        props: {
            data: {
                type: Object
            },

            scopedSlot: {
                type: Function
            }
        }
    })
    export default class ContextMenu extends Vue {
        render() {
            return this.scopedSlot(this.data);
        }
    };
</script>