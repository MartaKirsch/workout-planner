import styled from "styled-components";
import ContentWrapper from "components/shared/ContentWrapper";
import { columnDiv } from "styles/mixins";

export const LoginPageWrapper = styled(ContentWrapper)`
  ${columnDiv}

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
