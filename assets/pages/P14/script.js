const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');

if(menu&&nav){
  menu.addEventListener('click',()=>{
    const open=menu.getAttribute('aria-expanded')==='true';
    menu.setAttribute('aria-expanded',String(!open));
    nav.classList.toggle('open',!open);
  });
}

document.querySelectorAll('.has-menu .nav-button').forEach(btn=>{
  btn.addEventListener('click',()=>btn.closest('.has-menu').classList.toggle('active'));
});