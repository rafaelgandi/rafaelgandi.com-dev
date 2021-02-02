/*
    Log to server from js
*/
export default function logging (msg = '') {
    let err = JSON.stringify({
            MSG: msg.trim(),
            BROWSER: navigator.userAgent,
            PAGE: window.location.href
        }),
        uri = window.location.origin + '/sys/ajax/log';
    if (('navigator' in window) && ('sendBeacon' in window.navigator)) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
        // See: https://www.smashingmagazine.com/2018/07/logging-activity-web-beacon-api/
        // See: https://caniuse.com/#feat=beacon
        let data = new FormData();
        data.append('err', encodeURIComponent(err));
        navigator.sendBeacon(uri, data);
        return;
    }
    const i = new Image();
    i.src = uri + '?err=' + encodeURIComponent(err); 
}   
logging.warn = (!! console.warn) ? console.warn : () => {};
