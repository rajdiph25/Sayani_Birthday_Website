const screens = [...document.querySelectorAll(".screen")];
const progressBar = document.getElementById("progressBar");
let current = 0;

function goTo(id) {
  const next = document.getElementById(id);
  if (!next) return;
  screens.forEach(s => s.classList.remove("active"));
  next.classList.add("active");
  current = screens.indexOf(next);
  progressBar.style.width = `${Math.max(14, ((current + 1) / screens.length) * 100)}%`;
  makePetals(current > 1 ? 7 : 3);
}

document.getElementById("openBtn").addEventListener("click", () => {
  goTo("reveal");
  startMusicIfLoaded();
});

document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", () => goTo(btn.dataset.next));
});

document.getElementById("restart").addEventListener("click", () => {
  goTo("intro");
  window.scrollTo(0,0);
});

function makePetals(count=5){
  const layer = document.getElementById("petals");
  for(let i=0;i<count;i++){
    const p=document.createElement("span");
    p.className="petal";
    p.textContent=Math.random()>.45?"♡":"✦";
    p.style.left=(Math.random()*100)+"%";
    p.style.setProperty("--drift",(Math.random()*180-90)+"px");
    p.style.animationDuration=(5+Math.random()*6)+"s";
    p.style.animationDelay=(Math.random()*1.5)+"s";
    layer.appendChild(p);
    setTimeout(()=>p.remove(),13000);
  }
}
setInterval(()=>makePetals(1),2200);

const photoInputs = document.querySelectorAll(".photo-input");
photoInputs.forEach(input => {
  input.addEventListener("change", e => {
    const file=e.target.files?.[0];
    if(!file) return;
    const img=document.getElementById(input.dataset.target);
    img.src=URL.createObjectURL(file);
    input.parentElement.classList.add("has-image");
  });
});

const audio = document.getElementById("audio");
const musicBtn = document.getElementById("musicBtn");
const musicAdd = document.getElementById("musicAdd");
const musicFile = document.getElementById("musicFile");

musicAdd.addEventListener("click",()=>musicFile.click());
musicFile.addEventListener("change",e=>{
  const file=e.target.files?.[0];
  if(!file) return;
  audio.src=URL.createObjectURL(file);
  audio.volume=.35;
  audio.play().catch(()=>{});
  musicBtn.textContent="❚❚";
  musicAdd.textContent="♪ song loaded";
});
musicBtn.addEventListener("click",()=>{
  if(!audio.src){
    musicFile.click();
    return;
  }
  if(audio.paused){audio.play();musicBtn.textContent="❚❚"}
  else{audio.pause();musicBtn.textContent="♫"}
});
function startMusicIfLoaded(){
  if(audio.src && audio.paused) audio.play().catch(()=>{});
}
makePetals(5);
