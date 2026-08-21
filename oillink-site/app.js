const icons=["▥","⌂","⚙","⌘","⇄","◎","◉","♙","◎"];
function renderLists(code){
 const d=LISTS[code]||LISTS.en;
 document.getElementById("capGrid").innerHTML=d.caps.map((x,i)=>`<div class="cap"><i>${icons[i]}</i>${x}</div>`).join("");
 document.getElementById("bringList").innerHTML=d.bring.map(x=>`<li>${x}</li>`).join("");
 document.getElementById("provideList").innerHTML=d.provide.map(x=>`<li>${x}</li>`).join("");
 document.getElementById("steps").innerHTML=d.steps.map(x=>`<div class="step"><b>${x[0]}</b><strong>${x[1]}</strong><small>${x[2]}</small></div>`).join("");
 document.getElementById("industryGrid").innerHTML=d.industries.map(x=>`<div class="industry">${x}</div>`).join("");
 document.getElementById("uaeList").innerHTML=d.uae.map(x=>`<li>${x}</li>`).join("");
}
function lang(code){
 const d=T[code]||T.en;
 document.documentElement.lang=code;
 document.documentElement.dir=code==="ar"?"rtl":"ltr";
 document.querySelectorAll("[data-i18n]").forEach(el=>{const v=d[el.dataset.i18n];if(v!==undefined)el.innerHTML=v;});
 document.querySelectorAll("[data-ph]").forEach(el=>el.placeholder=d[el.dataset.ph]||T.en[el.dataset.ph]||"");
 renderLists(code);
 document.querySelectorAll(".footer-langs button").forEach(b=>b.classList.toggle("active",b.dataset.lang===code));
 localStorage.setItem("oillink-lang",code);
 document.querySelector("#language").value=code;
}
function showFormMessage(){alert((T[document.documentElement.lang]||T.en).formMsg);}
const sel=document.querySelector("#language");
const initial=localStorage.getItem("oillink-lang")||"en";
sel.value=initial;lang(initial);
sel.addEventListener("change",e=>lang(e.target.value));
document.querySelector("#menu").addEventListener("click",()=>document.querySelector(".desktop-nav").classList.toggle("open"));
document.querySelectorAll(".footer-langs button").forEach(btn=>btn.addEventListener("click",()=>{lang(btn.dataset.lang);window.scrollTo({top:0,behavior:"smooth"});}));
