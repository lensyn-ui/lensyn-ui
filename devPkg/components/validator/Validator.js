import NumberValidator from "./NumberValidator";
import RequiredValidator from "./RequiredValidator";

class Validator {
    constructor() {
        this.validatorMap = {};
    }

    registerValidator(validatorName, validator) {
        this.validatorMap[validatorName] = validator;
    }

    validate(value, rule) {
       if (!rule) {
           return true;
       }

       if (rule.required) {
           let requiredResult = this.validatorMap.required.validate(value);

           if (requiredResult.status === false) {
               return {status: false, rule: "required", msg: requiredResult.msg };
           }
       }

       let validator = this.validatorMap[rule.name];

       if (validator) {
           let validateResult = validator.validate(value, rule);

           if (validateResult.status === false) {
               return {status: false, rule: rule.name, msg: validateResult.msg};
           }
       }

       return {status: true};
    }
}

let validator = new Validator();

validator.registerValidator("number", NumberValidator);
validator.registerValidator("required", RequiredValidator);

export default validator;