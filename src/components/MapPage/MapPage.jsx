import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles/MapPage.scss';
import BlankLayout from 'components/BlankLayout';

export default function MapPage() {
    useEffect(() => {
        window.location.href='https://www.google.com/maps/@10.2513646,123.8597907,3a,75y,160.13h,79.92t/data=!3m6!1e1!3m4!1s9gUgO5z3UPNOwjOuQk5pMw!2e0!7i13312!8i6656';
    });
    return (
        <BlankLayout>
            <div className="text-center font-italic">
                <h2 className="mt-5">Loading map...</h2>
            </div>
        </BlankLayout>
    );
}
