import React from "react";
import PlayAgainMenu from "./PlayAgainMenu";
import StartMenu from './StartMenu';
import PlayGame from "./PlayGame";
import maths from '../crosscutting/math-utils';

const TicTacToeGame = () => {
  console.log("init");

  //hooks
  const [isGameDone, setGameDone] = React.useState(false);
  const [isGameStarted, setGameStarted] = React.useState(false);
  const [player, setPlayer] = React.useState('playerO');
  const [gameMatrix, setGameMatrix] = React.useState(Array(9).fill(0)); // the board game is a 3x3 matrix, which is also the concatenation of 3 arrays of lenght 3

  // logic
  // 1. game box state
  const getMatrixIndexes = (key) => {
    return {
      i: Math.floor(key / 10), //array order
      j: key % 10, //position in array
    };
  };

  const getArrayIndex = (key) => {
    let matrixIndexes = getMatrixIndexes(key);
    return [3 * matrixIndexes.i + matrixIndexes.j]; // 3x3matrix[i,j] === 9x1array[3*i+j] being 3 determinated by the matrix size 3x3
  };

  const gameBoxStatus = (id) => {
    let matrixIndexes = getMatrixIndexes(id);
    let matrixValue = gameMatrix[3 * matrixIndexes.i + matrixIndexes.j]; //in the 3x3matrix-9x1array 3*i+j is the array index that corresponds to the i-j indexes in  the matrix

    switch (matrixValue) {
      case 0:
        return {
            status: 'empty',
            gamePiece: ''
        }
      case 1:
        return {
            status: 'playerO',
            gamePiece: 'O'
        }
      case 2:
        return {
            status: 'playerX',
            gamePiece: 'X'
        }
      default:
        break;
    }
  };

  // 2. play game box (update game matrix to 1-playerO or 2-playerX, default/notplayed = 0)
  //toogle
  const changePlayer = (player) => {
    switch (player) {
      case "playerO":
        setPlayer("playerX");
        break;
      case "playerX":
        setPlayer("playerO");
        break;
      default:
        break;
    }
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

  const playGameBox = (player, key) => {
    let arrayIndex = getArrayIndex(key);
    if (gameMatrix[arrayIndex] === 0) {
      gameMatrix[arrayIndex] = gameBoxValueInMatrix(player);
      changePlayer(player);
    }
    console.log("gameMatrix:", gameMatrix);
  };

  // 3. check if game (winner: makes a line in the board)

  const isWinnerInLine = (sum, sumArray) => {
    if((sum===3 || sum===6) && !sumArray.includes(0)){
        setPlayer(getWinner(sum));
        return true;
    }   
  }
  const isGame = (player, id) => {
    
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
            setGameDone(true);
            return true;
        }   
    }

  
  };

  const getWinner = (sum) => {
    switch (sum) {
      case 3:
        return "playerO"; //1+1+1
      case 6:
        return "playerX"; //2+2+2
      default:
        break;
    }
  };

  const clickGameBox = (player, gameBoxKey) => {
    console.log("click");
    playGameBox(player, gameBoxKey);
    isGame(player, gameBoxKey);
  };

  // 4. play again
  const restartGame = () => {
    setGameMatrix(Array(9).fill(0));
    setGameStarted(true);
    setGameDone(false);
  };

  // UI
  return (
    <div className="game">
      {isGameStarted === true ? (
        isGameDone === true ? (
          <PlayAgainMenu onPlayAgain={restartGame} winner={player} />
        ) : (
          <PlayGame
            clickGameBox={clickGameBox}
            currentPlayer={player}
            gameBoxStatus={gameBoxStatus}
          />
        )
      ) : (
        <StartMenu onPlayGame={restartGame}/>
      )}
    </div>
  );
};

export default TicTacToeGame;
