const APP = {
    keybase: 'Todo-App',
    keys: [],
    init() {
        // start app
        document.querySelector('.submit').addEventListener("click", checkInputEmpty);
        document.querySelector('.clearAll').addEventListener("click", clearAll);
        loadTodoKeys();
        clockDisplay();
        setInterval(clockDisplay, 60000);                                                           
    }
}
function checkInputEmpty() {
    const inputValue = document.getElementById("myInput").value;
    const dateValue = document.getElementById("myDate").value;
    if (inputValue === '') { 
        alert("Enter a Todo , Todo cannot be blank.");
        return;
    }
    displayTodo(inputValue, dateValue);
}
function displayTodo(inputValue, dateValue) {
    let todo = {inputValue, dateValue};
    todoKey = saveTodosLocal(todo);
    newTodoListItem = createTodo(inputValue, dateValue, todoKey);
    document.getElementById("todoList").append(newTodoListItem);
    document.getElementById("myInput").value = "";
    clockDisplay();
}
function clockDisplay() {
    const clock = new Date();
    clock.setMinutes(clock.getMinutes() - clock.getTimezoneOffset());
    clock.setMilliseconds(null);
    clock.setSeconds(null);
    document.querySelector('#myDate').value = clock.toISOString().slice(0, -1);
}
function loadTodoKeys() {
       //go to localstorage and rebuild the todo List
       let num = localStorage.length;
       if (num) {
            APP.keys = []; //reset the keys array
            for (let i = 0; i < num; i++) {
                let key = localStorage.key(i);
                APP.keys.push(key);
            let storage = localStorage.getItem(key);
            let localTodo = JSON.parse(storage);
            inputValue = localTodo.inputValue;
            dateValue = localTodo.dateValue;
            loadTodos(inputValue, dateValue, key);
            }
        }
}
function loadTodos(inputValue, dateValue, key) {
    todoListItem = createTodo(inputValue, dateValue, key);
    document.getElementById("todoList").append(todoListItem);
 }
function createTodo(text,date, key) {
    const todoListItem= document.createElement("li");
    const todoText = createTodoTextInput(text,todoListItem, key);
    const todoDueDate = createTodoDateSelector(date, todoListItem, key);
    const toggleTodoCheckBox = createToggleTodoCheckbox(todoText,todoDueDate);
    const deleteButton = createDeleteButton(todoListItem, key);
    todoListItem.append(toggleTodoCheckBox);
    todoListItem.append(todoText);
    todoListItem.append(todoDueDate);
    todoListItem.append(deleteButton);
    return todoListItem;
}
function createTodoTextInput(text,todoListItem, key) {
    const todoTextInput = document.createElement("input");
    todoTextInput.type = "input";
    todoTextInput.className = "todoText";
    todoTextInput.value = text;
    todoTextInput.addEventListener("change", () => {
        updateTodo(todoListItem, key);
    })
    return todoTextInput;
}
function createTodoDateSelector(dateValue,todoListItem, key) {  
    const todoDateSelector = document.createElement("input");
    todoDateSelector.type = "datetime-local";
    todoDateSelector.className = "dateSelector";
    todoDateSelector.value = dateValue;
    todoDateSelector.addEventListener("change", () => {
        updateTodo(todoListItem, key);
    })
    return  todoDateSelector;    
}
function updateTodo(todoListItem, key) {
    localStorage.removeItem(key);
    inputValue = todoListItem.querySelector('.todoText').value;
    dateValue = todoListItem.querySelector('.dateSelector').value;
    let newTodo = {inputValue, dateValue};
    saveTodosLocal(newTodo);
}
function createToggleTodoCheckbox(todoText, todoDueDate) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.addEventListener("click", () => {
        toggleCheckedOff(todoText,todoDueDate);
    })
    return checkbox;
}
function toggleCheckedOff(todoText,todoDueDate) {
    todoText.classList.toggle("completed");
    todoDueDate.classList.toggle("completed");
}
function createDeleteButton(todoListItem, key) {
    const deleteButton = document.createElement("button");
    const flame = new Image();
    flame.src = "images/flame.svg";
    flame.alt = "delete button";
    deleteButton.className = "delete";
    deleteButton.appendChild(flame);
    deleteButton.addEventListener("click", () => {
        deleteTodo(todoListItem, key);
    })
    return deleteButton;
}
function deleteTodo(todoListItem, key) {
    todoListItem.remove();
    localStorage.removeItem(key);

}
function saveTodosLocal(todo) {
    key = APP.keybase + (new Date().getMinutes() + new Date().getMilliseconds() + new Date().getHours() + new Date().getSeconds());
    localStorage.setItem((key), JSON.stringify(todo));
    return key;
    
}
function clearAll(){
    localStorage.clear();
    window.location.reload();
}
document.addEventListener('DOMContentLoaded', APP.init());