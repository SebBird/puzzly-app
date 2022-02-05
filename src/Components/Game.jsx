import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Tiles from "./Tiles";
import Button from "./Button";
import { fetchPuzzlePicture } from "../Functions/fetchPuzzlePicture";
import { createGrid } from "../Functions/createGrid";

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

const Header = styled.header`
  letter-spacing: 0.6rem;
  padding: 2rem 0;
  user-select: none;
  h1 {
    display: inline-block;
    transition: all 0.5s;
    transform: ${(props) =>
      props.gameWon ? "rotate(360deg)" : "rotate(0deg)"};
    color: ${(props) =>
      props.gameWon
        ? `#${Math.floor(Math.random() * 16777215).toString(16)}`
        : "white"};
    text-shadow: ${(props) => (props.gameWon ? `1px 1px 2px white` : "")};
  }
`;

const GameContainer = styled.div`
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

let gridSize = 7;

const Picture = () => {
  let [pictureBG, setPictureBG] = useState("");
  let [pictureGrid, setPictureGrid] = useState([]);
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
        <Tiles
          background={pictureBG}
          grid={pictureGrid}
          onRotate={handleRotation}
        />
      </GameContainer>
    </PageDiv>
  );
};

export default Picture;
