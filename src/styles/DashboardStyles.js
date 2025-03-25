import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;

export const MapSection = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 10px;
  overview: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const WidgetGrid = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
