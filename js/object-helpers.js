import {__ENFORCETYPE, accessDeep, mapObj} from "./helpers";


/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}


export function accessDeep (p, o) {
    if (typeof p === "string") {
        p = p.split(".");
    }

    return p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);
}

export function mapObj (obj, callback) { __ENFORCETYPE(arguments, 'object', 'function');
    let objArray = Object.keys(obj).map((item, k) => {
        let returning = callback(obj[item], item);
        if(returning !== false){
            return returning;
        }
    })

    return objArray;
}

export function filterObj (obj, predicate) {
    let newObj = {};
    let objArray = Object.keys(obj);
    objArray.forEach((item, k) => {
        if(predicate(obj[item])){
            newObj[item] = obj[item];
        }
    })
    return newObj;
}

export function setDeep(obj, path, value, setrecursively = false) {
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
}