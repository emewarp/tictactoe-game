const maths = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
    
    // create an array of keys between min and max (edges included)
    range: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),

    //get the array[i] index that corresponds to a matrix[i][j] position
    getArrayIndex: (key) => {
        let matrixIndexes = 
        {
            i: Math.floor(key / 10), //array order
            j: key % 10, //position in array
        };
        return [3 * matrixIndexes.i + matrixIndexes.j]; // 3x3matrix[i,j] === 9x1array[3*i+j] being 3 determinated by the matrix size 3x3
    },
};

export default maths;