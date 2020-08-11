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
        if(isGame(player, gameBoxKey)){
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

    const isGame = (player, id) => {
        let game = false;
        let sumArrayMainD = Array(3).fill(0);
        let sumArraySecondD = Array(3).fill(0);
    
        for(let i=0; i<=2; i++){
    
            sumArrayMainD[i] = gameMatrix[3*i+i];
            sumArraySecondD[i] = gameMatrix[3*i+(3-i-1)];
    
            let sumArrayH = new Array(3).fill(0);
            let sumArrayV = new Array(3).fill(0);        
            for(let j=0; j<=2; j++){
                let n = 3*i+j;
                let m = 3*j+i
                sumArrayH[j] = gameMatrix[n];
                sumArrayV[j] = gameMatrix[m];
            }
    
            let sumH = maths.sum(sumArrayH);
            let sumV = maths.sum(sumArrayV);
            let sumMainD = maths.sum(sumArrayMainD);
            let sumSecondD = maths.sum(sumArraySecondD);
    
            if(isWinnerInLine(sumH,sumArrayH) || isWinnerInLine(sumV, sumArrayV) || isWinnerInLine(sumMainD, sumArrayMainD) || isWinnerInLine(sumSecondD, sumArraySecondD)){
                game = true;
            }   
        } 
        return game;
      };

    const isWinnerInLine = (sum, sumArray) => {
        if((sum===3 || sum===6) && !sumArray.includes(0)){
            return true;
        }   
    }         

    return(
        <div>
            <table className="game-board">
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
            </table>
        </div>            
    );
    
    

};

export default PlayGame;