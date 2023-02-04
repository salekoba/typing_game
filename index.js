let text = document.getElementById("text");
let timer = document.getElementById("timer");
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let title = document.getElementById("title");
let form = document.getElementById("form");
let startTime;
let endTime;
let processTime;
let textLists = [];
let count = 1;
let questionNum;
let missCount = 0;
let checkTexts = [];
let correctCount = 0;
//中断したかどうかの判断を行うフラグ
let retireFlag = 0;

//文字列の生成
function generateCharacter(questionNum) {
  for (let i = 0; i < questionNum; i++) {
    textLists[i] = Math.random().toString(32).substring(2);
  }
}

//初期ページの部分生成
function pageCreate() {
  count = 1;
  text.textContent = "ここに文字列が表示されるよ";
}
//入力値の取得
function getNum() {
  questionNum = parseInt(document.getElementById("text1").value, 10);
}

//生成した文字列から文字の取り出し
function createCharacter() {
  text.textContent = "";
  let rnd = Math.floor(Math.random() * textLists.length);
  checkTexts = textLists[rnd].split("").map(function (value) {
    let span = document.createElement("span");
    span.textContent = value;
    text.appendChild(span);
    return span;
  });
}

//入力値の判定
function keyUp(e) {
  if (e.key === checkTexts[0].textContent) {
    correctCount++;
    //入力した文字が一致した時に色を変更する
    checkTexts[0].className = "add-blue";
    //先頭の文字の削除
    checkTexts.shift();
    //全て入力し終わった後の画面の要素の生成
    if (checkTexts.length == 0) {
      count++;
      createTitle();
      if (count > questionNum) {
        //最後までクリアした場合、フラグで判別し、retireButtonを呼び出す
        retireFlag++;
        retireButton();
      }
      createCharacter();
    }
  } else {
    missCount++;
    alert(missCount + "回目のミスだよ");
  }
}

//タイトルの作成
function createTitle() {
  title.textContent = count + "問目";
}

//スタートボタンの機能作成
function startButton() {
  retireFlag = 0;
  getNum();
  if (isNaN(questionNum)) {
    alert("半角数字を入力してね");
  } else {
    generateCharacter(questionNum);
    createTitle();
    form.style.display = "none";
    button1.style.display = "none";
    button2.style.display = "inline";
    text.style.display = "block";
    timer.style.display = "none";
    text.textContent = "";
    startTime = new Date();
    createCharacter();
    document.addEventListener("keyup", keyUp);
  }
}

//ストップボタンの機能作成
function retireButton() {
  title.textContent =
    count - 1 + "問で終了" + " " + missCount + "回のタイピングミス";
  text.style.display = "none";
  button2.style.display = "none";
  button3.style.display = "inline";
  timer.style.display = "block";
  endTime = new Date();
  processTime = (endTime - startTime) / 1000;
  displayTime = Math.round(processTime);
  if (retireFlag == 0) {
    timer.textContent = displayTime + "秒でリタイア";
  } else {
    timer.textContent = displayTime + "秒でクリア";
  }

  count = 1;
  document.removeEventListener("keyup", keyUp);
}

//リスタートボタンの機能作成
function restartButton() {
  document.getElementById("text1").value = "出題数を入力してね";
  text.textContent = "ここに文字が表示されるよ";
  text.style.display = "block";
  title.textContent = "タイピングゲーム";
  form.style.display = "block";
  button1.style.display = "inline";
  button3.style.display = "none";
  timer.textContent = "";
  timer.style.visibility = "visible";
  timer.style.display = "block";
}

pageCreate();
