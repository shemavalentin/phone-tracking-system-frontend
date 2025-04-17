import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 100vw;
  background-color: #c2e5d3;
  overflow: hidden;
  position: fixed;
`;

export const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: margin-left 0.3s ease-in-out;
  width: calc(100% - ${(props) => (props.isCollapsed ? "80px" : "220px")});
  margin-left: ${(props) => (props.isCollapsed ? "80px" : "220px")};
  height: 100vh;
  overflow: hidden;
`;

export const ScrollableContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  max-height: calc(100vh - 60px); /* Adjust height dynamically */
  min-height: 0;
  position: relative;
  display: flex;
  flex-direction: column;

  /* Ensuring footer appears at the bottom */
  & > *:last-child {
    margin-top: auto;
  }

  /* Custom scrollbar */
  scrollbar-width: 5px;
  scrollbar-color: #888 #f1f1f1;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
