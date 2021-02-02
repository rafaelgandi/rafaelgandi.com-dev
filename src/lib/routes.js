/*
    Place all application routes here
*/
import { withApiPrefix } from 'lib/ajax';

export default {
    home: '/',
    aboutUs: '/about-us',
    onboarding: '/onboarding',
    forgotPassword: '/forgot-password',
    changePassword: '/change-password',
    setup: '/setup',
    choose: '/choose',
    onboardingSuccess: '/onboarding/success',
    register: '/register',
    contact: '/contact-us',
    login: '/login',
    logout: '/logout',
    systemMessage: '/sys/msg',
    dashboard: '/dashboard',
    dashboardFront: '/dashboard/front',
    bookList: '/dashboard/books',
    addBook: '/dashboard/books-add',
    editBook: '/dashboard/books-edit',
    activity: '/dashboard/activity',
    settings: '/dashboard/settings',
    users: '/dashboard/users',
    adobeDownloadInstructions: '/adobe-instructions',
    readiumDownloadInstructions: '/readium-instructions',
    previewDownloadInstructions: '/preview-download-instructions',
    plans: '/manage-plans',
    serverError: '/server-error',
    webMaintenance: '/under-maintenance',
    account: '/dashboard/manage-account',
    api: {
        register: withApiPrefix('/auth/register'),
        ebook: withApiPrefix('/book'),
        transaction: withApiPrefix('/transaction'),
        transactionMultiple: withApiPrefix('/transaction/multiple'),
        downloadsReportData: withApiPrefix('/download/report'),
        getStripePublicKey: '/cors/get/stripe/pk',
        handshake: '/cors/handshake',
        sendPasswordReset: '/cors/password/send/reset',
        logout: '/cors/logout',
        login: '/cors/login',
        manuallyLogin: '/cors/m/manulallogin',
        getIntercomData: '/cors/get/intercom/data',
        sendIntegrationServiceCustomerInquery: '/cors/send/integration/service/customer/inquery',
        updatePassword: '/cors/password/update',
        legacyUserUpdatePassword: '/cors/legacy/user/password/update',
        getDefaultDrmSettings: '/cors/get/default/settings',
        updateDefaultDrmSettings: '/cors/update/default/settings',
        getPaypalIntegrationSettings: '/cors/get/paypal/integration/settings',
        updatePaypalIntegrationSettings: '/cors/update/paypal/integration/settings',
        getUserDetails: '/cors/get/user/details',
        updateUserDetails: '/cors/update/user/details',
        simpleUpdateUserPassword: '/cors/update/user/password',
        fulFillmentDownloadLink: `${process.env.REACT_APP_API_URI}/fulfillment`,
        getAllUserCards: '/cors/subscription/get/user/cards',
        addNewCard: '/cors/subscription/add/card',
        updateCard: '/cors/subscription/update/card',
        removeCard: '/cors/subscription/remove/card',
        setPrimaryCard: '/cors/subscription/set/primary/card',
        invoiceHistoryList: '/cors/subscription/get/invoice/history/list',
        getAllPlans: '/cors/subscription/get/plans',
        subscriptionPayment: '/cors/subscription/payment',
        couponCheck: '/cors/subscription/coupon/check',
        cancelSubscription: '/cors/subscription/cancel',
        closeGetstarted: '/cors/close/getstarted',
        transCsvDownload: `${process.env.REACT_APP_API_URI}/csv/activity/download`,
        publicGetTransDetails: `/cors/get/trans/details`,
        doesEmailExist: '/cors/check/email',
        saveBrandDetails: 'cors/brand/save',
        getBrandDetails: 'cors/brand/get',
        getUserDownloadCredits: 'cors/get/user/download/credits',
        getTransFullfillmentData: 'cors/get/trans/fullfillment/data/'
    },
    outside: {
        stripeJs: 'https://js.stripe.com/v2/',
        egAPIDocs: 'https://www.editionguard.com/api-documentation/',
        egHelpPage: 'https://editionguard.com/learn/',
        createAdobeAccount: 'https://adobeid-na1.services.adobe.com/renga-idprovider/pages/create_account?client_id=SunbreakWebUI1&callback=https%3A%2F%2Fims-na1.adobelogin.com%2Fims%2Fadobeid%2FSunbreakWebUI1%2FAdobeID%2Ftoken%3Fredirect_uri%3Dhttps%253A%252F%252Faccounts.adobe.com%252F%2523from_ims%253Dtrue%2526old_hash%253D%2526api%253Dauthorize%2526reauth%253Dforce%26scope%3DAdobeID%252Copenid%252Csunbreak%252Cacct_mgmt_webui%252Cgnav%252Cadditional_info.account_type%252Csao.cce_private%252Ccreative_cloud%252Cread_countries_regions%252Cupdate_profile.password%252Creauthenticated&client_redirect=https%3A%2F%2Fims-na1.adobelogin.com%2Fims%2Fredirect%2FSunbreakWebUI1%3Fclient_redirect%3Dhttps%253A%252F%252Faccounts.adobe.com%252F%2523from_ims%253Dtrue%2526old_hash%253D%2526api%253Dauthorize%2526reauth%253Dforce&denied_callback=https%3A%2F%2Fims-na1.adobelogin.com%2Fims%2Fdenied%2FSunbreakWebUI1%3Fredirect_uri%3Dhttps%253A%252F%252Faccounts.adobe.com%252F%2523from_ims%253Dtrue%2526old_hash%253D%2526api%253Dauthorize%2526reauth%253Dforce%26response_type%3Dtoken%26scope%3DAdobeID%252Copenid%252Csunbreak%252Cacct_mgmt_webui%252Cgnav%252Cadditional_info.account_type%252Csao.cce_private%252Ccreative_cloud%252Cread_countries_regions%252Cupdate_profile.password%252Creauthenticated&display=web_v2&locale=en_US&relay=9f7d1a6e-f4b6-40ef-82f9-bb56ab4ab22b&flow=true&flow_type=token&idp_flow_type=login&reauthenticate=force&dc=false&eu=false',
        adobeDigitalEditionsDownload: 'https://www.adobe.com/solutions/ebook/digital-editions/download.html',
        thoriumMac: 'https://github.com/edrlab/thorium-reader/releases/download/v1.5.0/Thorium-1.5.0.dmg',
        thoriumWindows: 'https://github.com/edrlab/thorium-reader/releases/download/v1.5.0/Thorium.Setup.1.5.0.exe',
        r2Ios: 'https://apps.apple.com/us/app/r2-reader/id1363963230',
        r2Android: 'https://play.google.com/store/apps/details?id=org.readium.r2reader'
    }
};
