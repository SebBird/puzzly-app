import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { fetchPuzzlePicture } from "../Functions/fetchPuzzlePicture";
import { createGrid } from "../Functions/createGrid";
import Tiles from "./Tiles";
import Button from "./Button";
import LoadingIcon from "../Assets/loading.svg";

const PageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

const HeaderDiv = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const victoryAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.85);
  }
  100% {
    transform: scale(1);
  }
`;
const loadingAnimation = keyframes`
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
`;

const Header = styled.header`
  letter-spacing: 0.6rem;
  padding: 2rem 0;
  user-select: none;
  animation-name: ${({ gameWon }) => (gameWon ? victoryAnimation : "")};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  h1 {
    display: inline-block;
    transition: all 0.5s;
    transform: ${(props) =>
      props.gameWon ? "rotate(360deg)" : "rotate(0deg)"};
  }
`;

const GameContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 0;
  height: 700px;
  width: 700px;
  background-color: #3a3a3a;
  box-shadow: 0 0 10px 10px #131313;
  padding: 15px;
  border-radius: 30px;
  text-align: center;
  transform-origin: top;
  @media (max-width: 1024px) {
    transform: scale(0.8);
  }
  @media (max-width: 768px) {
    transform: scale(0.75);
  }
  @media (max-width: 650px) {
    transform: scale(0.6);
  }
  @media (max-width: 500px) {
    transform: scale(0.5);
  }
  @media (max-width: 375px) {
    transform: scale(0.4);
  }
  @media (max-width: 320px) {
    transform: scale(0.3);
  }
`;

const LoadingMsg = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  visibility: ${({ loaded }) => (loaded ? "hidden" : "visible")};
  font-size: 2rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 5rem;
    padding: 1rem;
    filter: contrast(0%);
    animation: ${loadingAnimation} 2s linear infinite;
  }
`;

let gridSize = 7;

const Picture = () => {
  let [pictureBG, setPictureBG] = useState("");
  let [pictureGrid, setPictureGrid] = useState("");
  let [gameWon, setGameWon] = useState(false);

  const handleRotation = (tile, numberOfRotations) => {
    let newPictureGrid = [...pictureGrid];
    newPictureGrid[tile].numberOfRotations = numberOfRotations + 1;
    newPictureGrid[tile].rotation = `rotate(${
      (numberOfRotations + 1) * 90
    }deg)`;
    setPictureGrid(newPictureGrid);
    checkIfGameWon(newPictureGrid);
  };

  const resolvePuzzle = () => {
    let newPictureGrid = [...pictureGrid];
    newPictureGrid.forEach((tile) => {
      handleRotation(tile.originalPosition, -1);
    });
  };

  const checkIfGameWon = (grid) => {
    let isGameWon = true;
    grid.forEach((tile) => {
      if (tile.numberOfRotations % 4 !== 0) isGameWon = false;
    });
    setGameWon(isGameWon);
  };

  useEffect(() => {
    let fetchPuzzle = async () => {
      const response = await fetchPuzzlePicture(gridSize);
      setPictureBG(response);
    };
    setPictureGrid(createGrid(gridSize));
    fetchPuzzle();
  }, []);

  return (
    <PageDiv>
      <HeaderDiv>
        <Header gameWon={gameWon}>
          <h1>P</h1>
          <h1>U</h1>
          <h1>Z</h1>
          <h1>Z</h1>
          <h1>L</h1>
          <h1>Y</h1>
        </Header>
        <Button wording={"Click to resolve"} fn={resolvePuzzle} />
      </HeaderDiv>
      <GameContainer>
        <LoadingMsg loaded={pictureBG}>
          <p>Loading</p>
          <img src={LoadingIcon} alt="" />
          <p>Please refresh page if puzzle fails to load.</p>
        </LoadingMsg>
        <Tiles
          background={pictureBG}
          grid={pictureGrid}
          onRotate={handleRotation}
          gameWon={gameWon}
        />
      </GameContainer>
    </PageDiv>
  );
};

export default Picture;
