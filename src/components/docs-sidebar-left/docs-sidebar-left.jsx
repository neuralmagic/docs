import React from 'react';
import styled from '@emotion/styled';

import SidebarCollapsibleNav from './sidebar-collapsible-nav';


const Scroller = styled.div`
  width: calc(100% - 40px);
  height: calc(100% - 24px);
  margin-top: 24px;
  padding-right: 40px;
  overflow: scroll;

  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */

  ::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
`;

const Container = styled.div`
  width: 100%;
  height: fit-content;
  padding-bottom: 40px;
`;


const DocsSidebarLeft = ({currentId, nestedMdxEdges}) => {
  return (
    <Scroller>
      <Container>
        <SidebarCollapsibleNav nestedMdxEdges={nestedMdxEdges}
                               currentId={currentId}
                               rootLevel={true}
                               pathIds={[]} />
      </Container>
    </Scroller>
  );
}

export default DocsSidebarLeft;
