
function updateClock(){

    const now = new Date();

    let hours = now.getHours();

    let minutes = now.getMinutes();

    minutes =
    minutes < 10 ? "0" + minutes : minutes;

    document.getElementById("clock").innerText =
    `${hours}:${minutes}`;
}

setInterval(updateClock, 1000);

updateClock();



/* =========================
   QUOTES
========================= */

const quotes = [

    "A lesson without pain is meaningless.",

    "Power comes in response to a need.",

    "Plus Ultra!",

    "Wake up to reality.",

    "Hard work beats talent.",

    "The future belongs to those who keep moving.",

    "I have to work harder than anyone else to make it! I'll never catch up otherwise...!",

    "Giving help that's not asked for... is what makes a true hero!" ,

    "We'll take care of the things that you can't take care of." ,

    "Stop talking. I will win. That's... what heroes do."

];


function changeQuote(){

    const randomIndex =
    Math.floor(Math.random() * quotes.length);

    document.getElementById("quoteText").innerText =
    `"${quotes[randomIndex]}"`;
}

setInterval(changeQuote, 5000);



/* =========================
   POMODORO TIMER
========================= */

let timeLeft = 25 * 60;

let timer = null;

let isRunning = false;


function updateTimerDisplay(){

    let minutes = Math.floor(timeLeft / 60);

    let seconds = timeLeft % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("timer").innerText =
    `${minutes}:${seconds}`;
}


function startTimer(){

    if(isRunning){
        return;
    }

    isRunning = true;

    timer = setInterval(() => {

        if(timeLeft > 0){

            timeLeft--;

            updateTimerDisplay();

        }
        else{

            clearInterval(timer);

            isRunning = false;

            alert("MISSION COMPLETE ⚡");
        }

    },1000);
}


function pauseTimer(){

    clearInterval(timer);

    isRunning = false;
}


function resetTimer(){

    clearInterval(timer);

    isRunning = false;

    timeLeft = 25 * 60;

    updateTimerDisplay();
}


function setCustomTimer(){

    const customMinutes =
    document.getElementById("customMinutes").value;

    if(customMinutes === "" || customMinutes <= 0){
        return;
    }

    clearInterval(timer);

    isRunning = false;

    timeLeft = customMinutes * 60;

    updateTimerDisplay();
}

updateTimerDisplay();



/* =========================
   TODO LIST
========================= */

const taskInput =
document.getElementById("taskInput");

const taskList =
document.getElementById("taskList");


window.onload = function(){

    loadTasks();
}


function addTask(){

    const taskValue = taskInput.value.trim();

    if(taskValue === ""){
        return;
    }

    createTaskElement(taskValue);

    saveTask(taskValue);

    taskInput.value = "";
}


function createTaskElement(taskText){

    const li = document.createElement("li");

    li.classList.add("task-item");

    li.innerHTML = `

    <div class="task-content">

        <input type="checkbox" class="check-task">

        <span>${taskText}</span>

    </div>

    <button class="delete-btn">❌</button>

    `;


    const checkbox =
    li.querySelector(".check-task");

    const taskSpan =
    li.querySelector("span");


    checkbox.addEventListener("change", () => {

        taskSpan.classList.toggle("completed");

    });


    li.querySelector(".delete-btn")
    .addEventListener("click", () => {

        li.remove();

        removeTask(taskText);

    });


    taskList.appendChild(li);
}


function saveTask(task){

    let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(task);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


function loadTasks(){

    let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {

        createTaskElement(task);

    });
}


function removeTask(taskToRemove){

    let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.filter(task =>
    task !== taskToRemove
    );

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}