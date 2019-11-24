
width = 5;
height = 5;


var hasWon = false;
window.rollDice = () => {
  if (hasWon) {
    return;
  }

let currentPlayer = players[currentPlayerTurn];

roll = Math.floor(Math.random() * 5 + 1);
console.log(currentPlayer.name +", You rolled", roll);

  if(currentPlayer.position === 0 && roll != 1){
    currentPlayer.position = 0;

  }else{
  currentPlayer.position += roll;
  ladders.forEach(ladder => {

    if (ladder.start === currentPlayer.position) {
      currentPlayer.position = ladder.end;
    }
  });


  if (currentPlayer.position > 24) {
    console.log(currentPlayer.name + " has won!");
    hasWon = true;
  }




  if (currentPlayer.position === position) {
 diff = currentPlayer.position - position;
    currentPlayerPosition = position - diff;
  }
}
  currentPlayerTurn++;
  if (currentPlayerTurn >= players.length) {
    currentPlayerTurn = 0;
  }

drawBoard();
};


players = [{name: "Player1",position: 0,color: "red"},{name: "Player2",position: 0,color: "blue"}];

let currentPlayerTurn = 0;

board = [];
let position = 0;
let darkBox = false;
ladders = [{start: 8,end: 15},{start: 19,end: 24}];

for (var y = height; y >= 0; y--) {
  let row = [];

  board.push(row);
  for (var x = 0; x < width; x++) {
    row.push({x,y,occupied: null,position,color: darkBox ? "#e81e1e" : "#3b09ed"});
    darkBox = !darkBox;
    position++;
  }
}

boardSize = 25;
drawBoard = () => {
  let boardOnScreen = ``;
  board.forEach(row => {
    row.forEach(square => {
      boardOnScreen += `<div class=square style="top:${square.y *
        boardSize}px; left:${square.x *
        boardSize}px; background-color:${square.color}"></div>`;
    });
  });

  players.forEach(player => {
    let square = null;
    board.forEach(row => {
      row.forEach(square => {
        if (square.position === player.position) {
          boardOnScreen += `<div class=player style="top:${square.y *
            boardSize +
            5}px; left:${square.x * boardSize +
            5}px;background-color:${player.color}"></div>`;
        }
      });
    });
  });

  ladders.forEach(ladder => {
    //let start = 0;
    let startPos = { x: 0, y: 0 };
    let endPos = { x: 0, y: 0 };

    board.forEach(row => {
      row.forEach(square => {
        if (square.position === ladder.start) {
          startPos.x = square.x * boardSize;
          startPos.y = square.y * boardSize;
        }

        if (square.position === ladder.end) {
          endPos.x = square.x * boardSize;
          endPos.y = square.y * boardSize;
        }
      });
    });

    isLadder = ladder.end > ladder.start;


    drawLine({ color: isLadder ? "white" : "green", startPos, endPos });
  });

  document.getElementById("board").innerHTML = boardOnScreen;
};

function drawLine({ color, startPos, endPos }) {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(startPos.x + 15, startPos.y + 5);
  ctx.lineTo(endPos.x + 23, endPos.y + 16);
  ctx.lineWidth = 8;
  ctx.strokeStyle = color;
  ctx.stroke();


  var snakeImage = new Image();
  var ladderImage = new Image();

   snakeImage.onload = function(){
     ctx.save();
     ctx.globalCompositeOperation = `source-atop`;
    ctx.drawImage(snakeImage,0,0);
     ctx.restore()
   };
  snakeImage.src = 'snake2.png';

}
drawBoard();
