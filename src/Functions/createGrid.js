// Creates an array of objects, meant to represent a square grid
// Value can be changed in the future but for now, stick to six

export const createGrid = (gridSize) => {
  let pictureGrid = [];
  let amountOfGridTiles = gridSize * gridSize;

  for (let i = 0; i < amountOfGridTiles; i++) {
    const borderRadius = 30;
    let tileBorderRadius = [0, 0, 0, 0];

    if (i === 0) tileBorderRadius[0] = borderRadius;
    if (i === gridSize - 1) tileBorderRadius[1] = borderRadius;
    if (i === amountOfGridTiles - 1) tileBorderRadius[2] = borderRadius;
    if (i === amountOfGridTiles - gridSize) tileBorderRadius[3] = borderRadius;

    let rotations = Math.floor(Math.random() * 4) + 1;

    pictureGrid.push({
      originalPosition: i,
      positionX: `${(i % gridSize) * 100}px`,
      positionY: `${Math.floor(i / gridSize) * 100}px`,
      borderRadius: `${tileBorderRadius[0]}px ${tileBorderRadius[1]}px ${tileBorderRadius[2]}px ${tileBorderRadius[3]}px;`,
      rotation: `rotate(${rotations * 90}deg)`,
      numberOfRotations: rotations,
    });
  }

  return pictureGrid;
};
