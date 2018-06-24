import { isNumber } from "../helper/util";

let numberValidator = {
    notNumberMsg: "请输入数字",

    getInvalidRangeMsg(value, rule) {
        let min = typeof rule.min !== "undefined" ? rule.min : null,
            max = typeof rule.max !== "undefined" ? rule.max : null;

        if (min !== null && max === null) {
            return `请输入大于 ${min} 的值`;
        }
        if (min === null && max !== null) {
            return `请输入小于 ${max} 的值`;
        }
        return `请输入 ${min} - ${max} 的值`;
    },

    validate(value, rule) {
        if (!isNumber(value)) {
            return {status: false, msg: this.notNumberMsg };
        }

        if (typeof rule.min !== "undefined" && value < rule.min ||
            typeof rule.max !== "undefined" && value > rule.max) {
            return {status: false, msg: this.getInvalidRangeMsg(value, rule)};
        }

        return { status: true };
    }
};

export default numberValidator;