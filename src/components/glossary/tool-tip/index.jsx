import React, { useState } from 'react';

import styles from './styles.module.scss';

import glossaryData from '../../../../glossary';


const processText = (text) => text.toLowerCase().replace(/[\s_-]/g, '');

const Tooltip = ({ children, termName }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    let processedTermName = termName ? processText(termName) : processText(children);

    const term = glossaryData.find((term) => processText(term.label) === processedTermName);

    const content = term ? (term.summary || term.description) : '';

    return (
        <span
            className={styles.tooltipContainer}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}>

            {children}

            <div className={`${styles.tooltipBox} ${showTooltip ? styles.visible : ''}`}>
                {content}
                {term && <a href={`/glossary#${processedTermName}`} className={styles.moreInfoLink}>More Info</a>}
      </div>
    </span>
    );
};

export default Tooltip;
