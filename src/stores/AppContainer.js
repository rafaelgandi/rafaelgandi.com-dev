import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next'; // See: https://github.com/jamiebuilds/unstated-next
import { refreshIntercomUserData } from 'lib/intercom';
import { isPayAsYouGoPlan, isMicroPlan } from 'lib/helpers';

export default createContainer(() => {
    const [user, setUser] = useState(null);
    const [blockPage, setBlockPage] = useState(false);
    const [blockPageMessage, setBlockPageMessage] = useState(null);
    const [blockPageOptions, setBlockPageOptions] = useState(null);
    const [handshakeData, setHandShakeData] = useState(null);

    // If user details is saved in session then set the user as the current user.
    useEffect(() => {
        if (!user && sessionStorage.getItem('user')) {
            setUser(JSON.parse(sessionStorage.getItem('user')));
            if (!isPayAsYouGoPlan() && !isMicroPlan()) { // LM: 2021-01-13 07:14:44 [hide intercom for PAYG and MICRO users]
                refreshIntercomUserData();
            }
        }
    }, [user]);

    // Make handshake data from api available to app //
    useEffect(() => {
        if (!handshakeData && sessionStorage.getItem('apiHandshakeData')) {
            setHandShakeData(JSON.parse(sessionStorage.getItem('apiHandshakeData')));
        }
    }, [handshakeData]);

    function setCurrentUser(currentUser) {
        sessionStorage.removeItem('user');
        sessionStorage.setItem('user', JSON.stringify(currentUser));
        setUser(currentUser);
    }

    function getCurrentUser() {
        return user;
    }

    function removeCurrentUser() {
        sessionStorage.removeItem('user');
        setUser(null);
    }

    function blockCurrentPage(block, message = null, options = null) {
        setBlockPage(block);
        if (message) {
            setBlockPageMessage(message);
        }

        if (options) {
            setBlockPageOptions({
                messageClassName: 'onboarding-loader-wrap'
            });
        }
    }

    return {
        setCurrentUser,
        getCurrentUser,
        blockPage,
        blockCurrentPage,
        blockPageMessage,
        user,
        removeCurrentUser,
        handshakeData,
        blockPageOptions,
        setBlockPageOptions
    };
});