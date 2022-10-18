import React from 'react';
import styled from '@emotion/styled';
import { useAlert } from 'react-alert'

import IconCopy from '../images/icons/icon-copy.svg';

const Button = styled.div`
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: ${props => props.theme.primaryFaded};
  }
`;

const SidebarIcon = styled.div`
  height: 20px;
  width: 20px;
  color: ${props => props.theme.textSecondary};
  fill: ${props => props.theme.textSecondary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CopyButton = ({text, ...props}) => {
  const alert = useAlert()
  const clicked = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        alert.show('Copied to clipboard');
      });

      return;
    }

    let textArea = document.createElement("textarea");
    textArea.value = text;
    // make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    return new Promise((res, rej) => {
      // here the magic happens
      document.execCommand('copy') ? res() : rej();
      textArea.remove();
      alert.show('Copied to clipboard');
    });
  }

  return (
    <Button {...props} onClick={clicked}>
      <SidebarIcon>
        <IconCopy css={{height: '100%', width: '100%'}} />
      </SidebarIcon>
    </Button>
  );
}

export default CopyButton;
