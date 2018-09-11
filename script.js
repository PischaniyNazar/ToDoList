// Створення контейнеру для всього блоку програми
var mainDiv = document.createElement("div");
document.body.appendChild(mainDiv);
mainDiv.setAttribute("class", "mainDiv");
// Створення форми для вводу запису
var newForm = document.createElement("form");
newForm.innerHTML = "<input type='text' class='field' name='fname' id = 'input' autofocus><br>\
					<input type='submit' class='submit' value='Вивести' id = 'button'>";
mainDiv.appendChild(newForm);
newForm.setAttribute("id", "flex-container");
newForm.setAttribute("onsubmit", "return false");
// Створення контейнеру для всих записів
var divForNotes = document.createElement("div");
mainDiv.appendChild(divForNotes);
divForNotes.setAttribute("id", "divForNotes");
divForNotes.setAttribute("class", "divForNotes");
// Оголошення і. localStorage["notesCount"] - ідентифікатор останнього запису в Local Storage
if(localStorage["notesCount"] !== undefined) {
	var i = localStorage["notesCount"];
	i++;
}else{
	var i = 0;
}
// Створення записів збережених в Local Storage
for (var j = 0; j <= i; j++) {
	if (localStorage["Note" + j] !== undefined){
		funcCreateNote(j)
	}
}

document.getElementById('button').onclick = setToLocalStorage;

function setToLocalStorage(){
	if (document.getElementById("input").value !== ""){
		var obj = { "check": false, "input": document.getElementById("input").value }
		localStorage.setItem("Note" + i, JSON.stringify(obj));
		document.getElementById("input").value = "";
		localStorage["notesCount"] = i;
		i++;
		funcCreateNote(i-1);
	}else{
		alert('Поле не має бути пустим!');
	}
}
function funcCreateNote(i){
	object = JSON.parse(localStorage.getItem("Note" + i));
	
	var noteDiv = document.createElement('div');
	noteDiv.innerHTML = 
	"<input id ='checkBox" + i + "' class = 'checkBox' type='checkbox' onclick='setStyle(" + i + ")' >\
	<div class='line' id ='"+ i +"'></div>\
	<div id = 'buttonDiv" + i + "' class = buttonDiv>\
		<button class='edit' id = 'editButton" + i + "' onclick='funcEditNote("+ i +")'>Редагувати</button>\
		<button class='delete' id = 'delete" + i + "' onclick='funcDeleteNote("+ i +")'>Видалити</button>\
	</div>"
	

	divForNotes.insertBefore(noteDiv, divForNotes.children[0]);
	noteDiv.setAttribute("class", "noteDiv");
	noteDiv.setAttribute("id", "noteDiv" + i);

	document.getElementById(i).innerHTML = object.input;
	document.getElementById("checkBox" + i).checked = object.check;
	if (document.getElementById("checkBox" + i).checked == true){
		setStyle(i);
	}
}

function funcDeleteNote(i){
	var child = document.getElementById("delete" + i);
	child.parentNode.parentNode.removeChild(child.parentNode);
	localStorage.removeItem("Note" + i);
}

function funcEditNote(i){
	
	var editField = document.createElement('input');
	document.getElementById("noteDiv" + i).insertBefore(editField, document.getElementById("noteDiv" + i).children[1]);
	
	editField.setAttribute("type", "text");
	editField.setAttribute("class", "field");
	editField.setAttribute("id", "editField");
	editField.focus();
	editField.setAttribute("value", document.getElementById(i).innerHTML);
	document.getElementById(i).innerHTML = "";
	document.getElementById("editButton" + i).style.display = "none";

	var save = document.createElement('button');
	document.getElementById("buttonDiv" + i).insertBefore(save, document.getElementById("buttonDiv" + i).children[0]);
	save.innerHTML = "Зберегти";
	save.setAttribute("class", "edit");
	save.setAttribute("id", "saveButton" + i);
	save.setAttribute("onclick", "funcSaveNote("+ i +")");
}
function funcSaveNote(i){
	if (document.getElementById("editField").value !== ""){
		document.getElementById("saveButton" + i).parentNode.removeChild(document.getElementById("saveButton" + i));
		document.getElementById("editButton" + i).style.display = "inline-block";

		document.getElementById(i).innerHTML = document.getElementById("editField").value;
		
		var obj = { "check": document.getElementById("checkBox" + i).checked, "input": document.getElementById("editField").value }
	
		localStorage.setItem("Note" + i, JSON.stringify(obj));

		document.getElementById("input").value = "";

		document.getElementById("checkBox" + i).style.bottom = "0px";

		document.getElementById("editField").parentNode.removeChild(document.getElementById("editField"));
	}else{
		alert('Поле не має бути пустим');
	}
}
function setStyle(i){
	var obj = { "check": document.getElementById("checkBox" + i).checked, "input": document.getElementById(i).innerHTML }
	var sObj = JSON.stringify(obj);
	localStorage.setItem("Note" + i, sObj);

	var checkBox = document.getElementById("checkBox" + i);

	if (checkBox.checked == true){
    document.getElementById("noteDiv" + i).style.borderRadius = "2px";
    document.getElementById("noteDiv" + i).style.backgroundColor = "rgba(60, 179, 113, 0.7)";
	}else{
	document.getElementById("noteDiv" + i).style.borderRadius = "0";
	document.getElementById("noteDiv" + i).style.backgroundColor = "rgba(0, 0, 0, 0)";
	}
}
