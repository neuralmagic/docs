import React from 'react';
import {useDoc} from '@docusaurus/theme-common/internal';
import usePluginData from '@docusaurus/useGlobalData';


const processChildren = (child, currentVersion, lastVersion, targetVersion, targetProducts, prepend, currentTag, ignoreNightly) => {
    if (typeof child === 'string') {
        let version = currentVersion;
        let products = [...targetProducts];

        if (version === 'current') {
            if (!ignoreNightly && targetProducts) {
                for (let i = 0; i < products.length; i++) {
                    let product = products[i];
                    if (product.indexOf("[") > -1) {
                        const split = product.split('[');
                        product = `${split[0]}-nightly[${split[1]}`;
                    } else {
                        product = `${product}-nightly`;
                    }
                    products[i] = product;
                }
            }
            version = currentTag;
        } else if (version === lastVersion) {
            version = '';
        } else if (prepend) {
            version = `${prepend}${version}`;
        }

        let replaced = child.replace(new RegExp(targetVersion, 'g'), version);

        for (let i = 0; i < products.length; i++) {
            replaced = replaced.replace(new RegExp(targetProducts[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), products[i]);
        }

        return replaced;
    }

    if (React.isValidElement(child)) {
        return React.cloneElement(child, child.props, processChildren(child.props.children, currentVersion, lastVersion, targetVersion, targetProducts, prepend, currentTag, ignoreNightly));
    }

    if (Array.isArray(child)) {
        return child.map(c => processChildren(c, currentVersion, lastVersion, targetVersion, targetProducts, prepend, currentTag, ignoreNightly));
    }

    return child;
};


const VersionInjector = ({ children, targetVersion = 'VERSION', targetProduct = 'PRODUCT', prepend = '', currentTag = '', ignoreNightly = false, ignoreLastVersion = false}) => {
    const { metadata } = useDoc();
    const pluginData = usePluginData('docusaurus-plugin-content-docs')['docusaurus-plugin-content-docs'];
    const versions = pluginData.default.versions;
    const lastVersionData = versions.find(version => version.isLast);
    const lastVersion = ignoreLastVersion ? null : lastVersionData.name;

    const currentVersion = metadata.version;
    const targetProducts = Array.isArray(targetProduct) ? targetProduct : [targetProduct];
    const processedChildren = processChildren(children, currentVersion, lastVersion, targetVersion, targetProducts, prepend, currentTag, ignoreNightly);

    return <>{processedChildren}</>;
};

export default VersionInjector;