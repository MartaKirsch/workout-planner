import styled from "styled-components";
import { columnDiv } from "styles/mixins";

export const LoginPageWrapper = styled.main`
  ${columnDiv}

  height:calc(100vh - var(--logobar-height));
  width: 100%;
  padding: 54px;
`;

export const LoginPageHeaderWrapper = styled.div`
  ${columnDiv}
`;

export const LoginPageHeaderText = styled.p`
  width: 470px;

  margin-top: 32px;

  text-align: center;
`;
