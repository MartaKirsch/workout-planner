import styled from "styled-components";
import { columnDiv, spaceBetweenDiv } from "styles/mixins";

export const ExerciseTileLi = styled.li`
  margin: 0;
  padding: 0;
  width: 100%;

  &:not(:first-child) {
    margin-top: 80px;
  }
`;

export const ExerciseTileWrapper = styled.button`
  ${columnDiv}

  margin: 0;
  padding: var(--exercise-tile-padding);
  width: 100%;

  background-color: ${({ theme }) => theme.colors.exerciseTile.bg};

  border-radius: 15px;

  position: relative;
  z-index: 1;

  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    transform-origin: 100% 50%;
    transform: scaleX(0);

    transition: transform 0.5s ease-out;

    background-color: ${({ theme }) => theme.colors.exerciseTile.activeBg};
  }

  &:hover::after,
  &:focus::after {
    transform-origin: 0% 50%;
    transform: scaleX(1);
  }
`;

export const ExerciseTileRow = styled.div`
  ${spaceBetweenDiv}

  width: 100%;

  &:last-child {
    justify-content: flex-start;
    margin-top: 26px;
  }
`;
export const ExerciseTileCol = styled.div`
  ${columnDiv}
  justify-content: space-between;
  align-items: flex-start;

  width: calc(100% - var(--exercise-tile-image-width) - 14px);
  height: var(--exercise-tile-image-width);
`;

export const ExerciseTileImageWrapper = styled.div`
  height: var(--exercise-tile-image-width);
  width: var(--exercise-tile-image-width);

  background-color: ${({ theme }) =>
    theme.colors.exerciseTile.imgPlaceholderBg};

  border-radius: 10px;
  overflow: hidden;
`;

export const ExerciseTileImage = styled.img`
  height: 100%;
  width: auto;
`;

export const ExerciseTileTippyImage = styled.img`
  height: auto;
  width: 300px;
`;

export const ExerciseTileName = styled.div`
  color: ${({ theme }) => theme.colors.exerciseTile.color};
  font-size: ${({ theme }) => theme.fonts.sizes.l};
  font-family: ${({ theme }) => theme.fonts.families.normal};

  text-align: left;

  width: 100%;
`;

export const ExerciseTileTagName = styled.div`
  color: ${({ theme }) => theme.colors.exerciseTile.tagColor};
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  font-family: ${({ theme }) => theme.fonts.families.fancy};
`;

export const ExerciseTileBodyPart = styled.div`
  height: 30px;
  width: 30px;

  svg {
    height: 30px;
    width: 30px;
  }

  &:not(:first-child) {
    margin-left: 20px;
  }
`;
