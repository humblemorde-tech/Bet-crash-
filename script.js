const multiplier = document.getElementById("multiplier");
const crashText = document.getElementById("crashText");
const startBtn = document.getElementById("startGame");
let value = 1.00; let running = false; let animation;

function randomCrash(){return (Math.random() * 8 + 1.5).toFixed(2);}

function startCrash(){
  if(running) return;
  running=true; value=1.00;
  const crashAt=parseFloat(randomCrash());
  startBtn.disabled=true; crashText.innerHTML="";
  animation=setInterval(()=>{
    value+=0.02+value*0.008;
    multiplier.innerHTML=value.toFixed(2)+"x";
    if(value>=crashAt){
      clearInterval(animation);
      multiplier.innerHTML=crashAt.toFixed(2)+"x";
      crashText.innerHTML="💥 CRASHED at "+crashAt.toFixed(2)+"x";
      running=false; startBtn.disabled=false;
    }
  },40);
}
startBtn.addEventListener("click",startCrash);

const players=["Alex","Brian","Mordecai","Kevin","Faith","Grace"];
const winners=document.getElementById("liveWins");
function updatePlayers(){
  if(!winners) return;
  const player=players[Math.floor(Math.random()*players.length)];
  const amount=(Math.random()*8000+100).toFixed(0);
  const multi=(Math.random()*8+1).toFixed(2);
  winners.innerHTML+=`<span>🟢 ${player} cashed out at <b>${multi}x</b> won <b>KES ${amount}</b></span>`;
}
setInterval(updatePlayers,2500);
