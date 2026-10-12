const filterButtons=[...document.querySelectorAll('.article-filter-btn')];
const cards=[...document.querySelectorAll('.article-card')];
const empty=document.querySelector('#article-empty');
function applyArticleFilter(filter='all'){
  let visible=0;
  cards.forEach(card=>{
    const show=filter==='all'||card.dataset.category===filter;
    card.hidden=!show;
    card.classList.toggle('is-filtered-out',!show);
    card.setAttribute('aria-hidden',String(!show));
    if(show) visible++;
  });
  if(empty){ empty.hidden=visible!==0; empty.classList.toggle('is-filtered-out',visible!==0); }
}
filterButtons.forEach(btn=>{
  btn.setAttribute('aria-pressed',String(btn.classList.contains('active')));
  btn.addEventListener('click',()=>{
    filterButtons.forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    applyArticleFilter(btn.dataset.filter||'all');
  });
});
document.querySelectorAll('[data-category-link]').forEach(link=>link.addEventListener('click',()=>{
  const target=filterButtons.find(b=>b.dataset.filter===link.dataset.categoryLink); if(target) target.click();
}));
applyArticleFilter('all');
