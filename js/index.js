function convertKeyCode(__key) {
  var chara = "";
  var keyCode = __key;
  var shift = false;
  if (keyCode == 8) chara = "Backspace";

  if (keyCode == 13) chara = "Enter";

  if (keyCode == 19) chara = "pause/break";

  if (keyCode == 65) chara = shift ? "A" : "a";
  if (keyCode == 66) chara = shift ? "B" : "b";
  if (keyCode == 67) chara = shift ? "C" : "c";
  if (keyCode == 68) chara = shift ? "D" : "d";
  if (keyCode == 69) chara = shift ? "E" : "e";
  if (keyCode == 70) chara = shift ? "F" : "f";
  if (keyCode == 71) chara = shift ? "G" : "g";
  if (keyCode == 72) chara = shift ? "H" : "h";
  if (keyCode == 73) chara = shift ? "I" : "i";
  if (keyCode == 74) chara = shift ? "J" : "j";
  if (keyCode == 75) chara = shift ? "K" : "k";
  if (keyCode == 76) chara = shift ? "L" : "l";
  if (keyCode == 77) chara = shift ? "M" : "m";
  if (keyCode == 78) chara = shift ? "N" : "n";
  if (keyCode == 79) chara = shift ? "O" : "o";
  if (keyCode == 80) chara = shift ? "P" : "p";
  if (keyCode == 81) chara = shift ? "Q" : "q";
  if (keyCode == 82) chara = shift ? "R" : "r";
  if (keyCode == 83) chara = shift ? "S" : "s";
  if (keyCode == 84) chara = shift ? "T" : "t";
  if (keyCode == 85) chara = shift ? "U" : "u";
  if (keyCode == 86) chara = shift ? "V" : "v";
  if (keyCode == 87) chara = shift ? "W" : "w";
  if (keyCode == 88) chara = shift ? "X" : "x";
  if (keyCode == 89) chara = shift ? "Y" : "y";
  if (keyCode == 90) chara = shift ? "Z" : "z";

  return chara;
}

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameOver = () => {
    const _div = document.createElement("div");

    _div.innerText = "게임이 종료됐습니다.";
    _div.style =
      "display:flex; justfy-content:center; align-items: center; position:absolute; top:40vh; left:45vw; background-color:white;";
    document.body.appendChild(_div);

    for (let j = 0; j < 5; j++) {
      const endBlock = document.querySelector(
        `.board-block[data-index='${attempts}${j}']`
      );

      endBlock.style.cssText =
        "animation: 1s icons-doong-doong infinite; background-color:orange;";
    }
  };

  const nextLine = () => {
    if (attempts == 5) return gameOver();

    attempts += 1;
    index = 0;
  };

  const startTimer = () => {
    const 시작_시간 = new Date();
    const setTime = () => {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeH1 = document.querySelector("#timer");
      timeH1.innerText = `${분}:${초}`;
    };

    timer = setInterval(setTime, 1000);
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameOver();
    clearInterval(timer);
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );

      preBlock.innerText = "";
    }

    if (index !== 0) index -= 1;
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    const 정답 = "APPLE";
    //const 응답 = await fetch("/answer");
    //const 정답 = await 응답.json();
    for (let i = 0; i < 5; i++) {
      const _block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const 입력한_글자 = _block.innerText;
      const 정답_글자 = 정답[i];
      /*
      const _keyPad = document.querySelector(
        `.keypad-row[data-key='${정답_글자}']`
      );
*/
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;

        _block.style.background = "#6AAA64";
        //_keyPad.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) {
        _block.style.background = "#C9B458";
        //_keyPad.style.background = "#C9B458";
      } else _block.style.background = "#787C7E";

      _block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameOver();

    nextLine();
  };

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    const _keyPad = document.querySelector(`.keypad-row[data-key='${key}']`);

    if (65 <= keyCode && keyCode <= 90) {
      _keyPad.style.background = "orange";
    }

    if (keyCode === 8) {
      handleBackspace();
    } else if (index === 5) {
      if (keyCode == 13) {
        handleEnterKey();
      } else return;
    } else if (65 <= event.keyCode && event.keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const handleKeyUp = (event) => {
    const key = event.key;
    const keyCode = event.keyCode;

    const _keyPad = document.querySelector(`.keypad-row[data-key='${key}']`);

    if (65 <= keyCode && keyCode <= 90) {
      _keyPad.style.background = "gray";
    }
  };

  const handleClick = () => {
    ////////////////////////////////////////////////////////////////////
    const _keyBackspace = "Backspace";
    const _keyBackspacePad = document.querySelector(
      `.keypad-row[data-key='${_keyBackspace}']`
    );

    _keyBackspacePad.addEventListener("mousedown", function () {
      handleBackspace();
      _keyBackspacePad.style.background = "orange";
    });

    _keyBackspacePad.addEventListener("mouseup", function () {
      _keyBackspacePad.style.background = "rgb(200, 200, 200)";
    });

    const _keyEnter = "Enter";
    const _keyEnterPad = document.querySelector(
      `.keypad-row[data-key='${_keyEnter}']`
    );

    _keyEnterPad.addEventListener("mousedown", function () {
      handleEnterKey();
      _keyEnterPad.style.background = "orange";
    });

    _keyEnterPad.addEventListener("mouseup", function () {
      _keyEnterPad.style.background = "rgb(200, 200, 200)";
    });

    //////////////////////////////////////////////////////////////////////////////
    for (let i = 65; i <= 90; i++) {
      const _key = convertKeyCode(i).toUpperCase();
      const _keyPad = document.querySelector(`.keypad-row[data-key='${_key}']`);

      _keyPad.addEventListener("mousedown", function () {
        const key = _key;
        const keyCode = i;
        const thisBlock = document.querySelector(
          `.board-block[data-index='${attempts}${index}']`
        );

        _keyPad.style.background = "orange";

        if (key === "Backspace") handleBackspace();
        else if (index === 5) {
          if (key === "Enter") handleEnterKey();
          else return;
        } else if (65 <= keyCode && keyCode <= 90) {
          thisBlock.innerText = key;
          index += 1;
        }
      });

      _keyPad.addEventListener("mouseup", function () {
        const key = _key;
        const keyCode = i;

        if (65 <= keyCode && keyCode <= 90) {
          _keyPad.style.background = "rgb(200, 200, 200)";
        }
      });
    }
  };

  startTimer();
  handleClick();

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
}

appStart();
