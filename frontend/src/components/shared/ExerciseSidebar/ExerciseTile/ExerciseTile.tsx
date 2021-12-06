import React, { FunctionComponent, useCallback } from "react";
import { IMAGES_URL } from "utils/backend.endpoints";
import { BodyPart } from "utils/types/bodyParts";
import {
  ExerciseTileCol,
  ExerciseTileImage,
  ExerciseTileImageWrapper,
  ExerciseTileLi,
  ExerciseTileRow,
  ExerciseTileName,
  ExerciseTileTagName,
  ExerciseTileWrapper,
  ExerciseTileBodyPart,
  ExerciseTileTippyImage,
} from "./ExerciseTile.components";
import { ReactComponent as ArmsIcon } from "images/smBodyParts/arms.svg";
import { ReactComponent as LegsIcon } from "images/smBodyParts/legs.svg";
import { ReactComponent as AbsIcon } from "images/smBodyParts/abs.svg";
import { ReactComponent as ChestIcon } from "images/smBodyParts/chest.svg";
import { ReactComponent as BackIcon } from "images/smBodyParts/back.svg";
import { ReactComponent as MultiIcon } from "images/smBodyParts/multiJoint.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
interface Props {
  name: string;
  imgSrc: string;
  type: string;
  bodyParts: { name: BodyPart }[];
  onClick?: () => void | Promise<void>;
}

const ExerciseTile: FunctionComponent<Props> = ({
  name,
  imgSrc,
  type,
  bodyParts,
  onClick,
}) => {
  const renderIcon = useCallback((part: BodyPart) => {
    switch (part) {
      case "ARMS":
        return <ArmsIcon />;
      case "LEGS":
        return <LegsIcon />;
      case "CHEST":
        return <ChestIcon />;
      case "MULTI_JOINT":
        return <MultiIcon />;
      case "ABS":
        return <AbsIcon />;
      case "BACK":
        return <BackIcon />;
      default:
        return <></>;
    }
  }, []);

  return (
    <ExerciseTileLi>
      <ExerciseTileWrapper onClick={onClick}>
        <ExerciseTileRow>
          <ExerciseTileImageWrapper>
            {imgSrc && (
              <Tippy
                content={
                  <ExerciseTileTippyImage
                    src={`${IMAGES_URL}/${imgSrc}`}
                    alt="exercise"
                  />
                }
                delay={500}
              >
                <ExerciseTileImage src={`${IMAGES_URL}/${imgSrc}`} />
              </Tippy>
            )}
          </ExerciseTileImageWrapper>
          <ExerciseTileCol>
            <ExerciseTileName>{name}</ExerciseTileName>
            <ExerciseTileTagName>
              {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
            </ExerciseTileTagName>
          </ExerciseTileCol>
        </ExerciseTileRow>
        <ExerciseTileRow>
          {bodyParts.map((part) => (
            <ExerciseTileBodyPart key={part.name} title={part.name}>
              {renderIcon(part.name)}
            </ExerciseTileBodyPart>
          ))}
        </ExerciseTileRow>
      </ExerciseTileWrapper>
    </ExerciseTileLi>
  );
};

export default ExerciseTile;
