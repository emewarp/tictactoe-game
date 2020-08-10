import React from 'react';
import maths from '../crosscutting/math-utils';
import PlayerButton from '../components/PlayerButton';

const PlayGame = props => (

    <div>
        <table className="game-board">
            <tr>
                <td> {maths.range(0, 2).map(key => (
                    <PlayerButton 
                        key={key}
                        gameBoxKey={key}
                        gameBoxState={props.gameBoxStatus(key)}
                        onClick={props.clickGameBox} player={props.currentPlayer}
                    />
            ))} </td>
                    
            </tr>
            <tr>
                <td> {maths.range(0, 2).map(key => (
                    <PlayerButton 
                        key={key+3}
                        gameBoxKey={10+key}
                        gameBoxState={props.gameBoxStatus(10+key)}
                        onClick={props.clickGameBox} player={props.currentPlayer}
                            />
                ))} </td>
            </tr>
            <tr>
                <td> {maths.range(0, 2).map(key => (
                    <PlayerButton 
                        key={key+6}
                        gameBoxKey={20+key}
                        gameBoxState={props.gameBoxStatus(20+key)}
                        onClick={props.clickGameBox} player={props.currentPlayer}
                    />
                ))} </td>
            </tr>          
        </table>
    </div>            
    

);

export default PlayGame;