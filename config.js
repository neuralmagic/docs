const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://docs.neuralmagic.com',
    gaTrackingId: "G-L2QW513YN1",
    trailingSlash: false,
  },
  siteMetadata: {
    docsLocation: 'https://docs.neuralmagic.com',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Neural Magic Docs',
      short_name: 'Neural Magic Docs',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
