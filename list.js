// creates element of the to-do item
function newItem() {
    var li = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.onclick = checkOffTask;
    var inputValue = document.getElementById("myInput").value;
    var newItemName = document.createTextNode(inputValue);
    var dueBy = document.createElement("span")
    dueBy.innerText = "Due By: "
    dueBy.className = "dueBy"
    var dateValue = document.getElementById("myDate").value;
    var dueDate = document.createElement("input");
    dueDate.type = "date";
    dueDate.className = "dueDate";
    dueDate.defaultValue = dateValue;
    var closeBtn = document.createElement("button");
    var fire = document.createTextNode(" \uD83D\uDD25");
    closeBtn.className = "close";
    closeBtn.append(fire);
    closeBtn.onclick = deleteTask;
// localstorage & Creates UI task with all the pieces, if not blank 
    li.append(checkbox,"   ",newItemName," ",dueBy,dueDate,"  ",closeBtn);
    if (inputValue === '') { alert("Enter a task");}
    else {
        // new item appended
        document.getElementById("todoList").appendChild(li);
        // update and save list
        var todoList = [];
        current_todoList = document.getElementById("todoList");
        listItems = current_todoList.innerHTML;
        todoList += listItems;
        localStorage.setItem("saved", (JSON.stringify(todoList)));
    } 
//reset inputs
    document.getElementById("myInput").value = "";
    document.getElementById("myDate").value = "";
}
//load previous tasks
function savedTasks(){
    savedTasks = JSON.parse(localStorage.getItem("saved"));
    document.getElementById("todoList").innerHTML = savedTasks;
}
//Reset App
function clearAll(){
    localStorage.clear();
    window.location.reload();
}
// fire button functionality
function deleteTask(){
    var div = this.parentElement;
    div.remove();
}
// task completed functionality, with un-complete option
function checkOffTask(){
    var div = this.parentElement;
    div.className += "completed";
    this.onclick = uncheckTask;
    }
function uncheckTask(){
    var div = this.parentElement;
    div.className = "";
    this.onclick = checkOffTask;
}