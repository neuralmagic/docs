import React from 'react';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import TOC from '@theme/TOC';
import styles from './styles.module.scss';


const SlackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127 127" className={styles.icon}>
        <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="#E01E5A"/>
        <path d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z" fill="#36C5F0"/>
        <path d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z" fill="#2EB67D"/>
        <path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z" fill="#ECB22E"/>
    </svg>
);

const SupportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className={styles.icon} fill="var(--ifm-toc-link-color)">
        <path d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440Zm-80-280q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480q17 0 28.5 11.5T400-440q0 17-11.5 28.5T360-400Zm240 0q-17 0-28.5-11.5T560-440q0-17 11.5-28.5T600-480q17 0 28.5 11.5T640-440q0 17-11.5 28.5T600-400Zm-359-62q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z"/>
    </svg>
)

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="none" className={styles.icon}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#1B1F23"/>
    </svg>
);

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className={styles.icon} fill="var(--ifm-toc-link-color)">
        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
    </svg>
);


export default function DocItemTOCDesktop({...props}) {
  const {toc, frontMatter, metadata} = useDoc();
  const editUrl = frontMatter.custom_edit_url ? frontMatter.custom_edit_url : metadata.editUrl;

    const issuesBaseURL = 'https://github.com/neuralmagic/';
    const issueLinks = [
        { name: 'DeepSparse', path: 'deepsparse/issues' },
        { name: 'SparseML', path: 'sparseml/issues' },
        { name: 'SparseZoo', path: 'sparsezoo/issues' },
    ];


    return (
        <div className={styles.wrapper}>
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Content</h3>
                <TOC
                    toc={toc}
                    minHeadingLevel={frontMatter.toc_min_heading_level}
                    maxHeadingLevel={frontMatter.toc_max_heading_level}
                    className={ThemeClassNames.docs.docTocDesktop}
                />
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Actions</h3>
                <div className={styles.sectionLinks}>
                    <a href={editUrl} target="_blank" className={styles.link}><EditIcon /> Edit this page</a>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Support</h3>
                <div className={styles.sectionLinks}>
                    <li>
                        <a href="https://join.slack.com/t/discuss-neuralmagic/shared_invite/zt-q1a1cnvo-YBoICSIw3L1dmQpjBeDurQ" target="_blank" className={styles.link}><SlackIcon /> Community Slack</a>
                        <a href="https://support.neuralmagic.com" target="_blank" className={styles.link}><SupportIcon /> Enterprise Support</a>
                    </li>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Issues</h3>
                <div className={styles.sectionLinks}>
                    {issueLinks.map(link => (
                        <li key={link.name}>
                            <a href={`${issuesBaseURL}${link.path}`} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                <GithubIcon />
                                {link.name}
                            </a>
                        </li>
                    ))}
                </div>
            </div>
        </div>
    );
}
