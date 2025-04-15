import styled from "styled-components";

export const PanelContainer = styled.div`
  position: absolute;
  top: 72px;
  right: 20px;

  width: 500px;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border: 1px solid #ddd;
  border-radius: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  padding: 60px;
  max-height: 100vh;
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  z-index: 1001; /* Ensure it's above the map */
`;

export const PanelHeader = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 15px;
`;

export const PanelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Section = styled.div`
  font-size: 15px;
  color: #444;
  word-wrap: break-word;
  padding: 10px;
  background: #f1f3f5;
  border-radius: 8px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

export const ExpandableSection = styled.div`
  margin-top: 12px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
`;

export const ExpandableButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 6px;
  text-decoration: underline;
  &:hover {
    color: #0056b3;
  }
`;

export const BusinessList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const BusinessItem = styled.li`
  font-size: 14px;
  color: #555;
  background: #eef2f7;
  padding: 8px;
  margin-bottom: 6px;
  border-radius: 6px;
`;

export const ViewMapButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease-in-out;
  &:hover {
    background-color: #0056b3;
  }
`;
