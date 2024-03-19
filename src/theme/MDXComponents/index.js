import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocCardList from '@theme/DocCardList';

import GithubReleases from "../../components/github-releases";
import VersionInjector from "../../components/version-injector";
import GlossaryTable from "../../components/glossary/table";
import Tooltip from "../../components/glossary/tool-tip";

export default {
  // Re-use the default mapping
  ...MDXComponents,

  // New mappings
    DocCardList,
  GithubReleases,
  VersionInjector,
  Tabs,
  TabItem,
  GlossaryTable,
  Tooltip,
};