import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider, Global } from '@emotion/react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";

import lightTheme from './themes';
import styles from './styles';

import { DocsLayout } from './layouts';
import Header from './components/header';


const RootDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;


const AlertContainer = styled.div`
  border-radius: 32px;
  overflow: hidden;
  background-color: ${props => props.theme.notificationBackground};
  color: ${props => props.theme.notificationTextPrimary};
  padding: 16px 32px 16px 32px;
  font-size: 1em;
`;


const AlertTemplate = ({ style, options, message, close }) => (
  <AlertContainer style={style}>
    {message}
  </AlertContainer>
)


const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '24px',
  transition: transitions.FADE,
};


const Root = ({ data, pageContext }) => {
  const isDocsPage = data && data.mdx;
  const metaTitle = data && data.mdx ? data.mdx.frontmatter.metaTitle : null;
  const metaDescription = data && data.mdx ? data.mdx.frontmatter.metaDescription : null;

  return (
    <RootDiv>
      <Helmet>
        {metaTitle ? <title>{metaTitle}</title> : null}
        {metaTitle ? <meta name="title" content={metaTitle} /> : null}
        {metaDescription ? <meta name="description" content={metaDescription} /> : null}
        {metaTitle ? <meta property="og:title" content={metaTitle} /> : null}
        {metaDescription ? <meta property="og:description" content={metaDescription} /> : null}
        {metaTitle ? <meta property="twitter:title" content={metaTitle} /> : null}
        {metaDescription ? (
          <meta property="twitter:description" content={metaDescription} />
        ) : null}
      </Helmet>
      <ThemeProvider theme={lightTheme}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Global styles={styles} />
          <Header />
          {isDocsPage ?
            <DocsLayout mdxFields={data.mdx.fields}
              mdxFrontMatter={data.mdx.frontmatter}
              mdxTOC={data.mdx.tableOfContents}
              allMdx={data.allMdx}>
              {data.mdx.body}
            </DocsLayout> : ""}
        </AlertProvider>
      </ThemeProvider>
    </RootDiv>
  );
}

export default Root;

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        docsLocation
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
        githubURL
      }
      body
      tableOfContents
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        metaTitle
        metaDescription
        index
        skipToChild
      }
    }
    allMdx {
      edges {
        node {
          fields {
            id
            slug
            title
          }
          frontmatter {
            index
            targetURL
            skipToChild
            metaTitle
            metaDescription
          }
        }
      }
    }
  }
`;

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

const Search = () => (
  <InstantSearch searchClient={searchClient} indexName="dev_neuralmagic_docs">
    <SearchBox />
    <Hits />
  </InstantSearch>
);

export default Search;