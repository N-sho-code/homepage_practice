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
    //描画処処理
    vcon.fillStyle="#000";
    vcon.fillRect(0,0,SCREEN_W,SCREEN_H);
    for(i=0;i<STAR_MAX;i++)star[i].draw();

    //仮想画面空実際のキャンパスにコピー
    con.drawImage(vcan,camer_x,camer_y,SCREEN_W,SCREEN_H,
        0,0,CANVAS_W,CANVAS_H);
}
オンロードで開始
window.onalaed=function(){
    gemeInit();
}

