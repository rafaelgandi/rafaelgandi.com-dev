
import React from 'react';
import PropTypes from 'prop-types';
import './styles/Layout.scss';
import { Container, Col, Row } from 'react-bootstrap';
import Header from 'components/Header';

export default function Layout(props) {    
    return (
        <Row>
            <Col>
                <Header />
                <div id={ 'pages-wrapper' }>
                    { props.children }
                </div>                    
            </Col>
        </Row>
    );
}
Layout.propTypes = {};
