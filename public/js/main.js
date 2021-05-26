const subBtn = document.getElementById('subBtn');
const menu = document.querySelector('.submenu');
const body = document.querySelector('body');

subBtn.addEventListener('click', ()=>{
	menu.classList.toggle('off');
	event.stopPropagation();
});

body.addEventListener('click', ()=>{
	menu.classList.add('off');
	event.stopPropagation();
})