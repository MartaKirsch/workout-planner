import styled from "styled-components";
import { columnDiv } from "styles/mixins";

export const MainFormWrapper = styled.div`
  ${columnDiv}
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.loginForm.bg};

  padding: 56px 0;

  overflow-y: hidden;
`;

export const MainFormInside = styled.form`
  ${columnDiv}

  width:100%;
  height: 100%;
  padding: 0 56px;

  overflow-y: auto;

  @-moz-document url-prefix() {
    /* Disable scrollbar Firefox */
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.loginForm.scrollbarThumb}
      ${({ theme }) => theme.colors.loginForm.bg};
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.loginForm.bg};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.loginForm.scrollbarThumb};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.loginForm.scrollbarThumbActive};
  }
`;
