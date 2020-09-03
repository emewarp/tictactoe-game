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

const gameBoxId = (key) => {
  let id = undefined;
  if(key.toString().length < 2){
    id = '0'.concat(key.toString());
  }
  else{
    id = key.toString();
  }
  return id;
};

const PlayerButton = props => (
    <button className="gameBox"
      id={gameBoxId(props.gameBoxKey)}
      style={{backgroundColor: colors[gameBoxStatus(props.matrixValue).status]}}
      onClick={()=> props.onClick(props.player, props.gameBoxKey)}
    >
    </button> 
);

export default PlayerButton;