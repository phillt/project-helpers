
exports.accessDeep =  function  (p, o) {
    if (typeof p === "string") {
        p = p.split(".");
    }

    return p.reduce(function (xs, x) { return (xs && xs[x]) ? xs[x] : null;}, o);
};

exports.mapObj = function  (obj, callback) {
    return Object.keys(obj).map(function (key) {
        const returning = callback(obj[key], key);
        if(returning !== false){
            return returning;
        }
    });
};
