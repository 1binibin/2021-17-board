document.saveForm.addEventListener('submit', onSubmit)

function onSubmit(e) {
	e.preventDefault();
	var title = this.title.value.trim();
	var writer = this.writer.value.trim();
	var content = this.content.value.trim();
	if(!title) {
		alert('제목을 입력하세요')
		this.title.focus();
		return false;
	}
	else if(!writer){
		alert('작성자를 입력하세요')
		this.writer.focus();
		return false;
	}
	this.submit();
}
if(document.querySelector('#btRemove'))
	document.querySelector('#btRemove').addEventListener('click', onRemoveFile)


function onRemoveFile(e) {
	var id = this.dataset['id'];
	var parent = this.parentNode;
	axios.delete('/api/board/file/'+id).then(onSuccess).catch(onError);
	function onSuccess(r) {
		if(r.data.code == 200) parent.remove();
	}
	
	function onError(err) {
		console.log(err);
		console.log(err.response);
	}
}