import styled from "styled-components";
import { centeredLeftDiv } from "styles/mixins";

export const LogoBarWrapper = styled.div`
  ${centeredLeftDiv};

  height: var(--logobar-height);

  padding: 0 40px;
`;

export const LogoBarText = styled.h2`
  font-size: ${({ theme }) => theme.fonts.sizes.xxs};
  color: ${({ theme }) => theme.fonts.colors.dark};
`;
