console.log("Welcome");
let tap=new Audio("mixkit-arcade-bonus-alert-767.mp4")

let turn = "X";
let isgameover = false;

// Who's turn 
function changeTurn(){
    return turn==="X"? "O": "X"
}
// Check for win 
function win_check(){
    let boxtexts = document.getElementsByClassName("boxtext");
    // win[3] to win[5] is for line  and win[0] to win[2] is for winning condition
    let win =[
        [0 , 1 , 2 ,5 , 5  , 0  ],
        [3 , 4 , 5 ,5 , 15 , 0  ],
        [6 , 7 , 8 ,5 , 25 , 0  ],
        [0 , 3 , 6 ,-5, 15 , 90 ],
        [1 , 4 , 7 ,5 , 15 , 90 ],
        [2 , 5 , 8 ,15, 15 , 90 ],
        [0 , 4 , 8 ,5 , 15 , 45 ],
        [2 , 4 , 6 ,5 , 15 , 135]
    ]

    win.forEach(e =>{
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[1]].innerText === boxtexts[e[2]].innerText) && boxtexts[e[0]].innerText !=='' ){
            document.querySelector(".info").innerText = boxtexts[e[0]].innerText + " won !!"
            isgameover = true;
            document.querySelector(".imagebox").getElementsByTagName("img")[0].style.width ='200px';
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
            
        }
    })


}
function draw_check() {
    let boxtexts = document.getElementsByClassName("boxtext");
    let filled = Array.from(boxtexts).every(boxtext => boxtext.innerText !== '');
    if (filled && !isgameover) {
        document.getElementsByClassName("info")[0].innerText = "Draw";
        isgameover = true;
    }
}


let boxes= document.getElementsByClassName("box");

Array.from(boxes).forEach(element =>{
    let boxtext= element.querySelector(".boxtext");
    element.addEventListener('click', ()=>{
        if (isgameover) return;
        if (boxtext.innerText ===''){
            boxtext.innerText = turn;
            // See turn
            turn = changeTurn();
            // play the audio
            tap.play();
            // check if anyone won
            draw_check();
            win_check();
            if (!isgameover){
                document.getElementsByClassName("info")[0].innerText = "Turn for "+ turn;
            }
        }
    })
})


reset.addEventListener("click", (e)=>{
    let boxtext= document.querySelectorAll(".boxtext");
    Array.from(boxtext).forEach(element =>{
        element.innerText = '';
    });
    isgameover = false;
    turn = 'X';
    document.getElementsByClassName("info")[0].innerText = "Turn for "+ turn;
    document.querySelector(".imagebox").getElementsByTagName("img")[0].style.width ='0px';
    document.querySelector(".line").style.width = "0";
});
