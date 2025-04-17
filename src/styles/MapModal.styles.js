import styled from "styled-components";

// Dark semi-transparent background
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

// Modal box with responsive size and dynamic fullscreen option
export const ModalContainer = styled.div`
  background: white;
  width: ${(props) => (props.isMaximized ? "95%" : "50%")};
  height: ${(props) => (props.isMaximized ? "85%" : "50%")};
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;

  @media (max-width: 1024px) {
    width: ${(props) => (props.isMaximized ? "95%" : "70%")};
    height: ${(props) => (props.isMaximized ? "85%" : "60%")};
  }

  @media (max-width: 768px) {
    width: 95%;
    height: ${(props) => (props.isMaximized ? "85%" : "70%")};
  }

  @media (max-width: 480px) {
    width: 98%;
    height: ${(props) => (props.isMaximized ? "90%" : "80%")};
    border-radius: 8px;
  }
`;

// Modal title bar
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: #1976d2;
  color: white;
  font-size: 16px;
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 12px;
  }
`;

// Close ("X") button
export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// Minimize/Toggle fullscreen button
export const MinimizeButton = styled.button`
  background: #1565c0;
  border: none;
  color: white;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 4px 8px;
    margin-right: 6px;
  }
`;
