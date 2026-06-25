// Casas Lasai — web por G&G Elcano (base estilo Eguzkilore)
const header=document.getElementById('header');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40));
const burger=document.getElementById('burger'),menu=document.getElementById('menu');
if(burger&&menu){
  burger.addEventListener('click',()=>menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>{
  // escalonado: las tarjetas hermanas entran en secuencia
  const sibs=[...el.parentElement.children].filter(c=>c.classList.contains('reveal'));
  const idx=sibs.indexOf(el);
  if(sibs.length>1&&idx>0)el.style.transitionDelay=(Math.min(idx,6)*0.08)+'s';
  io.observe(el);
});
function animateNum(el){
  const target=parseFloat(el.dataset.target);const dec=parseInt(el.dataset.decimals||'0',10);
  const suffix=el.dataset.suffix||'';const sep=el.dataset.sep==='1';const dur=1500;let start=null;
  function fmt(v){let s=dec?v.toFixed(dec).replace('.',','):Math.round(v).toString();if(sep)s=s.replace(/\B(?=(\d{3})+(?!\d))/g,'.');return s+suffix;}
  function step(t){if(!start)start=t;const p=Math.min((t-start)/dur,1);const e=1-Math.pow(1-p,3);el.textContent=fmt(target*e);if(p<1)requestAnimationFrame(step);else el.textContent=fmt(target);}
  requestAnimationFrame(step);
}
const numIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){animateNum(e.target);numIO.unobserve(e.target)}}),{threshold:.5});
document.querySelectorAll('.num[data-target]').forEach(el=>numIO.observe(el));

// ---------- Lightbox con navegación ----------
const lb=document.getElementById('lightbox'),lbImg=document.getElementById('lbImg');
if(lb&&lbImg){
  const gimgs=[...document.querySelectorAll('.gallery-grid img')];
  const countEl=document.getElementById('lbCount');
  let cur=0;
  const show=i=>{cur=(i+gimgs.length)%gimgs.length;lbImg.src=gimgs[cur].src;if(countEl)countEl.textContent=`${cur+1} / ${gimgs.length}`;};
  gimgs.forEach((img,i)=>img.addEventListener('click',()=>{show(i);lb.classList.add('open')}));
  const close=()=>lb.classList.remove('open');
  const cl=document.getElementById('lbClose');if(cl)cl.addEventListener('click',close);
  const pv=document.getElementById('lbPrev');if(pv)pv.addEventListener('click',e=>{e.stopPropagation();show(cur-1)});
  const nx=document.getElementById('lbNext');if(nx)nx.addEventListener('click',e=>{e.stopPropagation();show(cur+1)});
  lb.addEventListener('click',e=>{if(e.target===lb)close()});
  document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1);});
}

// ---------- Hero slides + dots ----------
(function(){
  const slides=[...document.querySelectorAll('#heroSlides .slide')];
  const dotsWrap=document.getElementById('heroDots');
  if(!slides.length)return;
  let i=0;
  if(dotsWrap){slides.forEach((_,k)=>{const b=document.createElement('button');if(k===0)b.classList.add('on');b.addEventListener('click',()=>go(k));dotsWrap.appendChild(b);});}
  const dots=dotsWrap?[...dotsWrap.children]:[];
  function go(k){slides[i].classList.remove('on');if(dots[i])dots[i].classList.remove('on');i=(k+slides.length)%slides.length;slides[i].classList.add('on');if(dots[i])dots[i].classList.add('on');}
  setInterval(()=>go(i+1),5500);
})();

// ---------- Marquee ----------
(function(){
  const m=document.getElementById('marquee');if(!m)return;
  const items=['Playa a 200 m','Piscina de agua salada','Atardeceres de Trafalgar','Jardín y hamacas','Cabo de Trafalgar','WiFi y parking','Parque Natural de la Breña','Cocina equipada'];
  const block=items.map(t=>`<span>${t} <i>✦</i></span>`).join('');
  m.innerHTML=block+block;
})();

// ---------- Botón volver arriba + barra de progreso ----------
(function(){
  const top=document.getElementById('toTop'),pr=document.getElementById('progress');
  addEventListener('scroll',()=>{
    if(top)top.classList.toggle('show',scrollY>520);
    if(pr){const h=document.documentElement;const sc=(h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;pr.style.width=sc+'%';}
  });
  if(top)top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
})();
