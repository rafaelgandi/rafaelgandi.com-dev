import React from 'react';
import PropTypes from 'prop-types';
import './styles/WebDevPage.scss';
import GridList from 'components/GridList';
import openSourceProjects from 'lib/openSourceProjects';
import projects from 'lib/projects';
import weapons from 'lib/weapons';
import Layout from 'components/Layout';
import PageSection from 'components/PageSection';

export default function WebDevPage() {
    return (
        <Layout>
            <PageSection id="raffy-page-web-dev">
                <h1 className={ 'web-dev-h1' }>Tools I use</h1>
                <GridList listData={ weapons } />
                <hr />
                
                <h1 className={ 'web-dev-h1' } style={{ marginTop: '80px' }}>Open source projects</h1>
                <GridList listData={ openSourceProjects } />
                <hr />
                
                <h1 className={ 'web-dev-h1' } style={{ marginTop: '80px' }}>Client projects</h1>
                <GridList listData={ projects } />
            </PageSection>
        </Layout>
    );
}

