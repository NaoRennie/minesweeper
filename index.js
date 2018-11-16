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

 //爆弾の位置

 while(bom.length<bomCount){
     let bomx = Math.floor(Math.random()*width);  
     let bomy = Math.floor(Math.random()*height);
     
     if (bom.length===0){
         bom.push({x:bomx,y:bomy});  
     }
     
     else if(((bom.findIndex(({x}) => x=== bomx)) === -1)&&((bom.findIndex(({y}) => y=== bomy)) === -1)){
        // ((bom.findIndex(({x}) => x=== bomx)) === -1)&&((bom.findIndex(({y}) => y=== bomy)) === -1)
         bom.push({x:bomx,y:bomy}); 
     }
    for(i=0; i<bom.length; i ++){

    }
   
 }  
 for (i=0; i<bom.length;i++){
     let x1= bom[i]['x'];
     let y1 = bom[i]['y'];
     board[y1][x1]={
         hasBom:true,
         opened:false
     }
 }
//  console.log(bom);
//  ?/x ga arubaai
// syorisuruhanni
// if ( x ga arubaai)
// naitoki

// {naitokiha json dekaku
//     if (!req.query.x{
//         res.json(board)
//     })
// }

//爆弾をオープンにする


app.get('/board',(req,res)=>{

    // if (xboard==true){
    //コマが空いた時の処理
     xboard = req.query.x;
     yboard = req.query.y;
     userName = req.query.user;
     bomNumber = 0;
     if(board[yboard][xboard]['hasBom']===true){
         for(i=0; i<bom.length; i++){
             board[bom[i]['y']][bom[i]['x']]={ 
                // 上のミスで誘爆した
                exploded: true,
                opened: false, // 閉じたまま
             }
         }
         board[yboard][xboard]={
         // アクセスした場所に爆弾があった
         exploded: true,
         opened: true, // 開いている
         user:userName,
         }
     }else{
         let d = {
            hasBom: false,
            opened: true,
            user: userName,
         }
         board[yboard][xboard] = d;

         for(h=0; h<directions.length;h++){
            let n = Number(''+directions[h][0]+'');
            let m = Number(''+directions[h][1]+'');  
            let x = Number(''+xboard+'');
            let y= Number(''+yboard+''); 
            let o = y + n;
            let p = x + m;
            if (o<0){
                o = 0;
            }
            if (p<0){
                p = 0;
            }
            if(o>height){
                o = height;
            }
            if(p>width){
                p = width;
            }

            if (board[o][p]['hasBom']===true){
                console.log('ここですううう')
                console.log(board[o][p].bomNumber);
                if(board[o][p].bomNumber==undefined){
                    console.log('koko');
                    let bomNumber = 1;
                    board[o][p].bomNumber={
                        bomNumber,   
                    }
                }else{
                    console.log('dayo');
                let a = Number(board[o][p].bomNumber);
                let bomNumber = a+1;
                board[o][p].bomNumber={
                    bomNumber,  
                }
                }
                console.log('kore');
                console.log(bomNumber);
                
            }

       
        
                // bomLocations.push({x:o,y:p,bom:bomNumber})
                 
             }
             
         }
        

     
        board1 = JSON.parse(JSON.stringify(board));
     for (let y=0; y<height; y++){ 
        for(let x=0; x<width; x++){
           delete board1[y][x]['hasBom'];
        }    
    }
     
     res.json(board1); 
     console.log(bom);
     console.log('ここから');
     console.log(board);
     console.log('ここまで');
     console.log(board1);
     
      
      

   
    
});



app.listen(8000);
console.log(board);










