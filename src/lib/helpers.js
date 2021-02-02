
import moment from 'moment';


export function tpl(s, d) {
    // See: http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/	
    for (let p in d) {
        s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
    }
    return s;
}

export function removeFromArray(arr, item) {
    // See: http://stackoverflow.com/a/5767357
    // See: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    let index = arr.indexOf(item);
    if (index === -1) { return arr; }
    arr.splice(index, 1);
    return arr;
}

export const kcode = {
    arrowUp: 38,
    arrowDown: 40,
    enter: 13,
    esc: 27
};

export function isjQueryElem(_elem) {
    return typeof _elem.attr !== 'undefined';
}

export function isJson(_str) {
    try {
        JSON.parse(_str);
        return true;
    }
    catch (e) {
        return false;
    }
}

export function typeOf(_letiable) {
    // See: https://gomakethings.com/true-type-checking-with-vanilla-js/
    return Object.prototype.toString.call(_letiable).slice(8, -1).toLowerCase();
}

export function simpleCopy(objOrArr) {
    if (typeOf(objOrArr) !== 'array' && typeOf(objOrArr) !== 'object') { return objOrArr; }
    // See: https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript     
    return JSON.parse(JSON.stringify(objOrArr));
}

export function addCss(css) { // See: https://stackoverflow.com/q/3922139
    const head = document.getElementsByTagName('head')[0];
    const s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    css = css.replace(/<style>/ig, '').replace(/<\/style>/ig, '');
    if (s.styleSheet) {   // IE
        s.styleSheet.cssText = css;
    } else { // the world
        s.appendChild(document.createTextNode(css));
    }
    head.appendChild(s);
}

export function unescapeUnicode(str) {
    // See: http://stackoverflow.com/questions/7885096/how-do-i-decode-a-string-with-escaped-unicode
    let r = /\\u([\d\w]{4})/gi;
    str = (str + '').replace(r, function (match, grp) {
        return String.fromCharCode(parseInt(grp, 16));
    });
    str = unescape(str);
    return str;
}

export function pint(_str) {
    let num = parseInt(_str, 10);
    if (isNaN(num)) { return 0; }
    return num;
}

export function isEmail(email) {
    let emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        e = email.trim();
    if (e.length > 50) { return false; }
    return !!emailRegExp.test(e);
}

export function isNumeric(_num) {
    let n = _num;
    // See: http://stackoverflow.com/a/1830844 
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export function html(_strings, ..._values) {
    // See: http://wesbos.com/tagged-template-literals/
    let str = '';
    _strings.forEach((_strings, i) => {
        str += _strings + (_values[i] || '');
    });
    return str;
}

export function isEmptyObject(_obj) {
    // See: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    try {
        return Object.entries(_obj).length === 0 && _obj.constructor === Object;
    }
    catch (err) {
        try {
            return Object.keys(_obj).length === 0 && _obj.constructor === Object;
        } catch (err2) {
            for (let prop in _obj) {
                if (_obj.hasOwnProperty(prop)) {
                    return false;
                }
            }
            return JSON.stringify(_obj) === JSON.stringify({});
        }
    }
}

export function isInsideFrame() {
    // See: http://stackoverflow.com/a/326076
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

export function isMobile() {
    // See: http://stackoverflow.com/a/14301832
    return typeof window.orientation !== 'undefined';
}

export function isReactElement(component) {
    return !!component.$$typeof && component.$$typeof.toString().toLowerCase().indexOf('react.element') !== -1;
}

export function getHandShakeData(key) {
    if (!sessionStorage.getItem('apiHandshakeData')) { return null; }
    const handShakeData = JSON.parse(sessionStorage.getItem('apiHandshakeData'));
    return handShakeData[key];
}

export function addDays(date, days) {
    let d = new Date(date.valueOf());
    d.setDate(d.getDate() + days);
    return d;
}

export function parseDate(dateStr) {
    const date = (dateStr instanceof Date) 
        ? dateStr 
        // LM: 2020-09-03 14:19:16 [Using moment here because safari does not understand date format from db.]
        : moment(dateStr).toDate(); // See: https://stackoverflow.com/a/44134515

    if (date.toDateString().toLowerCase().indexOf('invalid') !== -1) {
        return null;
    }
    const monthShorMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthLongMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let dd = date.getDate(),
        mm = (date.getMonth() + 1),
        yyyy = date.getFullYear();
    if (dd <= 9) { dd = '0' + dd; }
    if (mm <= 9) { mm = '0' + mm; }
    return {
        instance: date,
        year: date.getFullYear(),
        timestamp: date.getTime(),
        date: date.getDate(),
        monthShort: monthShorMap[date.getMonth()],
        humanFriendly: `${mm}/${dd}/${yyyy}`,
        humanFriendly2: `${monthShorMap[date.getMonth()]} ${dd}, ${yyyy}`,
        humanFriendly3: `${monthLongMap[date.getMonth()]} ${dd}, ${yyyy}`,
        dbFriendly: `${yyyy}-${mm}-${dd}`,
        monthShortAndDate: `${monthShorMap[date.getMonth()]} ${dd}`,
        addDays: (days) => addDays(date, days),
        // See: https://momentjs.com/docs/#/parsing/string-format/
        format: (format) => moment(date).format(format) 
    };
}

export function bytesToMb(bytes) {
    return (parseInt(bytes, 10) / (1024 * 1024)).toFixed(2);
}

export function copyToClipboard(text) {
    // See: https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
    //console.log(text);
    const el = document.createElement('textarea');  // Create a <textarea> element
    el.value = text;                                 // Set its value to the string that you want copied
    el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
    el.style.position = 'absolute';
    el.style.left = '-9999px';                      // Move outside the screen to make it invisible
    document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
    const selected =
        document.getSelection().rangeCount > 0        // Check if there is any content selected previously
            ? document.getSelection().getRangeAt(0)     // Store selection if found
            : false;                                    // Mark as false to know no selection existed before
    el.select();                                    // Select the <textarea> content
    document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el);                  // Remove the <textarea> element
    if (selected) {                                 // If a selection existed before copying
        document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
        document.getSelection().addRange(selected);   // Restore the original selection
    }
}

export function getDrmTypeEnginesByNameObj() {
    const drmTypeEngines = getHandShakeData('drmTypeEngines');
    const drmTypeEnginesByName = {};
    for (let [id, name] of Object.entries(drmTypeEngines)) {
        name = name.toLowerCase().trim();
        if (name.indexOf('readium') !== -1) {
            drmTypeEnginesByName['readium'] = pint(id);
        }
        else if (name.indexOf('legacy') !== -1) {
            drmTypeEnginesByName['adobeLegacy'] = pint(id);
        }
        else if (name.indexOf('hardened') !== -1) {
            drmTypeEnginesByName['adobeHardened'] = pint(id);
        }
        else {
            drmTypeEnginesByName[name] = pint(id);
        }
    }
    return drmTypeEnginesByName;
}

export const loadJS = function (src, cb, ordered) {
    // See: https://github.com/filamentgroup/loadJS/blob/master/loadJS.js
    let tmp;
    let ref = document.getElementsByTagName("script")[0];
    let script = document.createElement("script");

    if (typeof (cb) === 'boolean') {
        tmp = ordered;
        ordered = cb;
        cb = tmp;
    }

    script.src = src;
    script.async = !ordered;
    ref.parentNode.insertBefore(script, ref);

    if (cb && typeof (cb) === "function") {
        script.onload = cb;
    }
    return script;
};

export function isExtensionAllowedForDrmType(ext, drm) {
    const drmTypeEnginesByName = getDrmTypeEnginesByNameObj();
    drm = pint(drm);
    ext = ext.toLowerCase().trim();
    if (ext === 'mobi' && drm === drmTypeEnginesByName['editionlink']) {
        return true;
    }
    else if (ext === 'pdf') {
        if (
            drm === drmTypeEnginesByName['adobeHardened'] ||
            drm === drmTypeEnginesByName['adobeLegacy'] ||
            drm === drmTypeEnginesByName['editionlink'] || 
            drm === drmTypeEnginesByName['editionmark']
        ) {
            return true;
        }
    }
    else if (ext === 'epub' || ext === 'epub+zip') {
        return true;
    }
    return false;
}

export function twoDigit(num) {
    if (pint(num) <= 9) {
        return '0' + num;
    }
    return num + '';
}

export function formatThousands(num) {
    // See: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
    return parseFloat(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export function getValueFromPercent(num, percent) {
    if (percent < 1) { return 0; }
    const decimalPercent = percent / 100;
    return parseFloat(num) * decimalPercent;
}

export function isPayAsYouGoPlan() {
    const subscription = getHandShakeData('subscription');
    if (!subscription) { return false; }
    return subscription.name.toLowerCase().indexOf('payasyougo') !== -1;
}

export function isMicroPlan() {
    const subscription = getHandShakeData('subscription');
    if (!subscription) { return false; }
    return subscription.name.toLowerCase().indexOf('micro') !== -1;
}