
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
if(toggle){
  toggle.addEventListener('click',()=>{
    const open=toggle.getAttribute('aria-expanded')==='true';
    toggle.setAttribute('aria-expanded',String(!open));
    nav.classList.toggle('open',!open);
  });
}

document.querySelectorAll('.has-menu .nav-button').forEach(btn=>{
  btn.addEventListener('click',e=>{
    if(window.innerWidth<=760){
      e.preventDefault();
      btn.parentElement.classList.toggle('active');
    }
  });
});

const finder=document.getElementById('finder-form');
const request=document.getElementById('request-form');
const needType=document.getElementById('need-type');
const contactSection=document.getElementById('contact');
const requestLocation=request ? request.querySelector('select[name="location"]') : null;

if(finder){
  finder.addEventListener('submit',e=>{
    e.preventDefault();
    const data=new FormData(finder);
    const width=data.get('width');
    const profile=data.get('profile');
    const rim=data.get('rim');
    const size=[width,profile,rim].filter(Boolean).join('/');
    const location=data.get('location');

    if(needType) needType.value='Tire Availability';
    if(requestLocation && location && location!=='Any Location'){
      requestLocation.value=location;
    }
    const textarea=request ? request.querySelector('textarea[name="message"]') : null;
    if(textarea){
      textarea.value=size
        ? `Tire size fields: ${size}. Type: ${data.get('type')}. Preferred location: ${location}.`
        : `Tire availability request. Type: ${data.get('type')}. Preferred location: ${location}.`;
    }
    syncNeedFields();
    if(contactSection) contactSection.scrollIntoView({behavior:'smooth'});
  });
}

document.querySelectorAll('[data-preselect-location]').forEach(link=>{
  link.addEventListener('click',()=>{
    const location=link.getAttribute('data-preselect-location');
    setTimeout(()=>{
      if(requestLocation) requestLocation.value=location;
      if(needType) needType.value='In-Shop Service';
      syncNeedFields();
    },50);
  });
});

const mobileFields=document.getElementById('mobile-fields');
const towDestinationWrap=document.getElementById('tow-destination-wrap');
const shopOnly=document.querySelectorAll('.shop-only');

function syncNeedFields(){
  if(!needType) return;
  const value=needType.value;
  const mobile=value==='Roadside Assistance' || value==='Towing';
  const towing=value==='Towing';

  if(mobileFields){
    mobileFields.hidden=!mobile;
    const current=mobileFields.querySelector('input[name="current_location"]');
    if(current) current.required=mobile;
  }

  shopOnly.forEach(el=>{ el.hidden=mobile; });

  if(towDestinationWrap){
    towDestinationWrap.style.display=towing?'block':'none';
    towDestinationWrap.classList.toggle('is-required',towing);
    const destination=towDestinationWrap.querySelector('input[name="destination"]');
    if(destination) destination.required=towing;
  }
}
if(needType){
  needType.addEventListener('change',syncNeedFields);
  syncNeedFields();
}

if(request){
  request.addEventListener('submit',e=>{
    e.preventDefault();
    const success=document.getElementById('form-success');
    const note=document.getElementById('form-note');
    if(success) success.hidden=false;
    if(note) note.hidden=true;
  });
}
