const toggleBtn = document.querySelector('#toggle');
const comments = document.querySelector('#comment');

toggleBtn.addEventListener('click', toggle);

function toggle(){
	comments.classList.toggle('on');
	text();
};

function text(){
	if(toggleBtn.textContent === "show"){
		toggleBtn.textContent = "Hide"
	} else{
		toggleBtn.textContent = "show"
	}
}