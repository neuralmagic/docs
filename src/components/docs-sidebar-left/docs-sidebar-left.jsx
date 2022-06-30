import React from 'react';
import styled from '@emotion/styled';

import SidebarCollapsibleNav from './sidebar-collapsible-nav';


const Container = styled.div`
  width: calc(100% - 40px);
  height: calc(100% - 24px);
  padding: 24px 40px 0 0;
`;


const DocsSidebarLeft = ({currentId, nestedMdxEdges}) => {
  return (
    <Container>
      <SidebarCollapsibleNav nestedMdxEdges={nestedMdxEdges}
                             currentId={currentId}
                             rootLevel={true}
                             pathIds={[]} />
    </Container>
  );
}

export default DocsSidebarLeft;
