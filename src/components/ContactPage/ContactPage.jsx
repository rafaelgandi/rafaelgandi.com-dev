import React from 'react';
import PropTypes from 'prop-types';
import './styles/ContactPage.scss';
import EmailLink from './EmailLink';
import constants from 'lib/constants';
import contactLabels from 'lib/contactLabels';
import Layout from 'components/Layout';
import PageSection from 'components/PageSection';

export default function ContactPage() { 
    return (
        <Layout>
            <PageSection id="raffy-page-contact">
                <EmailLink />
                <div className={ 'contact-links' }>
                    {
                        contactLabels.map((contact) => (
                            <a 
                                href={ constants.uri[contact.href] } 
                                target="_blank" 
                                rel="noreferrer" 
                                title={contact.title} 
                                key={ contact.href }
                            >{ contact.label}</a>
                        ))
                    }
                </div>
            </PageSection>
        </Layout>
    );
}

