const express = require('express');
const app = express();
app.use(express.static('static')); 
//static の中身がやっていること
// const fs = require('fs');
// const path = require('path');
// const htmlPath = path.join()(__dirname,'./static/index.html');//__dirnameは組み込まれてる変数
// console.log(htmlPath);//これで中身を見ている
// const html= fs.readFileSync(htmlPath,'utf8');
// console.log(html);//これでhtml の中身を見る

// app.get('/',(req,res)=>){
//     res.send(html);
//         // ここにhtmlを入れると画面に表示させる   
// }
// const fs = require('fs');
// const board_page= fs.readFileSync('./baord','utf8');
const width = 10;
const height = 10;
const bomCount= 10;
let board = [];
let board1=[];
let openedArray=[];
let xboard ;
let yboard ;
let userName ;
let bom = [];
let bomLocations=[];
let bomNumber =0;
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
    //コマが空いた時の処理
     let a = req.query;
     userName = a.user;
     xboard = a.x;
     yboard = a.y;
     bomNumber = 0;
     openedArray.push({x:xboard,y:yboard});
     if(board[yboard][xboard]['hasBom']===true){
         for(i=0; i<bom.length; i++){
             board1[bom[i]['y']][bom[i]['x']]={ 
                // 上のミスで誘爆した
                exploded: true,
                opened: false, // 閉じたまま
             }
            board[bom[i]['y']][bom[i]['x']]={ 
                // 上のミスで誘爆した
                exploded: true,
                opened: false, // 閉じたまま
             }
         }
    
         board1[yboard][xboard]={
         // アクセスした場所に爆弾があった
         exploded: true,
         opened: true, // 開いている
         user: userName,
         }
         board[yboard][xboard]={
         // アクセスした場所に爆弾があった
         exploded: true,
         opened: true, // 開いている
         user:userNmae,
         }
    
     }else{

         let d = {
            hasBom: false,
            opened: true,
         }
         board[yboard][xboard] = d;
         //board のコピーを作る(board1)
        //  board1 = board;
         
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
             user: userName,
             opened: true,
              }
          board1[b][a]=d;  
         }

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
                bomNumber = bomNumber+1; 
            }

         }
         if(bomNumber>0){
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
                if((xboard!==p)&&(yboard!==o)){
                 board1[o][p]={ 
                    number: bomNumber,
                    opened: true, // 開いている
                  } 
                }
                // bomLocations.push({x:o,y:p,bom:bomNumber})
                 
             }
             
         }

     }
    //  var board = JSON.parse(JSON.stringify(baord));
     res.json(board1); 

     res.send(board1);
     console.log('ここから');
     console.log(board);
     console.log(openedArray);
     console.log('ここまで');
     
      
      

   
    
});



app.listen(8000);
console.log(board);








