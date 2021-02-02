import notif from 'lib/notification';
import axios from 'axios'; // See: https://github.com/axios/axios
import { captureException } from 'lib/sentry';

axios.defaults.withCredentials = true;
const API_VERSION = 'api/v3';
const _axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
    headers: {
        'AllowEditionGuardV3Responses': 'true',
        'FromEditionGuardSPA': 'true'
    }
});

export async function initCsrfCookie() {
    return await _axiosInstance.get(`${ process.env.REACT_APP_API_URI }/sanctum/csrf-cookie`);
}
export const httpGet = _axiosInstance.get;
export const httpPost = _axiosInstance.post;
export const axiosInstance = _axiosInstance;
export const CancelToken = axios.CancelToken; // See: https://github.com/axios/axios#cancellation and See: https://medium.com/@mikjailsalazar/just-another-searchbar-react-axios-lodash-340efec6933d
export const isCancel = axios.isCancel; 
export const api = {
    setToken(token = null) {
        const sessionKey = 'EGTKN';
        if (token) {
            _axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            sessionStorage.setItem(sessionKey, token);
            return;
        }
        if (sessionStorage.getItem(sessionKey)) {
            api.setToken(sessionStorage.getItem(sessionKey));
            return;
        }
    },
    httpPost(uri, data = {}, config = {}) {
        return httpPost(uri, data, config);
    },
    httpGet(uri, data = {}) {
        return httpGet(uri, data);
    },
    httpDelete(uri, data = {}) {
        return httpPost(uri, {
            ...data, 
            '_method': 'DELETE'
        });
    },
    httpPatch(uri, data = {}, config = {}) {
        if (data instanceof FormData) {
            data.append('_method', 'PATCH');
        }
        else {
            data['_method'] = 'PATCH';
        }
        return httpPost(uri, data, config);
    }
    // rTODO: more api methods should go here
};
export function withApiPrefix(route) {
    route = route.replace(/^\//ig, '');
    return `/${API_VERSION}/${ route }`;
}

function _joinErrors(errorsObj = {}) {
    let errStr = '';
    for (let p in errorsObj) {
        errStr += ',' + errorsObj[p].join(',');
    }
    return errStr;
}

function _getErrorsArray(errors) {
    if (typeof errors === 'string') {
        return [errors];
    }
    let errorsArr = [];
    for (let p in errors) {
        if (errors[p] instanceof Array) {
            errors[p].map((e) => errorsArr.push(e));
        }
        else {
            errorsArr.push(errors[p]);
        }   
    }
    return errorsArr;
}

export function handleAjaxError(res, handler = null) {
    let errorsStr = '';
    if (!!res && 'data' in res) {
        //captureException(res);
        let isUnauthorizedError = parseInt(res.status, 10) === 401 && res.statusText.toLowerCase() === 'unauthorized';
        // if (isUnauthorizedError) {
        //     if (handler instanceof Function) {
        //         handler(res.statusText, [res.statusText], notif.error, isUnauthorizedError);
        //         return; 
        //     }
        //     notif.error(`${res.statusText}`);
        //     return;
        // }
        if ('error' in res.data) {
            const {error} = res.data;
            if (handler instanceof Function) {
                handler(error, [error], notif.error);
                return; 
            }
            notif.error(`${error}`);
            return;
        }
        if ('errors' in res.data) {
            const {message, errors} = res.data;
            if (handler instanceof Function) {
                handler(message, _getErrorsArray(errors), notif.error, isUnauthorizedError);
                return; 
            }
            if (typeof errors === 'object') {
                errorsStr = _joinErrors(errors);
            }
            if (typeof errors === 'string') {
                errorsStr = errors;
            }   
            notif.error(`${(message) ? message : ''} \n\n ${errorsStr}`);
            return;
        }
        if ('exception' in res.data) { // Most likely error 500 on server
            notif.error(`Something went wrong. Please try again`);
            return;
        }      
    }
    if (typeof res === 'undefined') {
        notif.error(`Server did not respond. Please try again`);
        return;
    }
    if (!!res.response) {
        handleAjaxError(res.response, handler);
    }
    else {
        if (!axios.isCancel(res)) { // let cancellations slide
            captureException(res);
            throw res;
        }       
    }
}
