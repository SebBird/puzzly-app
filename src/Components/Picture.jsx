import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import Test from '../Assets/Test.png'
import Tiles from './Tiles';
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

createGrid(6);
const Picture = () => {
    let gridSize = 6;
    let [pictureBG, setPictureBG] = useState("");
    let [pictureGrid, setPictureGrid] = useState([]);


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
                grid={pictureGrid}/>
                <img src={pictureBG} alt="" />
            </StyledDiv>
        );
}
 
export default Picture;