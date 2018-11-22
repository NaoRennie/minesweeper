const express = require('express');
const app = express();
app.use(express.static('static')); 
const width = 10;
const height = 10;
const bomCount= 10;
let board = [];
let board1 = [];
let xboard ;
let yboard ;
let userName ;
let bom = [];
let bomNum;
let directions = [
    [0,-1],
    [1,0],
    [0,1],
    [-1,0],
    [-1,-1],
    [1,1],
    [-1,1],
    [1,-1],
 ];
//baord をかく
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

 //bombの位置
 let m = 1
 while (m< bomCount) {
    var x = Math.floor(Math.random() * width);
    var y = Math.floor(Math.random() * height);  
     if (board[x][y]['hasBom'] === false) {
        board[x][y]['hasBom'] = true;
        m++;
        bom.push({x:x,y:y})     
     }    
 }

 app.get('/board',(req,res)=>{

     xboard = req.query.x;
     yboard = req.query.y;
     userName = req.query.user;
     if(xboard){
        bomNumber = 0;
         if(board[yboard][xboard]['hasBom']===true){
             for(i=0; i<bom.length; i++){
                 board[bom[i]['y']][bom[i]['x']]={ 
                // 他のミスで誘爆した
                exploded: true,
                opened: false, 
                }
             }
             board[yboard][xboard]={
             // アクセスした場所に爆弾があった
              exploded: true,
              opened: true, 
              user:userName,
             }
         }else{
             let d = {
              hasBom: false,
              opened: true,
              user: userName,
             }
           board[yboard][xboard]=d;
           //周りの爆弾の数
            h = 0
            bomNum=0
             while(h <8){
             let n = Number(''+directions[h][0]+'');
             let m = Number(''+directions[h][1]+'');  
             let x = Number(''+xboard+'');
             let y = Number(''+yboard+''); 
             let o = y + m;
             let p = x + n;
                if (o===false||p===false){
                    console.log('TTTTTTTT');
                   return;
                }else{   
                    if (board[o][p]['hasBom']===true){
                        if(bomNum>0){
                            bomNum = bomNum+1;
                            board[y][x]['bomNumber'] = bomNum;
                         }else{
                            bomNum=1;
                            board[y][x]['bomNumber'] = bomNum;
                        }
                    }   
 
                }
             h++
            } 
        }
     }
     
   board1 = JSON.parse(JSON.stringify(board));
   for (let y=0; y<height; y++){ 
        for(let x=0; x<width; x++){
           delete board1[y][x]['hasBom'];
         }    
     }

     
     res.send(board1); 
    //  console.log(bom);
    //  console.log(board);
        
});



app.listen(8000);










