import React from 'react';
import { MDXProvider } from '@mdx-js/react';



const components = {

};

export default function DocsMDXProvider({ children }) {
    return <MDXProvider components={components}>{children}</MDXProvider>;
}
