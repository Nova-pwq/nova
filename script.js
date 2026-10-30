const tabs=[...document.querySelectorAll('.tabs button')],pages=[...document.querySelectorAll('.page')];
function show(id){
  if(!pages.some(p=>p.id===id))id='main';
  tabs.forEach(t=>{const on=t.dataset.tab===id;t.classList.toggle('on',on);t.setAttribute('aria-selected',on)});
  pages.forEach(p=>p.classList.toggle('on',p.id===id));
  if(id==='main')count();
}
tabs.forEach(t=>t.onclick=()=>{location.hash=t.dataset.tab});
addEventListener('hashchange',()=>show(location.hash.slice(1)));
addEventListener('keydown',e=>{const t=tabs[+e.key-1];if(t&&!e.ctrlKey&&!e.metaKey)t.click()});

function count(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    const end=+el.dataset.count,t0=performance.now();
    (function f(t){const k=Math.min((t-t0)/900,1);el.textContent=Math.round(end*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(t0);
  });
}

const toast=document.getElementById('toast');
document.getElementById('copy').onclick=()=>{
  navigator.clipboard?.writeText(document.getElementById('ip').textContent);
  toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800);
};

// піксельні частинки
const c=document.getElementById('fx'),x=c.getContext('2d');let ps=[];
function size(){c.width=innerWidth;c.height=innerHeight}size();addEventListener('resize',size);
for(let i=0;i<40;i++)ps.push({x:Math.random()*c.width,y:Math.random()*c.height,s:2+Math.random()*3|0,v:.2+Math.random()*.6,a:.2+Math.random()*.5});
(function loop(){
  x.clearRect(0,0,c.width,c.height);
  for(const p of ps){p.y-=p.v;if(p.y<-5){p.y=c.height+5;p.x=Math.random()*c.width}
    x.fillStyle=`rgba(255,255,255,${p.a})`;x.fillRect(p.x|0,p.y|0,p.s*2,p.s*2)}
  requestAnimationFrame(loop);
})();
show(location.hash.slice(1));
