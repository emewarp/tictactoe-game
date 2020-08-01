import React from 'react';

const PlayAgain = props => (
    <>
        <div>
            Winner is: yo
        </div>
        <button className="play-again" onClick={props.onPlayAgain}>
            Play Again
        </button>
   </>

);

export default PlayAgain;