import { useRef } from 'react';
const initialValue = 'cmFmYWVsZ2FuZGk';

// Hook that checks if a value has changed from the previous render.
export default function useHasChanged(value) { 
    const hasChangedRef = useRef(initialValue);
    if (hasChangedRef.current === initialValue) { 
        hasChangedRef.current = value;
        return true; 
    }
    const isChanged = hasChangedRef.current !== value;
    hasChangedRef.current = value;
    return isChanged;
}