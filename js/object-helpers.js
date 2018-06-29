
/**
 * @function accessDeep
 *
 * Safely access deeply nested values in an object. If the path to the
 * value is not valid, the method will gracefully return null.
 *
 * @param {array} path - the array representation of the path to access.
 * @param {object} obj - the object who's value you are trying to access.
 *
 * @return {null | any} will return null on path not found, or the value found.
 */
exports.accessDeep =  function  (path, obj) {
    if (typeof path === "string") {
        path = path.split(".");
    }

    return path.reduce(function (xs, x) { return (xs && xs[x]) ? xs[x] : null;}, obj);
};

exports.mapObj = function  (obj, callback) {
    return Object.keys(obj).map(function (key) {
        const returning = callback(obj[key], key);
        if(returning !== false){
            return returning;
        }
    });
};

exports.setDeep = function  (obj, path, value, setrecursively = false) {
    let level = 0;

    if (typeof path === "string") {
        path = path.split(".");
    }

    level = 0;

    path.reduce((a, b)=>{
        level++;

        if (setrecursively && typeof a[b] === "undefined" && level !== path.length){
            a[b] = {};
            return a[b];
        }

        if (level === path.length){
            a[b] = value;
            return value;
        } else {
            return a[b];
        }
    }, obj);
    return obj;
};


exports.ifFunc = function  (func, ...args){
    if (typeof func === "function") {
        return func(...args);
    }
};

exports.arrayChunks = function (arr, len){
    let chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
};