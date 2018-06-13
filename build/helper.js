let path = require("path");

exports.resolvePath = (folder) => {
    return path.join(__dirname, "..", folder);
};