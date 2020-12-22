import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import styled, { StyledComponent } from 'styled-components';
import { vwMinMax } from '../stylehelpers/mixins';

const Headline = styled.h1`
    ${vwMinMax('font-size', 25, 75, 320, 1920, false, false, false)}
`;

const IndexPage: React.FC = () => (
    <Layout>
        <SEO title="Home" />
        <Headline>Hi People!</Headline>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </Layout>
);

export default IndexPage;
