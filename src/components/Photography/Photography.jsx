
import React from 'react';
import Layout from 'components/Layout';
import PageSection from 'components/PageSection';
import Gallery from './Gallery';
import constants from 'lib/constants';
import photos from './current-photos';


export default function Photography(props) {
    return (
        <Layout>
            <PageSection id="raffy-page-photography">
                <Gallery photos={photos} />
                <p className="text-center" style={{color: '#ccc', marginTop: '50px'}}>
                    For more of my latest photos, please follow me on <a href={constants.uri.instagram} rel="noreferrer" target="_blank" >Instagram.</a>
                </p>
            </PageSection>
        </Layout>
    );
}
