
import { useEffect } from 'react';
import routes from 'lib/routes';

// Place all imperative scripts that should run on all pages here.
export default function useGlobalImperativeScripts() {
    useEffect(() => {
        window.EG_ALLOW_DOWNGRADE = false; // LM: 2021-01-07 10:00:43 [For dev use only. Use to show PAYG and MICRO plan on pricing table regardless of the current users subscription.]
        function focusHandler(e) {
            if (e.target.type && e.target.type === 'number') {
                e.target.select();
            }
        }
        document.addEventListener('focus', focusHandler, true);

        // LM: 2020-09-22 15:07:30 
        // Handle situations where user has multiple tabs opened. When one tab is logged out 
        // make sure that the other tabs also gets logged out and all the pages reload.
        function storageHandler(e) {
            if (e.storageArea !== localStorage) { return; }
            const { key, newValue } = e;
            //console.log(key, newValue, url);
            if (key === 'userAuthState') {
                if (newValue === 'logout') {
                    window.location.href = routes.home;
                }
            }
        }
        window.addEventListener('storage', storageHandler);
        
        return () => {
            document.removeEventListener('focus', focusHandler);
            window.removeEventListener('storage', storageHandler);
        };
    }, []);
}