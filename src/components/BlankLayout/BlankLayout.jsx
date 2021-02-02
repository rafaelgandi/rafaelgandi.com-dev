import React from 'react';
import PropTypes from 'prop-types';
import './styles/BlankLayout.scss';
import { Container, Col, Row } from 'react-bootstrap';

export default function BlankLayout(props) {
    return (
        <Row>
            <Col>
                { props.children }
            </Col>
        </Row>
    );
}
BlankLayout.propTypes = {};
