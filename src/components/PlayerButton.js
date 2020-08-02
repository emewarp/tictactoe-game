import React from 'react';
import colors from '../crosscutting/colors-utils';

const PlayerButton = props => (
    <button className="gameBox"
      style={{backgroundColor: colors[props.gameBoxState.status]}}
      onClick={()=> props.onClick(props.player, props.gameBoxKey)}
    >
    </button> 
);

export default PlayerButton;