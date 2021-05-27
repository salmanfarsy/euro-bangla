const btn = document.querySelector('button');
const form = document.querySelector('form');
const no = document.querySelector('.no');

btn.addEventListener('click', ()=>{
form.classList.toggle('hide');
});

no.addEventListener('click', ()=>{
    form.classList.add('hide');
    });