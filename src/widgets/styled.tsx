import styled from "styled-components";

export const FlexStart = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const FlexEnd = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexCenterCol = styled(FlexCenter)`
  flex-direction: column;
`;

export const FlexExpand = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FullPage = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export const TabTitle = styled.div`
  padding: 0 40px;
  fontweight: bold;
  fontsize: 16px;
`;
