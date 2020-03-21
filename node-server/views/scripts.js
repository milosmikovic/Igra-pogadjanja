document.getElementById("memory-game").style.visibility = "hidden";
document.getElementById("show-res").style.visibility = "hidden";
document.getElementById("timer").style.visibility = "hidden";
document.getElementById("game-reset").style.visibility = "hidden";
let timer = 0;
let resenje = []
const timer_div = document.getElementById("timer");
timer_div.innerText = timer;
let end_of_game = 0;
let interval
let niz = [0,1,2,3,4,5,6,7,8,9,10,11]
niz = shuffle(niz);

// ime i prezime
let ime = "";
let prezime = "";
function increment_timer() {
    timer+=1;
    timer_div.innerText = timer;
}

function on_submit() {
    ime = document.getElementById("fname").value;
    prezime = document.getElementById("lname").value;
    if(ime == "" || prezime == ""){
        alert("Insert both fname and lname!");
        ime = "";
        prezime = "";
        return;
    }
    console.log(ime,prezime);
    document.getElementById("memory-game").style.visibility = "visible";
    document.getElementById("show-res").style.visibility = "visible";
    document.getElementById("timer").style.visibility = "visible";
    document.getElementById("game-reset").style.visibility = "visible";
    document.getElementById("fname").disabled = true;
    document.getElementById("lname").disabled = true;
}

function show_scores(){
    location.replace("http://localhost:3000");
}


const cards = document.querySelectorAll('.mem-card');

let hasFliped = false;
let fstCard, secCard;

let lockBoard = false;
let flips = 0

async function end_game() {
    console.log("kraj");
    alert("the end!");
    let res = await axios.post('/addPlayer', {timer: timer,fname:ime,lname:prezime,flips:flips});
    console.log(flips);
    clearInterval(interval);
}
function reset_game(){
    location.reload();
}


function flipCard() {
    if(flips === 0)
        interval = setInterval(increment_timer, 1000);

    flips++;

    if(lockBoard){
        return;
    }

    if(this === fstCard) return;
    this.classList.add('flip');

    if(!hasFliped){
        //kliknuta prva karta
        hasFliped = true;
        fstCard = this;

        return;
    }
    
    secCard = this;
    isMatch();
    if(end_of_game == 12){
        end_game();
    }
}

function isMatch(){
    if(fstCard.dataset.framework === secCard.dataset.framework){
        disableCards();
    }else{
        unflipCards();
    }
}

function disableCards(){
    fstCard.removeEventListener('click',flipCard);
    secCard.removeEventListener('click',flipCard);
    end_of_game +=2;
    resetBoard();
}

function unflipCards(){

    lockBoard = true;

    setTimeout(() => {
        fstCard.classList.remove('flip');
        secCard.classList.remove('flip');
        resetBoard();
    },1000);
}

function resetBoard(){
    [hasFliped,lockBoard] = [false,false];
    [fstCard,secCard] = [null,null];
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

(function shuffle(){
    cards.forEach(card => {
        let random = Math.floor(Math.random() * 12);
        card.style.order = niz.shift();
        resenje.push(random)
    });
    tmp = document.querySelectorAll('.mem-card');
    tmp.forEach(card => {console.log(card.dataset.framework,card.style.order)})
})();

cards.forEach(card => card.addEventListener('click',flipCard));