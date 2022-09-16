import { css } from '@emotion/react';

const globalStyles = css`
  html, body, #root {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    color: rgb(40, 48, 61);
    line-height: 150%;

    h1 {
      line-height: 110%;
    }
  }

  a {
    color: rgb(0, 0, 255);
    cursor: pointer;
    text-decoration-color: rgb(0, 0, 255);
    text-decoration-line: underline;
    text-decoration-skip-ink: auto;
    text-decoration-style: solid;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
  }

  a:hover {
    text-decoration-style: dotted;
  }
`;

export const mediaQueryBreakPoints = {
  xs: 420,
  sm: 576,
  md: 768,
  lg: 900,
  xl: 1200,
  xxl: 1536
};

export const minMediaQueries = Object.keys(mediaQueryBreakPoints)
  .map((key) => [key, mediaQueryBreakPoints[key]])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media (min-width: ${breakpoint}px)`;
    return prev;
  });

export const maxMediaQueries = Object.keys(mediaQueryBreakPoints)
  .map((key) => [key, mediaQueryBreakPoints[key]])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media (max-width: ${breakpoint}px)`;
    return prev;
  });

export default globalStyles;
