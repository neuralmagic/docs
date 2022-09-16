import React, { useState } from 'react';
import styled from '@emotion/styled';
import Link from '../link';
import AnimateHeight from 'react-animate-height';

import IconHome from '../../images/icons/icon-home.svg';
import IconDot from '../../images/icons/icon-dot.svg';
import IconArrowDropDown from '../../images/icons/icon-arrow-dropdown.svg';
import IconArrowRight from '../../images/icons/icon-arrow-right.svg';

const SidebarCollapsibleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemContainer = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

const ChildContainer = styled.div`
  padding-left: ${props => props.rootLevel ? 0 : '24px'};
  display: flex;
  flex-direction: column;
`;

const SidebarIcon = styled.div`
  height: ${props => props.iconSmall ? '6px' : '12px'};
  width: ${props => props.iconSmall ? '6px' : '12px'};
  flex: 0 0 ${props => props.iconSmall ? '6px' : '12px'};
  margin-right: ${props => props.iconSmall ? '8px' : '4px'};
  margin-left: ${props => props.iconSmall ? '2px' : '0px'};
  color: ${props => props.selected ? props.theme.textPrimary : props.theme.textSecondary};
  fill: ${props => props.selected ? props.theme.textPrimary : props.theme.textSecondary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SidebarItemText = styled.div`
  text-decoration: none;
  font-size: 16px;
  font-weight: ${props => props.selected || props.rootLevel ? 'bold' : 'normal'};
  text-transform: ${props => props.rootLevel ? 'uppercase' : 'inherit'};
  color: ${props => props.rootLevel ?
    props.theme.primary : props.selectedPath ?
      props.theme.textPrimary : props.theme.textSecondary};

  &:hover {
    color: ${props => props.rootLevel ? props.theme.primary : props.theme.textPrimary};
  }
`;

const SidebarTextContainer = styled.div`
  padding-top: ${props => props.rootLevel ? "16px" : "4px"};
  display: flex;
  align-items: center;
`;

const SidebarLinkText = styled(Link)`
  text-decoration: none;
`;


const SidebarLink = ( {title, link, rootLevel, selected, selectedPath, hasChildren, childrenOpen, onClick} ) => {
  let Icon;
  let iconSmall = false;

  if (rootLevel) {
    Icon = null;
  } else if (link === "/") {
    Icon = IconHome;
  } else if (!hasChildren) {
    Icon = IconDot;
    iconSmall = true; // scale dot down
  } else if (childrenOpen) {
    Icon = IconArrowDropDown;
  } else {
    Icon = IconArrowRight;
  }

  return (
    <SidebarTextContainer to={link} rootLevel={rootLevel}>
      {Icon ? <SidebarIcon iconSmall={iconSmall} selected={selected} onClick={onClick}>
        <Icon css={{height: '100%', width: '100%'}} />
      </SidebarIcon> : ""}
      <SidebarLinkText to={link}>
        <SidebarItemText selected={selected} selectedPath={selectedPath} rootLevel={rootLevel}>
          {title}
        </SidebarItemText>
      </SidebarLinkText>
    </SidebarTextContainer>
  );
}


const SidebarItem = ({ currentId, rootLevel, edge, pathIds }) => {
  const [childrenOpen, setChildrenOpen] = useState(null);
  const selected = currentId === edge.id;
  const hasChildren = edge.children.length > 0;

  const recursiveChildIds = (edge) => {
    const childIds = [];
    edge.children.forEach((child) => {
      const grandChildIds = recursiveChildIds(child);
      grandChildIds.forEach((id) => {
        childIds.push(id);
      });
    });
    childIds.push(edge.id);

    return childIds;
  }
  const childIds = recursiveChildIds(edge);
  const selectedPath = childIds.indexOf(currentId) > -1;

  if (selectedPath && childrenOpen === null) {
    setChildrenOpen(true);
  }

  return (
    <ItemContainer>
      <SidebarLink onClick={() => setChildrenOpen(!childrenOpen)}
                   title={edge.title}
                   link={edge.targetURL ? edge.targetURL : edge.navLink}
                   rootLevel={rootLevel}
                   selected={selected}
                   selectedPath={selectedPath}
                   hasChildren={hasChildren}
                   childrenOpen={childrenOpen} />
      {hasChildren ? (
        <AnimateHeight height={childrenOpen || rootLevel ? 'auto': 0}>
          <ChildContainer rootLevel={rootLevel}>
            <SidebarCollapsibleNav nestedMdxEdges={edge.children}
                                   currentId={currentId}
                                   rootLevel={false}
                                   pathIds={pathIds} />
          </ChildContainer>
        </AnimateHeight>
      ) : ""
      }
    </ItemContainer>
  );
};


const SidebarCollapsibleNav = ({ nestedMdxEdges, currentId, rootLevel, pathIds }) => {
  return (
    <SidebarCollapsibleContainer>
      {nestedMdxEdges.map((edge) => (
        <SidebarItem key={edge.id}
                     currentId={currentId}
                     rootLevel={rootLevel}
                     edge={edge}
                     pathIds={[...pathIds, edge.id]}
        />
      ))}
    </SidebarCollapsibleContainer>
  )
}


export default SidebarCollapsibleNav;
