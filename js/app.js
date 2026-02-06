import {Task} from "./task.js";
import { saveOnLocalStorage } from "./utils.js";
import { renderizar } from "./view.js";

const buttonAll = document.getElementById("buttonAll");
const buttonPending =document.getElementById("buttonPending");
const buttonCompleted =document.getElementById("buttonCompleted");



const buttonAgregar = document.getElementById("btnAgregar");
const inputTareas = document.getElementById("inputTarea");
const lista = document.getElementById("lista");

let editingId = undefined;
let currentFilter = "all"; 

let datosCrudos = JSON.parse(localStorage.getItem("tareas")) || [];
let tareas = datosCrudos.map(t => new Task(t.texto, t.completada, t.id));

function actualizarVista() {
    let tareasVisibles = tareas;

    if (currentFilter === "pending") {
        tareasVisibles = tareas.filter(t => !t.completada);
    }

    if (currentFilter === "completed") {
        tareasVisibles = tareas.filter(t => t.completada);
    }

    renderizar(lista, tareasVisibles, {
        onToggle: (tarea) => { 
            tarea.toggle(); 
            refresh();
        },
        onDelete: (tarea) => {
            tareas = tareas.filter(t => t !== tarea);
            refresh();
        },
        onUpdate: (tarea) => {
            editingId = tarea.id;
            inputTareas.value = tarea.texto;
            buttonAgregar.textContent = "Modificar";
        }
    });
}


function refresh(){
    saveOnLocalStorage(tareas);
    actualizarVista();
}

actualizarVista();

buttonAgregar.addEventListener("click", () => {
    if(buttonAgregar.textContent === "Agregar"){        
        if (inputTareas.value.trim() !== "") {
            tareas = [...tareas, Task.addTask(inputTareas.value)];
            refresh();
            inputTareas.value = "";
        }
    }
    else{
        const tarea = tareas.find(t => t.id === editingId);
        if (tarea) {
            tarea.updateTask(inputTareas.value);
        }
        refresh();
        inputTareas.value = "";
        editingId = undefined;
        buttonAgregar.textContent = "Agregar";
    }
});

buttonAll.addEventListener("click",()=>{
    resetBtnFilters();
    currentFilter = "all";
    actualizarVista();
})

buttonPending.addEventListener("click",()=>{
    resetBtnFilters();
    currentFilter = "pending";
    buttonPending.classList.add("active");
    actualizarVista();
})

buttonCompleted.addEventListener("click",()=>{
    resetBtnFilters();
    currentFilter = "completed";
    buttonCompleted.classList.add("active");
    actualizarVista();
})

function resetBtnFilters() {
    buttonAll.classList.remove("active");
    buttonPending.classList.remove("active");
    buttonCompleted.classList.remove("active");
}
