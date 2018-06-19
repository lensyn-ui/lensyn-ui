let toString = Object.prototype.toString;

export function isArray(data) {
    return toString.call(data) === "[object Array]";
};

export function isNumber(data) {
    return typeof data === "number";
};

export const tree = {
    _forEachTreeItem(data, childKey = "children", callback, parent) {
        callback(data, parent);

        let child = data[childKey];

        if (child && child.length > 0) {
            for (let i = 0, j = child.length; i < j; ++i) {
                this._forEachTreeItem(child[i], childKey, callback, data);
            }
        }
    },

    forEachTree(data, callback, childKey = "children") {
        this._forEachTreeItem(data, childKey, callback);
        return data;
    },

    forEachArrayTree(datas, callback, childKey = "children") {
        for (let i = 0, j = datas.length; i < j; ++i) {
            this.forEachTree(datas[i], callback, childKey);
        }
    },

    isLeafNode(data, childKey = "children") {
        return !data[childKey];
    },

    _deepTraveral(data, callback, childKey = "children", parent) {
        if (this.isLeafNode(data, childKey)) {
            callback(data, parent);
        } else {
            let child = data[childKey];
            for (let i = 0, j = child.length; i < j; ++i) {
                let item = child[i];
                this._deepTraveral(item, callback, childKey, data);
            }
            callback(data, parent);
        }
    },

    deepTraveral(data, callback, childKey = "children") {
        this._deepTraveral(data, callback, childKey);
    },

    /**
     * 深度优先遍历树
     * @param {object[]} datas
     * @param {function} callback
     * @param {string} childKey
     */
    deepTraveralTrees(datas, callback, childKey = "children") {
        for (let i = 0, j = datas.length; i < j; ++i) {
            this.deepTraveral(datas[i], callback, childKey);
        }
    },

    /**
     * 过滤树型数据，并保留对应的结构
     * @param {object[]} datas - 需要过滤的数据
     * @param {function} match - 是否匹配的函数
     * @param {string} childKey - 子数据存在的 key
     * @param {string} idKey - 树型结构的主键
     * @returns {object[]} - 过滤后的数据
     */
    filterTree(datas, match, childKey = "children", idKey = "id") {
        let matchIds = [],
            result = [],
            dataMap = {};
        // 先深度优先遍历出所有需要保留的结点
        this.deepTraveralTrees(datas, (item, parent) => {
            let itemId = item[idKey],
                parentId = "";

            if (parent) {
                parentId = parent[idKey];
            }

            if (matchIds.indexOf(itemId) !== -1) {
                if (parentId !== "" && matchIds.indexOf(parentId) === -1) {
                    matchIds.push(parentId);
                }
            } else {
                if (match(item)) {
                    matchIds.push(itemId);

                    if (parentId !== "" && matchIds.indexOf(parentId) === -1) {
                        matchIds.push(parentId);
                    }
                }
            }
        }, childKey);

        // 再广度优先把数据重组
        this.forEachArrayTree(datas, (item, parent) => {
            let itemId = item[idKey],
                parentId = "",
                pushData = null;

            if (parent) {
                parentId = parent[idKey];
            }

            if (matchIds.indexOf(itemId) !== -1) {
                if (this.isLeafNode(item, childKey)) {
                    pushData = {...item};
                } else {
                    pushData = {...item, [childKey]: []};
                }

                if (parentId === "") {
                    result.push(pushData);
                } else {
                    dataMap[parentId][childKey].push(pushData);
                }
                dataMap[itemId] = pushData;
            }
        }, childKey);

        return result;
    },
    /**
     * 找出一个节点到根的路径
     * @param {object} root
     * @param {object} node
     * @param {string} childKey
     */
    _findNodeParentPath(root, node, paths, childKey = "children") {
        if (root === node) {
            paths.push(node);
            return true;
        }
        let childrens = root[childKey];

        if (childrens) {
            for (let i = 0, j = childrens.length;  i < j; ++i) {
                if (this._findNodeParentPath(childrens[i], node, paths, childKey)) {
                    paths.push(root);
                    return true;
                }
            }
        }
        return false;
    },

    /**
     * 找出一个节点的父级路径
     * @param {object} root
     * @param {object} node
     * @param {string} childKey
     */
    findNodeParentPath(root, node, childKey = "children") {
        let paths = [];

        this._findNodeParentPath(root, node, paths, childKey);

        return paths;
    },

    /**
     * 找出一个数组树中一个节点的次级路径
     * @param {object} roots
     * @param {object} node
     * @param {string} childKey
     */
    findArrayTreeParentPath(roots, node, childKey = "children") {
        let paths = [];

        for (let i = 0, j = roots.length; i < j; ++i) {
            paths = this.findNodeParentPath(roots[i], node, childKey);

            if (paths.length > 0) {
                break;
            }
        }
        return paths;
    }
};
