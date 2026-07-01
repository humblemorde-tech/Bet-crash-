// ============================================
// BET-CRASH | Game Logic | Crash + Ticker
// ============================================

// 1. CRASH MULTIPLIER LOGIC
const multiplier = document.createElement("div");
multiplier.innerHTML = `
<div class="multiplier-box">
  <div class="multiplier" id="multiplier">1.00x</div>
  <p id="crashText"></p>
  <button class="start-btn" id="startGame">START GAME</button>
</div>
`;
document.body.insertBefore(multiplier, document.querySelector('.section-title'));

const multEl = document.getElementById("multiplier");
const crashText = document.getElementById("crashText");
const startBtn = document.getElementById("startGame");

let value = 1.00; 
let running = false; 
let animation;

function randomCrash(){return (Math.random() * 8 + 1.5).toFixed(2);}

function startCrash(){
  if(running) return;
  running = true; 
  value = 1.00;
  const crashAt = parseFloat(randomCrash());
  startBtn.disabled = true; 
  crashText.innerHTML = "";
  
  animation = setInterval(()=>{
    value += 0.02 + value * 0.008;
    multEl.innerHTML = value.toFixed(2) + "x";
    multEl.style.color = value > 2 ? "#00d4ff" : "#00ff88";
    
    if(value >= crashAt){
      clearInterval(animation);
      multEl.innerHTML = crashAt.toFixed(2) + "x";
      multEl.style.color = "#ff5555";
      crashText.innerHTML = "💥 CRASHED at " + crashAt.toFixed(2) + "x";
      running = false; 
      startBtn.disabled = false;
    }
  },40);
}
startBtn.addEventListener("click", startCrash);

// 2. LIVE TICKER RANDOM WINS
const players = ["Alex","Brian","Mordecai","Kevin","Faith","Grace","Steve","Ann","Joy","Paul"];
const betTrack = document.querySelector(".bet-track");

function updateTicker(){
  const p = players[Math.floor(Math.random()*players.length)];
  const amt = (Math.random()*8000+100).toFixed(0);
  const m = (Math.random()*8+1).toFixed(2);
  const game = ["Aviator","JetX","Plinko","Mega Moolah"][Math.floor(Math.random()*4)];
  betTrack.innerHTML += `<span>🟢 ${p} cashed ${game} ${m}x +KES ${amt}</span>  `;
}
setInterval(updateTicker, 2200);
updateTicker();
