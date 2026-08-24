const icons=["▥","⌂","⚙","⌘","⇄","◎","◉","♙","◎"];function renderLists(code){ const d=LISTS[code]||LISTS.en; document.getElementById("capGrid").innerHTML=d.caps.map((x,i)=>`<div class="cap"><i>${icons[i]}</i>${x}</div>`).join(""); document.getElementById("bringList").innerHTML=d.bring.map(x=>`<li>${x}</li>`).join(""); document.getElementById("provideList").innerHTML=d.provide.map(x=>`<li>${x}</li>`).join(""); document.getElementById("steps").innerHTML=d.steps.map(x=>`<div class="step"><b>${x[0]}</b><strong>${x[1]}</strong><small>${x[2]}</small></div>`).join(""); document.getElementById("industryGrid").innerHTML=d.industries.map(x=>`<div class="industry">${x}</div>`).join(""); document.getElementById("uaeList").innerHTML=d.uae.map(x=>`<li>${x}</li>`).join("");}function lang(code){ const d=T[code]||T.en; document.documentElement.lang=code; document.documentElement.dir=code==="ar"?"rtl":"ltr"; document.querySelectorAll("[data-i18n]").forEach(el=>{const v=d[el.dataset.i18n];if(v!==undefined)el.innerHTML=v;}); document.querySelectorAll("[data-ph]").forEach(el=>el.placeholder=d[el.dataset.ph]||T.en[el.dataset.ph]||""); renderLists(code); document.querySelectorAll(".footer-langs button").forEach(b=>b.classList.toggle("active",b.dataset.lang===code)); localStorage.setItem("oillink-lang",code); document.querySelector("#language").value=code;}function showFormMessage(){alert((T[document.documentElement.lang]||T.en).formMsg);}const sel=document.querySelector("#language");const saved=localStorage.getItem("oillink-lang");const initial=["en","ar","zh"].includes(saved)?saved:"en";sel.value=initial;lang(initial);sel.addEventListener("change",e=>lang(e.target.value));document.querySelector("#menu").addEventListener("click",()=>document.querySelector(".desktop-nav").classList.toggle("open"));document.querySelectorAll(".footer-langs button").forEach(btn=>btn.addEventListener("click",()=>{lang(btn.dataset.lang);window.scrollTo({top:0,behavior:"smooth"});}));
(function(){
  const links=[...document.querySelectorAll('.desktop-nav a[href^="#"]')];
  const items=links.map(a=>({a,section:document.querySelector(a.getAttribute('href'))})).filter(x=>x.section);
  function setActive(id){links.forEach(a=>{const on=!!id&&a.getAttribute('href')==='#'+id;a.classList.toggle('active',on);if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}
  function update(){
    const line=(document.querySelector('.nav')?.offsetHeight||76)+28;
    if(items[0]&&items[0].section.getBoundingClientRect().top>line){setActive(null);return;}
    let id=null;
    for(const {section} of items){const r=section.getBoundingClientRect();if(r.top<=line)id=section.id;if(r.top<=line&&r.bottom>line){id=section.id;break;}}
    if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4&&items.length)id=items[items.length-1].section.id;
    setActive(id);
  }
  let raf=0;const schedule=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;update();});};
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);addEventListener('load',update);document.addEventListener('DOMContentLoaded',update);
  links.forEach(a=>a.addEventListener('click',()=>{setActive(a.getAttribute('href').slice(1));document.querySelector('.desktop-nav')?.classList.remove('open');setTimeout(update,450);}));
  update();
})();