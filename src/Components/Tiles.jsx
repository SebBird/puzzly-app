import React, { Component } from 'react';
import styled from 'styled-components';

let TilePiece = styled.div`
width: 100px;
height: 100px;
background-image: url(${props => props.background});
background-origin: content-box;
background-position: left -${props => props.positionX} top -${props => props.positionY};
`;

const Tiles = ({background, grid}) => {
    return ( 
        <>
        {grid.map((tile) => {
            console.log(tile);
            return <TilePiece 
            background={background}
            positionX={tile.positionX}
            positionY={tile.positionY}></TilePiece>
        })}
        </>
     );
}
 
export default Tiles;