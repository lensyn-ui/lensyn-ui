/*************************************************
* Created by zhangtao on 2018/04/10
*************************************************/
<script>
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        props: {
            idProperty: {
                type: String,
                default: "id"
            },

            labelProperty: {
                type: String,
                default: "name"
            },

            childProperty: {
                type: String,
                default: "children"
            },

            indent: {
                type: Number,
                default: 18
            },

            isEnableChecked: {
                type: Boolean,
                default: false
            },

            checkMode: {
                type: String,
                default: "multiple"
            },

            renderTreeNode: {
                type: Function
            },

            isShowLeafTitle: {
                type: Boolean,
                default: false
            }
        }
    })
    export default class CommonMixin extends Vue {
        getItemId(data) {
            return data[this.idProperty];
        }

        getItemLabel(data){
            return data[this.labelProperty];
        }

        getItemChildren(data) {
            return data[this.childProperty];
        }

        isBranchNode(data) {
            return typeof data[this.childProperty] !== "undefined";
        }

        isLeafNode(data) {
            return !this.isBranchNode(data);
        }
    };
</script>