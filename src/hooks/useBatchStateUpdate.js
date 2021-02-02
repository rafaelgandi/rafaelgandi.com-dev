// See: https://blog.logrocket.com/simplifying-state-management-in-react-apps-with-batched-updates/
import { useCallback } from 'react';
import ReactDOM from 'react-dom';

export default function useBatchStateUpdate() { // helps with batching state updates
    return useCallback((callback) => {
        if ('unstable_batchedUpdates' in ReactDOM) {
            // See: https://stackoverflow.com/questions/48563650/does-react-keep-the-order-for-state-updates/48610973#48610973
            ReactDOM.unstable_batchedUpdates(callback);
        }
        else {
            // Hope fully batch state updates is already supported by react by default.
            callback();
        }
    }, []);
}