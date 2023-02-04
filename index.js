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

//文字列の生成
function generateCharacter(questionNum) {
  for (let i = 0; i < questionNum; i++) {
    textLists[i] = Math.random().toString(32).substring(2);
  }
}

//初期ページの部分生成
function pageCreate() {
  count = 1;
  text.textContent = "ここに文字が表示されるよ";
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

//入力値の取得、判定
function keyUp(e) {
  if (e.key === checkTexts[0].textContent) {
    correctCount++;
    checkTexts[0].className = "add-blue";
    checkTexts.shift();
    if (checkTexts.length == 0) {
      count++;
      createTitle();
      if (count > questionNum) {
        stopButton();
      }
      createCharacter();
    }
    console.log(checkTexts[0]);
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
    text.style.visibility = "visible";
    timer.style.display = "none";
    text.textContent = "";
    startTime = new Date();
    createCharacter();
    document.addEventListener("keyup", keyUp);
  }
}

//ストップボタンの機能作成
function stopButton() {
  title.textContent =
    count - 1 + "問で終了" + " " + missCount + "回のタイピングミス";
  text.style.display = "none";
  button1.style.display = "none";
  button2.style.display = "none";
  button3.style.display = "inline";
  timer.style.display = "block";
  timer.style.visibility = "visible";
  endTime = new Date();
  processTime = (endTime - startTime) / 1000;
  displayTime = Math.round(processTime);
  timer.textContent = displayTime + "秒でクリア";
  count = 1;
  document.removeEventListener("keyup", keyUp);
}

//リスタートボタンの機能作成
function restartButton() {
  document.getElementById("text1").value = "出題数を入力してね";
  text.textContent = "ここに文字が表示されるよ";
  title.textContent = "タイピングゲーム";
  form.style.display = "block";
  button1.style.display = "inline";
  button2.style.display = "none";
  button3.style.display = "none";
  text.style.visibility = "visible";
  text.style.display = "block";
  timer.textContent = "";
  timer.style.visibility = "visible";
  timer.style.display = "block";
}

pageCreate();
