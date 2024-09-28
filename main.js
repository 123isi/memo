var input = document.getElementById("input1");
var todo = document.getElementById("btn1");
var li = document.createElement("ol");
document.getElementById('main').appendChild(li);

function loadTodos() {
    var storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        var todosArray = JSON.parse(storedTodos);
        todosArray.forEach(function(todo) {
            createTodoElement(todo.text, todo.isCompleted);
        });
    }
}

function createTodoElement(text, isCompleted = false) {
    var newtodo = document.createElement('li');
    newtodo.textContent = text;
    li.appendChild(newtodo);

    var complite = document.createElement("button");
    complite.textContent = "완료";
    complite.classList.add("complete");
    newtodo.appendChild(complite);

    var delite = document.createElement("button");
    delite.textContent = "삭제";
    delite.classList.add("delete");
    newtodo.appendChild(delite);

    if (isCompleted) {
        newtodo.style.textDecoration = "line-through";
        newtodo.classList.add("completed");
    }

    complite.addEventListener("click", () => {
        newtodo.style.textDecoration = "line-through";
        newtodo.classList.add("completed");
        save();
    });

    delite.addEventListener("click", () => {
        li.removeChild(newtodo);
        save();
    });
}

function save() {
    var todos = [];
    var todoItems = li.querySelectorAll("li");
    todoItems.forEach(function(todo) {
        var isCompleted = todo.classList.contains("completed");
        todos.push({ text: todo.firstChild.textContent, isCompleted: isCompleted });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

todo.addEventListener("click", () => {
    var text = input.value;
    if (text.trim() !== "") {
        createTodoElement(text);
        input.value = '';
        save();
    }
});

loadTodos();
