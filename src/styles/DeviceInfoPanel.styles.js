import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";

export const ResponsivePanelContainer = styled.div`
  position: absolute;
  top: 72px;
  right: 20px;
  width: 90%;
  max-width: 500px;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border: 1px solid #ddd;
  border-radius: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #ddd;
  border-radius: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  padding: 60px 40px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  transition: transform 0.4s ease-in-out, opacity 0.3s ease;
  z-index: 1001;

  transform: ${({ isVisible }) =>
    isVisible ? "translateX(0)" : "translateX(120%)"};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};

  @media (max-width: 768px) {
    left: 5%;
    right: 5%;
    padding: 30px 20px;
    width: 90%;
  }

  @media (max-width: 480px) {
    padding: 25px 16px;
    font-size: 14px;
  }
`;

export const PanelHeader = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #2e2e2e;
  text-align: center;
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const PanelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Section = styled.div`
  font-size: 15px;
  color: #333;
  word-wrap: break-word;
  padding: 12px;
  background: #f4f6f8;
  border-left: 4px solid #007bff;
  border-radius: 8px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const ExpandableSection = styled.div`
  margin-top: 12px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
`;

export const ExpandableButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  padding: 6px 0;
  transition: color 0.2s;

  &:hover {
    color: #0056b3;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const ChevronIcon = styled(FaChevronDown)`
  transition: transform 0.3s ease-in-out;
  &.rotated {
    transform: rotate(180deg);
  }
`;

export const AccordionWrapper = styled.div`
  overflow: hidden;
  transition: height 0.4s ease;
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
  padding: 10px 12px;
  margin-bottom: 8px;
  border-radius: 6px;
  border-left: 3px solid #007bff;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const ViewMapButton = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 12px;
  }
`;
