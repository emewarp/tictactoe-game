const maths = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
    
    // create an array of keys between min and max (edges included)
    range: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),
};

export default maths;