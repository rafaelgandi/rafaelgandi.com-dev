import React from 'react';
import './styles/HomePage.scss';
import Layout from 'components/Layout';
import PageSection from 'components/PageSection';

export default function HomePage() {
    return (
        <Layout>
            <PageSection id="raffy-page-home">
                <p id={ 'bigger-text' } style={ {marginTop: '2.6em'} } className="text-center">
                    Hi, my name&apos;s Rafael Gandionco and I&apos;m a minimalist, web developer, and photographer from the Philippines.
                </p> 
            </PageSection>
        </Layout>
    );
}
