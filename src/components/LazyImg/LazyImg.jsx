import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles/LazyImg.scss';

export default function LazyImg(props) {
    const imgRef = useRef();
    const conRef = useRef();
    const [imgSrc, setImgSrc] = useState('');
    const [showImg, setShowImg] = useState(false);
    const [showPulsate, setShowPulsate] = useState(true);
    const { src } = props;

    function onIntersect(elem, callback) {
        if (!window.IntersectionObserver) {
            callback(); // fallback
            return;
        }
        new IntersectionObserver((entries, observer) => {
            entries.map((entry) => {
                if (entry.isIntersecting) {
                    callback();
                    observer.unobserve(entry.target);
                }
            });
        }).observe(elem);
    }



    useEffect(() => {
        function loadImgSrc(imgElem) {
            imgElem.src = src;
            imgElem.onload = () => {
                setImgSrc(src);
                setShowImg(true);
                setShowPulsate(false);
            };
        }

        onIntersect(conRef.current, () => {
            loadImgSrc(imgRef.current);
        });
    }, [src]);

    return (
        <div
            className={`
                ${'img-container'} 
                ${(!!props.additionalContainerClass) ? props.additionalContainerClass : ''} 
                ${(showPulsate) ? 'pulsate' : ''}
            ` }
            ref={conRef}
        >
            <img
                src={imgSrc}
                alt={props.alt}
                className={`
                    ${(!!props.additionalImgClass) ? props.additionalImgClass : ''} 
                    ${(!showImg) ? 'hide' : ''}
                ` }
                ref={imgRef}
            />
        </div>
    );
}

LazyImg.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    additionalContainerClass: PropTypes.string,
    additionalImgClass: PropTypes.string
};