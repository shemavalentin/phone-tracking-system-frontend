import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #c2e5d3;
  color: #29465b;
  text-align: center;
  padding: 15px 20px;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  margin-top: auto;

  @media (max-width: 1024px) {
    padding: 14px 16px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    padding: 12px 14px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 11px;
  }
`;

export const FooterText = styled.p`
  margin: 0;
  opacity: 0.9;

  @media (max-width: 480px) {
    line-height: 1.4;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 8px;

  a {
    color: #29465b;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #ffcc00;
    }

    @media (max-width: 768px) {
      font-size: 13px;
    }

    @media (max-width: 480px) {
      font-size: 12px;
      padding: 2px 6px;
    }
  }
`;
