import React from 'react';
import './App.css';


const PlayerButton = props => (
  <button className="gameBox"
    style={{backgroundColor: colors[props.gameBoxState]}}
    onClick={()=> props.onClick(props.player, props.gameBox)}
    >
  </button> 
);

const TicTacToeGame = () => {
console.log('init');


//hooks
const [currentPlayer, setCurrentPlayer] = React.useState('playerO');
const [playerOList] = React.useState([]);
const [playerXList] = React.useState([]);
const [sumMatrix] = React.useState(Array(9).fill(0))

//change state logic  

const getGameBoxState = (key) => {
 if(playerOList.includes(key)){
   return 'playerO';
 }
 if(playerXList.includes(key)){
   return 'playerX';
 }
 else{ 
   return 'empty';
 }
};

const changePlayer = (player) => {
 switch(player){
     case 'playerO':
       setCurrentPlayer('playerX');
       break;
     case 'playerX':
       setCurrentPlayer('playerO');
       break;
     default:
       break;
   }          
};

const addGameBoxToPlayerList = (player, key) => {
  if(playerOList.includes(key)){
   return;
 }
 if(playerXList.includes(key)){
   return;
 }
 else{ //empty
   switch(player){
     case 'playerO':
       playerOList.push(key);
       break;
     case 'playerX':
       playerXList.push(key);
       break;
     default:
       break;
   }  
   changePlayer(player);
 }
}

const updateGameBoxMatrix = (player, id) => {
 let i = Math.floor(id/10); //array
 let j = id%10; //position in array
 

 sumMatrix[3*i+j] = getGameBoxValue(player);
 console.log('sumMatrix:');
 console.log(sumMatrix);
}

const getGameBoxValue = (player) => {
   switch(player){
      case 'playerO':
       return 1;
     case 'playerX':
       return 2;
     default:
       return 0;
   }
 }
const playGameBox = (player, gameBox) => {
 addGameBoxToPlayerList(player, gameBox.key);
 updateGameBoxMatrix(player, gameBox.id);
};

const isGame = (player, id) => {
  
  let i = Math.floor(id/10); //array
  let j = id%10; //position in array


  for(let x=0; x<=i; x++ ){
    let sumH = 0;
    let sumV = 0;
    let n = 3*i+j;
    for(let y=0; y<=j; y++){
      //horizontal
      if(sumMatrix[n]!==0){
        sumH += sumMatrix[n];
        console.log('sH', sumH);
        if(sumH === 3 || sumH === 6){
          console.log('sumH', sumH);
          return sumH;
          break;
        }
      }  
      //vertical
               
    }
  }
   
};

const clickGameBox = (player, gameBox) => {
 console.log('click');
 playGameBox(player, gameBox);
 let game = isGame(player, gameBox.id);
 if(game === 3){
   console.log('winner playerO');
 }
};

return (

 <div className="game">
   <div className="body">
     <table>
        <tr>
         <td> {utils.range(0, 2).map(key => (
               <PlayerButton 
                      key={key}
                      gameBox={{id:key, key:key}}
                      gameBoxState={getGameBoxState(key)}
                      onClick={clickGameBox} player={currentPlayer}
               />
             ))} </td>
        
       </tr>
       <tr>
          <td> {utils.range(0, 2).map(key => (
               <PlayerButton 
                      key={key+3}
                      gameBox={{id:10+key, key:(key+3)}}
                      gameBoxState={getGameBoxState(key+3)}
                      onClick={clickGameBox} player={currentPlayer}
               />
             ))} </td>
       </tr>
       <tr>
          <td> {utils.range(0, 2).map(key => (
               <PlayerButton 
                      key={key+6}
                      gameBox={{id:20+key, key:key+6}}
                      gameBoxState={getGameBoxState(key+6)}
                      onClick={clickGameBox} player={currentPlayer}
               />
             ))} </td>
       </tr>          
     </table>
     </div>
 </div>
);
};


// Color Theme
const colors = {
empty: 'lightgray',
playerO: 'lightgreen',
playerX: 'lightcoral',
};

const utils = {
// Sum an array
sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

// create an array of keys between min and max (edges included)
range: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),
};



export default function App() {
  return (
    <TicTacToeGame />
  );
}