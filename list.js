document.querySelector('.submit').addEventListener("click", displayTodo);

function clockDisplay() {
const clock = new Date();
clock.setMinutes(clock.getMinutes() - clock.getTimezoneOffset());
clock.setMilliseconds(null);
clock.setSeconds(null);
document.querySelector('#myDate').value = clock.toISOString().slice(0, -1);
}
clockDisplay();
setInterval(clockDisplay, 30000);

function displayTodo() {
    const input = document.getElementById("myInput");
    const inputValue = input.value;
    if (inputValue === '') { 
        alert("Enter a Todo , Todo cannot be blank.");
        return;
    }
    const date = document.getElementById("myDate").value;
    const dateValue = date.toISOString().slice(0, -1);
    if (dateValue === ''){
        alert("Must select a due date.");
        return;
    }
    const todo = createTodo(inputValue,dateValue);
    document.getElementById("todoList").append(todo);
    input.value = "";
    date.valueAsDate = clock.toISOString().slice(0, -1);
}
function createTodo(text,date) {
    const todoListItem = document.createElement("li");
    const todoText = createTodoParagraph(text);
    const toggleTodoCheckBox = createToggleTodoCheckbox(todoText);
    const todoDueDate = createTodoDateSelector(date);
    const deleteButton = createDeleteButton(todoListItem);
    todoListItem.append(toggleTodoCheckBox);
    todoListItem.append(todoText);
    todoListItem.append(todoDueDate);
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
function createTodoDateSelector(dateValue) {  
    const todoDateSelector = document.createElement("input");
    todoDateSelector.type = "date";
    todoDateSelector.class = "dateSelector";
    todoDateSelector.value = dateValue;
    return  todoDateSelector;    
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