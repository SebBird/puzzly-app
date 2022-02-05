import React from "react";
import styled from "styled-components";

let TilePiece = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.background});
  background-origin: content-box;
  background-position: left -${(props) => props.positionX} top -${(props) =>
      props.positionY};
  transition: transform 0.25s ease-in-out;
  border-radius: ${(props) => props.borderRadius};
  transform: ${(props) => props.rotation};
  &:hover {
    box-shadow: inset 0 0 3px 3px #e7e7e7;
  }
  cursor: pointer;
`;

const Tiles = ({ background, grid, onRotate }) => {
  return (
    <>
      {grid.map(
        ({
          positionX,
          positionY,
          borderRadius,
          originalPosition,
          rotation,
          numberOfRotations,
        }) => {
          return (
            <TilePiece
              key={originalPosition}
              background={background}
              positionX={positionX}
              positionY={positionY}
              borderRadius={borderRadius}
              rotation={rotation}
              onClick={() => onRotate(originalPosition, numberOfRotations)}
            ></TilePiece>
          );
        }
      )}
    </>
  );
};

export default Tiles;
