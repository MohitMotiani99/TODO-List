var styles=['bg-secondary','bg-success','bg-danger','bg-info','bg-dark']



function newTask(title_content,text_content){
	var list = document.getElementsByClassName('list-group')[0]

	var card = document.createElement('div')

	var type = Math.floor(Math.random() * 5)
	console.log(type)
	card.className+='card '+styles[type]+' text-white'
	
	var card_header = document.createElement('h5')
	card_header.className+='card-header'
	card.appendChild(card_header)

	var card_body = document.createElement('div')
	card_body.className+='card-body'

	var card_title = document.createElement('h5')
	card_title.className+='card-title'
	card_title.setAttribute('contenteditable','false')
	card_title.innerHTML=title_content
	card_title.setAttribute('onclick','removePlaceholder(this)')
	card_body.appendChild(card_title)

	var card_text = document.createElement('p')
	card_text.className+='card-text'
	card_text.setAttribute('contenteditable','false')
	card_text.innerHTML=text_content
	card_text.setAttribute('onclick','removePlaceholder(this)')
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


	card.appendChild(card_body)

	list.appendChild(card)

	card_title.focus()

}
function save(card){
	var card_body=card.children[1]
	var card_title=card_body.children[0]
	var card_text=card_body.children[1]

	var save = card_body.children[2]
	var update = card_body.children[3]
	var deleteb = card_body.children[4]

	save.style.display='none'
	update.style.display='inline'
	deleteb.style.display='none'

	card_title.setAttribute('contenteditable','false')
	card_text.setAttribute('contenteditable','false')

	localStorage.removeItem(card_title.innerHTML)
	localStorage.setItem(card_title.innerHTML,card_text.innerHTML)


}

function update(card){
	var card_body=card.children[1]
	var card_title=card_body.children[0]
	var card_text=card_body.children[1]

	var save = card_body.children[2]
	var update = card_body.children[3]
	var deleteb = card_body.children[4]

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
	var card_title_content = card.children[1].children[0].innerHTML
	localStorage.removeItem(card_title_content)
	var list = document.getElementsByClassName('list-group')[0]

	list.removeChild(card)	
}
function removePlaceholder(ele){
	if(ele.className=='card-title'){
		if(ele.innerHTML=='Add Title...')
		{
			ele.innerHTML=''
			ele.focus()
		}
	}
	else if(ele.className=='card-text'){
		if(ele.innerHTML=='Add Text...')
		{
			ele.innerHTML=''
			ele.focus()
		}
	}
}