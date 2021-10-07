import styled from "styled-components";
import { centeredDiv } from "styles/mixins";

export const NavButtonWrapper = styled.button`
  ${centeredDiv}

  background-color: ${({ theme }) => theme.colors.navBg};
`;

export const NavButtonText = styled.div`
  margin-left: ${({ theme }) => theme.paddings.navPadding};
`;
