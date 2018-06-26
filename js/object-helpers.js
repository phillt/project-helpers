
module.exports =  function accessDeep (p, o) {
    if (typeof p === "string") {
        p = p.split(".");
    }

    return p.reduce(function (xs, x) { return (xs && xs[x]) ? xs[x] : null;}, o);
};
