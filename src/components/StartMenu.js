import React from 'react';

const StartGame = props => (
    <div className="start-game">
        <div className="start-game-message">
            play !
        </div>
        <button className="start-game-button" onClick={props.onPlayGame}>
            Start Playing
        </button>
   </div>

);

export default StartGame;