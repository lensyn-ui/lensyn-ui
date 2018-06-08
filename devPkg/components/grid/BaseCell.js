import Util from "./helper/GridUtil";

export default {
    props: {
        column: {
            type: Object,
            required: true
        },

        rowData: {
            type: Object,
            required: true
        }
    },

    methods: {
        getCustomRowPropertyValue(property) {
            if (Util.isFunction(property)) {
                return property(this.rowData);
            }
            return Util.getExpressionValue(this.rowData, property);
        },

        formatDirectives(directives) {
            let result = [];

            if (directives) {
                for (let i = 0, j = directives.length; i < j; ++i) {
                    let item = directives[i],
                        formatDirective = { name: item.name, modifiers: item.modifiers },
                        visible = item.visible;

                    if (typeof visible === "undefined" || this.getCustomRowPropertyValue(visible)) {
                        if (item.value) {
                            if (Util.isFunction(item.value)) {
                                formatDirective.value = item.value(this.rowData);
                            } else {
                                formatDirective.value = Util.getExpressionValue(this.rowData, item.value);
                            }
                        }
                        result.push(formatDirective);
                    }
                }
            }
            return result;
        }
    }
}