import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Tiles from "./Tiles";
import Button from "./Button";
import { fetchPuzzlePicture } from "../Functions/fetchPuzzlePicture";
import { createGrid } from "../Functions/createGrid";

const PageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  letter-spacing: 0.4rem;
  padding: 1rem 0;
  user-select: none;
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

  const shuffleTiles = () => {
    let newPictureGrid = [...pictureGrid];
    newPictureGrid.forEach((tile) => {
      console.log(tile);
      handleRotation(tile.originalPosition, Math.floor(Math.random() * 4));
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
      <Header>
        <h1>PUZZLY</h1>
      </Header>
      <GameContainer>
        <Tiles
          background={pictureBG}
          grid={pictureGrid}
          onRotate={handleRotation}
        />
      </GameContainer>
      <Button wording={"Shuffle"} fn={shuffleTiles} />
      <p>{gameWon.toString()}</p>
    </PageDiv>
  );
};

export default Picture;
