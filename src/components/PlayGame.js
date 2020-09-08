import React from 'react';
import maths from '../crosscutting/math-utils';
import isGame from '../crosscutting/isGame-logic';
import PlayerButton from '../components/PlayerButton';

const PlayGame = props => {

    //hooks
    const [gameMatrix] = React.useState(Array(9).fill(0)); // the board game is a 3x3 matrix, which is also the concatenation of 3 arrays of lenght 3

    //logic
    const clickGameBox = (player, gameBoxKey) => {
        console.log("click");
        playGameBox(player, gameBoxKey);
        setTimeout(() => { if(isGame(gameMatrix)){
            props.onEndGame();
        }; }, 1500);
    };

    const playGameBox = (player, key) => {
        let arrayIndex = maths.getArrayIndex(key);
        if (gameMatrix[arrayIndex] === 0) {
          gameMatrix[arrayIndex] = gameBoxValueInMatrix(player);
          props.onChangePlayer(player);
        }
        console.log("gameMatrix:", gameMatrix);
    };
    const gameBoxValueInMatrix = (player) => {
        switch (player) {
          case "playerO":
            return 1;
          case "playerX":
            return 2;
          default:
            return 0;
        }
    };


    return(
        <div>
            <table className="game-board">
                <tbody>
                    <tr>
                        <td> {maths.range(0, 2).map(key => (
                            <PlayerButton 
                                key={key}
                                gameBoxKey={key}
                                matrixValue={gameMatrix[maths.getArrayIndex((key))]}
                                onClick={clickGameBox} player={props.currentPlayer}
                            />
                    ))} </td>     
                    </tr>
                    <tr>
                        <td> {maths.range(0, 2).map(key => (
                            <PlayerButton 
                                key={key+3}
                                gameBoxKey={10+key}
                                matrixValue={gameMatrix[maths.getArrayIndex((10+key))]}
                                onClick={clickGameBox} player={props.currentPlayer}
                            />
                        ))} </td>
                    </tr>
                    <tr>
                        <td> {maths.range(0, 2).map(key => (
                            <PlayerButton 
                                key={key+6}
                                gameBoxKey={20+key}
                                matrixValue={gameMatrix[maths.getArrayIndex((20+key))]}
                                onClick={clickGameBox} player={props.currentPlayer}
                                //onClick={ props.solo ? clickGameBoxSolo : clickGameBox} player={props.currentPlayer} //if rendering only PlayGame component, the diference comes on the clickGame function
                            />
                        ))} </td>
                    </tr>          
                </tbody>
            </table>
        </div>            
    );
    
    

};

export default PlayGame;