/*************************************************
* Created by zhangtao on 2018/04/10
*************************************************/
<script>
    import {Component} from "vue-property-decorator";
    import {mixins} from "vue-class-component";
    import Widget from "../base/Widget.vue";
    import CommonMixin from "./CommonMixin.vue";

    @Component({
        name: "tree-item",

        props: {
            data: {
                type: Object,
                required: true
            },

            level: {
                type: Number,
                default: 1
            }
        },

        inject: ["expandIds", "activeIds", "checkedIds", "partCheckedIds"]
    })
    export default class TreeItem extends mixins(CommonMixin, Widget) {
        get isShowCheckbox() {
            return this.isEnableChecked && this.checkMode === "multiple";
        }

        get isShowRadio() {
            return this.isEnableChecked &&
                this.checkMode === "single" &&
                this.isLeafNode(this.data);
        }

        get isExpand() {
            let id = this.getItemId(this.data);

            return this.expandIds.indexOf(id) !== -1;
        }

        get isActive() {
            let id = this.getItemId(this.data);

            return this.activeIds.indexOf(id) !== -1;
        }

        get checkedStatus() {
            let id = this.getItemId(this.data);

            if (this.checkMode === "single") {
                return this.checkedIds.indexOf(id) === -1 ? "" : "tree__radio--checked";
            } else {
                if (this.checkedIds.indexOf(id) !== -1) {
                    return "tree__checkbox--checked";
                }

                if (this.partCheckedIds.indexOf(id) !== -1) {
                    return "tree__checkbox--partial";
                }
            }
            return "";
        }

        get currentNodeIsBranch() {
            return this.isBranchNode(this.data);
        }

        get nodeIndent() {
            return `${(this.level - 1) * this.indent}px`;
        }

        onClickContextMenu($event) {
            this.$emit("nodeEvent", {action: "contextMenu", data: this.data, $event});
        }

        onClickNode() {
            this.$emit("nodeEvent", {action: "clickNode", data: this.data});
        }

        onDoubleClickNode() {
            this.$emit("nodeEvent", {action: "doubleClickNode", data: this.data});
        }

        onClickCheckbox($event) {
            $event.stopPropagation();

            this.$emit("nodeEvent", {action: "clickCheckbox", data: this.data});
        }

        onClickRadio($event) {
            $event.stopPropagation();
            this.$emit("nodeEvent", {action: "clickRadio", data: this.data});
        }

        onClickLabel($event) {
            this.$emit("nodeEvent", {action: "clickLabel", data: this.data});

        }

        onClickExpandIcon($event) {
            this.$emit("nodeEvent", {action: "clickExpand", data: this.data});
        }

        handleNodeEvent(event) {
            this.$emit("nodeEvent", event);
        }

        getNodeContent(createElement) {
            let result = null;
            if (this.renderTreeNode) {
                result = this.renderTreeNode(createElement, this.data, ($event) => {
                    this.onClickLabel($event);
                });
            }

            if (result === null) {
                result = createElement(
                    "span",
                    {
                        'class': 'tree__label',
                        on: {
                            click: ($event) => this.onClickLabel($event)
                        }
                    }, [this.getItemLabel(this.data)]);
            }

            return result;
        }

        createNode(createElement) {
            let nodes = [];

            if (this.currentNodeIsBranch) {
                nodes.push(
                    createElement(
                        "span",
                        {
                            "class": `tree__expand-icon ${this.isExpand ? 'tree__expand-icon--expand' : ''}`,
                            on: {
                                click: ($event) => this.onClickExpandIcon($event)
                            }
                        }
                    )
                );
            }

            if (this.isShowCheckbox) {
                nodes.push(
                    createElement(
                        "span",
                        {
                            'class': `tree__checkbox ${this.checkedStatus}`,
                            on: {
                                click: ($event) => this.onClickCheckbox($event)
                            }
                        }
                    )
                )
            }

            if (this.isShowRadio) {
                nodes.push(
                    createElement(
                        "span",
                        {
                            'class': `tree__radio ${this.checkedStatus}`,
                            on: {
                                click: ($event) => this.onClickRadio($event)
                            }
                        }
                    )
                )
            }

            nodes.push(this.getNodeContent(createElement));

            return createElement("div", {
               "class": `tree__node ${this.isActive ? 'tree__node--active' : ''}`,
                style: {
                   paddingLeft: this.nodeIndent
                },
                on: {
                   contextmenu: ($event) => this.onClickContextMenu($event),
                   click: () => this.onClickNode(),
                   dblclick: () => this.onDoubleClickNode()
                }

            }, [nodes]);
        }

        createChildNode(createElement, data) {
            return createElement("tree-item", {
                props: {
                    level: this.level + 1,
                    indent: this.indent,
                    data: data,
                    idProperty: this.idProperty,
                    labelProperty: this.labelProperty,
                    isEnableChecked: this.isEnableChecked,
                    childProperty: this.childProperty,
                    checkMode: this.checkMode,
                    renderTreeNode: this.renderTreeNode,
                    key: this.getItemId(data)
                },
                on: {
                    nodeEvent: (event) => this.handleNodeEvent(event)
                }
            });
        }

        createChildNodes(createElement) {
            let children = this.getItemChildren(this.data),
                nodes = children.map((item) => this.createChildNode(createElement, item));

            return createElement("div", {
                "class": `tree__child ${this.isExpand ? 'tree__child--expand' : ''}`
            }, nodes);
        }

        render(createElement) {
            let nodes = [];

            nodes.push(this.createNode(createElement));

            if (this.isBranchNode(this.data)) {
                nodes.push(this.createChildNodes(createElement));
            }

            return createElement("div", {
                "class": "tree__item"
            }, nodes);
        }
    };
</script>