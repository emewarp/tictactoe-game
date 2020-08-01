import React from 'react';

const PlayAgain = props => (
    <div className="play-again">
        <div className="play-again-message">
            {props.winner} wins !
        </div>
        <button className="play-again-button" onClick={props.onPlayAgain}>
            Play Again
        </button>
   </div>

);

export default PlayAgain;