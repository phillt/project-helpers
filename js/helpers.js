


module.exports = function  ifFunc(func, ...args){
    if (typeof func === "function") {
        return func(...args);
    }
}

module.exports = function  isUUID(uuid){
    const uuidRegEx = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/, 'i');
    return uuidRegEx.test(uuid);
}

module.exports = function  parseCammelCase(string) {
    return string
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, function(str){ return str.toUpperCase(); })
}

module.exports = function  arrayChunks(arr, len){ __ENFORCETYPE(arguments, "array", "number");
    let chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
}


module.exports = function  objectToProps(object, keys = false) {
    if (keys === false) {
        return Component => <Component {...object} />
    }
    let flattened = {};

    mapObj(keys, (v, k) => flattened[k] = accessDeep(v, object));

    return Component => <Component {...flattened} />
}

module.exports = function  clipText(text, characterLength) {
    if (text.length <= characterLength) {
        return text;
    }

    return text.substring(0, characterLength) + "...";
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 *
 * @param target
 * @param sources
 * @returns {*}
 */
function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

/**
 * Returns afternoon or morning depending on the time of date provided.
 * @function
 * @param {object} m - The moment object of the date to evaluate.
 * @return {string} Time of day.
 */
 module.exports = function  getGreetingTime (m) {
    if (!m || !m.isValid()) { return ''; } //if we can't find a valid or filled moment, we return.
    return parseFloat(m.format("HH")) >= 12 /* 24hr time to split the afternoon */ ? 'afternoon' : 'morning';
 }

/**
 * Takes in a starting date, and a target date and returns an appropriate
 * interpretation of the time lapsed. 2 days since, 1 week since, 1 month since etc.
 * @function
 * @param {string|object} targetDate - The date to measure to
 * @param {string|object} startDate - The date to measure from, default is now.
 * @param {array} hierarchy -The date format in which the time should be refactored to. hierarchy
 * @return {string} Returns a string with the appropriate string representing
 * the time lapsed based on the hierarchy variable.
 */
module.exports = function  timeSince(targetDate, startDate = moment(), hierarchy = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds']) {
    let date = hierarchy.find(item => (moment(startDate).diff(targetDate, item)));
    const timeSince = moment(startDate).diff(targetDate, date);

    if (timeSince === 1) { // Remove plural s
        date = date.slice(0, - 1);
    }

    if (!date) return false;

    return `${timeSince} ${date}`;
}

module.exports = function  toPercent(partial, whole) {
    return partial*100/whole;
}

module.exports = function  calculateDiscountAsAPercentage(x, y) { __ENFORCETYPE(arguments, 'number', 'number');
    return !y ? null : (((1 - (x / y))) * 100).toFixed(3);
}
/**
 * Sorts an array of objects into an array of arrays. Where path is the array
 * representation of the path to the value to access. Each value that that matches
 * will be sorted into an array.
 *
 * @function
 * @param {array} array_of_objects - The array of objects to sort.
 * @param {array} path             - The array representation of the path to the delimiter.
 * @return {object} Returns an object where each value is an array of the sorted items.
 */
module.exports = function  sortObjectsByProperty(array_of_objects, path) { __ENFORCETYPE(arguments, "array", "array");
    let sorted = {};

    array_of_objects.map( item => {
        let valueSet = accessDeep(path, item);

        if ( !valueSet ) {
            if (!sorted['unset']) {
                sorted['unset'] = [];
            }
            sorted['unset'].push(item);
        } else {
            if (!sorted[valueSet]) {
                sorted[valueSet] = [];
            }
            sorted[valueSet].push(item);
        }
    });

    return sorted;
}

// Adds leading zeros where size of the number is the exptected length of the number
// anything empty will be replaced with 0s
module.exports = function  leadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

module.exports = function  decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

/**
 * format currency
 *
 * will convert a number to string and add commas to it.
 *
 * @param n, number/string, number to format
 * @param c, number, decimal places (optional, default is 2)
 * @param d, string, character to use where decimal is supposed to go (optional, default is ".")
 * @param t, string, character to use where commas are supposed to go (optional, default is "," use "" to have no commas)
 */
module.exports = function  formatCurrency(n, c = 2, d = ".", t = ","){
    // Negative prefix
    let num = (Number(n) / 100).toFixed(c);
    let numArray = num.toString().split(".");

    let s = Number(numArray[0]) < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(numArray[0]) || 0))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + "." + numArray[1];
}

/**
   * serialize
   *
   * Takes an object an object and creates a query out of it and appends it to the prefix
   *
   * @param obj, Object, the object representation of what you want the query to be
   * @param prefix, string, the URL
   * @return string, returns the full URL
   */
function serialize (obj, url="") {
        let str = [];
        for(var p in obj)
          if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
        return url + "?" + str.join("&");
 }

 function segment (obj, ammount = 5) {
     let newArray = [];
     let individual = [];
     let current = 0;

     obj.forEach(function(value){
         if(current >= ammount){
             newArray.push(individual);
             individual = [];
             current = 0;
         }
         individual.push(value);
         current++;
     });

     if(individual.length > 0){
         newArray.push(individual);
     }

     return newArray;
 }

function findObj (obj, callback) { __ENFORCETYPE(arguments, 'object', 'function');
    return Object.keys(obj).find((element, index, array)=>callback(obj[element], element, index, obj));
}

 function mapObj (obj, callback) { __ENFORCETYPE(arguments, 'object', 'function');
     let objArray = Object.keys(obj).map((item, k) => {
         let returning = callback(obj[item], item);
         if(returning !== false){
             return returning;
         }
     })

     return objArray;
 }

module.exports = function  filterObj (obj, predicate) {
    let newObj = {};
    let objArray = Object.keys(obj);
    objArray.forEach((item, k) => {
        if(predicate(obj[item])){
            newObj[item] = obj[item];
        }
    })
    return newObj;
}

// removes items in array1 that match items in array2, returns new array
function ripArray (array1, array2) {
    return array1.filter( function( el ) {
        return !array2.includes( el );
    } );
}

 function makeid () {
     var text = "";
     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

     for( var i=0; i < 5; i++ )
         text += possible.charAt(Math.floor(Math.random() * possible.length));

     return text;
 }

 module.exports = function  chainPromises (promises, thisUpdate = () => {})  {
    // If there's only one promise just do it and get it over with already.
    if(promises.length == 1) {
        return promises[0]();
    }
    let startPromise = promises[0];
    promises.shift();
    let promisesLength = promises.length;
    let currentIteration = 0;
    let chainedPromises = new Promise ((resolve, reject) => {
        if(promises.length > 0){
            promises.reduce((current, next) => {
                    return current.then( (response) =>{
                        currentIteration++;
                        thisUpdate(currentIteration);
                        if(promisesLength == currentIteration){
                            return next().then((response)=>{resolve(response)});
                        }
                        return next();

                    }).catch((error)=>{
                        reject(error);
                    })
            }, startPromise())
        } else {
            return startPromise().then((msg)=>{
                thisUpdate(0);
                resolve(msg);
            }).catch((err)=>{reject(err)});
        }
    })
    return chainedPromises;
 }

 module.exports = function  getHashParams (ignore = 0) {
     const locationHash =  window.location.hash
     let locationSplit = locationHash.split("/");
     locationSplit.splice(0, ignore);
     return locationSplit.map(item => decodeURI(item));
 }
// Compares two objects
 module.exports = function  isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

/**
 * Takes the arguments of a function ensures that the type provided is the type
 * being bassed.
 * @function
 * @param {object} a - The arguments object of the function.
 * @param {string} [types] - The types of variables you are expecting. (string, array, object, null, number)
 */
 function __ENFORCETYPE(a, ...types) {
     if (env.application_env !== "development") return;
     let hasError = false;
     let expecting;
     let got;
     let i = 0;

     types.map( (t, index) => {
         if (a[index] === null) {
             hasError = true;
             expecting = t;
             got = "null";
             i = index;
             return;
         }
         switch (t) {
             case "mixed":
             break;
             case "jsx":
             if (!React.isValidElement(a[index])) {
                 hasError = true;
                 expecting = "jsx";
                 got = typeof a[index];
                 i = index;
             }
             case "array":
             if (!Array.isArray(a[index])) {
                 hasError = true;
                 expecting = "array";
                 got = typeof a[index];
                 i = index;
             }
             break;
             case "object":
                 if (typeof a[index] !== 'object' || Array.isArray(a[index]) || a[index] === null) {
                     hasError = true;
                     expecting = "object";
                     i = index;
                     if (a[index] === null) {
                         got = 'null';
                     } else {
                         got = Array.isArray(a[index]) ? "array" : typeof a[index];
                     }

                 }

             default:
             if (typeof a[index] !== t) {
                 hasError = true;{
                 expecting = t;
                 got = typeof a[index];}
                 i = index;
             }
         }
     });

     if (hasError) {
         let err = new Error();
         console.error(`ENFORCETYPE: param ${i + 1} is expecting ${expecting} got ${got} instead.`, err.stack);
     }
 }

/**
 * Dynamically sets a deeply nested value in an object.
 * Optionally "bores" a path to it if its undefined.
 * @function
 * @param {!object} obj  - The object which contains the value you want to change/set.
 * @param {!array} path  - The array representation of path to the value you want to change/set.
 * @param {!mixed} value - The value you want to set it to.
 * @param {boolean} setrecursively - If true, will set value of non-existing path as well.
 */
module.exports = function  setDeep(obj, path, value, setrecursively = false) {
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

 export {mergeDeep, isObject, segment, mapObj, makeid, ripArray, __ENFORCETYPE, findObj, serialize}
