// view.js
export function renderizar(lista, tareas, handlers) {
    lista.textContent = "";

    for (let t of tareas) {
        const item = document.createElement("li");
        item.className = "data";

        const textoSpan = document.createElement("span");
        textoSpan.className = "texto";
        textoSpan.textContent = t.texto;

        if (t.completada) {
            textoSpan.classList.add("done");
        }

        textoSpan.addEventListener("click", () => {
            handlers.onToggle(t.id);
        });

        const botonDel = document.createElement("button");
        botonDel.className = "btnData";
        botonDel.innerText = "❌";

        botonDel.addEventListener("click", () => {
            handlers.onDelete(t.id);
        });

        item.appendChild(textoSpan);
        item.appendChild(botonDel);
        lista.appendChild(item);
    }
}
