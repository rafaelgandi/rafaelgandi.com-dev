/*
    See: https://css-tricks.com/using-the-html5-history-api/
    See: https://developer.mozilla.org/en-US/docs/Web/API/History_API
*/
function removeEndSlashes(_str = '') {
    return _str
    .replace(/\/$/ig, '')
    .replace(/^\//ig, '');
}

class SimpleRouter {
    constructor() {
        let that = this;
        this.routes = {};
        window.addEventListener('popstate', function(e) {
            that.navigate(window.location.pathname, e.state);
        });
    }
    _cleanPathName(_pathname) {
        return removeEndSlashes(_pathname.split(/\.com|\.vm|\.dock/).pop().replace(/\?.+/ig, ''));
    }
    navigate(_pathname, _data = null) {
        history.pushState(_data, null, _pathname);
        try {
            this.routes[this._cleanPathName(_pathname)](_data);
        } catch (err) {}            
    }
    route(_pathname, _callback) {
        if (! (_pathname instanceof Array)) {
            _pathname = [_pathname];
        }
        _pathname.forEach((path) => {
            this.routes[this._cleanPathName(path)] = _callback;
        });        
        return this;
    }
}
export default new SimpleRouter();