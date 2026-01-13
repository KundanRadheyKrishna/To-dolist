let ADDbtn = document.getElementById("ADDbtn");
let TASKin = document.getElementById("TASKin");
let ul = document.querySelector("ul");
let delBtn = document.querySelector("button");

document.addEventListener("DOMContentLoaded", loadTasks);


function addTASK() {
  ADDbtn.addEventListener("click", (e) => {
    e.preventDefault();

    let task = TASKin.value.trim();
    if (task === "") {
      alert("write any task");
    } else {
      let li = document.createElement("li");
      li.className = "flex items-center justify-between bg-white px-4 py-2";

      li.innerHTML = `
      <span class="circle w-4 h-4 rounded-full cursor-pointer"></span>
      <span class="text flex-1 mx-2 cursor-pointer">${task}</span>
      <button class="text-red-500 font-bold cursor-pointer">X</button>
    `;

      ul.appendChild(li)

      storage(task);
      loadTasks();
      TASKin.value = "";


    }
  });
} addTASK();

function storage(task) {
  let taske = JSON.parse(localStorage.getItem("tasks")) || [];
  taske.push({ Text: task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(taske));

}

function loadTasks() {
  ul.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.className = "flex items-center justify-between bg-white px-4 py-2";

    li.innerHTML = `
      <span class="circle w-4 h-4 rounded-full cursor-pointer ${task.completed ? "bg-green-500" : ""}"></span>
      <span class="text flex-1 mx-2 cursor-pointer ${task.completed ? "line-through" : ""}">
        ${task.Text}
      </span>
      <button class="text-red-500 font-bold cursor-pointer">X</button>
    `;

    let circle = li.querySelector(".circle");
    let text = li.querySelector(".text");

    let deleteBtn = li.querySelector("button");

    deleteBtn.addEventListener("click", () => {
      deleteTAsk(index);
    });
    circle.addEventListener("click", () => {
      ToggleTask(index)
    });
    text.addEventListener("click", () => {
      ToggleTask(index)
    });

    ul.appendChild(li);
    if (task.completed) {
      text.style.textDecoration = "line-through";
      text.style.color = "gray";
      circle.style.backgroundColor = "green";
    } else {
      circle.style.backgroundColor = "#fbbf24"; // amber
    }
  });


}


function deleteTAsk(index) {
  let taske = JSON.parse(localStorage.getItem("tasks")) || [];
  taske.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(taske));
  loadTasks();
}

function ToggleTask(index) {
  let taske = JSON.parse(localStorage.getItem("tasks")) || [];
  taske[index].completed = !taske[index].completed;
  localStorage.setItem("tasks", JSON.stringify(taske));
  loadTasks();
}
