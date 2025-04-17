import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 16px;
    gap: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    gap: 12px;
  }
`;

export const MapSection = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 250px;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const WidgetGrid = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-around;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;
