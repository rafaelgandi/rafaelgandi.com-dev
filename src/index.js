import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
window.React = React;
import './index.scss';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import constants from 'lib/constants';
import useFirstRender from 'hooks/useFirstRender';
import PageNotFound from 'components/PageNotFound';
import PageSpinner from 'components/PageSpinner';
import HomePage from 'components/HomePage';
//import routes from 'lib/routes';
const WebDevPage = React.lazy(() => import('components/WebDevPage'));
const ContactPage = React.lazy(() => import('components/ContactPage'));
const MapPage = React.lazy(() => import('components/MapPage')); 
const Photography = React.lazy(() => import('components/Photography')); 

const App = () => {
    useFirstRender(() => {
        document.body.style.opacity = 1;
    });
    return (
        <Suspense fallback={<PageSpinner />}>
            <Container id="raffy-wrapper">
                <BrowserRouter>
                    <Switch>
                        <Route path={ constants.routes.home } component={ HomePage } exact />
                        <Route path={ constants.routes.photography } component={ Photography } exact />
                        <Route path={ constants.routes.webDevelopment } component={ WebDevPage } exact />                
                        <Route path={ constants.routes.contact } component={ ContactPage } exact />                
                        <Route path={ constants.routes.map } component={ MapPage } exact />                
                        <Route component={ PageNotFound } />
                    </Switch>
                </BrowserRouter>
            </Container>
        </Suspense>
    );
};
ReactDOM.render(<App />, document.getElementById('root'));


