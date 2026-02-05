import * as Tasks from "./task.js";
import { saveOnLocalStorage } from "./utils.js";
import { renderizar } from "./view.js";

const buttonAgregar = document.getElementById("btnAgregar");
const inputTareas = document.getElementById("inputTarea");
const lista = document.getElementById("lista");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function actualizarVista() {
    renderizar(lista, tareas, {
        onToggle: (id) => {
            tareas = Tasks.toggleTarea(tareas, id);
            saveOnLocalStorage(tareas);
            actualizarVista();
        },
        onDelete: (id) => {
            tareas = Tasks.borrar(tareas, id);
            saveOnLocalStorage(tareas);
            actualizarVista();
        }
    });
}

actualizarVista();

buttonAgregar.addEventListener("click", () => {
    if (inputTareas.value.trim() !== "") {
        tareas = [...tareas, Tasks.addTarea(inputTareas.value)];
        saveOnLocalStorage(tareas);
        actualizarVista();
        inputTareas.value = "";
    }
});
