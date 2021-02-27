
import React from 'react';
import PropTypes from 'prop-types';
import css from './styles/Photography.module.scss';
import Layout from 'components/Layout';
import PageSection from 'components/PageSection';
// See: https://dev.to/ziadalzarka/create-react-image-gallery-with-masonry-js-2jba
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import LazyImg from 'components/LazyImg';

const photos = [
    'https://lh3.googleusercontent.com/pw/ACtC-3fnLk57sauACaltH2jPB-Maj6Fy_kYqBnvVsBPtU3Yda7Ua5wbpNbaUXTdVzRoREUvESE64PJ1TUHbQIG05mSc-MkI4f4XeawNLUPPNDf6dObIgXiS9-8mlQC5edcWsEZflJOkn75aqhs172TqnDUZf1Q=w1437-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3emgRwr51k88MDn5YZJMAnRq4aVXQlZstATdsq-XvzqUIJHZMiTyEqzHb0FWHvYkvBTXbP1FBhoTCrVUYbkjARNOIUPjcdtTh5OPm_7kaMwyZkWFZhhOpWIherpv0Gd-VaIhHNEazYs7QvCFdhTtRI6Pw=s952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3dyJnUcWoZHHb9ooIyoLhXZUyAfHoVuaow_VIRtBFbwhSJ_vkb-6iENVo70wQ22spML_5B36vbGa7z3WrSJ9sCtdjtyWuWZLZe2hXBtTtGPwDqKlwudJYXgzFEuDajQSHB5N8R4zndD86Gj8Fi7C_s9dA=w1430-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3eOIykIfPY5tmYfAmwPZ9fok5HoJVjiP9mnIASQ7f56Zz2QyHxx12Kib2V7nW9tR6Jx5E2C-U6iFBk5SFNd8ig38j0mNmUW7trdmz3049ilDaXiTn5RnUrvAjgM7FVfd88mktJ0DVcTbaKA1gQtkayIfw=w1428-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3ci7j8El9iAD_SKVaQn2nfZsHSncYr-56DQjsTxA4AEIMnr76t1fxKG_10G-l36DK--cpfmdpjnygmrIIGMDM3Ra_vsZSUIVUWEG6Fp0scYofYISZ_XGNJqQj1sTJjdjFh1zWxbWEEHBNIKsOd8OqRptg=w1437-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3eGindRSGyAo08EleozuVeZkTmiDf_PGlFxIgDEt58h7cyV80_lU7GruLNxxrTidULZmQUqYVMOfuWXJlHiDmjWJAtQBOSbCfcL-Q8FstavtQlpKWTqRnmZgPKU8vh0OlR-Tsk1xd6GjNg4SSfPUcgdRQ=w1430-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3eUHglwTtUxmBQWqDGkiPEphhfq03JBA3pQcO-PwxIqMX2CAzs3KbbsBxqij6Q6lK20Nzs2AtKEt-p4l8azlLp0Cn6Ra213d-QALqXIwqYwXjd6ETvhWZaTXh0Hq07NUBv3xMZ_TrCO58UcXMIBUnaAVA=w1437-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3dVmgShiDInBaS9zb2KcC5HzqiUFidvNMpuoY_CZac_fFYppJxaWd37t6H0h5q3HuffDswozkOCqmPZs7pHAXUpgkMME7JIcSbmXOeffYV5d-_2eHCiFDdLaIZQ7xJkDsSAtOiLGmpClJANe2ut3ZRToA=w1437-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3czYnpaSlcXBunBfpsuQA2H__qUQdmp2dUuL1tCjdJN8bVWmUsoSr8VJXSc4gP8fAtg9jktrj72KOtH9Qk9E323N_i6AXaw_Oc-HiamY21a9kCNPjJE2elZog3-gJCdMFVsEaHFNipVP72MRTkFtsp0uQ=w635-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3fJcPHWAMPA79vHkY5y584cZ-rk5iP3Q1tgIGoZ2EEw1ROOZaHX9hMp3OCHKHTJwgBXbIHZ1CtCIxOe4uJQhKq8fcIVCkm1-xTzRvcD1c3Qk98XPaS_YSB4ZGa2RVw_-0IPgHpNX4WVYgPsQDGlTb2i4Q=w1429-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3dt79529_vWzjlKit0iAJMu6EQKF5zbS_ABj16k1uLi1SgQ3Oi3UcZSCOYJg7CD5ZlQoU0clNx_UeepGunn5Z485KdrzhZOusTtbWsDI8FaBjlv_-pL8gCX9DkrHqSaeC7-etoj1dgiFRZ4Tt2bGdp9sA=w1428-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3clA3fSfRe5ls8HrWirRANFF2oFa_ixpy-em4G9VsNWNe70_Bfi2D_wdy8-GxxxuBYJvFiA831AWQk39WqmazpYNqdYucGnU3iDhasoGrPmJSMyud9XWYodzLMA4EDIta6PJfd26gAGY5yL6Dr0BjL6Bg=w1428-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3cyZb9l163i9Go-tbSPef_eXtw78MNYCJMifSVgwS1WKXMClOxLrCs8QVKudl12hg7lvdftkJIsJ2khGeK5Q756tIB-zuoqqICuuG8wT_fpSk002YYamuGaNFm155Xb-WXiP6nDL7eAU1PdI99kv3_wcw=w1421-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3eV2jnt98JeMHi5bHuKwqgyUp_seG5yWs-B-INQnPQbPOPCpcCBI-U2tDSk0iQPvlylxCUD9uh6hjJK7qRAtjTVGqxs3CjklwvYQDvZ-kteJxdcXw5lTpFohqjD0wI56cuKCTjGWBwSUGRpMLCwWU4hNQ=w1428-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3fFq1Da7fsO5v1W7rR87xk5BnW86wpSZAeCSF9kwWuTz8ee4WHjapZJQE1eWixjC35bGkuv3w0WDNmXd3zuALd8PGfr4WQ3RrEih1yWhfA5G3RpF2VOdV8Y0QPwwUJa6htLNNxraY7XH4j86U1aeJ3rqg=w1428-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3fNSc9qIHKzJ1hBnnCJWR4mIe0vcQyebvimMcYIr5QTE60t1oSo6ZROEyvECoT0AJcPldXk-Qr2B9Clq4JkolY9KYjBlc0jxrjC1-JgTEBgV-aJLsTouDg6ksARGKwbuWgmuoHKTVYqoPVz_FwcSgCD3g=w1428-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3dWbBfe7oUql96SPtAhy-nNtwmckNfjqtbXNa2djKInKAAdU1gLWND-RNKCE60hY2KH340a27FCUF1RcAJ2xZ2zI3Z27HS0C7SeLV-gv9krYqPf29aPBb0s5aFFL8o7q-iKpQllUlikUCFH34gVl18t2g=w1428-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3deGadIG1q8R_cPZNYzmhm5SG7bntPfS87Bnes2x8Kwi63aQk-pMtTR0sQ573PL_vnic-h3puVZKV0Nbf9nObUpjO3Bub2H_XxKXtb2BWEO6xzRZdeg19ibVi2b4FTkeHSgt0pr6U2gD5uwz1vvsEME7w=w1428-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3eoKRraeWv7aZ7_0v0XhjAAWJLy2TkP24IBPsc7SrbSUs35f8dsPJiwxcY41-PIl71QSihd91Hz1sf4-3suhb3Qc4zSkvA6KvDRIwumITbQST6FKqBs-bi53G6uk529sejX6cbqjI_S3swPkvqW8YYXSw=w1430-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3fUoxSYrHq3FUCH4M9jNVhUbQ4oIvUPYd-FD0XX8Fz9honB09L1QnhKV4SwNizHGmeLKHsCiG3xYr0sYRf1B8AVbDkJsw6goCtKdWPlgrwV7HeSZWiPD2fEVQSOhY9lMqn36ASnXht-c_UNH3Ddjteztw=w1428-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3dG-HPYBliOe5HonUfk3Kmiwa2Of3YqhKdi3ttcS65YsUakon27DrThHTEpqqzHnICZWp1Z9OmrvJpvhM-3eSpHJSRsnxE5g5r0nZ47xRWPcuo5I-yyeoPuu5ixehLwsRrOOCdlTcsMC7uhMJ-tlaJ1cg=w1428-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3eny8R_mHnOPd1qyM2aJBDp12fjZ9p5e14HLfJuBjM_kdsU6ocTXFnaN8zN3_xcdJBn88IN7WGysooS4JDtR00q22KNEMIglOfqR374HNd3tWEs2tDv7GMm3EyjKKo8-jXEZzKX0I-x0ei3lZerVQ5zQg=w1421-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3f2TaehJozfXJRxxKsPsHNH1iHbyozVetSkomE_VNC3w0Dr5yUnRVkGF0WeLiPhn3Q1HKy1UwA-yFS3KLk8JVD20_0NuKC5jd_lJBvHlo0HwDdGOPPLIC_bDNqryYMGKsEV8XxoqC9SSfpXfNTAObd3SQ=w1421-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3ftUzpEG6MlgW2GA_kRiOw5RfHhx3CAj07uQl9cwNylM1ixWfsZh67Zxdr-qZGHIoqAXqNwbYL6NqbsOWDEbt6IivO0i8J0o5tnMPw-ILC3D2jEqrQVOxnKiwLE1KenDuVe2Zhg5GQriBJWJNNATV9E=w865-h577-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3d-Tl1iVZhziqiKPyQ8LDuSn5_Z-g0PqJ1-oxsbih2RwINMwg2AI2BPzlp2OUdZIBb4y3tqvxCNjykZwLd50SuAoOK4K1WqbZNp6SaR_feG90ToCX8UkEytuigpP-1Fxj69n-SBRO0nmZlceKcsHo_D=w1328-h886-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3e7STbBulCq2Xv_fnsxPwYtz2nlxxZEHO24l8ZHx9y3f3ToGUrlHgy8JG1cXheKm5n8YRxmzKfwWxCVVnCz6sWErzeSXe386Cn8VYjagwVEPTt9clCc-EmzvWhkP0hKz2hitZ9qNsVdrVF-rp0Lkck5OQ=w1437-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3cImF1Khn9PLcZzFFX9zd_xfXYDxKudOoaJc1pb5mplAdhG1jYO3A-BvmesdZOaJqCYk7TJbOst4VmCKdq-EYuKg981Pm4nEBn40Uo1DSTr6FxS3uF4uJt-tJK_tOXfje3yRSGvX2woCiYWzh6XHYEoww=w1428-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3evZjXzDux0bDS7iMBUw-3gGUgJSGt22VIfs8z9SNs3UXlATEMZTSD9LXjMhfuR-CbEJWvy2zk7Dp8aM_0XWSNYM6tpIjXz_YozXGLWl2LiLAL4KXzC1-pRMnxXJK0ZvphIiybQbMR8mYp55PgjtLEYug=w1437-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3dfpwHuYBU6_LjxwH5BeJN5ZGbpLeYMRvLTLVf1-HbBy9vYBhw6w8s76_XXavRCTpfHwyUQvE5Een8XgoiuUQ7NNubhrcqBT4Nj6INL8014of_qzxgatKml7VDW53YeETh9ur687G_mqAFiKz_HMHGAng=w1437-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3cqZakGsXfJHTo0N29s2XiEQ2HMn9JukRjSV9Lmo2C-7uC4xXUzu54h4ToF8e9TKezLFhfjclBKEFrHfncgNOOB9utECMxsH6LdS3uIWU444Qmal5wJ6GmMGJ2Ou6xydYtbucl6tiSAbOW10JzsUxr1Rg=w1428-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3f4ZW3xDYPi1U3PEuU8NQWFt1kcs4dmNwgy21C0rxl7bxpoq7ITzndYtUUlbbpSqfjxsCOtIelk55d5BlSlPniiJJsrLlP1Bi84qVruUKd35p1bCJ4Rug8VUg91qtu-PXp5JFqmvgXe3T-9S7jLsUKEmA=w1429-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3frvX55NlMR4__yV1wrI95ejEAq6Mshn1DrixnASNYcnqNUnr4wN8vWifJE4GiXndR_R-DxLVM9z_bgoHCtqb4bQWq7ywJtxwFiJ9Gwn2225upkbZ8BCcV_4B98KsmssBIkyi_pG4xCnVnMbA3_b9Sy6Q=w1430-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3dDKbFJSemjY38DbJDwrbFzBvQzT7i-c7uv0Dmdw79NCTKG5lMILDVXhVHsK54KnhJgGn6GrTGGKyh0IL4oerzuEaWqsnm54a00Qrhwq2-ac9aH2wj7suIZeZg9DZm_LWp6jZG5gCYcZVMqxPra4weT6w=w1430-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3e1kZabJmT7Ig4UJLZnhtT7OOk-ITWwGK3qZGUuGWK1FClafcnM8Ypw23cX1N7tfWQaToauxnoeHztwECu0dC3VIHI1RhoTS8_yRvgVDZAsuLOo3pKM1ijymM4YZbojjU2YxO5wBi91GgFrlovd3SVsXA=w1430-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3dzQm_MTmt9bJ1l-_q9Pkt20lfo_JE5nxI2V5p7_pxygGVWSsLM3EUqVcpCrAg9ffmkSCG97Fu-0OJtYygG7eSv0UsS4fD37hWVWon-at6oimnhByFtuAwo4vhOBzpNyolG4_MrU1DQjtLL3m8RbyUVYQ=w1428-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3cWSnhEIttFAB0SuOISX5A_ef3jzsPuUCH3Aoa_Kmj8Sb27J7tpYqVYP94nNjm7P8hSHBE7Hvp4qUSFFrVgU4y8-ewE9GaUgjhxbl5CtJYs6Uh4gN0_oX-JPxUV2jA_cYBBwKke3CsaSxXBr4ysW_FMDg=w1428-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3fyPGvFY_gSGGZ5IU04WCD0lYtFuPrcySsXLfUlUOkR_4lkclwGXAHf0q9UlWAjWaYK5ElZJn0BPl5N7nYXPht1BJfe5HoLvuCx8xW2hKCBOs9UPmfyGMTAjdxlbluXuR2GhSNmUwobzgiFrPnxfJq4RA=w1437-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3fIvryRMEGvYErQxPUkljrPkEWH7rR9uof295_aIzOtt92BLlXZM_BgSQfD9dZjBXHczaGfMnQrLdyiz1TpRFLzDL0Rcb_DNgUm90rtCdsyJKG6trABoqmk8aTBK5BykRwTHfTDNNVxbopNZth5jqTdxQ=w1428-h952-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3eF-GRvhsTSevO45ihpTMtTmEhnrDzAJBh5Ock5KYHtdzgbByhLGsSOoLJJOh6_QHYWbzvUEqrn2BQRVNJoekmA_CzeTt9ILhBr-Zy9SWnO_5DjENZLqABRNth5kYmMeRMdoa31chjVon_jar1j5Rk6yQ=w1428-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3fUoxSYrHq3FUCH4M9jNVhUbQ4oIvUPYd-FD0XX8Fz9honB09L1QnhKV4SwNizHGmeLKHsCiG3xYr0sYRf1B8AVbDkJsw6goCtKdWPlgrwV7HeSZWiPD2fEVQSOhY9lMqn36ASnXht-c_UNH3Ddjteztw=w1428-h953-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3dD68qaTyZQha4wK9H8wf2ajAPxoefX9Mu2MUq1RDchts9XVu_qhmAmMyXbljNNNtUfz8H-qfFwkK_V5-BpR67x8uSDsWkcBivIczfahIAsoMIMfveWgq6FSUHf2yt-NqXRqhb2SWbfvHC9hK9cVXzC=w1328-h886-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3dZDOy-EIMKRo7SGjEf7mvO-LabyHlpIVEYCRQFlqLZ21FAU81iNpiwwQqiChKPBtFw6Js7Bn1G9DfkAPnOmqJfX1F9ygWrwXlu-41Me7g4AN_XvL21ijqG5ooXBJCHzTVnQ8RsgJl6Yegk4Mkp7pgU=w1328-h886-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3ecQfldIyDnxLBWMk9b325oj_MfebvcHfki-d39_LhAsXOdQUQUb_HpDiD1MWYFDMdG0ti_kuWp47AZse5NBbRlamp-lCqxJ_kDbOuUqsKAfI3FH_ItNo9xwqNpFvvC2mxdOXiqgsV-oXVRgLR5fjfg=w1328-h886-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3dS19HLNwxEbhLnlEydKPKaeSKobT5ZC7Wj-scOwj5ZQmocpJX8hg-R2RF-XHl0rkOK_rjlVOn6OEi7S3eEqHcmL77fXCrRS3ChhZ-eJz6ngyLTgEVU_0I_09danxQYyd0l_9SpTRNRLwBRqTgnNm8f=w1328-h886-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3d7W-GRJxIhzb3phhfqJSn3uNVlpR2A6acU5P0VzwluJqt15ZISk5mydlr1GEGX8p_odaM_6r6fsFND0bq7w6XNWlb3fovRq_cJaeaUBFLqGU892g7fZ6a8v4dGhkDnYtWznxe_3WLq9rJey6i18MJF=w1328-h886-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3d_185407Wc_HnrlJBXJFJSnxUTYNLfPnc7nOg440ZSb9j9d85JW4GQPn792ki7D2nOoyBeEixh1dRoGVdDkWRbnU1t0qcjfL16YOXU8GU9UKJDV0c_Qxef_uorSRLsye5ELMR7h-94Esd7nnK_gouR=w1328-h886-no?authuser=0',
    'https://lh3.googleusercontent.com/pw/ACtC-3cFnzwnr_gntp_TTkEfE2QVDUgmprgX7WEs7AtvEQVkhHrpwL8pswNN-VkwlW9HPwi6Q47FWs1OL2_q17LyzHkoiXpN71zmtALAGnB57ENZqDnVQEpCI5O7D8G7OH8oEQAxKmMnZT_elWqUpE-O01-4=w1328-h886-no?authuser=0'
];
const columnsCountBreakPoints = { 350: 1, 750: 2, 900: 2 };


export default function Photography(props) {
    return (
        <Layout>
            <PageSection id="raffy-page-photography">
                <ResponsiveMasonry  columnsCountBreakPoints={columnsCountBreakPoints}>
                    <Masonry gutter={10}>
                        {photos.map((image) => (  
                            <a href={image} key={image} rel="noreferrer" target="_blank">                         
                                <LazyImg 
                                    key={image}
                                    src={ image } 
                                    additionalImgClass={css.photo} 
                                    additionalContainerClass={css.photoCon}
                                />
                            </a>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </PageSection>
        </Layout>
    );
}
Photography.propTypes = {};
