/*************************************************
* Created by zhangtao on 2018/04/24
*************************************************/
<script>
    import Util from "./helper/GridUtil";
    import CellStatusMixin from "./mixins/CellStatusMixin";

    import Icon from "./widgets/Icon.vue";
    import Link from "./widgets/Link.vue";
    import Label from "./widgets/Label.vue";

    export default {
        mixins: [CellStatusMixin],

        props: {
            widget: {
                type: Object,
                required: true
            },

            rowData: {
                type: Object,
                required: true
            },

            column: {
                type: Object,
                required: true
            },

            onWidgetEvent: {
                type: Function,
                default: () => {}
            },

            extraClass: {
                type: String,
                default: ""
            }
        },

        data() {
            return {
                innerEventMap: {
                    "clickEvt": "onClick"
                }
            };
        },

        render(createElement) {
            return this.buildWidget(createElement);
        },

        methods: {
            buildWidget(createElement) {
                let result = null,
                    widget = this.widget;

                switch (widget.type) {
                    case "link":
                        result = this.getLinkWidget(createElement, widget);
                        break;
                    case "icon":
                        result = this.getIconWidget(createElement, widget);
                        break;
                    case "label":
                        result = this.getLabelWidget(createElement, widget);
                        break;
                    default:
                        result = this.getCustomWidget(createElement, widget);
                        break;
                }

                return result;
            },

            getIconWidget(createElement, widget) {
                let listener = this.getWidgetEventListener(this.innerEventMap);

                return createElement(Icon, {
                    "class": this.extraClass,
                    props: {
                        iconClass: widget.iconClass,
                        disabled: this.isWidgetDisabled(widget)
                    },
                    directives: widget.directives,
                    on: listener
                });
            },

            getLinkWidget(createElement, widget) {
                let listener = this.getWidgetEventListener(this.innerEventMap);

                return createElement(Link, {
                    "class": this.extraClass,
                    props: {
                        label: widget.label,
                        href: widget.href,
                        disabled: this.isWidgetDisabled(widget)
                    },
                    directives: widget.directives,
                    on: listener
                });
            },

            getLabelWidget(createElement, widget) {
                let data = this.rowData[this.column.field],
                    listener = this.getWidgetEventListener(this.innerEventMap);

                if (this.column.format) {
                    data = this.column.format(data, this.rowData);
                }

                return createElement(Label, {
                    props: {
                        data,
                        ...this.getCustomWidgetProps(widget)
                    },
                    on: listener
                });
            },

            getCustomWidgetProps(widget) {
                let props = {...widget.props, disabled: this.isWidgetDisabled(widget)},
                    propsMap = widget.propsRowDataMap;

                if (propsMap) {
                    for (let key in propsMap) {
                        if (propsMap.hasOwnProperty(key)) {
                            if (Util.isFunction(propsMap[key])) {
                                props[key] = propsMap[key](this.rowData[this.column.field], this.rowData);
                            } else {
                                props[key] = this.rowData[propsMap[key]];
                            }
                        }
                    }
                }

                return props;
            },

            getCustomWidget(createElement, widget) {
                let listener = this.getWidgetEventListener(widget.listenerMap);

                return createElement(widget.type, {
                    "class": `${widget.className ? widget.className : ''} ${this.extraClass}`,
                    style: widget.style,
                    props: this.getCustomWidgetProps(widget),
                    directives: widget.directives,
                    on: listener
                });
            },

            getWidgetEventListener(eventMap) {
                let result = {};
                if (eventMap) {
                    let listenerMap = eventMap;

                    if (Util.isArray(eventMap)) {
                        listenerMap = Util.covertArrayToMap(eventMap);
                    }

                    for (let key in listenerMap) {
                        if (listenerMap.hasOwnProperty(key)) {
                            result[key] = (...event) => {
                                if (event.length === 1) {
                                    event = event[0];
                                }
                                return this.handleWidgetEvent(listenerMap[key], event);
                            }
                        }
                    }
                }

                return result;
            },

            handleWidgetEvent(listenerName, event) {
                this.onWidgetEvent({listenerName, event, widget: this.widget});
            },

            isWidgetVisible(widget) {
                return this.isVisible(widget);
            },

            isWidgetDisabled(widget) {
                return this.isDisabled(widget);
            }
        }
    };
</script>
