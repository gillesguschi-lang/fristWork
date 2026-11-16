
// ====== À MODIFIER : vos informations ======
var CONFIG={
 whatsapp:"237600000000", // numéro WhatsApp, indicatif sans + ni espaces
 google:"https://www.google.com/maps/search/?api=1&query=Valclair+Yaound%C3%A9", // lien Google Maps ou avis
 products:[ // prix d'exemple en FCFA : remplacez par vos vrais prix
  {name:"Bouteille 0,6 L",size:.6,price:250,desc:"Pratique pour le sport, l'école et les déplacements."},
  {name:"Bouteille 1,6 L",size:1.6,price:500,desc:"Idéale pour la maison, le bureau et les repas."}
 ]};
// ============================================
(function(){
 var P=CONFIG.products,q=P.map(function(){return 0}),box=document.getElementById('prods'),
 fmt=function(n){return n.toLocaleString('fr-FR')+' FCFA'},
 wa='https://wa.me/'+CONFIG.whatsapp+'?text=',
 ob=document.getElementById('orderBtn'),tot=document.getElementById('total');
 document.getElementById('gBtn').href=CONFIG.google;
 document.getElementById('waBtn').href=wa+encodeURIComponent('Bonjour Valclair, j\'aimerais avoir des informations.');
 function upd(){
  var t=0,l=[];P.forEach(function(p,i){if(q[i]){t+=q[i]*p.price;l.push(q[i]+' x '+p.name+' ('+fmt(p.price)+')')}});
  tot.textContent='Total : '+fmt(t);
  var ad=document.getElementById('quartier').value.trim();
  ob.setAttribute('aria-disabled',t===0);
  ob.textContent=t?'Commander sur WhatsApp':'Choisissez une quantité';
  ob.href=t?wa+encodeURIComponent('Bonjour Valclair, je souhaite commander :\n'+l.join('\n')+'\nTotal : '+fmt(t)+(ad?'\nLivraison : '+ad:'')):'#';
 }
 P.forEach(function(p,i){
  var d=document.createElement('div');d.className='prod';
  d.innerHTML='<svg viewBox="0 0 40 100" style="height:'+(70+p.size*30)+'px" aria-hidden="true"><rect x="14" y="0" width="12" height="8" rx="2" fill="#1450e6"/><path d="M15 8h10v10c6 6 10 10 10 20v52a8 8 0 0 1-8 8H13a8 8 0 0 1-8-8V38c0-10 4-14 10-20z" fill="#35c8f0" fill-opacity=".55" stroke="#1450e6" stroke-width="2"/></svg><h3>'+p.name+'</h3><p>'+p.desc+'</p><div class="price">'+fmt(p.price)+'</div><div class="qty"><button aria-label="Retirer une '+p.name+'">−</button><output>0</output><button aria-label="Ajouter une '+p.name+'">+</button></div>';
  var b=d.querySelectorAll('button'),o=d.querySelector('output');
  b[0].onclick=function(){q[i]=Math.max(0,q[i]-1);o.textContent=q[i];upd()};
  b[1].onclick=function(){q[i]++;o.textContent=q[i];upd()};
  box.appendChild(d);
 });
 document.getElementById('quartier').addEventListener('input',upd);
 upd();
})();
// bulles du hero
(function(){var b=document.getElementById('bubbles');for(var i=0;i<18;i++){var e=document.createElement('span');e.className='bub';var s=8+Math.random()*34;e.style.cssText='width:'+s+'px;height:'+s+'px;left:'+Math.random()*100+'%;animation-duration:'+(9+Math.random()*12)+'s;animation-delay:-'+Math.random()*15+'s';b.appendChild(e)}})();
// agrandissement des photos
var lb=document.getElementById('lb'),li=lb.querySelector('img');
document.querySelectorAll('.photo,figure img').forEach(function(im){im.addEventListener('click',function(){li.src=im.src;li.alt=im.alt;lb.classList.add('on')})});
lb.addEventListener('click',function(){lb.classList.remove('on')});
document.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('on')});
// suivi d'hydratation
var N=8,done=0,cups=document.getElementById('cups'),water=document.getElementById('water'),count=document.getElementById('count');
var day=new Date().toISOString().slice(0,10);
try{var s=JSON.parse(localStorage.getItem('valclair-eau')||'{}');if(s.day===day)done=s.n||0}catch(e){}
function draw(){
 water.style.height=(done/N*100)+'%';
 count.textContent=done>=N?'Objectif atteint : '+done+' verres. Bravo !':done+' verre'+(done>1?'s':'')+' sur '+N;
 Array.prototype.forEach.call(cups.children,function(c,i){c.setAttribute('aria-pressed',i<done)});
 try{localStorage.setItem('valclair-eau',JSON.stringify({day:day,n:done}))}catch(e){}
}
for(var i=0;i<N;i++){(function(i){var c=document.createElement('button');c.textContent='💧';c.setAttribute('aria-label','Verre '+(i+1));c.onclick=function(){done=(done===i+1)?i:i+1;draw()};cups.appendChild(c)})(i)}
document.getElementById('reset').onclick=function(){done=0;draw()};
draw();