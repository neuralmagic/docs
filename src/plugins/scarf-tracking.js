module.exports = function scarfTrackingPlugin(context, options) {
    return {
        name: 'scarf-tracking-plugin',

        injectHtmlTags() {
            return {
                headTags: [
                    {
                        tagName: 'img',
                        attributes: {
                            src: 'https://static.scarf.sh/a.png?x-pxid=c9bd862b-183a-4d1f-8bce-1b65dcac32a4',
                            alt: '',
                            style: 'display:none',
                            height: '1',
                            width: '1',
                        },
                    },
                ],
            };
        },
    };
};
