"use strict";

/**
 * Safely access deeply nested values in an object. If the path to the value is not valid,
 * the method will gracefully return null.
 *
 * @param {array} path - the array representation of the path to access.
 * @param {object} obj - the object who's value you are trying to access.
 *
 * @return {null | any} will return null on path not found, or the value found.
 */
exports.accessDeep = function (path, obj) {
    if (typeof path === "string") {
        path = path.split(".");
    }

    return path.reduce(function (xs, x) {
        return xs && xs[x] ? xs[x] : null;
    }, obj);
};

/**
 * The mapObj() method creates a new array with the results of calling a provided function
 * on every element in the calling object.
 *
 * @param {object} obj - The object to map.
 * @param {function} callback - The function to call per iterated value.
 * @returns {array} returns an array with the values of each returned value in the callback.
 */
exports.mapObj = function (obj, callback) {
    return Object.keys(obj).map(function (key) {
        var returning = callback(obj[key], key);
        if (returning !== false) {
            return returning;
        }
    });
};
/**
 * Callback for mapObj
 *
 * The result of this will be added to the array.
 *
 * @callback mapObj
 * @param {any} arg[1] - The value of the current object value being iterated through.
 * @param {string} arg[2] - The key of the current object value being iterated through.
 */

/**
 * Deeply nest and set a value in an object.
 *
 * @param {object} obj - The target object
 * @param {array | string } path - The path where the value should be nested and set.
 * @param {any} value - The value to set
 * @param {boolean} setRecursively - Should create path if the path does not exist.
 * @returns {object} Returns the new object for reference purposes.
 */
exports.setDeep = function (obj, path, value) {
    var setRecursively = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var level = 0;

    if (typeof path === "string") {
        path = path.split(".");
    }

    level = 0;

    path.reduce(function (a, b) {
        level++;

        if (setRecursively && typeof a[b] === "undefined" && level !== path.length) {
            a[b] = {};
            return a[b];
        }

        if (level === path.length) {
            a[b] = value;
            return value;
        } else {
            return a[b];
        }
    }, obj);
    return obj;
};

/**
 * Quickly call a function or fail gracefully if it does not exist.
 *
 * @param {function} func - The function to try to call.
 * @param {args} args - The would-be arguments of the function.
 * @returns {any} returns whatever the function returns.
 */
exports.ifFunc = function (func) {
    if (typeof func === "function") {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return func.apply(undefined, args);
    }
};

/**
 * Group an array's values into subgroups.
 *
 * @param {array} arr - The target array.
 * @param {number} len - The length of the chunks.
 * @returns {array} A two-dimensional segmented array.
 */
exports.arrayChunks = function (arr, len) {
    var chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
};