const serviceButtons=[...document.querySelectorAll('[data-service-filter]')];
const locationSelect=document.querySelector('#location-filter');
const workCards=[...document.querySelectorAll('.work-card')];
const reviewCards=[...document.querySelectorAll('.t4l-review-card')];
const emptyState=document.querySelector('#empty-state');
let currentService='all';
function applyFilters(){
  const location=locationSelect ? locationSelect.value : 'all';
  let visible=0;
  [...workCards,...reviewCards].forEach(card=>{
    const serviceMatch=currentService==='all' || card.dataset.service===currentService;
    const cardLocation=card.dataset.location||'all';
    const locationMatch=location==='all' || (cardLocation!=='all' && cardLocation===location);
    const show=serviceMatch && locationMatch;
    card.hidden=!show;
    card.classList.toggle('is-filtered-out',!show);
    card.setAttribute('aria-hidden',String(!show));
    if(show) visible++;
  });
  if(emptyState){
    emptyState.hidden=visible!==0;
    emptyState.classList.toggle('is-filtered-out',visible!==0);
    const strong=emptyState.querySelector('strong');
    const copy=emptyState.querySelector('p');
    if(visible===0 && location!=='all'){
      if(strong) strong.textContent='NO PUBLISHED LOCATION-TAGGED WORK FOR THIS FILTER YET.';
      if(copy) copy.textContent='Choose All Locations or another service category.';
    }else if(visible===0){
      if(strong) strong.textContent='NO WORK CATEGORY IS AVAILABLE FOR THIS FILTER.';
      if(copy) copy.textContent='Try another service category.';
    }
  }
}
serviceButtons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    currentService=btn.dataset.serviceFilter||'all';
    serviceButtons.forEach(b=>{
      const active=b===btn;
      b.classList.toggle('active',active);
      b.setAttribute('aria-pressed',String(active));
    });
    applyFilters();
  });
});
if(locationSelect) locationSelect.addEventListener('change',applyFilters);
applyFilters();
