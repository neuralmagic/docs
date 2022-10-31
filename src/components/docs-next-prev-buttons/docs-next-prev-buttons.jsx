import React from 'react';
import styled from '@emotion/styled';
import { maxMediaQueries, minMediaQueries } from "../../styles";

import IconArrowBack from '../../images/icons/icon-arrow-back.svg';
import IconArrowForward from '../../images/icons/icon-arrow-forward.svg';
import Button from "../button";
import Link from "../link";


const Container = styled.div`
  width: 100%;
  margin-top: 64px;
  display: flex;
  justify-content: space-between;
  align-items: end;

  ${maxMediaQueries["sm"]} {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledLink = styled(Link)`
  align-content: space-between;
  text-decoration: none;
  color: ${props => props.theme.textPrimary};

  ${maxMediaQueries["sm"]} {
    width: 100%;
    margin-bottom: 24px;
  }
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  min-width: 128px;
  max-width: 256px;
  padding: 8px;
  border: none;
  border-radius: 0;
  border-bottom: solid blue;
  box-sizing: border-box;

  ${maxMediaQueries["sm"]} {
    width: 100%;
    max-width: 100%;
  }
`;

const StyledRightButton = styled(StyledButton)`
  justify-content: flex-end;
`;

const Spacer = styled.div`
  width: 8px;

  ${maxMediaQueries["sm"]} {
    flex: 1 0;
  }
`;

const IconStyle = styled.div`
  height: 24px;
  width: 24px;
  color: ${props => props.theme.textPrimary};
  fill: ${props => props.theme.textPrimary};
  display: flex;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;


const flattenMdxEdges = (edges, flattened) => {
  edges.forEach((edge) => {
    flattened.push(edge);
    if (edge.children.length > 0) {
      flattenMdxEdges(edge.children, flattened);
    }
  });

  return flattened;
}


const getNextPrevMdxEdges = (currentId, flattenedEdges) => {
  const cleanedEdges = [];
  flattenedEdges.forEach((edge) => {
    if (!edge.targetURL && (!edge.skipToChild || edge.slug === "/")) {
      cleanedEdges.push(edge);
    }
  });

  let currentIndex = -1;
  let current = null;

  cleanedEdges.every((edge, index) => {
    if (edge.id === currentId) {
      currentIndex = index;
      current = edge;
      return false;
    }

    return true;
  });

  if (currentIndex === 0) {
    currentIndex += 1;  // adjust for home having child of itself
  }

  let prevIndex = currentIndex;
  let prev = null;

  while (prevIndex - 1 > 0 && !prev) {
    prevIndex--;
    if (cleanedEdges[prevIndex].navLink !== current.navLink) {
      prev = cleanedEdges[prevIndex];
    }
  }

  let nextIndex = currentIndex + 1;
  let next = nextIndex < cleanedEdges.length ? cleanedEdges[nextIndex]: null;

  return {
    current: current,
    prev: prev,
    next: next,
  }
}


const DocsNextPrevButtons = ({currentId, nestedMdxEdges}) => {
  const flattenedEdges = flattenMdxEdges(nestedMdxEdges, []);
  const {prev, next} = getNextPrevMdxEdges(currentId, flattenedEdges);

  return (
    <Container>
      {prev ? (
        <StyledLink to={prev.navLink}>
          <StyledButton>
            <IconStyle>
              <IconArrowBack />
            </IconStyle>
            <Spacer />
            <div>{prev.metaTitle}</div>
          </StyledButton>
      </StyledLink>
      ) : ""}
      <div />
      {next ? (
        <StyledLink to={next.navLink}>
          <StyledRightButton>
            <div>{next.metaTitle}</div>
            <Spacer />
            <IconStyle>
              <IconArrowForward />
            </IconStyle>
          </StyledRightButton>
        </StyledLink>
      ) : ""}
    </Container>
  );
}

export default DocsNextPrevButtons;
