import React from "react";
import styled, { keyframes } from "styled-components";

const victoryAnimation = keyframes`
  0% {
    box-shadow: none;
  }
  50% {
    box-shadow: inset 0 0 3px 3px #ffbb00;
  }
  100% {
    box-shadow: none;
  }
`;

let TilePiece = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${({ background }) => background});
  background-origin: content-box;
  background-position: left -${({ positionX }) => positionX} top -${({
      positionY,
    }) => positionY};
  transition: transform 0.25s ease-in-out;
  border-radius: ${({ borderRadius }) => borderRadius};
  transform: ${({ rotation }) => rotation};
  animation-name: ${({ gameWon }) => gameWon && victoryAnimation};
  animation-duration: 1s;
  animation-delay: ${({ delay }) => `${delay * 0.01}s`};
  animation-iteration-count: 1;
  &:hover {
    box-shadow: inset 0 0 3px 3px #e7e7e7;
  }
  cursor: pointer;
`;

const Tiles = ({ background, grid, onRotate, gameWon }) => {
  return (
    <>
      {grid
        ? grid.map(
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
                  delay={originalPosition}
                  background={background}
                  positionX={positionX}
                  positionY={positionY}
                  borderRadius={borderRadius}
                  rotation={rotation}
                  gameWon={gameWon}
                  onClick={() => onRotate(originalPosition, numberOfRotations)}
                ></TilePiece>
              );
            }
          )
        : ""}
    </>
  );
};

export default Tiles;
