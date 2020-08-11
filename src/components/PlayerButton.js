import React from 'react';
import colors from '../crosscutting/colors-utils';

const gameBoxStatus = (value) => {   
  switch (value) {
    case 0:
      return {
          status: 'empty',
          //gamePiece: ''
      }
    case 1:
      return {
          status: 'playerO',
          //gamePiece: 'O'
      }
    case 2:
      return {
          status: 'playerX',
          //gamePiece: 'X'
      }
    default:
      break;
  }
};

const PlayerButton = props => (
    <button className="gameBox"
      style={{backgroundColor: colors[gameBoxStatus(props.matrixValue).status]}}
      onClick={()=> props.onClick(props.player, props.gameBoxKey)}
    >
    </button> 
);

export default PlayerButton;