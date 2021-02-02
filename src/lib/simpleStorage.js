import md5 from 'md5';

// See: https://medium.com/@brockreece/frontend-caching-strategies-38c57f59e254

export default function setStorage(driver = 'session') {
    const storageDriver = driver + 'Storage';

    function set(key, value) {
        value = (!(value instanceof String)) ? JSON.stringify(value) : value;
        return window[storageDriver].setItem(key, value);
    }

    function get(key) {
        let cache = window[storageDriver].getItem(key);
        try {
            return JSON.parse(cache);
        } catch (e) {
            return cache;
        }
    }

    function exists(key) {
        return get(key);
    }

    function makeKey(obj = {}, prefix = '') {
        let key = '';
        Object.keys(obj).forEach((k) => {
            key += JSON.stringify(obj[k]);
        });
        return prefix + md5(key);
    }

    function remove(key) {
        return window[storageDriver].removeItem(key);
    }

    function clear() {
        return window[storageDriver].clear();
    }

    return { set, get, exists, makeKey, remove, clear };
}