// Creates an array of objects, meant to represent a square grid
// Value can be changed in the future but for now, stick to six

export const createGrid = (gridSize) => {
    let pictureGrid = [];
    let amountOfGridTiles = gridSize*gridSize;
    
    for (let i = 0; i < amountOfGridTiles; i++){
        pictureGrid.push(
            {
                originalPosition: i,
                positionX: `${(i%gridSize)*100}px`,
                positionY: `${(Math.floor(i/gridSize))*100}px`,
            }
            )
        }
        
    return pictureGrid;
};