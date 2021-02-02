
        import React from 'react';
        import PropTypes from 'prop-types';
        import './styles/PageSpinner.scss';
        import { Spinner } from 'react-bootstrap';
        
        export default function PageSpinner() {
            return (
                <div className="text-center mt-5">
                    <Spinner animation="grow" className={ 'page-spinner' } />
                </div>
            );
        }
        PageSpinner.propTypes = {};
    