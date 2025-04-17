import styled from "styled-components";
import { Container, TextField, Button } from "@mui/material";

// Wrapper for the whole Live Tracking page
export const LiveTrackingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding-top: 20px;

  @media (max-width: 768px) {
    padding-top: 10px;
  }
`;

// Top section where form and info panel may sit side-by-side
export const TopSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px;
  flex-wrap: wrap;
`;

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  transition: margin-left 0.3s ease-in-out;
  flex-wrap: wrap;
`;

export const FormWrapper = styled.div`
  position: absolute;
  top: 4.5rem;
  left: ${(props) => (props.isCollapsed ? "80px" : "100px")};
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
  padding: 4rem;
  border-radius: 20px;
  box-shadow: 5px 4px 15px rgba(47, 46, 46, 0.03);
  z-index: 1000;
  overflow-y: auto;
  max-height: calc(50vh - 50px);
  transition: left 0.3s ease-in-out;

  @media (max-width: 1024px) {
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    padding: 2rem;
  }

  @media (max-width: 600px) {
    top: 3rem;
    width: 95%;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    top: 2rem;
    padding: 1rem;
    border-radius: 10px;
  }
`;

export const MapContainer = styled.div`
  flex-grow: 1;
  position: absolute;
  width: 100%;
  height: 400px;
  margin-top: 240px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  left: ${(props) => (props.isCollapsed ? "120px" : "200px")};
  right: 30px;
  z-index: 1;
  transition: left 0.3s ease-in-out;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    left: 10px;
    right: 10px;
    width: calc(100% - 20px);
  }

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 250px;
    border-radius: 8px;
  }
`;

export const StyledTextField = styled(TextField)`
  width: 100%;
`;

export const StyledButton = styled(Button)`
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  position: fixed;
  left: ${(props) => (props.isCollapsed ? "80px" : "220px")};
  top: calc(6rem + 300px);
  z-index: 2;
  transition: left 0.3s ease-in-out;

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    top: calc(100% - 80px);
  }

  @media (max-width: 480px) {
    top: calc(100% - 70px);
  }
`;
