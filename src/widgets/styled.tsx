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
  font-weight: bold;
  font-size: 16px;
`;

export const LabelWithIcon = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    margin-right: 8px;
    color: #0095ff;
    font-size: 18px;
  }
`;
