import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import styles from './styles.module.scss';


const ReleaseNotes = ({ content, repo }) => {
    const renderer = new marked.Renderer();
    renderer.heading = (text, level) => {
        return `<h${level + 2}>${text}</h${level + 1}>`;
    };
    renderer.text = (text) => {
        return text.replace(/#\d+/g, (match) => {
            const issueNumber = match.slice(1);
            return `<a href="https://www.github.com/${repo}/issues/${issueNumber}" target="_blank">${match}</a>`;
        });
    };

    marked.setOptions({ renderer });

    const createMarkup = () => {
        return { __html: marked.parse(content) }
    }

    return (
        <div dangerouslySetInnerHTML={createMarkup()} />
    );
}

const Index = ({ repo }) => {
    const [releases, setReleases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReleases = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.github.com/repos/${repo}/releases`);
                if (!response.ok) {
                    // Handling different types of errors
                    if (response.status === 403) {
                        setError("API rate limit exceeded. Please try again later.");
                    } else {
                        setError(`Failed to fetch data: ${response.statusText}`);
                    }
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setReleases(data);
            } catch (error) {
                console.error('Fetching error:', error);
            }
            setIsLoading(false);
        };

        fetchReleases();
    }, [repo]);

    if (isLoading) {
        return <div className={`${styles.releases} ${styles.loading}`}>Loading...</div>;
    }

    if (error) {
        return <div className={`${styles.releases} ${styles.error}`}>Error: {error}</div>;
    }

    return (
        <div className={styles.releases}>
            {releases.length === 0 ? (
                <p>No releases found.</p>
            ) : (
                <ul className={styles.releasesUL}>
                    {releases.map(release => (
                        <li key={release.id} className={styles.release}>
                            <h3 className={styles.releaseVersion}>
                                <a className="anchor" href={`#${release.name.toLowerCase().replace(/[^\w]+/g, '-')}`} name={release.name.toLowerCase().replace(/[^\w]+/g, '-')}>
                                    {release.name}
                                </a>
                            </h3>
                            <ReleaseNotes content={release.body} repo={repo} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Index;