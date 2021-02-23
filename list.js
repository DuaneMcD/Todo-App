//window.onload = savedTodos();

function createTodo() {
    const inputValue = document.getElementById("myInput").value;
    if (inputValue === '') { 
        alert("Enter a task");
        return;
    }
    else {
    }
//create todo completed toggle
function createCheckbox() {
const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.className = "checkbox";
checkbox.onclick = checkOffTask;
}
//create due date
function create() {}
const dueBy = document.createElement("span")
dueBy.innerText = "Due By: "
dueBy.className = "dueBy"
const dateValue = document.getElementById("myDate").value;
const dueDate = document.createElement("input");
dueDate.type = "date";
dueDate.className = "dueDate";
dueDate.defaultValue = dateValue;

// create remove button
function create() {}
const closeBtn = document.createElement("button");
const fire = document.createTextNode(" \uD83D\uDD25");
closeBtn.className = "close";
closeBtn.append(fire);
closeBtn.onclick = deleteTask;

//Create
function create() {}
const newTodo = document.createElement("li");
const newItemName = document.createTextNode(inputValue);
newTodo.append(checkbox,newItemName,dueBy,dueDate,closeBtn);

        // new item appended
        document.getElementById("todoList").appendChild(newTodo);
        
//reset inputs
    document.getElementById("myInput").value = "";
    document.getElementById("myDate").value = "";


//Reset App
function clearAll(){
    localStorage.clear();
    window.location.reload();
}
// fire button functionality
function deleteTask(){
    const div = this.parentElement;
    div.remove();
}
// task completed functionality, with un-complete option
function checkOffTask(){
    const div = this.parentElement;
    div.className += "completed";
    this.onclick = uncheckTask;
    }
function uncheckTask(){
    const div = this.parentElement;
    div.className = "";
    this.onclick = checkOffTask;
}

/*
// update and save list
const todoList = [];
current_todoList = document.getElementById("todoList");
listItems = current_todoList.innerHTML;
todoList += listItems;
localStorage.setItem("saved", (JSON.stringify(todoList)));
} 

//load previous tasks
function savedTodos(){
    savedTasks = JSON.parse(localStorage.getItem("saved"));
    document.getElementById("todoList").innerHTML = savedTasks;
}
/*