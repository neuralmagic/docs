import * as React from 'react';
import PropTypes from 'prop-types';

import favico from 'images/favicon.ico';
import logo from 'images/logo.svg';

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes} lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>Neural Magic Docs</title>
          <meta property="og:locale" content="en_US" />
          <meta property="og:site_name" content="Neural Magic Docs" />
          <meta property="og:type" content="article" />
          <title>Neural Magic Docs</title>
          <meta property="og:title" content="Neural Magic Docs" />
          <meta name="description" content="Documentation for the Neural Magic DeepSparse Platform. Use Neural Magic, a sparsity-aware inference engine and open-source sparsification tools, for maximum CPU speedups of NLP and computer vision models." />
          <meta property="og:description" content="Documentation for the Neural Magic DeepSparse Platform. Use Neural Magic, a sparsity-aware inference engine and open-source sparsification tools, for maximum CPU speedups of NLP and computer vision models." />
          <meta property="og:url" content="https://docs.neuralmagic.com/" />
          <link rel="shortcut icon" type="image/svg" href={favico} />
          <meta property="og:image" content={logo} />
          <meta property="og:image:secure_url" content={logo} />
          <meta property="og:image:width" content="500" />
          <meta property="og:image:height" content="460" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Neural Magic Docs" />
          <meta name="twitter:description" content="Documentation for the Neural Magic DeepSparse Platform. Use Neural Magic, a sparsity-aware inference engine and open-source sparsification tools, for maximum CPU speedups of NLP and computer vision models." />
          <meta name="twitter:image" content={logo} />
          <noscript key="noscript"></noscript>
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
