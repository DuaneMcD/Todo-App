document.querySelector('.submit').addEventListener("click", displayTodo);

function displayTodo() {
    const input = document.getElementById("myInput");
    const inputValue = input.value;
    if (inputValue === '') { 
        alert("Enter a Todo , Todo cannot be blank.");
        return;
    }
    const todo = createTodo(inputValue);
    document.getElementById("todoList").append(todo);
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
    return todoListItem;
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
function toggleCheckedOff(todoText) {
    todoText.classList.toggle("completed");
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
function deleteTodo (todoListItem){
    todoListItem.remove();
}
document.querySelector('.clearAll').addEventListener("click", clearAll);
function clearAll(){
    localStorage.clear();
    window.location.reload();
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