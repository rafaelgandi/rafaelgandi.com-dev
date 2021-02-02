import { useState, useEffect, useCallback } from 'react';
import { createContainer } from 'unstated-next'; // See: https://github.com/jamiebuilds/unstated-next
//import { Map, fromJS } from 'immutable';
import useBatchStateUpdate from 'hooks/useBatchStateUpdate';
import { getDrmTypeEnginesByNameObj, parseDate, pint } from 'lib/helpers';
const drmTypeEnginesByName = getDrmTypeEnginesByNameObj();

function filterForDefaultDrmSettingsRelevantData(data) {
    const allowedKeys = [
        'first_upload',
        'drm_type_id',
        'display_is_single_device',
        'display_permission_expires_after_days',
        'display_permission_expires_after_hours',
        'display_permission_expires_date',
        'printing_is_allowed',
        'printing_is_single_device',
        'printing_permission_expires_after_days',
        'printing_permission_expires_after_hours',
        'printing_permission_expires_date',
        'printing_initial_count',
        'printing_max_count',
        'printing_increment_interval_days',
        'printing_increment_interval_hours',
        'copy_is_allowed',
        'copy_is_single_device',
        'copy_permission_expires_after_days',
        'copy_permission_expires_after_hours',
        'copy_permission_expires_date',
        'copy_initial_count',
        'copy_max_count',
        'copy_increment_interval_days',
        'copy_increment_interval_hours',
        'social_link_clicks_expire',
        'social_link_days_expire',
        'watermark_place_begin',
        'watermark_place_end',
        'watermark_place_random',
        'watermark_place_random_count'
    ];
    if (data['drm']) {
        data['drm_type_id'] = data['drm'];
    }
    Object.keys(data).forEach((key) => {
        if (allowedKeys.indexOf(key) === -1) {
            delete data[key];
        }
    });
    return data;
}

export default createContainer(() => {
    const batch = useBatchStateUpdate();
    const [resourceId, setResourceId] = useState(null);
    const [ebookFile, setEbookFile] = useState(null);
    const [ebookFileMeta, setEbookFileMeta] = useState(null);
    const [bookTitle, setBookTitle] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [isbn13, setIsbn13] = useState('');
    const [drmType, setDrmType] = useState(drmTypeEnginesByName['adobeHardened']);

    // Display
    const [isSingleDevice, setIsSingleDevice] = useState(false);
    const [displayExpiresDays, setDisplayExpiresDays] = useState(0);
    const [displayExpiresHours, setDisplayExpiresHours] = useState(0);
    const [displayExpiresDate, setDisplayExpiresDate] = useState(null);
    // Print
    const [isPrintAllowed, setIsPrintAllowed] = useState(false);
    const [isPrintSingleDevice, setIsPrintSingleDevice] = useState(false);
    const [printExpiresDays, setPrintExpiresDays] = useState(0);
    const [printExpiresHours, sePrintExpiresHours] = useState(0);
    const [printExpiresDate, setPrintExpiresDate] = useState(null);
    const [printInitialCount, setPrintInitialCount] = useState(0);
    const [printMaxCount, setPrintMaxCount] = useState(0);
    const [printIncrementIntervalDays, setPrintIncrementIntervalDays] = useState(0);
    const [printIncrementIntervalHours, setPrintIncrementIntervalHours] = useState(0);
    // Copy 
    const [isCopyAllowed, setIsCopyAllowed] = useState(false);
    const [isCopySingleDevice, setIsCopySingleDevice] = useState(false);
    const [copyExpiresDays, setCopyExpiresDays] = useState(0);
    const [copyExpiresHours, setCopyExpiresHours] = useState(0);
    const [copyExpiresDate, setCopyExpiresDate] = useState(null);
    const [copyInitialCount, setCopyInitialCount] = useState(0);
    const [copyMaxCount, setCopyMaxCount] = useState(0);
    const [copyIncrementIntervalDays, setCopyIncrementIntervalDays] = useState(0);
    const [copyIncrementIntervalHours, setCopyIncrementIntervalHours] = useState(0);
    // Watermark
    const [watermarkName, setWatermarkName] = useState('');
    const [watermarkEmail, setWatermarkEmail] = useState('');
    const [watermarkPhone, setWatermarkPhone] = useState('');
    const [watermarkPlaceBegin, setWatermarkPlaceBegin] = useState(false);
    const [watermarkPlaceEnd, setWatermarkPlaceEnd] = useState(false);
    const [watermarkPlaceRandom, setWatermarkPlaceRandom] = useState(false);
    const [watermarkPlaceRandomCount, setWatermarkPlaceRandomCount] = useState(0);
    // Edition link/mark
    const [socialLinkClicksExpire, setSocialLinkClicksExpire] = useState(0);
    const [socialLinkDaysExpire, setSocialLinkDaysExpire] = useState(0);


    useEffect(() => {
        //console.log(displayExpiresDays+'');
    }, [displayExpiresDays]);

    useEffect(() => {
        if (ebookFile !== null) {
            // Set the ebook file meta to null if the user chose a file.
            setEbookFileMeta(null);
        }
    }, [ebookFile]);

    const setEbookData = useCallback((ebook) => {
        batch(() => {
            const drm = (ebook['drm_type_id']) ? ebook['drm_type_id'] : ebook['drm'];
            //console.dir(ebook);
            setEbookFileMeta({
                name: ebook['title'],
                //path: `${ebook['title']}.${ebook['file_type']}`,
                path: ebook['filename'],
                size: ebook['file_size'],
                ext: ebook['file_type']
            });
            setResourceId(ebook['resource_id']);
            //setEbookFile(ebook['resource']);
            setBookTitle(ebook['title'] || '');
            setBookAuthor(ebook['author'] || '');
            setPublisher(ebook['publisher'] || '');
            setIsbn13(ebook['isbn13'] || '');
            setDrmType(drm);
            setIsSingleDevice(ebook['display_is_single_device']);
            setDisplayExpiresDays(ebook['display_permission_expires_after_days']);
            setDisplayExpiresHours(ebook['display_permission_expires_after_hours']);
            if (ebook['display_permission_expires_date']) {
                ebook['display_permission_expires_date'] = parseDate(ebook['display_permission_expires_date']).dbFriendly;
            }
            setDisplayExpiresDate(ebook['display_permission_expires_date']);
            setIsPrintAllowed(ebook['printing_is_allowed']);
            setIsPrintSingleDevice(ebook['printing_is_single_device']);
            setPrintExpiresDays(ebook['printing_permission_expires_after_days']);
            sePrintExpiresHours(ebook['printing_permission_expires_after_hours']);
            if (ebook['printing_permission_expires_date']) {
                ebook['printing_permission_expires_date'] = parseDate(ebook['printing_permission_expires_date']).dbFriendly;
            }
            setPrintExpiresDate(ebook['printing_permission_expires_date']);
            setPrintInitialCount(ebook['printing_initial_count']);
            setPrintMaxCount(ebook['printing_max_count']);
            setPrintIncrementIntervalDays(ebook['printing_increment_interval_days']);
            setPrintIncrementIntervalHours(ebook['printing_increment_interval_hours']);
            setIsCopyAllowed(ebook['copy_is_allowed']);
            setIsCopySingleDevice(ebook['copy_is_single_device']);
            setCopyExpiresDays(ebook['copy_permission_expires_after_days']);
            setCopyExpiresHours(ebook['copy_permission_expires_after_hours']);
            if (ebook['copy_permission_expires_date']) {
                ebook['copy_permission_expires_date'] = parseDate(ebook['copy_permission_expires_date']).dbFriendly;
            }
            setCopyExpiresDate(ebook['copy_permission_expires_date']);
            setCopyInitialCount(ebook['copy_initial_count']);
            setCopyMaxCount(ebook['copy_max_count']);
            setCopyIncrementIntervalDays(ebook['copy_increment_interval_days']);
            setCopyIncrementIntervalHours(ebook['copy_increment_interval_hours']);
            setWatermarkName(ebook['watermark_name']);
            setWatermarkEmail(ebook['watermark_email']);
            setWatermarkPhone(ebook['watermark_phone']);
            setWatermarkPlaceBegin(ebook['watermark_place_begin']);
            setWatermarkPlaceEnd(ebook['watermark_place_end']);
            setWatermarkPlaceRandom(ebook['watermark_place_random']);
            setWatermarkPlaceRandomCount(ebook['watermark_place_random_count']);
            setSocialLinkClicksExpire(ebook['social_link_clicks_expire']);
            setSocialLinkDaysExpire(ebook['social_link_days_expire']);
            // LM: 2020-10-28 11:09:42 [Lcp updates]
            if (drm === drmTypeEnginesByName['readium']) {
                // LM: 2020-12-02 12:07:11 [Added pint()]
                setDisplayExpiresDays(pint(ebook['lcp_display_permission_expires_after_days']));
                setPrintMaxCount(pint(ebook['lcp_printing_max_count']));
                setCopyMaxCount(pint(ebook['lcp_copy_max_count']));
            }
        });
    }, [batch]);

    function packageData(returnRawData = false) {
        let data = {
            'title': bookTitle,
            'resource': ebookFile,
            'author': bookAuthor,
            'publisher': publisher,
            'isbn13': isbn13,
            'drm': drmType,
            'display_is_single_device': isSingleDevice,
            'printing_is_allowed': isPrintAllowed,
            'copy_is_allowed': isCopyAllowed,
            // 'watermark_name': watermarkName,
            // 'watermark_email': watermarkEmail,
            // 'watermark_phone': watermarkPhone,
            'watermark_place_begin': watermarkPlaceBegin,
            'watermark_place_end': watermarkPlaceEnd,
            'watermark_place_random': watermarkPlaceRandom,
            'watermark_place_random_count': watermarkPlaceRandomCount,
            'display_permission_expires_date': displayExpiresDate,
            'display_permission_expires_after_days': displayExpiresDays,
            'display_permission_expires_after_hours': displayExpiresHours
        };
        // LM: 2020-09-10 08:41:23 [For new lcp fields]
        if (drmType === drmTypeEnginesByName['readium']) {
            data['lcp_display_permission_expires_after_days'] = displayExpiresDays;
        }
        if (isPrintAllowed) {
            data = {
                ...data,
                'printing_is_single_device': isPrintSingleDevice,
                'printing_permission_expires_after_days': printExpiresDays,
                'printing_permission_expires_after_hours': printExpiresHours,
                'printing_permission_expires_date': printExpiresDate,
                'printing_initial_count': printInitialCount,
                'printing_max_count': printMaxCount,
                'printing_increment_interval_days': printIncrementIntervalDays,
                'printing_increment_interval_hours': printIncrementIntervalHours
            };
            // LM: 2020-09-10 08:41:23 [For new lcp fields]
            if (drmType === drmTypeEnginesByName['readium']) {
                data['lcp_printing_max_count'] = printMaxCount;
            }
        }
        if (isCopyAllowed) {
            data = {
                ...data,
                'copy_is_single_device': isCopySingleDevice,
                'copy_permission_expires_after_days': copyExpiresDays,
                'copy_permission_expires_after_hours': copyExpiresHours,
                'copy_permission_expires_date': copyExpiresDate,
                'copy_initial_count': copyInitialCount,
                'copy_max_count': copyMaxCount,
                'copy_increment_interval_days': copyIncrementIntervalDays,
                'copy_increment_interval_hours': copyIncrementIntervalHours
            };
            // LM: 2020-09-10 08:41:23 [For new lcp fields]
            if (drmType === drmTypeEnginesByName['readium']) {
                data['lcp_copy_max_count'] = copyMaxCount;
            }
        }
        if (socialLinkClicksExpire) {
            data['social_link_clicks_expire'] = socialLinkClicksExpire;
        }
        if (socialLinkDaysExpire) {
            data['social_link_days_expire'] = socialLinkDaysExpire;
        }
        const formData = new FormData();
        for (let p in data) {
            if (parseInt(data[p], 10) !== NaN) { // if number
                if (parseInt(data[p], 10) < 0) {
                    delete data[p];
                    continue; // Don't allow negative numbers.
                }
            }
            // Convert boolean to number so that laravel validator can understand.
            if (typeof data[p] === 'boolean') {
                data[p] = Number(data[p]);
            }
            if (typeof data[p] === 'string' && data[p].trim().toLowerCase() === 'undefined') {
                data[p] = '';
            }
            // Make sure no empty strings as laravel validator treats that as null and throws a fit.
            if (typeof data[p] === 'string' && data[p].trim() === '') {
                if (['author', 'publisher', 'isbn13'].indexOf(p) === -1) {
                    delete data[p];
                    continue;
                }
            }
            if (data[p] === null) { // no null values please
                if (p === 'display_permission_expires_date') { data[p] = ''; } // allow empty string for "display_permission_expires_date"
                else {
                    delete data[p];
                    continue;
                }

            }
            formData.append(p, data[p]);
        }
        if (!!resourceId) {
            formData.append('resource_id', resourceId);
        }
        return (returnRawData) ? data : formData;
    }


    return {
        ebookFile, setEbookFile,
        ebookFileMeta, setEbookFileMeta,
        bookTitle, setBookTitle,
        bookAuthor, setBookAuthor,
        publisher, setPublisher,
        isbn13, setIsbn13,
        drmType, setDrmType,
        isSingleDevice, setIsSingleDevice,
        displayExpiresDays, setDisplayExpiresDays,
        displayExpiresHours, setDisplayExpiresHours,
        displayExpiresDate, setDisplayExpiresDate,
        isPrintAllowed, setIsPrintAllowed,
        isPrintSingleDevice, setIsPrintSingleDevice,
        printExpiresDays, setPrintExpiresDays,
        printExpiresHours, sePrintExpiresHours,
        printExpiresDate, setPrintExpiresDate,
        printInitialCount, setPrintInitialCount,
        printMaxCount, setPrintMaxCount,
        printIncrementIntervalDays, setPrintIncrementIntervalDays,
        printIncrementIntervalHours, setPrintIncrementIntervalHours,
        isCopyAllowed, setIsCopyAllowed,
        isCopySingleDevice, setIsCopySingleDevice,
        copyExpiresDays, setCopyExpiresDays,
        copyExpiresHours, setCopyExpiresHours,
        copyExpiresDate, setCopyExpiresDate,
        copyInitialCount, setCopyInitialCount,
        copyMaxCount, setCopyMaxCount,
        copyIncrementIntervalDays, setCopyIncrementIntervalDays,
        copyIncrementIntervalHours, setCopyIncrementIntervalHours,
        watermarkName, setWatermarkName,
        watermarkEmail, setWatermarkEmail,
        watermarkPhone, setWatermarkPhone,
        watermarkPlaceBegin, setWatermarkPlaceBegin,
        watermarkPlaceEnd, setWatermarkPlaceEnd,
        watermarkPlaceRandom, setWatermarkPlaceRandom,
        watermarkPlaceRandomCount, setWatermarkPlaceRandomCount,
        socialLinkClicksExpire, setSocialLinkClicksExpire,
        socialLinkDaysExpire, setSocialLinkDaysExpire,
        packageData,
        setEbookData,
        filterForDefaultDrmSettingsRelevantData
    };
});