import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles/LazyImg.scss';    

export default function LazyImg(props) {
    const imgRef = useRef();
    const [ imgSrc, setImgSrc ] = useState('');
    const [ showImg, setShowImg ] = useState(false);
    const [ showPulsate, setShowPulsate ] = useState(true);
    
    function onIntersect(elem, callback) {
        if (! window.IntersectionObserver) {
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
    
    function loadImgSrc(imgElem) {
        imgElem.src = props.src;
        imgElem.onload = () => {
            setImgSrc(props.src);
            setShowImg(true);
            setShowPulsate(false);
        };
    }
    
    useEffect(() => {
        onIntersect(imgRef.current, () => {
            loadImgSrc(imgRef.current);
        });
    }, []);
    
    return (
        <div 
            className={ `
                ${ 'img-container' } 
                ${ (!! props.additionalContainerClass ) ? props.additionalContainerClass : '' } 
                ${ (showPulsate) ? 'pulsate' : '' }
            ` }
        >
            <img 
                src={ imgSrc }
                alt={ props.alt } 
                className={ `
                    ${ (!! props.additionalImgClass ) ? props.additionalImgClass : '' } 
                    ${ (! showImg) ? 'hide' : '' }
                ` } 
                ref={ imgRef }
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