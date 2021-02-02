
import React from 'react';
import ErrorPagesLayout from 'components/layouts/ErrorPagesLayout';
import routes from 'lib/routes';
import { Link } from 'react-router-dom';
import {  Row } from 'react-bootstrap';
import usePageTitle from 'hooks/usePageTitle';

export default function PageNotFound() {
    usePageTitle('Page Not Found');
    return (
        <ErrorPagesLayout>
            <img src="/images/404.png" alt=""/>
            <h2 className="margin-bottom-60">Page Not Found</h2>
            <p>The page you are looking for could have been deleted or never existed.</p>
            <Row className="d-flex">
                <Link to={routes.home} className="btn btn-sm btn-primary">Return to Home Page</Link>
            </Row>
        </ErrorPagesLayout>
    );
}
