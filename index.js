const express = require('express');
const app = express();
const width = 10;
const height = 10;
let board = [];

// console.log(board[2][0]);
 for (let y=0; y<height; y++){
     let arr = []    
     for(let x=0; x<width; x++){
         arr[x] = 0;
     }    
     board[y] = arr;   
 }
 

app.get('/board',(req,res)=>{
    let a = req.query;
    let b = a.x;
    let c = a.y;
    let f= board[c][b];
    let d = f+ 1;
    board[c][b] = d;
    res.json(board); 
});

 


app.listen(8000);
console.log(board);







