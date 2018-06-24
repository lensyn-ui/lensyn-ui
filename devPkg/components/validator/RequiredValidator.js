import { isEmpty } from "../helper/util";

let requiredValidator = {
    isEmptyMsg: "值不能为空",

    validate(value) {
        return { status: !isEmpty(value), msg: this.isEmptyMsg };
    }
};

export default requiredValidator;
