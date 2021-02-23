document.querySelector('.submit').addEventListener("click", console.log("button works!"));

function displayTodo() {
    const input = document.getElementById("myInput");
    const inputValue = input.value;
    if (input === '') { 
        alert("Enter a Todo , Todo cannot be blank.");
        return;
    }
    const todo = createTodo(inputValue);
    document.getElementById("todoList").append(todo);
    //reset inputs
    input.value = "";
    //dateInput.value = "";
}
function createTodo(text) {
    const todoListItem = document.createElement("li");
    const todoText = createTodoParagraph(text);
    const toggleTodoCheckBox = createToggleTodoCheckbox(todoText);
    const deleteButton = createDeleteButton(todoListItem);
    todoListItem.append(toggleTodoCheckBox);
    todoListItem.append(todoText);
    todoListItem.append(deleteButton);
}
function createTodoParagraph(text) {
    const todoParagraph = document.createElement("p");
    todoParagraph.textContent = text;
    return todoParagraph;
}
function createToggleTodoCheckbox(todoText) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.addEventListener("click", () => {
        toggleCheckedOff(todoText);
    })
    return checkbox;
}
function createDeleteButton(todoListItem) {
    const deleteButton = document.createElement("button");
    const fire = document.createTextNode(" \uD83D\uDD25");
    deleteButton.className = "delete";
    deleteButton.append(fire);
    deleteButton.addEventListener("click", () => {
        deleteTodo(todoListItem);
    })
    return deleteButton;
}
//create due date
// function createDisplayDueDate() {}
// const dueBy = document.createElement("span")
// dueBy.innerText = "Due By: "
// dueBy.className = "dueBy"
// const dateValue = document.getElementById("myDate").value;
// const dueDate = document.createElement("input");
// dueDate.type = "date";
// dueDate.className = "dueDate";
// dueDate.defaultValue = dateValue;

function toggleCheckedOff(todoText){
    todoText.classList.toggle("completed");
}
function deleteTodo(todoListItem){
    remove();
}
//Reset App
function clearAll(){
    localStorage.clear();
    window.location.reload();
}



/*
//window.onload = savedTodos();

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
*/