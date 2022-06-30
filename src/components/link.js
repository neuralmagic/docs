import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import isAbsoluteUrl from 'is-absolute-url';

const Link = ({ to, ...props }) => {
  if (!to) {
    return (
      <span {...props}>
        {props.children}
      </span>
    )
  }

  if (isAbsoluteUrl(to)) {
    return (
      <a href={to} {...props}>
        {props.children}
      </a>
    )
  }

  return (
    <GatsbyLink to={to} {...props} />
  )
}

export default Link;
