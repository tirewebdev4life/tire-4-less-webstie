const menu=document.querySelector('.menu'),nav=document.querySelector('#mainnav');if(menu&&nav){menu.addEventListener('click',()=>{const o=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!o));nav.classList.toggle('open',!o)})}const st=document.querySelector('#service-type'),mf=document.querySelector('#mobile-fields'),dw=document.querySelector('#destination-wrap');function sync(){if(!st||!mf)return;const mobile=st.value==='Roadside Assistance'||st.value==='Towing';mf.hidden=!mobile;const cur=mf.querySelector('input[name="current_location"]');if(cur)cur.required=mobile;if(dw)dw.style.display=st.value==='Towing'?'block':'none'}if(st){st.addEventListener('change',sync);sync()}document.querySelectorAll('[data-route="Towing"]').forEach(a=>a.addEventListener('click',()=>setTimeout(()=>{if(st){st.value='Towing';sync()}},100)));document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const m=f.querySelector('.success');if(m){m.hidden=false;m.setAttribute('role','status');m.setAttribute('aria-live','polite')}}));

// P12 hub branch preselection + towing requirements
const serviceLocationSelect = document.querySelector('#service-form select[name="location"]');
const tireLocationSelect = document.querySelector('#tire-form select[name="location"]');

document.querySelectorAll('[data-preselect-location]').forEach(link=>{
  link.addEventListener('click',()=>{
    const value = link.getAttribute('data-preselect-location');
    setTimeout(()=>{
      if(serviceLocationSelect) serviceLocationSelect.value = value;
    },50);
  });
});

document.querySelectorAll('[data-preselect-tire-location]').forEach(link=>{
  link.addEventListener('click',()=>{
    const value = link.getAttribute('data-preselect-tire-location');
    setTimeout(()=>{
      if(tireLocationSelect) tireLocationSelect.value = value;
    },50);
  });
});

function syncTowingDestinationRequirement(){
  if(!serviceType || !destinationWrap) return;
  const input = destinationWrap.querySelector('input[name="destination"]');
  const towing = serviceType.value === 'Towing';
  destinationWrap.classList.toggle('is-required', towing);
  if(input) input.required = towing;
}
if(serviceType){
  serviceType.addEventListener('change',syncTowingDestinationRequirement);
  syncTowingDestinationRequirement();
}

// Add live regions from initial render rather than only after submit.
document.querySelectorAll('.form-success').forEach(el=>{
  el.setAttribute('role','status');
  el.setAttribute('aria-live','polite');
});


// P12 actual hub markup — branch preselection and towing requirement
const hubServiceLocation = document.querySelector('#service-form select[name="location"]');
const hubTireLocation = document.querySelector('#tire-form select[name="location"]');

document.querySelectorAll('[data-preselect-location]').forEach(link=>{
  link.addEventListener('click',()=>{
    const value=link.getAttribute('data-preselect-location');
    setTimeout(()=>{ if(hubServiceLocation) hubServiceLocation.value=value; },50);
  });
});
document.querySelectorAll('[data-preselect-tire-location]').forEach(link=>{
  link.addEventListener('click',()=>{
    const value=link.getAttribute('data-preselect-tire-location');
    setTimeout(()=>{ if(hubTireLocation) hubTireLocation.value=value; },50);
  });
});

function syncHubTowingDestination(){
  const type=document.querySelector('#service-type');
  const wrap=document.querySelector('#destination-wrap');
  if(!type||!wrap)return;
  const input=wrap.querySelector('input[name="destination"]');
  const towing=type.value==='Towing';
  wrap.classList.toggle('is-required',towing);
  if(input) input.required=towing;
}
const hubType=document.querySelector('#service-type');
if(hubType){
  hubType.addEventListener('change',syncHubTowingDestination);
  syncHubTowingDestination();
}

document.querySelectorAll('.success').forEach(el=>{
  el.setAttribute('role','status');
  el.setAttribute('aria-live','polite');
});
