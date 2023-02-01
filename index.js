let text = document.getElementById('text');
let timer = document.getElementById("timer");
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let startTime;
let endTime;
let processTime;
let startFlag = 0;

const textLists = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f'
];


function pageCreate(){
    text.textContent = "ここに文字表示されるよ";
}

function createCharacter(){
    text.textContent = "";
    let rnd = Math.floor(Math.random() * textLists.length)
    checkTexts = textLists[rnd].split('').map(function(value){
        let span = document.createElement('span');
        span.textContent = value;
        text.appendChild(span);
        return span;
    }) ;
}

function startButton(){
    if(startFlag === 0){
        text.style.display = "block";
        text.style.visibility = "visible";
        timer.style.display = "none";
        text.textContent = "";
        startTime = new Date();
        createCharacter();

    }
    startFlag++;


}

let checkTexts = [];
const alertLists = [
    'パソコン初めて？',
    '間違えてるやん爆笑',
    'ななちゃん起きてる？'
];


//console.log(checkTexts);

document.addEventListener('keyup', keyUp)

function keyUp(e){
    let i = 0;
    if(e.key === checkTexts[0].textContent){
        checkTexts[0].className = 'add-blue';
        checkTexts.shift();
        if(checkTexts.length == 0) {
            createCharacter();
        }
        console.log(checkTexts[0]);
    }else {
        let rnd2 = Math.floor(Math.random() * alertLists.length)
        alert(alertLists[rnd2])

    }
}




function stopButton(){
    text.style.display = "none";
    button1.style.display = "none";
    button2.style.display = "none";
    button3.style.display = "inline";
    timer.style.display = "block";
    timer.style.visibility = "visible";
    endTime = new Date();
    processTime = (endTime - startTime) / 1000;
    timer.textContent = processTime + "秒";
    console.log(processTime);
    startFlag = 0;

}

function restartButton(){
    text.textContent = "ここに文字表示されるよ";
    button1.style.display = "inline";
    button2.style.display = "inline";
    button3.style.display = "none";
    text.style.visibility = "visible";
    text.style.display = "block";
    timer.style.visibility = "hidden";
    timer.style.display = "none";
}

pageCreate();