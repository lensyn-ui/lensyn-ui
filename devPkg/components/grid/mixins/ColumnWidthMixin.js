import GridUtil from "../helper/GridUtil";

export default {
    methods: {
        getColumnWidth(column) {
            let width = column.width;

            if (width) {
                if (GridUtil.isString(width)) {
                    return width;
                }
                let screenWidth = window.screen.width,
                    columnWidth = "";

                for (let i = 0, j = width.length; i < j; ++i) {
                    let item = width[i],
                        min = item.min,
                        max = item.max;

                    if (GridUtil.isUndefined(min) || screenWidth >= min) {
                        if (GridUtil.isUndefined(max) || screenWidth <= max) {
                            columnWidth = item.width;
                            break;
                        }
                    }
                }

                return columnWidth;
            }
            return "";
        }
    }
};
