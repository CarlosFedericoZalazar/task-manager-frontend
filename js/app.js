import * as Tasks from "./task.js";
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

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function actualizarVista() {
    let tareasVisibles = tareas;

    if (currentFilter === "pending") {
        tareasVisibles = tareas.filter(t => !t.completada);
    }

    if (currentFilter === "completed") {
        tareasVisibles = tareas.filter(t => t.completada);
    }

    renderizar(lista, tareasVisibles, {
        onToggle: (id) => {
            tareas = Tasks.toggleTarea(tareas, id);
            refresh();
        },
        onDelete: (id) => {
            tareas = Tasks.borrar(tareas, id);
            refresh();
        },
        onUpdate: (id, texto) => {
            editingId = id;
            inputTareas.value = texto;            
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
            tareas = [...tareas, Tasks.addTarea(inputTareas.value)];
            refresh();
            inputTareas.value = "";
        }
    }
    else{
        tareas = Tasks.updateTask(tareas, editingId, inputTareas.value);
        inputTareas.value = "";
        editingId = undefined;
        refresh();
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
