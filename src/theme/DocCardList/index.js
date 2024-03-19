import React from 'react';
import {
  useCurrentSidebarCategory,
  filterDocCardListItems,
} from '@docusaurus/theme-common';
import DocCard from '@theme/DocCard';
import styles from './styles.module.scss';
import {useDoc} from "@docusaurus/theme-common/internal";
import { useDocById } from '@docusaurus/theme-common/internal';
import usePluginData from '@docusaurus/useGlobalData';


function filterItems(items) {
  let filteredItems;

  if (Array.isArray(items) && items.length > 0 && typeof items[0] === 'string') {
    const matchingDocs = items.map((item) => {
      return useDocById(item);
    });

    const {metadata} = useDoc();
    const activeVersion = metadata.version;
    const pluginData = usePluginData('docusaurus-plugin-content-docs')['docusaurus-plugin-content-docs'];
    const versions = pluginData.default.versions;
    const activeVersionData = versions.find((version) => version.name === activeVersion);

    const matchingPaths = activeVersionData.docs.filter((doc) => {
        return matchingDocs.find((match) => match.id === doc.id);
    });

    filteredItems = matchingDocs.map((doc) => {
      const path = matchingPaths.find((match) => match.id === doc.id);
      return {
        docId: doc.id,
        href: path.path,
        label: doc.title,
        type: "link",
        unlisted: false,
      }
    });
  } else if (!items) {
    const category = useCurrentSidebarCategory();
    filteredItems = category.items;
  } else {
    filteredItems = items;
  }

  filteredItems = filterDocCardListItems(filteredItems);

  return filteredItems;
}


export default function DocCardList(props) {
  const {items, children} = props;

  if (children) {
    return <section className={styles.section}>{children}</section>;
  }

  let filteredItems = filterItems(items);

  return (
    <section className={styles.section}>
      {filteredItems.map((item, index) => (
        <DocCard key={index} item={item} />
      ))}
    </section>
  );
}
