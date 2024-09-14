(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll("header nav a");
    const iconBurger = document.querySelector(".icon-menu-franchising");
    const menuBurger = document.querySelector(".menu-header-franchising__body");
    window.onscroll = () => {
        if (sections && navLinks && iconBurger && menuBurger) sections.forEach((sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - document.querySelector("header").offsetHeight;
            let height = sec.offsetHeight;
            let id = sec.getAttribute("id");
            if (top >= offset && top < offset + height) {
                navLinks.forEach((links => {
                    links?.classList.remove("active");
                    document.querySelector(`header nav a[href*=${id}]`)?.classList.add("active");
                }));
                sec.classList.add("show-animate");
            } else sec.classList.remove("show-animate");
            if (iconBurger.classList.contains("menu-open")) {
                document.body.classList.remove("_lock");
                menuBurger.classList.remove("menu-open");
                iconBurger.classList.remove("menu-open");
            }
        }));
    };
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const toDoForm = document.querySelector("#formToDo");
    const toDoInput = document.querySelector("#taskInput");
    const toDoList = document.querySelector("#tasksList");
    document.querySelector("#emptyList");
    let tasks = [];
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach((task => {
            renderTask(task);
        }));
    }
    checkEmptyList();
    toDoForm.addEventListener("submit", addTask);
    toDoList.addEventListener("click", deleteTask);
    toDoList.addEventListener("click", doneTask);
    function addTask(e) {
        e.preventDefault();
        const taskText = toDoInput.value;
        const newTask = {
            id: Date.now(),
            text: taskText,
            done: false
        };
        tasks.push(newTask);
        saveToLocalStorage();
        renderTask(newTask);
        toDoInput.value = "";
        toDoInput.focus();
        checkEmptyList();
    }
    function deleteTask(e) {
        if (e.target.dataset.action !== "delete") return;
        const parentNode = e.target.closest(".card-tasks__item");
        const taskId = Number(parentNode.id);
        const taskIndex = tasks.findIndex((task => task.id === taskId));
        tasks.splice(taskIndex, 1);
        saveToLocalStorage();
        parentNode.remove();
        checkEmptyList();
    }
    function doneTask(e) {
        if (e.target.dataset.action !== "done") return;
        const parentNode = e.target.closest(".card-tasks__item");
        const taskId = Number(parentNode.id);
        const task = tasks.find((task => task.id === taskId));
        task.done = !task.done;
        saveToLocalStorage();
        const taskTitle = parentNode.querySelector(".item-card-task__name");
        taskTitle.classList.toggle("_done");
    }
    function checkEmptyList() {
        if (tasks.length === 0) {
            const emptyListHTML = `\n        <li id="emptyList" class="card-tasks__item empty-list">\n            <img src="img/leaf.svg" alt="Empty" class="card-tasks__image">\n            <div class="card-tasks__name">Список дел пуст</div>\n        </li>\n        `;
            toDoList.insertAdjacentHTML("afterbegin", emptyListHTML);
        }
        if (tasks.length > 0) {
            const emptyListElement = document.querySelector("#emptyList");
            emptyListElement ? emptyListElement.remove() : null;
        }
    }
    function renderTask(task) {
        const cssClass = task.done ? "item-card-task__name _done" : "item-card-task__name";
        const taskHTML = `\n        <li id="${task.id}" class="card-tasks__item item-card-task task-item">\n            <span class="${cssClass}">${task.text}</span>\n            <div class="item-card-task__buttons">\n                <button type="button" data-action="done" class="item-card-task__button">\n                    <img src="img/tick.svg" alt="Done">\n                </button>\n                <button type="button" data-action="delete" class="item-card-task__button">\n                    <img src="img/cross.svg" alt="Done">\n                </button>\n            </div>\n        </li>\n    `;
        toDoList.insertAdjacentHTML("beforeend", taskHTML);
    }
    function saveToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    window["FLS"] = false;
    isWebp();
})();