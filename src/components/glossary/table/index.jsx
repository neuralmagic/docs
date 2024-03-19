import React from 'react';

import styles from './styles.module.scss';
import glossaryData from '../../../../glossary';


const GlossaryTable = () => {
    return (
        <div className={styles.glossaryContainer}>
            <div className={styles.glossaryColumns}>
                <div className={styles.glossaryTerm}>Name</div>
                <div className={styles.glossarySummary}>Definition</div>
            </div>

            {glossaryData.map(term => (
                <div className={styles.glossaryEntry} key={term.label}>
                    <div className={styles.glossaryTerm}>
                        <a href={`#${term.label}`} id={term.label}>{term.label}</a>
                    </div>
                    <div className={styles.glossarySummary}>{term.description ? term.description : term.summary}</div>
                </div>
            ))}
        </div>
    );
}

export default GlossaryTable;