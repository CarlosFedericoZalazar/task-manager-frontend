const buttonAgregar = document.getElementById("btnAgregar");
const inputTareas = document.getElementById("inputTarea");
const lista = document.getElementById("lista");

const data = localStorage.getItem("tareas");
let tareas = [];

if (data) {
    tareas = JSON.parse(data);
    renderizar();
}


buttonAgregar.addEventListener("click", () => {
    if (inputTareas.value.trim() !== "") {
        tareas.push(addTarea());
        guardar();
        renderizar();
        inputTareas.value = "";
    }
    else {
        alert("no escribiste nada");
    }
});

function addTarea(){
    return{
        id: Date.now(),
        texto:inputTareas.value,
        completada:false
    }
}

function renderizar() {
    lista.textContent = "";

    for (let t of tareas) {

        const item = document.createElement("li");
        item.className = "data";

        const textoSpan = document.createElement("span");
        textoSpan.className = "texto";

        textoSpan.addEventListener("click", () => {
            toggleTarea(t.id);
        })
        
        if(t.completada){
            textoSpan.classList.add("done");
        }
        else{
            textoSpan.classList.remove("done");
        }

        const botonDel = document.createElement("button");
        botonDel.className = `btnData`;
        botonDel.innerText = "❌";

        botonDel.onclick = () => {
            borrar(t.id);
        };

        textoSpan.textContent = t.texto;
        item.appendChild(textoSpan);
        item.appendChild(botonDel);
        lista.appendChild(item);
    }
}

function guardar() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function toggleTarea(id) {
    const tareaToggle = tareas.map(t => {
        if(t.id === id){
            return{
                ...t,
                completada:!t.completada
            }
        }
        else return t;
    });
    tareas = tareaToggle;
    guardar();
    renderizar();
}


const borrar = (id) => {
    const tareasFilter = tareas.filter(t => t.id !== id);
    tareas = tareasFilter;
    guardar();
    renderizar();
}
