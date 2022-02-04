import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tiles from './Tiles';
import Button from './Button';
import { fetchPuzzlePicture } from '../Functions/fetchPuzzlePicture';
import { createGrid } from '../Functions/createGrid';

const Header = styled.header`
`;

const GameContainer = styled.div`
display: flex;
justify-content: flex-start;
align-items: flex-start;
flex-wrap: wrap;
margin: 0;
height: 800px;
width: 800px;
background-color: #4d4d4d;
padding: 5px;
transform: scale(0.5);
`;

let gridSize = 8;

const Picture = () => {
    let [pictureBG, setPictureBG] = useState("");
    let [pictureGrid, setPictureGrid] = useState([]);
    let [gameWon, setGameWon] = useState(false);

    const handleRotation = (tile, numberOfRotations) => {
        let newPictureGrid = [...pictureGrid];
        newPictureGrid[tile].numberOfRotations = numberOfRotations+1;
        newPictureGrid[tile].rotation = `rotate(${(numberOfRotations+1)*90}deg)`;
        setPictureGrid(newPictureGrid);
        checkIfGameWon(newPictureGrid);
    }

    const shuffleTiles = () => {
        let newPictureGrid = [...pictureGrid];
        newPictureGrid.forEach((tile) => {
            console.log(tile);
            handleRotation(tile.originalPosition, Math.floor(Math.random()*4));
        })
    }

    const checkIfGameWon = (grid) => {
        let isGameWon = true;
        grid.forEach((tile) => {
            if (tile.numberOfRotations%4!==0) isGameWon = false;
        })
        setGameWon(isGameWon);
    }

    useEffect(() => {
        let fetchPuzzle = async () => {
            const response = await fetchPuzzlePicture(gridSize);
            setPictureBG(response);
        }
        setPictureGrid(createGrid(gridSize));
        fetchPuzzle();
    }, [])

        return ( 
            <>
                <Header>
                    <h1>Puzzly</h1>
                </Header>
                <GameContainer >
                    <Tiles 
                    background={pictureBG}
                    grid={pictureGrid}
                    onRotate={handleRotation}/>
                </GameContainer>
                <Button wording={"Shuffle"} fn={shuffleTiles}/>
                <p>{gameWon.toString()}</p>
                <img src={pictureBG} alt="" />
            </>
        );
}
 
export default Picture;