import React from 'react';
import utils from '../crosscutting/math-utils';
import PlayerButton from '../components/PlayerButton';
import PlayAgain from './PlayAgain';


const TicTacToeGame = () => {
  console.log('init');

  //hooks
  const [isGameDone, setGameDone] = React.useState(false);
  const [currentPlayer, setCurrentPlayer] = React.useState('playerO');
  const [gameMatrix] = React.useState(Array(9).fill(0)) // the board game is a 3x3 matrix, which is also the concatenation of 3 arrays of lenght 3

  // logic

  // 1. game box state
  const getMatrixIndexes = (key) => {
    return {
      i: Math.floor(key/10), //array order
      j: key%10 //position in array
    };
  }

  const getArrayIndex = (key) =>{
    let matrixIndexes = getMatrixIndexes(key);
    return [3*matrixIndexes.i+matrixIndexes.j] // 3x3matrix[i,j] === 9x1array[3*i+j] being 3 determinated by the matrix size 3x3
  }

  const gameBoxStatus = (id) => {  
    let matrixIndexes = getMatrixIndexes(id);
    let matrixValue = gameMatrix[3*matrixIndexes.i+matrixIndexes.j]; //in the 3x3matrix-9x1array 3*i+j is the array index that corresponds to the i-j indexes in  the matrix
 
    switch(matrixValue){
      case 0:
        return 'empty';
      case 1:
        return 'playerO';
      case 2:
        return 'playerX';
      default:
        return 'empty';

    } 
  };

  // 2. play box (update game matrix to 1-playerO or 2-playerX, default/notplayed = 0)
  const changePlayer = (player) => {
  switch(player){
      case 'playerO':
        setCurrentPlayer('playerX');
        break;
      case 'playerX':
        setCurrentPlayer('playerO');
        break;
      default:
        break;
    }          
  };

  const gameBoxValueInMatrix = (player) => {
    switch(player){
        case 'playerO':
        return 1;
      case 'playerX':
        return 2;
      default:
        return 0;
    }
  }
  
  const playGameBox = (player, key) => {

    let arrayIndex = getArrayIndex(key);
    if(gameMatrix[arrayIndex] === 0){ 
      gameMatrix[arrayIndex] = gameBoxValueInMatrix(player);
      changePlayer(player);
    }

    console.log('gameMatrix:', gameMatrix);
  }

  // 3. check if game (winner: makes a line in the board)

  const isGame = (player, id) => {
    
    let i = Math.floor(id/10); //array
    let j = id%10; //position in array


    for(let x=0; x<=i; x++ ){
      let sumH = 0;
      let sumV = 0;
      let n = 3*i+j;
      for(let y=0; y<=j; y++){
        //horizontal
        if(gameMatrix[n]!==0){
          sumH += gameMatrix[n];
          console.log('sH', sumH);
          if(sumH === 3 || sumH === 6){
            console.log('sumH', sumH);
            setGameDone(true);
          }
        }  
        //vertical
                
      }
    }
    
  };

  const getWinner = (sum) => {
    switch(sum){
        case 3:
            return 'playerO'; //1+1+1
        case 6:
            return 'playerX'; //2+2+2
        default:
            break;
    }
  }

  const clickGameBox = (player, gameBoxKey) => {
    console.log('click');
    playGameBox(player, gameBoxKey);
    let game = isGame(player, gameBoxKey);
    let winner = getWinner(game);    
    //console.log('winner:', winner);
    console.log(isGameDone);
};

// 4. play again
const playAgain = () =>{
    console.log('playAgain');
}

// UI
return (

 <div className="game">
     {isGameDone === true ?
        (
            <PlayAgain onPlayAgain={playAgain} winner={currentPlayer}/>
        ) :
        (
            <div>
                <div className='tic-tac-toe'>
                TIC TAC TOE 
            </div>
                <table className="game-board">
                    <tr>
                        <td> {utils.range(0, 2).map(key => (
                            <PlayerButton 
                                    key={key}
                                    gameBoxKey={key}
                                    gameBoxState={gameBoxStatus(key)}
                                    onClick={clickGameBox} player={currentPlayer}
                            />
                        ))} </td>
                    
                    </tr>
                    <tr>
                        <td> {utils.range(0, 2).map(key => (
                            <PlayerButton 
                                    key={key+3}
                                    gameBoxKey={10+key}
                                    gameBoxState={gameBoxStatus(10+key)}
                                    onClick={clickGameBox} player={currentPlayer}
                            />
                        ))} </td>
                    </tr>
                    <tr>
                        <td> {utils.range(0, 2).map(key => (
                            <PlayerButton 
                                    key={key+6}
                                    gameBoxKey={20+key}
                                    gameBoxState={gameBoxStatus(20+key)}
                                    onClick={clickGameBox} player={currentPlayer}
                            />
                        ))} </td>
                    </tr>          
                </table>
            </div>            
        )
     }
   
 </div>
);
};

export default TicTacToeGame;