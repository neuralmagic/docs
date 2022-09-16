import React from 'react';
import styled from '@emotion/styled';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { MDXProvider } from '@mdx-js/react';

import DocsSidebarLeft from '../components/docs-sidebar-left';
import DocsSidebarRight from '../components/docs-sidebar-right';
import mdxComponents from '../components/mdx';
import DocsContentHeader from '../components/docs-content-header';
import DocsNextPrevButtons from "../components/docs-next-prev-buttons";
import { maxMediaQueries, minMediaQueries } from "../styles";
import DocsSidebarLeftMobile from "../components/docs-sidebar-left/docs-sidebar-left-mobile";


const ContainerDiv = styled.div`
  width: 100%;
  max-width: 1360px;
  height: fit-content;
  margin: 0 auto 28px auto;
  padding-left: 80px;
  padding-right: 80px;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;

  ${maxMediaQueries["xl"]} {
    padding-left: 40px;
    padding-right: 40px
  }

  ${maxMediaQueries["lg"]} {
    padding-left: 24px;
    padding-right: 24px
  }
`;

const Sidebar = styled.aside`
  height: 100vh;
  overflow: auto;
  position: fixed;
  padding-left: 0;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;
`;

const SidebarLeftContainer = styled(Sidebar)`
  flex: 0 0 272px;
  display: flex;

  ${maxMediaQueries["md"]} {
    display: none;
  }
`;

const SidebarLeftMobileStyled = styled(DocsSidebarLeftMobile)`
  ${minMediaQueries["md"]} {
    display: none;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1 1;
`;

const SidebarDivLeftContainer = styled.div`
  flex: 0 0 1px;
  height: calc(100% - 40px);
  margin-top: 40px;
  ${maxMediaQueries["md"]} {
    display: none;
  }
`;

const SidebarDivLeft = styled.div`
  width: 1px;
  height: 100%;
  background-color: black;
`;

const MainContentContainer = styled.div`
  flex: 1;
  margin: 40px;
  width: 1px;

  ${maxMediaQueries["md"]} {
    margin: 0;
    margin-bottom: 24px;
  }
`;

const SidebarRightContainer = styled(Sidebar)`
  flex: 0 0 176px;
  ${maxMediaQueries["xl"]} {
    display: none;
  }
`;

const recursiveNestAndOrderDocs = (edgesDict, parent) => {
  const children = [];
  // put any docs under /index folder to root
  const childMatch = parent.replace("/index", "") + "/";

  Object.keys(edgesDict).forEach((key) => {
    if (!edgesDict[key]) {
      return;
    }

    const edge = edgesDict[key];
    // put any docs under /index folder to root
    const testKey = key.indexOf("/index") === -1 ? key : key.replace("/index", "");
    const isChild = testKey.indexOf(childMatch) === 0;
    const isGrandChild = isChild && testKey.indexOf("/", childMatch.length) > 0;

    if (isChild && !isGrandChild) {
      delete edgesDict[key];
      edge['children'] = recursiveNestAndOrderDocs(edgesDict, edge.slug);
      edge['navLink'] = edge.skipToChild && edge.children.length > 0 ? edge.children[0].navLink : edge.slug;
      children.push(edge);
    }
  });
  children.sort((a, b) => (a.index > b.index) ? 1 : -1);

  return children;
}


const flattenMdxEdges = (allMdx) => {
  const edges = {};

  allMdx.edges.forEach((edge) => {
    const remappedEdge = {
      ...edge.node.fields, ...edge.node.frontmatter
    }
    edges[remappedEdge.slug] = remappedEdge;
  });

  return edges;
}


const nestAndOrderMdx = (allMdx) => {
  const edgesDict = flattenMdxEdges(allMdx);
  const nestedMdxEdges = recursiveNestAndOrderDocs(edgesDict, "");

  // fix home children to include root index and anything nested under /index folder
  const homeChild = Object.assign({}, nestedMdxEdges[0]);
  homeChild.children = [];
  nestedMdxEdges[0].children.push(homeChild);
  nestedMdxEdges.forEach((child, index) => {
    if (child.slug.indexOf("/index/") === 0) {
      nestedMdxEdges[0].children.push(child);
      delete nestedMdxEdges[index];
    }
  });

  return nestedMdxEdges;
}


const DocsLayout = ({ mdxFields, mdxFrontMatter, mdxTOC, allMdx, children }) => {
  const nestedMdxEdges = nestAndOrderMdx(allMdx);

  return (
   <ContainerDiv>
     <SidebarLeftContainer>
       <DocsSidebarLeft currentId={mdxFields.id} nestedMdxEdges={nestedMdxEdges} />
     </SidebarLeftContainer>
     <SidebarLeftMobileStyled currentId={mdxFields.id} nestedMdxEdges={nestedMdxEdges} />
     <MainContainer>
       <SidebarDivLeftContainer>
         <SidebarDivLeft />
       </SidebarDivLeftContainer>
       <MainContentContainer>
         <DocsContentHeader currentId={mdxFields.id} nestedMdxEdges={nestedMdxEdges} githubURL={mdxFrontMatter.githubURL} />
         <MDXProvider components={mdxComponents}>
           <MDXRenderer>
             {children}
           </MDXRenderer>
         </MDXProvider>
         <DocsNextPrevButtons currentId={mdxFields.id} nestedMdxEdges={nestedMdxEdges} />
       </MainContentContainer>
     </MainContainer>
     <SidebarRightContainer>
       <DocsSidebarRight currentSlug={mdxFields.slug} mdxTOC={mdxTOC} githubURL={mdxFrontMatter.githubURL} />
     </SidebarRightContainer>
   </ContainerDiv>
  );
}

export default DocsLayout;
