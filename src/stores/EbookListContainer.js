import { useState, useCallback, useEffect } from 'react';
import { createContainer } from 'unstated-next'; // See: https://github.com/jamiebuilds/unstated-next
import { List, Map, fromJS } from 'immutable'; // See: https://devdocs.io/immutable/index

export default createContainer(() => {
    const [ebooks, setEbooks] = useState(List());
    const [links, setLinks] = useState(Map());
    const [meta, setMeta] = useState(Map());
    const [selectAll, setSelectAll] = useState(null); // values [null, true, false]
    const [selectAllCurrentPage, setSelectAllCurrentPage] = useState(null); // values [null, true, false]
    const [selectedBooks, setSelectedBooks] = useState(List());


    // useEffect(() => {
    //     console.log('selectAll', selectAll);
    // }, [selectAll]);

    // useEffect(() => {
    //     console.log('selectedBooks', selectedBooks.count());
    // }, [selectedBooks]);
    



    return {
        ebooks, links, meta,
        selectAll, setSelectAll,
        selectAllCurrentPage, setSelectAllCurrentPage,
        selectedBooks, setSelectedBooks,

        setEbookListData: useCallback((ebookArray) => {
            setSelectedBooks(List());
            setSelectAllCurrentPage(null);
            setSelectAll(null);
            setEbooks(fromJS(ebookArray));
        }, []),

        setLinksData: useCallback((links) => {
            setLinks(fromJS(links));
        }, []),

        setMetaData: useCallback((meta) => {
            setMeta(fromJS(meta));
        }, []),

        addIdenToSelectedBooks: useCallback((ebookIden) => {
            const ebook = ebooks.find((bookMap) => {
                return bookMap.get('iden') === ebookIden;
            });
            setSelectedBooks(selectedBooks.push(ebook));
        }, [ebooks, selectedBooks]),

        removeIdenFromSelectedBooks: useCallback((ebookIden) => {
            setSelectedBooks(selectedBooks.filter((bookMap) => {
                return bookMap.get('iden') !== ebookIden;
            }));
        }, [selectedBooks]),

        removeAllSelectedBooks: useCallback(() => {
            setSelectedBooks(selectedBooks.filter(() => false));
        }, [selectedBooks]),

        removeFromBookListByIdens: useCallback((idens = []) => {
            setEbooks(ebooks.filter((ebookMap) => {
                if (idens.indexOf(ebookMap.get('iden')) !== -1) {
                    return false;
                }
                return true;
            }));
        }, [ebooks]),

        clearAllEbooks: useCallback(() => {
            setEbooks(List());
            setLinks(Map());
            setMeta(Map());
        }, []) // value never changes
    };
});