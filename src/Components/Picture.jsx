import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import Test from '../Assets/Test.png'
import Tiles from './Tiles';
import Button from './Button';
import { fetchPuzzlePicture } from '../Functions/fetchPuzzlePicture';
import { createGrid } from '../Functions/createGrid';

const StyledDiv = styled.div`
display: flex;
justify-content: flex-start;
align-items: flex-start;
flex-wrap: wrap;
height: 600px;
width: 600px;
`;

const Picture = () => {
    let gridSize = 6;
    let [pictureBG, setPictureBG] = useState("");
    let [pictureGrid, setPictureGrid] = useState([]);
    let [gameWon, setGameWon] = useState(false);

    const handleRotation = (tile, numberOfRotations) => {
        let newPictureGrid = [...pictureGrid];
        newPictureGrid[tile].numberOfRotations = numberOfRotations+1;
        newPictureGrid[tile].rotation = `rotate(${(numberOfRotations+1)*90}deg)`;
        setPictureGrid(newPictureGrid);
    }

    const shuffleTiles = () => {
        let newPictureGrid = [...pictureGrid];
        newPictureGrid.forEach((tile) => {
            console.log(tile);
            handleRotation(tile.originalPosition, Math.floor(Math.random()*4));
        })
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
            <StyledDiv >
                <Tiles 
                background={pictureBG}
                grid={pictureGrid}
                onRotate={handleRotation}/>
                <Button wording={"Shuffle"} fn={shuffleTiles}/>
                <img src={pictureBG} alt="" />
            </StyledDiv>
        );
}
 
export default Picture;