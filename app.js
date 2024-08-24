let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#Reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let WinMsg = document.querySelector("#WinMsg");
let SingleBtn = document.querySelector("#Single-btn");
let DoubleBtn = document.querySelector("#Double-btn");

let SingleValid = false;
let count = 4;

SingleBtn.addEventListener("click", () => {
  resetGame();
  document.querySelector("h3").classList.remove("hide");
  SingleBtn.classList.add("hide");
  SingleValid = true;
});

let turnO = true; //playerO and playerX

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  SingleValid = false;
  count=4;
  enableBoxes();
  msgContainer.classList.add("hide");
  document.querySelector("h3").classList.add("hide");
  SingleBtn.classList.remove("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!SingleValid) {
      if (turnO) {
        //two player mode
        box.innerText = "O";
        turnO = false;
      } else {
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true;

      checkWinner(); //checking winner
    } else {
      if (turnO) {
        //single player mode
        box.innerText = "O";
        turnO = false;
        box.disabled = true;
        makeRandomMove(); //automatic Computer Response
      }
      checkWinner();
    }
  });
});


//Make Computer like response
const makeRandomMove = () => {

  if(SingleValid){
    setTimeout(() => {
      let randIdx = Math.floor(Math.random() * 9); //creating random index
      if (boxes[randIdx].disabled === false) {
        boxes[randIdx].innerText = "X";
        boxes[randIdx].disabled = true;
        turnO = true;
        count--;
        checkWinner();
      } else {
        if(count>0){
          makeRandomMove();
        }
      }
    }, 500);
  }
  
};

const ShowWinnerInDouble = (winner) => {
  WinMsg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
};

const ShowWinnerInSingle = (winner) => {
  if (winner == "O") {
    WinMsg.innerText = `Congratulations, You Win!!`;
    msgContainer.classList.remove("hide");
  } else {
    WinMsg.innerText = `You lost against computer`;
    msgContainer.classList.remove("hide");
  }
};

let disableBoxes = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

let enableBoxes = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val == pos2val && pos2val == pos3val) {
        console.log("Winner", pos1val);
        if (!SingleValid) {
          ShowWinnerInDouble(pos1val); //Double player response
        } else {
          ShowWinnerInSingle(pos1val); //Single player response
        }

        disableBoxes();
        SingleValid=false;
      }
    }
  }
};
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
