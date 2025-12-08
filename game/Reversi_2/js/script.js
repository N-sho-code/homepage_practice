//定数
/*マス目の状態*/
SQUARE_START_IS_OWNED = "01";       //自分が所持している
SQUARE_START_IS_OTHER = "02";       //相手が所持している
SQUARE_START_NOT_SELECTED = "09";   //選択されていない
//変数
//ターンの変数
let isOddTurn =true;
/*イベント*/
$(function(){
    //マス目にイベント設定
    $(".square").click(clickSquareElement);

    //盤面の初期化
    initializeEvent();
});

/*マス目クリックイベント*/
function clickSquareElement(){
    //クリックされたマス目のオブジェクト取得
    let square =$(this);
    //クリックされたマス目が選択できないときスキップ
    if(!canSelect(square)){
        return;
    }
    //マスの所有者変更
    changeOwner(square);
}
/*盤面初期化イベント*/
function initializeEvent() {
    
    // 初期値設定
    changeOwner(getTargetSquare(3, 3));
    changeOwner(getTargetSquare(3, 4));
    changeOwner(getTargetSquare(4, 4));
    changeOwner(getTargetSquare(4, 3));
}
/*内部関数*/
/* マスの所有者変更*/
function changeOwner(square) {
    putPlece(square,getTurnString());
    //隣接するピースの反転をする
    changeOwnerOpposite(square);
    //ターン変更する
    changeTurn();
}
/*マス目にピースを置く*/
function putPlece(targetSquare,owner) {
    targetSquare.text("●").attr("data-owner",owner).addClass("selected");    
}
/*ターンを示す文字列取得*/
function getTurnString(){
    if(isOddTurn){
        return "black";
    }
    return "white";
}
/*ターンの変更*/
function changeTurn(){
    isOddTurn = !isOddTurn;
}
/*指定位置のマス目オブジェクトを取得する*/
function getTargetSquare(row,col) {
    return $("[data-row="+row+"][data-col="+col+"]");
}
/*指定したマス目が選択できるか判定 */
function canSelect(square){
    if(square.hasClass("selected")){
        return false;
    }
    return true;
}
function changeOwnerOpposite (square){
    //クリックされたマス目の位置を取得する
    let row = square.data("row");   //行番号取得
    let col = square.data("col");   //列番号取得

    //所持者変更
    changeOwnerOppositeLower(row,col);  // 下
}
/*所有者変更（下）*/
function changeOwnerOppositeLower(row,col) {
    //対向先を取得
    let endPos = getPosOppositeLower(row,col);
    if(endPos ==null) {
        return;
    }

    /*対向先まで所有者を変更する*/
    let targetCol = col;
    for(targetRow = row +1;targetRow<endPos.row;targetRow++){
        let targetSquare =getTargetSquare(targetRow,targetCol);
        putPlece(targetSquare,getTurnString());
    }
}
/*対向の所有マスの位置取得*/
function getPosOppositeLower(row,col){
    //基準マスが最端の場合対向先が存在しない
    if(row==7){
        return null;
    }
    let targetRow = row +1;
    let targetCol = col;
    if(getSquareStatus(targetRow,targetCol)!=SQUARE_START_IS_OTHER){
        return null;
    } 
    //対向先の有無の判定
    for(targetRow++;targetRow<=7;targetRow++){
        //マス目の状態を取得する
        let status = getSquareStatus(targetRow,targetCol);
        //選択されていないマス目に到達したら終了
        if(status ==SQUARE_START_NOT_SELECTED){
            return null;
        }
        //自分の所有マスに到達したら、位置の返却
        if(status ==SQUARE_START_IS_OWNED) {
            return {
                row : targetRow,
                col : targetCol,
            };
        }
    }
    return null;
}
/*調査対象のマス目の状態取得*/
function getSquareStatus(row,col) {
    //マス目の取得する
    let targetSquare =getTargetSquare(row,col);
    //selectedクラスを持ってなければ未選択
    if(!targetSquare.hasClass("selected")) {
        return SQUARE_START_NOT_SELECTED;
    }
    //自分が所持
    if(getTurnString()==targetSquare.attr("data-owner")) {
        return SQUARE_START_IS_OWNED;
    }
    //相手が所持
    return SQUARE_START_IS_OTHER;
}