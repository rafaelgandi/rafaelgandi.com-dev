
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './styles/Gallery.module.scss';
// See: https://dev.to/ziadalzarka/create-react-image-gallery-with-masonry-js-2jba
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
// See: https://simplelightbox.com/
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'simplelightbox';

import LazyImg from 'components/LazyImg';

const columnsCountBreakPoints = { 350: 1, 900: 2 };


export default function Gallery({ photos }) {
    useEffect(() => {
        let gallery;
        gallery = new window.SimpleLightbox('a.lightbox', {
            fileExt: false,
            disableRightClick: true
        });
        return () => {
            if (gallery) {
                gallery.destroy();
            }
        };
    });
    return (
        <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
            <Masonry>
                {photos.map((image) => {
                    if (!image) { return null; }
                    return (
                        <a href={image} key={image} rel="noreferrer" target="_blank" className="lightbox">
                            <LazyImg
                                key={image}
                                src={image}
                                additionalImgClass={css.photo}
                                additionalContainerClass={css.photoCon}
                            />
                        </a>
                    );
                })}
            </Masonry>
        </ResponsiveMasonry>
    );
}
Gallery.propTypes = {
    photos: PropTypes.array
};
