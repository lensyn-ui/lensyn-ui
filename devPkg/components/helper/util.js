let toString = Object.prototype.toString;

export function isArray(data) {
    return toString.call(data) === "[object Array]";
};