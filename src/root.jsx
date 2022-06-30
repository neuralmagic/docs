import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider, Global } from '@emotion/react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import lightTheme from './themes';
import styles from './styles';

import { DocsLayout } from './layouts';
import Header from './components/header';


const RootDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;


const Root = ({ data, pageContext }) => {
  // meta tags
  const metaTitle = data.mdx.frontmatter.metaTitle;
  const metaDescription = data.mdx.frontmatter.metaDescription;

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
       <Global styles={styles} />
       <Header />
       <DocsLayout mdxFields={data.mdx.fields}
                   mdxFrontMatter={data.mdx.frontmatter}
                   mdxTOC={data.mdx.tableOfContents}
                   allMdx={data.allMdx}>
         {data.mdx.body}
       </DocsLayout>
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
        githubURL
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
          }
        }
      }
    }
  }
`;
