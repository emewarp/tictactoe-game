import React from 'react';
import maths from '../crosscutting/math-utils';
import isGame from '../crosscutting/isGame-logic';
import PlayerButton from '../components/PlayerButton';

const PlayGameSolo = props => {

    //hooks
    const [gameMatrix] = React.useState(Array(9).fill(0)); // the board game is a 3x3 matrix, which is also the concatenation of 3 arrays of lenght 3
     
    let isMachinePlaying = false;
    let game = false;

    const clickGameBox = (player, gameBoxKey) => {
        console.log("click");

        playGameBox(player, gameBoxKey);

        if(isGame(gameMatrix)){
            game = true;
        }else{
            if(isMachinePlaying){
                machineSimulatesClickGameBox();
            }
            else{
                return;
            }
        }

        setTimeout(() => { 
            if(game === true){
                props.onEndGame();
            }; 
        }, 1500);
    };

    const playGameBox = (player, key) => {
        console.log('machinePlayingA', isMachinePlaying)
        let arrayIndex = maths.getArrayIndex(key);
        if (gameMatrix[arrayIndex] === 0) {
            if(isMachinePlaying){
                gameMatrix[arrayIndex] = 1;
                props.onChangePlayer('playerO');
            }
            else{
                gameMatrix[arrayIndex] = 2;
                props.onChangePlayer('playerO');
            }
            props.onChangePlayer(player);
            isMachinePlaying = !isMachinePlaying; //setIsMachinePlaying(!isMachinePlaying); // won't change until the clickGameBox is finished because it's a hook and it's related to the state
        }
        console.log("gameMatrix:", gameMatrix);
    };
    
    const machineSimulatesClickGameBox = () => {
        console.log('fake click');
        let randomKey = getRandomKey();
        for(let i=0; i<9; i++){
            if(gameMatrix[maths.getArrayIndex(randomKey)]===0){
                break;
            }
            else{
                randomKey = getRandomKey();
            }
        }
       document.getElementById(randomKey.toString()).click();            
    }
    const getRandomKey =  () => {
        return Math.floor(Math.random() * (3)).toString().concat(Math.floor(Math.random() * (3)).toString());
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
                                    isMachine={isMachinePlaying}
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
                                    isMachine={isMachinePlaying}
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
                                    isMachine={isMachinePlaying}
                                    matrixValue={gameMatrix[maths.getArrayIndex((20+key))]}
                                    onClick={clickGameBox} player={props.currentPlayer}
                                />
                            ))} </td>
                        </tr>          
                    </tbody>            
            </table>
        </div>            
    );
    
    

};

export default PlayGameSolo;