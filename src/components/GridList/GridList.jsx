import React from 'react';
import PropTypes from 'prop-types';
import './styles/GridList.scss';
import LazyImg from 'components/LazyImg';    

export default function GridList(props) {
    return (
        <div className={ 'grid-container' }>
            {                
                props.listData.map(({ image, link, header, desc}) => (
                    <div className={ 'grid-item' } key={ image + link} >
                        <a href={ link } title={ header } target="_blank" rel="noreferrer">
                            <LazyImg 
                                src={ image } 
                                alt={ header } 
                                additionalContainerClass={'img-con'} 
                            />                       
                            <div className={ 'desc' }>{ (!!desc) ? desc : header }</div>
                        </a>
                    </div>
                ))
            }
        </div>
    );
}

GridList.propTypes = {
    listData: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string,
        link: PropTypes.string,
        header: PropTypes.string,
        desc: PropTypes.string
    })).isRequired
};