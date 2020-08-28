import React from "react";
import PlayAgainMenu from "./PlayAgainMenu";
import StartMenu from './StartMenu';
import PlayGame from "./PlayGame";

const TicTacToeGame = () => {
  console.log("init");

  //hooks
  const [player, setPlayer] = React.useState('playerO');
  const [isGameSolo, setGameSolo] = React.useState(false);
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
    setGameStarted(false);
    setGameDone(false);
  }
  
  const startGame = () => {
    setGameStarted(true);
    setGameDone(false);
  };

  const playGame = () => {
    startGame();

  }

  const playGameSolo = () => {
    startGame();
    setGameSolo(true); 
  }

  // UI
  return (
    <div className="game">
      {isGameStarted === true ? (
        isGameDone === true ? (
          <PlayAgainMenu onPlayAgain={restartGame} winner={player} />
        ) : (
         isGameSolo === true ? (
          <PlayGame
            onEndGame={endGame}
            currentPlayer={player}
            onChangePlayer={changePlayer}            
          />

         ) : (
          <PlayGame
            onEndGame={endGame}
            currentPlayer={player}
            onChangePlayer={changePlayer}            
          />
         )
        )
      ) : (
        <StartMenu 
          onPlayGame={playGame}
          onPlayGameSolo={playGameSolo}
        />
      )}
    </div>
  );
};

export default TicTacToeGame;
