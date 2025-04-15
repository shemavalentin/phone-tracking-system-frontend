import React from "react";
import {
  FooterContainer,
  FooterText,
  FooterLinks,
} from "../../styles/FooterStyles";

const Footer = React.memo(() => {
  return (
    <FooterContainer>
      <FooterText>
        &copy; {new Date().getFullYear()} Live Tracking System. All rights
        reserved.
      </FooterText>

      <FooterLinks>
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
      </FooterLinks>
    </FooterContainer>
  );
});

export default Footer;
