import React from "react";
import PlayAgainMenu from "./PlayAgainMenu";
import StartMenu from './StartMenu';
import PlayGame from "./PlayGame";

const TicTacToeGame = () => {
  console.log("init");

  //hooks
  const [player, setPlayer] = React.useState('playerO');
  const [isGameDone, setGameDone] = React.useState(false);
  const [isGameStarted, setGameStarted] = React.useState(false);
    
  // logic 
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

  const endGame = () => {
    setGameDone(true);
  }

  const restartGame = () => {
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
            onEndGame={endGame}
            currentPlayer={player}
            onChangePlayer={changePlayer}            
          />
        )
      ) : (
        <StartMenu onPlayGame={restartGame}/>
      )}
    </div>
  );
};

export default TicTacToeGame;
