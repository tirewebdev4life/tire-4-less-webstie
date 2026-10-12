
(function(){
  const menu=document.querySelector('.t4l-global-menu');
  const nav=document.querySelector('#t4l-global-nav');
  if(menu&&nav){
    menu.addEventListener('click',()=>{
      const open=menu.getAttribute('aria-expanded')==='true';
      menu.setAttribute('aria-expanded',String(!open));
      nav.classList.toggle('is-open',!open);
    });
  }
  document.querySelectorAll('.t4l-global-dropbtn').forEach(btn=>{
    btn.setAttribute('aria-haspopup','true');
    if(!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded','false');
    btn.addEventListener('click',e=>{
      if(window.innerWidth<=760){
        e.preventDefault();
        const item=btn.closest('.t4l-global-item');
        const open=Boolean(item?.classList.toggle('is-open'));
        btn.setAttribute('aria-expanded',String(open));
      }
    });
  });

  // Mark current route without requiring page-specific nav markup.
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  document.querySelectorAll('.t4l-global-nav a').forEach(a=>{
    const href=(a.getAttribute('href')||'').split('#')[0].toLowerCase();
    if(href===current) a.setAttribute('aria-current','page');
  });

  // Configurable production form bridge.
  window.T4L_SITE_CONFIG=window.T4L_SITE_CONFIG||{
    formEndpoint:'api/request',
    formMode:'same-origin-node-relay',
    operationalEmail:'tirewebdev4life@gmail.com',
    customerReceipt:true
  };

  function serializeForm(form){
    const data={};
    new FormData(form).forEach((v,k)=>{
      if(data[k]!==undefined){
        if(!Array.isArray(data[k])) data[k]=[data[k]];
        data[k].push(v);
      }else data[k]=v;
    });
    data._page=(location.pathname.split('/').pop()||'index.html');
    data._formId=form.id||'unnamed-form';
    data._submittedAt=new Date().toISOString();
    data._operationalEmail='tirewebdev4life@gmail.com';
    data._replyTo=data.email||'';
    data._customerReceiptRequested=Boolean(data.email);
    return data;
  }
  function saveFallback(payload){
    try{
      const key='t4l_request_fallback';
      const arr=JSON.parse(localStorage.getItem(key)||'[]');
      arr.push(payload);
      localStorage.setItem(key,JSON.stringify(arr.slice(-50)));
      return true;
    }catch(e){ return false; }
  }
  function showGlobalStatus(message){
    let box=document.querySelector('.t4l-global-offline-status');
    if(!box){
      box=document.createElement('div');
      box.className='t4l-global-offline-status';
      box.setAttribute('role','status');
      box.setAttribute('aria-live','polite');
      document.body.appendChild(box);
    }
    box.textContent=message;
    clearTimeout(box._timer);
    box._timer=setTimeout(()=>box.remove(),5500);
  }


  function updateFormDeliveryStatus(form, ok, message){
    if(!form) return;
    form.dataset.deliveryStatus=ok?'sent':'not-sent';
    let status=form.querySelector('.form-success, .success, [data-form-status]');
    if(!status){
      status=document.createElement('div');
      status.className='t4l-form-delivery-status';
      status.setAttribute('data-form-status','true');
      form.appendChild(status);
    }
    status.hidden=false;
    status.setAttribute('role','status');
    status.setAttribute('aria-live','polite');
    status.textContent=message;
  }

  const pendingSubmissions=new Map();
  function submitToAppsScript(form,payload){
    const endpoint=window.T4L_SITE_CONFIG.formEndpoint;
    const token='t4l-'+Date.now()+'-'+Math.random().toString(36).slice(2);
    const button=form.querySelector('button[type="submit"],input[type="submit"]');
    const originalLabel=button ? (button.textContent||button.value) : '';

    payload._submissionToken=token;
    payload._startedAt=form.dataset.t4lStartedAt||String(Date.now()-2000);
    payload._requestType=form.dataset.formPurpose||form.id||'website-request';
    payload.website='';

    if(button){
      button.disabled=true;
      if(button.tagName==='INPUT') button.value='SENDING…'; else button.textContent='SENDING…';
    }
    updateFormDeliveryStatus(form,true,'Sending your request…');

    const cleanup=()=>{
      pendingSubmissions.delete(token);
      form.dataset.t4lSubmitting='false';
      if(button){
        button.disabled=false;
        if(button.tagName==='INPUT') button.value=originalLabel; else button.textContent=originalLabel;
      }
    };
    const body=new URLSearchParams();
    Object.entries(payload).forEach(([key,value])=>{
      (Array.isArray(value)?value:[value]).forEach(item=>body.append(key,String(item??'')));
    });
    const controller=new AbortController();
    const timeout=setTimeout(()=>{
      if(!pendingSubmissions.has(token)) return;
      controller.abort();
      saveFallback(payload);
      updateFormDeliveryStatus(form,false,'We could not verify the request. Please call the selected location so the team can confirm it.');
      showGlobalStatus('We could not verify the request. Please call the selected location.');
      cleanup();
    },75000);
    pendingSubmissions.set(token,{form,payload,cleanup,timeout});
    fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8','Accept':'application/json'},credentials:'same-origin',body,signal:controller.signal})
      .then(async response=>{
        const data=await response.json().catch(()=>({ok:false,status:'unknown',message:'The request service returned an unreadable response.'}));
        if(!response.ok || !data.ok) throw new Error(data.message||'The request was not accepted.');
        return data;
      })
      .then(data=>{
        const pending=pendingSubmissions.get(token);
        if(!pending) return;
        clearTimeout(pending.timeout);
        updateFormDeliveryStatus(form,true,'Request accepted by Tires 4 Less. Reference '+(data.requestId||'pending')+'. The shop will follow up by email or phone.');
        showGlobalStatus('Request accepted by Tires 4 Less.');
        form.reset();
        form.dataset.t4lStartedAt=String(Date.now());
        pending.cleanup();
      })
      .catch(()=>{
        const pending=pendingSubmissions.get(token);
        if(!pending) return;
        clearTimeout(pending.timeout);
        saveFallback(payload);
        updateFormDeliveryStatus(form,false,'The request was not accepted. Please try again or call the selected location.');
        showGlobalStatus('The request was not accepted. Please try again or call the selected location.');
        pending.cleanup();
      });
  }

  document.querySelectorAll('form').forEach(form=>{
    form.dataset.t4lStartedAt=String(Date.now());
    // Keep every email-bearing form progressively enhanced and aligned with
    // the same-origin relay, including forms rendered by long-form templates.
    if(form.querySelector('[name="email"]')){
      if(!form.getAttribute('action')) form.setAttribute('action','api/request');
      if(!form.getAttribute('method')) form.setAttribute('method','post');
    }
  });
  document.addEventListener('submit',event=>{
    const form=event.target;
    if(!(form instanceof HTMLFormElement)||!form.querySelector('[name="email"]')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if(form.dataset.t4lSubmitting==='true') return;
    if(!form.reportValidity()) return;
    form.dataset.t4lSubmitting='true';
    const payload=serializeForm(form);
    submitToAppsScript(form,payload);
  },true);

  // ------------------------------------------------
  // Transcript-aligned catalog-driven scheduling
  // ------------------------------------------------
  const catalog=window.T4L_SERVICE_CATALOG||null;
  const route=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const fixedLocationByRoute={
    'freedom-drive.html':'Freedom Drive',
    'north-tryon.html':'North Tryon',
    'concord.html':'Concord'
  };

  function getAppointmentGroups(){
    if(!catalog) return [];
    const order=['Tires','Alignment','Mechanic','Auto Glass','Wheel / Rim','Fleet & Commercial'];
    return order.map(section=>({
      section,
      services:catalog.services.filter(s=>{
        if(s.section!==section) return false;
        if(['new-tires','used-tires'].includes(s.id)) return false;
        return ['shop_service','auto_glass'].includes(s.request_type);
      })
    })).filter(g=>g.services.length);
  }

  function serviceLocationStatus(service,loc){
    if(!service||!loc) return 'AVAILABLE';
    return (service.location_status&&service.location_status[loc])||'AVAILABLE';
  }

  function buildServiceOptions(select,loc,preferred){
    if(!catalog||!select) return;
    const current=preferred||select.value||'';
    select.innerHTML='';
    const blank=document.createElement('option');
    blank.value=''; blank.textContent='Choose service';
    select.appendChild(blank);

    getAppointmentGroups().forEach(group=>{
      const available=group.services.filter(s=>serviceLocationStatus(s,loc)!=='NOT_OFFERED');
      if(!available.length) return;
      const og=document.createElement('optgroup');
      og.label=group.section==='Tires'?'Tire Services':group.section;
      available.forEach(s=>{
        const o=document.createElement('option');
        o.value=s.id;
        o.textContent=s.label;
        o.dataset.serviceLabel=s.label;
        if(current===s.id||current===s.label) o.selected=true;
        og.appendChild(o);
      });
      select.appendChild(og);
    });
    const other=document.createElement('optgroup'); other.label='Other';
    const o=document.createElement('option'); o.value='other'; o.textContent='Other / Not Sure';
    if(current==='other') o.selected=true;
    other.appendChild(o); select.appendChild(other);

    // If selected service is not offered at this location, clear it.
    if(current){
      const svc=catalog.services.find(s=>s.id===current||s.label===current);
      if(svc&&serviceLocationStatus(svc,loc)==='NOT_OFFERED') select.value='';
    }
  }

  function resolveFormLocation(form){
    if(!form) return '';
    if(form.dataset.fixedLocation) return form.dataset.fixedLocation;
    if(fixedLocationByRoute[route]) return fixedLocationByRoute[route];
    const loc=form.querySelector('select[name="location"]');
    if(loc) return loc.value;
    const branch=form.querySelector('input[name="branch"]');
    if(branch) return branch.value;
    return '';
  }

  function syncCatalogScheduler(form,preferredService){
    if(!form||!catalog) return;
    const select=form.querySelector('select[name="service"]');
    if(!select||!select.dataset.t4lServiceSelect) return;
    const locationControl=form.querySelector('select[name="location"]');
    const loc=resolveFormLocation(form);
    if(locationControl && !loc){
      select.innerHTML='<option value="">Choose location first</option>';
      select.disabled=true;
    }else{
      select.disabled=false;
      buildServiceOptions(select,loc,preferredService);
    }
    let note=form.querySelector('.t4l-alignment-reroute');
    if(!note){
      note=document.createElement('div');
      note.className='t4l-alignment-reroute';
      note.hidden=true;
      select.closest('label')?.insertAdjacentElement('afterend',note);
    }
    note.hidden=true;
  }

  document.querySelectorAll('form[data-scheduler-catalog]').forEach(form=>{
    syncCatalogScheduler(form);
    const loc=form.querySelector('select[name="location"]');
    if(loc) loc.addEventListener('change',()=>syncCatalogScheduler(form));
  });

  // Query-driven preselection from service detail pages.
  const params=new URLSearchParams(location.search);
  const requestedService=params.get('service');
  const requestedLocation=params.get('location');
  if(requestedService||requestedLocation){
    const form=document.querySelector('#service-form, #request-form, form[data-scheduler-catalog]');
    if(form){
      const loc=form.querySelector('select[name="location"]');
      if(loc&&requestedLocation) loc.value=requestedLocation;
      syncCatalogScheduler(form,requestedService||'');
      const service=form.querySelector('select[name="service"]');
      if(service&&requestedService) service.value=requestedService;
      if(requestedService==='wheel-alignment'&&loc&&loc.value!=='Freedom Drive'){
        loc.value='Freedom Drive';
        syncCatalogScheduler(form,'wheel-alignment');
      }
    }
  }

  // If someone manually chooses Alignment then changes location away from Freedom,
  // the catalog filter removes the invalid option instead of accepting a false appointment.
  document.querySelectorAll('form[data-scheduler-catalog] select[name="location"]').forEach(loc=>{
    loc.addEventListener('change',()=>{
      const form=loc.closest('form');
      const service=form?.querySelector('select[name="service"]');
      if(service?.value==='wheel-alignment'&&loc.value!=='Freedom Drive'){
        service.value='';
      }
    });
  });

  // Auto Glass shop/mobile logic.
  const glassMethod=document.querySelector('#glass-method');
  const glassLocation=document.querySelector('#glass-current-location');
  function syncGlassMethod(){
    if(!glassMethod||!glassLocation) return;
    const mobile=glassMethod.value==='Mobile';
    glassLocation.hidden=!mobile;
    const input=glassLocation.querySelector('input[name="current_location"]');
    if(input) input.required=mobile;
  }
  if(glassMethod){
    glassMethod.addEventListener('change',syncGlassMethod);
    syncGlassMethod();
  }

  // Policy links are static, server-rendered footer content. Keeping one
  // source of truth prevents a second policy row from being appended at
  // runtime after the original footer link breakdown.
  if(!document.querySelector('.t4l-mobile-dock')&&!document.querySelector('.mobile-dock')&&!document.querySelector('.dock')){
    const phoneByRoute={
      'freedom-drive.html':['(980) 233-0841','tel:+19802330841'],
      'north-tryon.html':['(980) 216-2187','tel:+19802162187'],
      'concord.html':['(980) 378-4800','tel:+19803784800']
    };
    const call=phoneByRoute[current]||['CALL','contact.html#locations'];
    const dock=document.createElement('nav');
    dock.className='t4l-mobile-dock';
    dock.setAttribute('aria-label','Quick actions');
    dock.innerHTML=`<a href="${call[1]}"><span aria-hidden="true">☎</span><b>CALL</b><small>${call[0]}</small></a><a href="locations.html"><span aria-hidden="true">⌖</span><b>DIRECTIONS</b><small>MAPS</small></a><a href="tires.html#tire-finder"><span aria-hidden="true">◉</span><b>CHECK SIZE</b><small>TIRES</small></a>`;
    document.body.append(dock);
    document.body.classList.add('has-t4l-mobile-dock');
  }

})();
