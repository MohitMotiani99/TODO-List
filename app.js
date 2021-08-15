//var styles=['bg-secondary','bg-success','bg-danger','bg-info','bg-dark']
var styles = ['border-secondary','border-success','border-danger','border-info']


function newTask(title_content,text_content){
	var list = document.getElementsByClassName('list-group')[0]

	var card = document.createElement('div')

	//var type = Math.floor(Math.random() * 5)
	var type = Math.floor(Math.random() * 4)
	//card.className+='card '+styles[type]+' text-white'
	card.className+='card '+styles[type]+' mb-3'

	var card_body = document.createElement('div')
	card_body.className+='card-body'

	var card_title = document.createElement('h1')

	card_title.className+='card-title text-'+styles[type].substring(7)
	card_title.setAttribute('contenteditable','false')
	card_title.innerHTML=title_content
	card_title.setAttribute('onfocus','removePlaceholder(this)')
	card_title.setAttribute('onfocusout','removePlaceholder(this)')
	card_body.appendChild(card_title)


	

	// var timei = document.createElement('input')
	// timei.setAttribute('type','time')
	// card_body.appendChild(timei)

	var datei = document.createElement('input')
	datei.setAttribute('type','date')
	card_body.appendChild(datei)

	var schedule = document.createElement('button')
	schedule.setAttribute('type','button')
	schedule.className+='btn btn-info'
	schedule.innerHTML='Set Event'
	schedule.style.display='none'
	schedule.setAttribute('onclick','showCalender(this.previousSibling)')
	card_body.appendChild(schedule)

	var card_text = document.createElement('p')
	card_text.className+='card-text'
	card_text.setAttribute('contenteditable','false')
	card_text.innerHTML=text_content
	card_text.setAttribute('onfocus','removePlaceholder(this)')
	card_text.setAttribute('onfocusout','removePlaceholder(this)')
	card_body.appendChild(card_text)

	var save = document.createElement('button')
	save.type+='button'
	save.className+='btn btn-primary save'
	save.innerHTML='Save'
	save.style.display='none'
	save.setAttribute('onclick','save(this.parentNode.parentNode)')
	card_body.appendChild(save)

	var update = document.createElement('button')
	update.type+='button'
	update.className+='btn btn-primary update'
	update.innerHTML='Update'
	//update.style.display='none'
	update.setAttribute('onclick','update(this.parentNode.parentNode)')
	card_body.appendChild(update)

	var deleteb = document.createElement('button')
	deleteb.type+='button'
	deleteb.className+='btn btn-primary delete'
	deleteb.innerHTML='Delete'
	deleteb.style.display='none'
	deleteb.setAttribute('onclick','deletetask(this.parentNode.parentNode)')
	card_body.appendChild(deleteb)

	card.style.transition='2s ease'
	card.appendChild(card_body)

	list.appendChild(card)

	card_title.focus()

}
function save(card){
	var card_body=card.children[0]
	var card_title=card_body.children[0]
	var card_text=card_body.children[3]

	var save = card_body.children[4]
	var update = card_body.children[5]
	var deleteb = card_body.children[6]

	save.style.display='none'
	update.style.display='inline'
	deleteb.style.display='none'

	card_title.setAttribute('contenteditable','false')
	card_text.setAttribute('contenteditable','false')

	localStorage.removeItem(card_title.innerHTML)
	localStorage.setItem(card_title.innerHTML,card_text.innerHTML)


}

function update(card){
	var card_body=card.children[0]
	var card_title=card_body.children[0]
	var card_text=card_body.children[3]

	var save = card_body.children[4]
	var update = card_body.children[5]
	var deleteb = card_body.children[6]

	save.style.display='inline'
	update.style.display='none'
	deleteb.style.display='inline'

	localStorage.removeItem(card_title.innerHTML)

	card_title.setAttribute('contenteditable','true')
	card_text.setAttribute('contenteditable','true')


}
function gettasks(){
	//console.log('hello')
	for(var i=0;i<localStorage.length;i++){
		var k=localStorage.key(i)
		var v=localStorage.getItem(k)

		console.log(k)
		console.log(v)

		newTask(k,v)
	}
}
function deletetask(card){
	var card_title_content = card.children[0].children[0].innerHTML
	localStorage.removeItem(card_title_content)
	var list = document.getElementsByClassName('list-group')[0]

	list.removeChild(card)	
}
function removePlaceholder(ele){

	if(ele.className.indexOf('card-title')==0 && ele.parentNode.children[4].style.display=='inline'){
		if(ele.innerHTML=='Add Title...')
		{
			ele.innerHTML=''
			ele.focus()
		}
		else if(ele.innerHTML==''){
			ele.innerHTML='Add Title...'
		}
	}
	else if(ele.className=='card-text' && ele.parentNode.children[4].style.display=='inline'){
		if(ele.innerHTML=='Add Text...')
		{
			ele.innerHTML=''
			ele.focus()
		}
		else if(ele.innerHTML==''){
			ele.innerHTML='Add Text...'
		}
	}

}
function showFind(){
	var find_sec = document.getElementById('find_sec')
	if(find_sec.style.display=='none')
		find_sec.style.display='inline'
	else{
		find_sec.style.display='none'
		var list = document.getElementsByClassName('list-group')[0]
		for(let i=0;i<list.children.length;i++){
			list.children[i].children[0].children[0].innerHTML=sessionStorage.getItem(list.children[i].children[0].children[0].innerHTML)
			list.children[i].children[0].children[3].innerHTML=sessionStorage.getItem(list.children[i].children[0].children[3].innerHTML)
		}
	}
}
function findTasks(){
	var word = document.getElementById('word')
	var word_value = word.value

	if(word_value!=null && word_value!='')
	find(word_value)

	if(word_value==null || word_value==''){
		var list = document.getElementsByClassName('list-group')[0]
		for(let i=0;i<list.children.length;i++){
			list.children[i].children[0].children[0].innerHTML=sessionStorage.getItem(list.children[i].children[0].children[0].innerHTML)
			list.children[i].children[0].children[3].innerHTML=sessionStorage.getItem(list.children[i].children[0].children[3].innerHTML)
		}	
	}
}
function find(word){
	var list = document.getElementsByClassName('list-group')[0]
	for(let i=0;i<list.children.length;i++){
		list.children[i].children[0].children[0].setAttribute('contenteditable','true')
		var card_title_content = list.children[i].children[0].children[0].innerHTML
		//console.log(card_title_content)
		//console.log(sessionStorage.getItem(card_title_content))
		if(sessionStorage.getItem(card_title_content)!=null)
		{
			console.log(card_title_content)
			list.children[i].children[0].children[0].innerHTML=sessionStorage.getItem(card_title_content)
			card_title_content=sessionStorage.getItem(card_title_content)
			console.log(card_title_content)
		}
		var card_title_content_marked = mark(card_title_content,word)
		sessionStorage.setItem(card_title_content_marked,card_title_content)

		list.children[i].children[0].children[0].innerHTML=card_title_content_marked
		list.children[i].children[0].children[0].setAttribute('contenteditable','false')



		list.children[i].children[0].children[3].setAttribute('contenteditable','true')
		var card_text_content = list.children[i].children[0].children[3].innerHTML
		//console.log(card_title_content)
		//console.log(sessionStorage.getItem(card_title_content))
		if(sessionStorage.getItem(card_text_content)!=null)
		{
			console.log(card_text_content)
			list.children[i].children[0].children[3].innerHTML=sessionStorage.getItem(card_text_content)
			card_text_content=sessionStorage.getItem(card_text_content)
			console.log(card_title_content)
		}
		var card_text_content_marked = mark(card_text_content,word)
		sessionStorage.setItem(card_text_content_marked,card_text_content)

		list.children[i].children[0].children[3].innerHTML=card_text_content_marked
		list.children[i].children[0].children[3].setAttribute('contenteditable','false')

	}
}
function mark(str,word){
	var i=-1;
	var ids=[]
	while((i=str.indexOf(word,i+1))!=-1){
		ids.push(i)
	}

	var str_new = ''
	var j=0
	for(i=0;i<ids.length && j<str.length;j++){
		if(j==ids[i]){
			str_new+='<mark style=\"background-color:yellow\">'
			str_new+=word
			str_new+='</mark>'

			j+=(word.length-1)
			i++;
		}
		else
			str_new+=str[j]
	}

	while(j!=str.length){
		str_new+=str[j];
		j++;
	}
	return str_new
}
function removeTasks(){
	var list = document.getElementsByClassName('list-group')[0]
	document.getElementById('remove_done').style.display='inline'
	for(let i=0;i<list.children.length;i++){
		list.children[i].children[0].children[5].style.display='none'
		list.children[i].children[0].children[6].style.display='inline'
	}
}
function removeTasksDone(){
	var list = document.getElementsByClassName('list-group')[0]
	for(let i=0;i<list.children.length;i++){
		list.children[i].children[0].children[5].style.display='inline'
		list.children[i].children[0].children[6].style.display='none'
	}
	document.getElementById('remove_done').style.display='none'
}
function showCalender(cal){
	if(cal.style.display=='none')
		cal.style.display='inline-block'
	else
		cal.style.display='none'
}