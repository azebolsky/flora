import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  background-color: var(--primary-color);
  color: white;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <h1>&copy; Adam Zebolsky 2020</h1>
    </FooterContainer>
  );
};

export default Footer;
