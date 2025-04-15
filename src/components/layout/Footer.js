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
<<<<<<< HEAD
        &copy; {new Date().getFullYear()} Future Forge AI Systems. All rights
=======
        &copy; {new Date().getFullYear()} Live Tracking System. All rights
>>>>>>> 7da024d (Change API url from local host to production)
        reserved.
      </FooterText>

      <FooterLinks>
<<<<<<< HEAD
        <a href="/terms"> Terms of Service</a>
        <a href=" "> || </a>
=======
        <a href="/terms">Terms of Service</a>
>>>>>>> 7da024d (Change API url from local host to production)
        <a href="/privacy">Privacy Policy</a>
      </FooterLinks>
    </FooterContainer>
  );
});

export default Footer;
