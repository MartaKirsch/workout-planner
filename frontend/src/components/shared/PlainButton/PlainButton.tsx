import styled from "styled-components";

const PlainButton = styled.button`
  color: ${({ theme }) => theme.colors.plainButton.textColor};
  font-size: ${({ theme }) => theme.fonts.sizes.xs};

  background-color: transparent;

  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;

    height: ${({ theme }) => theme.borders.superThin};
    width: 100%;

    transform: scaleX(0);
    transition: transform 0.2s ease-out;

    background-color: ${({ theme }) => theme.colors.plainButton.bg};
  }

  &:hover::after,
  &:focus::after {
    transform: scaleX(100%);
  }
`;

export default PlainButton;
