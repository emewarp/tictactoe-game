import React from 'react';
import maths from '../crosscutting/math-utils';
import PlayerButton from '../components/PlayerButton';

const PlayGameSolo = props => {

    //hooks
    const [gameMatrix] = React.useState(Array(9).fill(0)); // the board game is a 3x3 matrix, which is also the concatenation of 3 arrays of lenght 3
    let isMachinePlaying = false;
    let game = false;


    //logic
    const clickGameBox = (player, gameBoxKey) => {
        console.log("click");

        playGameBox(player, gameBoxKey);

        if(isGame()){
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
            }
            else{
                gameMatrix[arrayIndex] = 2;
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

    const isGame = () => {
        if (isGameInColumns() || isGameInRows() || isGameInDiagonals())
            return true;            
    };

    const isGameInRows = () => {
        let game = false;
        for(let i=0; i<=2; i++){  
            let sum = 0;
            for(let j=0; j<=2; j++){

                let value = gameMatrix[3*i+j];
                if(value===0)
                    break;
                else
                    sum += value;

                if(j===2 && (sum===3 || sum===6))
                    game=true;
                    
            }            
        } 
        return game;
    };

    const isGameInColumns = () => {
        let game = false;
        for(let i=0; i<=2; i++){  
            let sum = 0;
            for(let j=0; j<=2; j++){

                let value = gameMatrix[3*j+i];
                if(value===0)
                    break; 
                else
                    sum += value;

                if( j===2 && (sum===3 || sum===6))
                    game=true;
            }
            
        } 
        return game;
    };

    const isGameInDiagonals = () => {
        let game = false

        let sumArrayMainDiagonal = Array(3).fill(0);
        let sumArraySecondDiagonal = Array(3).fill(0);
    
        for(let i=0; i<=2; i++){
    
            sumArrayMainDiagonal[i] = gameMatrix[3*i+i];
            sumArraySecondDiagonal[i] = gameMatrix[3*i+(3-i-1)];

            let sumMainDiagonal = maths.sum(sumArrayMainDiagonal);
            let sumSecondDiagonal = maths.sum(sumArraySecondDiagonal);
            if(((sumMainDiagonal===3 || sumMainDiagonal===6) && !sumArrayMainDiagonal.includes(0)) || (sumSecondDiagonal===3 || sumSecondDiagonal===6) && !sumArraySecondDiagonal.includes(0))
                game=true;
        } 
        
        
            
        return game;
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