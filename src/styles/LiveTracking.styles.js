import styled from "styled-components";
import { Container, TextField, Button } from "@mui/material";

export const LiveTrackingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  asign-items: center; /* Center content*/
  width: 100%;
  height: 100vh;
  padding-top: 20px; /*Space from navbar*/
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px; /* Space between the form and info panel*/
  flex-wrap: wrap;
`;

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100vw;
  overflow: hidden;
  margin: 0;
  padding: 0;
  transition: margin-left 0.3s ease-in-out;
`;

export const FormWrapper = styled.div`
  position: absolute;
  top: 4.5rem;
  left: ${(props) => (props.isCollapsed ? "80px" : "100px")};
  width: 350px;
  display: flex;
  // height: 500px;
  flex-direction: column;
  gap: 1rem;
  margin-left: -50px;
  background-color: #fff;
  padding: 4rem;
  border-radius: 20px;
  box-shadow: 5px 4px 15px rgba(47, 46, 46, 0.03);
  z-index: 1000;
  overflow-y: auto;
  max-height: calc(50vh - 50px);
  transition: left 0.3s ease-in-out;
`;

export const MapContainer = styled.div`
  flex-grow: 1;
  position: absolute;
  width: 100%;
  // height: 50vh; /* Can adjust the height as needed*/
  height:400px;
  margin-top: 240px;
  
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15)
  
  left: ${(props) =>
    props.isCollapsed ? "120px" : "200px"}; /* ✅ Adjust dynamically */
  right: 30px;
  bottom: ;
  z-index: 1;
  transition: left 0.3s ease-in-out;
  margin-top: 2rem;
  
  @media (max-width: 768px){
  height: 300px;
  }

  @media (max-width:480px){
  height: 250px;
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
  left: ${(props) =>
    props.isCollapsed ? "80px" : "220px"}; /* ✅ Adjust dynamically */
  top: calc(6rem + 300px);
  z-index: 2;
  transition: left 0.3s ease-in-out;
`;
