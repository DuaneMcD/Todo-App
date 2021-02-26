const APP = {
    keybase: 'Todo-App',
    keys: [],
    init() {
        // start app
        document.querySelector('.submit').addEventListener("click", checkInputEmpty);
        document.querySelector('.clearAll').addEventListener("click", clearAll);
        //loadTodos();
        clockDisplay();
        setInterval(clockDisplay, 60000);                                                           
    }
}
// function loadTodos() {
//     let num = localStorage.length;
//     if (num) {
//         APP.keys = [];
//         for( let i=0; i < num; i++){
//             let key=localStorage.key(i);
//             APP.keys.push(key);
//             displayTodo(key.inputValue, key.dateValue);
            
//         }
        
//     }

// }
function clockDisplay() {
    const clock = new Date();
    clock.setMinutes(clock.getMinutes() - clock.getTimezoneOffset());
    clock.setMilliseconds(null);
    clock.setSeconds(null);
    document.querySelector('#myDate').value = clock.toISOString().slice(0, -1);
}
function displayTodo(inputValue, dateValue) {
    let todo = {inputValue, dateValue};
    saveTodosLocal(todo);
    newTodoListItem = createTodo(inputValue, dateValue);
    document.getElementById("todoList").append(newTodoListItem);
    document.getElementById("myInput").value = "";
    clockDisplay();
}
function saveTodosLocal(todo){
    key = APP.keybase + (new Date().getMinutes() + new Date().getMilliseconds() + new Date().getHours() + new Date().getSeconds());
    localStorage.setItem((key), JSON.stringify(todo));
    //loadTodos();
}
function createTodo(text,date) {
    const todoListItem= document.createElement("li");
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
    todoDateSelector.type = "datetime-local";
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
function clearAll(){
    localStorage.clear();
    window.location.reload();
}
function checkInputEmpty(){
    const inputValue = document.getElementById("myInput").value;
    const dateValue = document.getElementById("myDate").value;
    if (inputValue === '') { 
        alert("Enter a Todo , Todo cannot be blank.");
        return;
    }
    displayTodo(inputValue, dateValue);
}
document.addEventListener('DOMContentLoaded', APP.init(APP.inputValue, APP.dateValue));