import styled from "styled-components";
import { columnDiv } from "styles/mixins";

export const MainFormWrapper = styled.form`
  ${columnDiv}

  width:100%;

  background-color: ${({ theme }) => theme.colors.loginForm.bg};

  padding: 56px;

  overflow-y: auto;
`;
