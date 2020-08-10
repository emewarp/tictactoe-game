import React from 'react';

const StartGame = props => (
    <div className="start-game">
        <div className="start-game-message">
            play game !
        </div>
        <button className="start-game-button" onClick={props.onPlayGameSolo}>
            One player
        </button>
        <button className="start-game-button" onClick={props.onPlayGame}>
            Two players
        </button>
   </div>

);

export default StartGame;