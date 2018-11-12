const express = require('express');
const app = express();
// const fs = require('fs');
// const board_page= fs.readFileSync('./baord','utf8');
const width = 10;
const height = 10;
const bomCount= 10;
let board = [];
let board1 =[];
let openedArray=[];
let xboard ;
let yboard ;
let bom = [];




// console.log(board[2][0]);
//ブロックをおく


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

 while(bom.length<bomCount){
     console.log('cccc');
     let bomx = Math.floor(Math.random()*width);
     let bomy = Math.floor(Math.random()*height);
     if (bom.length===0){
         bom.push({x:bomx,y:bomy});  
         console.log('bbbb');
     }else{
         for(q=0;q<bom.length;q++){
             let bomx1;
             let bomy1;
             bomx1=bom[q]['x'];
             bomy1=bom[q]['y'];
       
              
             if((bomx!==bomx1&&bomy!==bomy1)||(bomx===bomx1&&bomy!==bomy1)||(bomx!==bomx1&&bomy===bomy1)){
               bom.push({x:bomx,y:bomy}); 
               console.log('???????????');
             }else if ((bomx===bomx1&&bomy===bomy1)){
               console.log('%%%%%%%%%%%%%');
             }

         }
   

     }
 }

     
 
 console.log(bom);
 




 

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
    console.log(req);

    let a = req.query;
    xboard = a.x;
    yboard = a.y;
    openedArray.push({x:xboard,y:yboard});
    // let f= board[c][b];
    let d = {
        hasBom: false,
        opened: true,
      }
    board[yboard][xboard] = d;
    
    for (let y=0; y<height; y++){
        let arr = []    
        for(let x=0; x<width; x++){
            arr[x] = {
               
               opened: false,
             };
        }    
        board1[y] = arr;   
    }
    
    let e= {
        opened: true,
      }
    board1[yboard][xboard] = e;
    for(i =0; i <openedArray.length; i++){
       let a = openedArray[i]['x'];
       let b = openedArray[i]['y'];
       console.log(a);
       let d= {
        opened: true,
      }

       board1[a][b]=d;  
    }


    res.json(board1); 
    console.log('ここから');
    console.log(board);
    console.log(openedArray);
    console.log('ここまで');

   
    
});



app.listen(8000);
console.log(board);










