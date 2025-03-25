import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #c2e5d3; /* Dark blue footer */
  color: #29465b; /* White text */
  text-align: center;
  padding: 15px 20px;
  font-size: 14px;
  font-weight: 500;
  width: 100%;

  /* Ensures footer is always pushed to bottom if content is short */
  margin-top: auto;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 12px;
  }
`;

export const FooterText = styled.p`
  margin: 0;
  opacity: 0.9;
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 8px;

  a {
    color: #29465b;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #ffcc00; /* Yellow on hover */
    }
  }
`;
