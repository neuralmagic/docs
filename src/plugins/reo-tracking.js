module.exports = function reoTrackingPlugin(context, options) {
    return {
        name: 'reo-tracking-plugin',

        injectHtmlTags() {
            return {
                headTags: [
                    {
                        tagName: 'script',
                        attributes: {
                            type: 'text/javascript',
                        },
                        innerHTML: `
                            !function(){var e,t,n;e="ba3e4c1a4c1fd1a",t=function(){Reo.init({clientID:"ba3e4c1a4c1fd1a"})},(n=document.createElement("script")).src="https://static.reo.dev/"+e+"/reo.js",n.async=!0,n.onload=t,document.head.appendChild(n)}();
                        `,
                    },
                ],
            };
        },
    };
};
