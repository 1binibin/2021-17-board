document.querySelector('#btUpdate').addEventListener('click', onUpdate)

function onUpdate(e) {
	location.href = '/'+this.dataset['lang']+'/board/write/'+this.dataset['id'];
}

document.querySelector('#btDelete').addEventListener('click', onDelete)

function onDelete(e) {
	if(confirm(this.dataset['']))
}