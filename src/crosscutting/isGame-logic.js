import maths from './math-utils';

const isGame = (gameMatrix) => {
    if (isGameInColumns(gameMatrix) || isGameInRows(gameMatrix) || isGameInDiagonals(gameMatrix))
        return true;            
};

const isGameInRows = (gameMatrix) => {
    let game = false;
    for(let i=0; i<=2; i++){  
        let sum = 0;
        for(let j=0; j<=2; j++){

            let value = gameMatrix[3*i+j];
            if(value===0)
                break;
            else
                sum += value;

            if(j===2 && (sum===3 || sum===6))
                game=true;
                
        }            
    } 
    return game;
};

const isGameInColumns = (gameMatrix) => {
    let game = false;
    for(let i=0; i<=2; i++){  
        let sum = 0;
        for(let j=0; j<=2; j++){

            let value = gameMatrix[3*j+i];
            if(value===0)
                break; 
            else
                sum += value;

            if( j===2 && (sum===3 || sum===6))
                game=true;
        }
        
    } 
    return game;
};

const isGameInDiagonals = (gameMatrix) => {
    let game = false

    let sumArrayMainDiagonal = Array(3).fill(0);
    let sumArraySecondDiagonal = Array(3).fill(0);

    for(let i=0; i<=2; i++){

        sumArrayMainDiagonal[i] = gameMatrix[3*i+i];
        sumArraySecondDiagonal[i] = gameMatrix[3*i+(3-i-1)];

        let sumMainDiagonal = maths.sum(sumArrayMainDiagonal);
        let sumSecondDiagonal = maths.sum(sumArraySecondDiagonal);
        // eslint-disable-next-line
        if(((sumMainDiagonal===3 || sumMainDiagonal===6) && !sumArrayMainDiagonal.includes(0)) || (sumSecondDiagonal===3 || sumSecondDiagonal===6) && !sumArraySecondDiagonal.includes(0))
            game=true;
    } 
    
    
        
    return game;
};

export default isGame;