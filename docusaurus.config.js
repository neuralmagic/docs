// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import navLinks from "./navlinks";
import footerLinks from "./footerlinks";
import { themes as prismThemes } from 'prism-react-renderer';

const redirects = require('./redirects.json');


const config = {
  title: 'Neural Magic Documentation',
  tagline: 'The Neural Magic Platform provides a suite of software components to select, build, and run performant deep learning models.',
  favicon: 'img/favicon.ico',
  url: 'https://neuralmagic.github.io',
  baseUrl: '/docs-v2',
  organizationName: 'neuralmagic',
  projectName: 'docs',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  markdown: {
    format: 'detect',
  },
  plugins: [
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-client-redirects',
      {
        fromExtensions: ['html'],
        redirects: redirects,
      },
    ],
  ],
  presets: [
    [
      'classic',
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/neuralmagic/docs-v2/tree/main',
          editCurrentVersion: true,
          versions: {
            current: {
              label: 'nightly',
              banner: 'unreleased',
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.scss',
        },
      }),
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Docs',
      logo: {
        alt: 'Neural Magic Logo',
        src: 'img/logo.svg'
      },
      items: [
        {
          type: 'docsVersionDropdown',
        },
        {
          type: 'search',
          position: 'right',
        },
        ...navLinks,
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Neuralmagic, Inc.`,
      links: [
        ...footerLinks
      ]
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    prism: {
      theme: prismThemes.vsDark,
      additionalLanguages: ['python', 'markup', 'css', 'javascript', 'bash', 'c', 'csharp', 'cpp', 'csv', 'docker', 'dot', 'git', 'go', 'graphql', 'http', 'java', 'json', 'latex', 'log', 'makefile', 'markdown', 'objectivec', 'perl', 'php', 'powershell', 'jsx', 'tsx', 'regex', 'rest', 'ruby', 'rust', 'sass', 'scss', 'scala', 'sql', 'swift', 'typescript', 'vim', 'wiki', 'yaml'],
    },
    algolia: {
      appId: 'CIS4HPXHOK',
      apiKey: '8e19373017819c7e2b9f2153fe58e08f',
      indexName: 'neuralmagic',
      contextualSearch: true,
      searchPagePath: 'search',
    },
  }
};

export default config;
