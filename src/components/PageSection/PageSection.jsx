import React from 'react';
import PropTypes from 'prop-types';
import './styles/PageSection.scss';

export default function PageSection(props) {
    return (
        <section id={ props.id } className={ `${'page-sections'}` }>
            { props.children }
        </section>
    );
}

PageSection.propTypes = {
    id: PropTypes.string.isRequired
};