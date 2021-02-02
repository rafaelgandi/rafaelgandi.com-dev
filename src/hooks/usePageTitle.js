import { useEffect } from 'react';

export default function usePageTitle(title) {
    useEffect(() => {
        document.title = `EditionGuard - ${title}`;
        return () => document.title = 'EditionGuard';
    }, [title]);
}