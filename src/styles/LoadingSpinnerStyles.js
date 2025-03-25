import styled, { keyframes } from "styled-components";

const spin = keyframes`

0% { transform: rotate(0deg);}
100% { tranform: rotate(360deg)}

`;

export const SpinnerContainer = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 255, 0.3);
  border-top: 4px solid blue;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: auto;
`;
