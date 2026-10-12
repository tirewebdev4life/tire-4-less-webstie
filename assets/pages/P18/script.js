
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if(menu && nav){
  menu.addEventListener('click',()=>{
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });
}

const serviceType = document.querySelector('#service-type');
const mobileFields = document.querySelector('#mobile-fields');
const destinationWrap = document.querySelector('#destination-wrap');
function syncServiceFields(){
  if(!serviceType || !mobileFields) return;
  const mobile = serviceType.value === 'Roadside Assistance' || serviceType.value === 'Towing';
  mobileFields.hidden = !mobile;
  if(destinationWrap) destinationWrap.style.display = serviceType.value === 'Towing' ? 'block' : 'none';
}
if(serviceType){
  serviceType.addEventListener('change', syncServiceFields);
  syncServiceFields();
}

document.querySelectorAll('[data-route="towing"]').forEach(a=>{
  a.addEventListener('click',()=>{
    setTimeout(()=>{
      if(serviceType){
        serviceType.value='Towing';
        syncServiceFields();
      }
    },100);
  });
});

document.querySelectorAll('form').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const success=form.querySelector('.form-success');
    if(success) success.hidden=false;
  });
});


// P17 form-route refinement
function setRequiredByRoute(){
  if(!serviceType || !mobileFields) return;
  const mobile = serviceType.value === 'Roadside Assistance' || serviceType.value === 'Towing';
  const locationInput = mobileFields.querySelector('input[name="current_location"]');
  if(locationInput) locationInput.required = mobile;
}
if(serviceType){
  serviceType.addEventListener('change', setRequiredByRoute);
  setRequiredByRoute();
}

// Keep all form success messages accessible to screen readers.
document.querySelectorAll('.form-success').forEach(el=>{
  el.setAttribute('role','status');
  el.setAttribute('aria-live','polite');
});


// P18 North Tryon branch marker
const northTryon = document.body.dataset.location === 'north-tryon';
if(northTryon){
  document.querySelectorAll('form').forEach(form=>form.setAttribute('data-branch','north-tryon'));
}


// P18 North Tryon route refinement
function setNorthTryonRouteRequirements(){
  if(!serviceType || !mobileFields) return;
  const mobile = serviceType.value === 'Roadside Assistance' || serviceType.value === 'Towing';
  const currentLocation = mobileFields.querySelector('input[name="current_location"]');
  if(currentLocation) currentLocation.required = mobile;
}
if(serviceType){
  serviceType.addEventListener('change', setNorthTryonRouteRequirements);
  setNorthTryonRouteRequirements();
}

document.querySelectorAll('.form-success').forEach(el=>{
  el.setAttribute('role','status');
  el.setAttribute('aria-live','polite');
});
