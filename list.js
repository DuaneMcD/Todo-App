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
    todoKey = saveTodosLocal(todo, dateValue);
    newTodoListItem = createTodo(inputValue, dateValue, todoKey);
    document.getElementById("todoList").append(newTodoListItem);
    document.getElementById("myInput").value = "";
    clockDisplay();
    window.location.reload();
}
function clockDisplay() {
    const clock = new Date();
    clock.setMinutes(clock.getMinutes() - clock.getTimezoneOffset());
    clock.setMilliseconds(null);
    clock.setSeconds(null);
    document.querySelector('#myDate').value = clock.toISOString().slice(0, -1);
}
function loadTodoKeys() {
    storageSorted = Object.keys(localStorage).sort();      
       let num = localStorage.length;
       if (num) {
            APP.keys = []; //reset the keys array
            for (let i = 0; i < num; i++) {
                let key = storageSorted[i];
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
    const todoListItem= createTodoListItem(date, key);
    const todoText = createTodoTextInput(text,todoListItem, key);
    const todoDueDate = createTodoDateSelector(date, todoListItem, key);
    const toggleTodoCheckMark = createToggleTodoCheckMark(todoText,todoDueDate);
    const deleteButton = createDeleteButton(todoListItem, key);
    const textDateDiv = document.createElement("div");
    textDateDiv.className = "textDateDiv";
    const liDiv = document.createElement("div");
    liDiv.className = "liDiv";
    liDiv.append(todoDueDate);
    textDateDiv.append(todoText);
    textDateDiv.append(liDiv);
    todoListItem.append(toggleTodoCheckMark);
    todoListItem.append(deleteButton);
    todoListItem.append(textDateDiv);
    return todoListItem;
}
function createTodoListItem(date, key) {
    const newListItem = document.createElement("li");
    newListItem.className = "todoLi";
    newListItem.id = key;
    newListItem.addEventListener("change", () => {
        toggleBorderColor(date);
    })
    return newListItem;
}
function toggleBorderColor(date) {
    // green = "#97db18";
    // yellow = "#f0f03b";
    // red = "#cf2222";
    // grey = "#676a6d";
    // blue = "#2b8eff";
    // let currentTime = new Date();
    // console.log(date - currentTime);
    // switch (date - currentTime) {
    //     case (t > 1):
    //         todoListItem.borderColor.toggle(green);
    //         break;
    //     case (t < 1):
    //         todoListItem.borderColor.toggle(red);
    //         break;
    //     default:
    //         todoListItem.borderColor.toggle(blue);
    // }
}
function createTodoTextInput(text,todoListItem, key) {
    const todoTextInput = document.createElement("p");
    todoTextInput.className = "todoText";
    todoTextInput.contentEditable = "true";
    todoTextInput.textContent = text;
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
    inputValue = todoListItem.querySelector('.todoText').textContent;
    dateValue = todoListItem.querySelector('.dateSelector').value;
    let newTodo = {inputValue, dateValue};
    saveTodosLocal(newTodo, dateValue);
    window.location.reload();
}
function createToggleTodoCheckMark(todoText, todoDueDate) {
    const checkMark = document.createElement("button");
    const check = new Image();
    check.src = "images/checkmark.svg";
    check.alt = "check mark";
    checkMark.className = "checkmark";
    checkMark.appendChild(check);
    checkMark.addEventListener("click", () => {
        toggleCheckedOff(todoText,todoDueDate);
    })
    return checkMark;
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
function saveTodosLocal(todo, dateValue) {
    key = APP.keybase + dateValue + (new Date().getMinutes() + new Date().getMilliseconds());
    localStorage.setItem((key), JSON.stringify(todo));
    return key;
    
}
function clearAll(){
    localStorage.clear();
    window.location.reload();
}
document.addEventListener('DOMContentLoaded', APP.init());