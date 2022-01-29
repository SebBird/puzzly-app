import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import Test from '../Assets/Test.png'
import Background from './Background';
import { fetchPuzzlePicture } from '../Functions/fetchPuzzlePicture';
import { createGrid } from '../Functions/createGrid';

const StyledDiv = styled.div`
height: 600px;
width: 600px;
`;

createGrid(6);
const Picture = () => {
    let [pictureBG, setPictureBG] = useState("");
    let [pictureGrid, setPictureGrid] = useState([]);


    useEffect(() => {
        let fetchPuzzle = async () => {
            const response = await fetchPuzzlePicture();
            setPictureBG(response);
        }
        fetchPuzzle();
    }, [])

        return ( 
            <StyledDiv >
                <Background background={pictureBG}/>
            </StyledDiv>
        );
}
 
export default Picture;