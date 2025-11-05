function getRandomImage(){
    const munber = Math.floor(Math.random()*7);
    const ImagePath = "./images/omikuji-"+munber.toString()+".png";
    //const ImagePath = `./images/omikuji-${munber.toString()}.png`; //この方法でも上と同じ(テンプレートリテラル)
    return ImagePath;
}

function playOmikuji(){
    const timer = setInterval(function(){
        document.querySelector("#js-result").setAttribute("src",getRandomImage());
    },500);

    setTimeout(function(){
        clearInterval(timer);
    },4000);

}



document.querySelector("#js-button").addEventListener("click",playOmikuji);

