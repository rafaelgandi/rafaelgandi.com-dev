import {useRef, useEffect} from 'react';

// Read: https://overreacted.io/a-complete-guide-to-useeffect/
export default function useFirstRender(callback) {
    const isFristRender = useRef(true);
    useEffect(() => {
        if (isFristRender.current === true) {
            callback();
            isFristRender.current = false;
        }        
    });
}