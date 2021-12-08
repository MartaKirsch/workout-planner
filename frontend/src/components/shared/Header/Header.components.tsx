import styled from "styled-components";
import { centeredDiv } from "../../../styles/mixins";

export const HeaderWrapper = styled.header<{ stretch?: boolean }>`
  width: ${({ stretch }) => (stretch ? "100%" : "588px")};
  height: 25px;

  ${centeredDiv}

  background-color: ${({ theme }) => theme.colors.headerBg};

  position: relative;
`;

export const HeaderText = styled.h1`
  color: ${({ theme }) => theme.fonts.colors.dark};
  font-size: ${({ theme }) => theme.fonts.sizes.m};
  font-weight: normal;

  position: absolute;
  bottom: -4px;
`;
