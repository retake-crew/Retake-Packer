function smartSortImages(f1, f2) {
    let t1 = f1.split('/');
    let t2 = f2.split('/');

    let n1 = t1.pop();
    let n2 = t2.pop();

    let p1 = t1.join('/');
    let p2 = t2.join('/');

    if(p1 === p2) {
        t1 = n1.split('.');
        t2 = n2.split('.');

        if(t1.length > 1) t1.pop();
        if(t2.length > 1) t2.pop();

        n1 = parseInt(t1.join('.'), 10);
        n2 = parseInt(t2.join('.'), 10);

        if(!isNaN(n1) && !isNaN(n2)) {
            if(n1 === n2) return 0;
            return n1 > n2 ? 1 : -1;
        }
    }

    if(f1 === f2) return 0;
    return f1 > f2 ? 1 : -1;
}

function cleanPrefix(str) {
    let parts = str.split(".");
    if(parts.length > 1) parts.pop();
    str = parts.join(".");

    var lastDigit = "";
    var c = "";
    do {
        c = str[str.length-1];
        if(c >= '0' && c <= '9') {
            str = str.slice(0, str.length - 1);
            lastDigit = c;
        }
    } while(c >= '0' && c <= '9');

    return str + lastDigit;
}

function removeFromArray(arr, item) {
    let idx = arr.indexOf(item);

    if (idx !== -1) {
        arr.splice(idx, 1);
    }
}

function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        const newArray = [];
        for (let i = 0; i < obj.length; i++) {
            newArray[i] = deepClone(obj[i]);
        }
        return newArray;
    }

    const newObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key]);
        }
    }

    return newObj;
}

function clearGlobals() {
    window.atlas = undefined;
    window.__sparrow_order = undefined;
    window.sparrowOrigMap = undefined;
    window.sparrowMaxMap = undefined;
}

module.exports = {
    smartSortImages: smartSortImages,
    cleanPrefix: cleanPrefix,
    clearGlobals: clearGlobals,
    removeFromArray: removeFromArray
};