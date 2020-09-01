import React from 'react';
import maths from '../crosscutting/math-utils';
import PlayerButton from '../components/PlayerButton';

const PlayGame = props => {

    //hooks
    const [gameMatrix, setGameMatrix] = React.useState(Array(9).fill(0)); // the board game is a 3x3 matrix, which is also the concatenation of 3 arrays of lenght 3

    //logic
    const clickGameBox = (player, gameBoxKey) => {
        console.log("click");
        playGameBox(player, gameBoxKey);
        if(isGame()){
            props.onEndGame();
        }
    };

    const playGameBox = (player, key) => {
        let arrayIndex = maths.getArrayIndex(key);
        if (gameMatrix[arrayIndex] === 0) {
          gameMatrix[arrayIndex] = gameBoxValueInMatrix(player);
          props.onChangePlayer(player);
        }
        console.log("gameMatrix:", gameMatrix);
    };
    const gameBoxValueInMatrix = (player) => {
        switch (player) {
          case "playerO":
            return 1;
          case "playerX":
            return 2;
          default:
            return 0;
        }
    };

    const isGame = () => {
        if (isGameInColumns() || isGameInRows() || isGameInDiagonals())
            return true;            
    };

    const isGameInRows = () => {
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

    const isGameInColumns = () => {
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

    const isGameInDiagonals = () => {
        let game = false

        let sumArrayMainDiagonal = Array(3).fill(0);
        let sumArraySecondDiagonal = Array(3).fill(0);
    
        for(let i=0; i<=2; i++){
    
            sumArrayMainDiagonal[i] = gameMatrix[3*i+i];
            sumArraySecondDiagonal[i] = gameMatrix[3*i+(3-i-1)];

            let sumMainDiagonal = maths.sum(sumArrayMainDiagonal);
            let sumSecondDiagonal = maths.sum(sumArraySecondDiagonal);
            if(((sumMainDiagonal===3 || sumMainDiagonal===6) && !sumArrayMainDiagonal.includes(0)) || (sumSecondDiagonal===3 || sumSecondDiagonal===6) && !sumArraySecondDiagonal.includes(0))
                game=true;
        } 
        
        
            
        return game;
    };


          

    return(
        <div>
            <table className="game-board">
                <tbody>
                    <tr>
                        <td> {maths.range(0, 2).map(key => (
                            <PlayerButton 
                                key={key}
                                gameBoxKey={key}
                                matrixValue={gameMatrix[maths.getArrayIndex((key))]}
                                onClick={clickGameBox} player={props.currentPlayer}
                            />
                    ))} </td>     
                    </tr>
                    <tr>
                        <td> {maths.range(0, 2).map(key => (
                            <PlayerButton 
                                key={key+3}
                                gameBoxKey={10+key}
                                matrixValue={gameMatrix[maths.getArrayIndex((10+key))]}
                                onClick={clickGameBox} player={props.currentPlayer}
                                    />
                        ))} </td>
                    </tr>
                    <tr>
                        <td> {maths.range(0, 2).map(key => (
                            <PlayerButton 
                                key={key+6}
                                gameBoxKey={20+key}
                                matrixValue={gameMatrix[maths.getArrayIndex((20+key))]}
                                onClick={clickGameBox} player={props.currentPlayer}
                            />
                        ))} </td>
                    </tr>          
                </tbody>
            </table>
        </div>            
    );
    
    

};

export default PlayGame;