const postQuery = `
  {
    posts: allMdx {
      edges {
        node {
          objectID: id
          frontmatter {
            title
            description
          }
          excerpt(pruneLength: 150)
        }
      }
    }
  }
`;

const queries = [
    {
        query: postQuery,
        transformer: ({ data }) => data.posts.edges.map(({ node }) => node),
        indexName: "dev_neuralmagic_docs", // Replace with your Algolia index name
    },
];

module.exports = queries;
