//Fetches a random picture from Lorem Picsum, and returns the url

export const fetchPuzzlePicture = async() => {

    const url = await fetch('https://picsum.photos/600')
        .then(data => data.url);

    return url;
}