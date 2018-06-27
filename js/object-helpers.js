
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
