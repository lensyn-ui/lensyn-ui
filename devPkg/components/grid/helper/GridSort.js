const GridSort = {
    formatMapCondition(condition) {
        let result = [];

        for (let key in condition) {
            if (condition.hasOwnProperty(key)) {
                result.push(condition[key]);
            }
        }

        if (result.length > 1) {
            result = result.sort((a, b) => {
                return a.priority < b.priority ? -1 : a.priority > b.priority ? 1 : 0;
            });
        }

        return result;
    },

    sortMultiple(datas, condition) {
        let arrayCondition = this.formatMapCondition(condition),
            result = datas;

        for (let i = 0, j = arrayCondition.length; i < j; ++i) {
            result = this.sort(result, arrayCondition[i]);
        }

        return result;
    },

    sort(datas, condition) {
        let field = condition.field,
            sortType = condition.sortType,
            order = condition.order;

        return datas.sort((a, b) => {
            let aValue = this.getItemValue(a, field, sortType),
                bValue = this.getItemValue(b, field, sortType);

            if (order === "asc") {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
            }
        });
    },

    sortByFieldValue(datas, field, fieldValues) {
        let result = [];

        for (let i = 0, j = fieldValues.length; i < j; ++i) {
            let value = fieldValues[i];

            for (let k = 0, p = datas.length; k < p; ++k) {
                let item = datas[k],
                    fieldValue = typeof field === "function" ? field(item) : item[field];

                if (fieldValue === value) {
                    result.push(datas[k]);
                }
            }
        }
        return result;
    },

    getItemValue(item, field, type) {
        let value = item[field];

        switch (type) {
            case "number":
                value = 1 * value;
                break;
            case "date":
                value = (new Date(value)).getTime();
                break;
            default:
                break;
        }

        return value;
    }
};

export default GridSort;