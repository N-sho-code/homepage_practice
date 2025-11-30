//ゲームスピード(ms)
const GAME_SPEED =1000/60;

//画面サイズ
const SCREEN_W = 180;
const SCREEN_H = 320;

//キャンバスサイズ
const CANVAS_W = SCREEN_W*2;
const CANVAS_H = SCREEN_H*2;

//フィールドサイズ
const FIELD_W = SCREEN_W*2;
const FIELD_H = SCREEN_H*2;
//星の数
const STAR_MAX = 300;

//キャンバス
let can = document.getElementById("can");
let con = can.getContext("2d");
can.width =CANVAS_W;
can.height =CANVAS_H;
//フィールド(仮想画面)
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");
vcan.width =CANVAS_W;
vcan.height =CANVAS_H;
//カメラの座標
let camer_x =0;
let camer_y =0;
//星
let star=[];
//キーボードの状態
let key=[];

document.onkeydown =function(e){
    key[e.keyCode] = true;
}
//キーボードが離された解き
document.onkeyup =function(e){
    key[e.keyCode] = false;
}
//自機クラス
class Jiki{
    constructor(){
        this.x  =(FIELD_W/2)<<8;
        this.y  =(FIELD_H/2)<<8;
        this.speed =512;
        this.anime = 0;
    }
    update(){
        if(key[37])this.x -=this.speed;
        if(key[38])this.y -=this.speed;
        if(key[39])this.x +=this.speed;
        if(key[40])this.y +=this.speed;


    }
    draw(){
        drawSprote(2+this.anime,this.x,this.y);
    }
}
let jiki = new Jiki();

//ファイルを読み込み
let sproteImage = new Image();
sproteImage.src ="images/sprite.png";

//スプライトクラス
class Sprite{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}
//スプライト
let sprite = [
    new Sprite(0,0,22,42),
    new Sprite(23,0,33,42),
    new Sprite(57,0,43,42),
    new Sprite(101,0,33,42),
    new Sprite(135,0,21,42),
];
//スプライト描画
function drawSprote(snum,x,y){
    let sx = sprite[snum].x;
    let sy = sprite[snum].y;
    let sw = sprite[snum].w;
    let sh = sprite[snum].h;
    
    let px = (x>>8)-sw/2;
    let py = (y>>8)-sh/2;

    if(px+sw/2<camer_x||px-sw/2>=camer_x+SCREEN_W
        ||py+sh/2<camer_y||py-sh/2>=camer_y+SCREEN_H)return;

    vcon.drawImage(sproteImage,sx,sy,sw,sh,px,py,sw,sh);
}

//整数を作る
function rand(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}
//星クラス
class Star{
    constructor(){
        this.x  =rand(0,FIELD_W)<<8;
        this.y  =rand(0,FIELD_H)<<8;
        this.vx =0;
        this.vy =rand(30,200);
        this.sz =rand(1,2);
    }
    draw(){
        let x=this.x>>8;
        let y=this.y>>8
        if(x<camer_x||x>=camer_x+SCREEN_W
           ||y<camer_y||y>=camer_y+SCREEN_H)return;
        vcon.fillStyle=rand(0,2)!=0?"#66f":"#8af";
        vcon.fillRect(this.x>>8,this.y>>8,this.sz,this.sz);
    }
    update(){
        this.x += this.vx;
        this.y += this.vy;
        if(this.y>FIELD_H<<8){
            this.y=0;
            this.x=rand(0,FIELD_W)<<8;
        }
    }
}

//ゲーム初期化
function gameInit(){
    for(i=0;i<STAR_MAX;i++)star[i]=new Star();
    setInterval(gameLoop,GAME_SPEED);
}
//ゲームループ
function gameLoop(){
    //移動処理
    for(i=0;i<STAR_MAX;i++)star[i].update();
    jiki.update();
    //描画処処理
    vcon.fillStyle="#000";
    vcon.fillRect(0,0,SCREEN_W,SCREEN_H);
    for(i=0;i<STAR_MAX;i++)star[i].draw();
    jiki.draw();

    //仮想画面空実際のキャンパスにコピー
    con.drawImage(vcan,camer_x,camer_y,SCREEN_W,SCREEN_H,
        0,0,CANVAS_W,CANVAS_H);
}
//オンロードで開始
window.onload=function(){
    gameInit();
}

