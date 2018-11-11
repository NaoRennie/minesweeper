const express = require('express');
const app = express();
// const fs = require('fs');
// const board_page= fs.readFileSync('./baord','utf8');
const width = 10;
const height = 10;
let board = [];



// console.log(board[2][0]);
//ブロックをおく
function draw(){

 for (let y=0; y<height; y++){
     let arr = []    
     for(let x=0; x<width; x++){
         arr[x] = {
            hasBom: false,
            opened: false,
          };
     }    
     board[y] = arr;   
 }
}
draw();



 

// app.get('/board',(req,res)=>{
//     let a = req.query;
//     let b = a.x;
//     let c = a.y;
//     let f= board[c][b];
//     let d = f+ 1;
//     board[c][b] = d;
//     res.json(board); 
// });

//爆弾をオープンにする


app.get('/board',(req,res)=>{
    let a = req.query;
    let xboard = a.x;
    let yboard = a.y;
    // let f= board[c][b];
    let d = {
        hasBom: false,
        opened: true,
      }
    board[yboard][xboard] = d;
    res.send(board);
    
    let board1 = board;
    let e= {
        opened: true,
      }
    board1[yboard][xboard] = e;


    res.json(board1); 
    // open();
    
});








 


app.listen(8000);
console.log(board);







