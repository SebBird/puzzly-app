//Fetches a random picture from Lorem Picsum, and returns the url

export const fetchPuzzlePicture = async(gridSize) => {

    const url = await fetch(`https://picsum.photos/${gridSize}00`)
        .then(data => data.url);

    return url;
};