export class Task {
    constructor(texto, completada = false, id = Date.now()) {
        this.id = id;
        this.texto = texto;
        this.completada = completada;
    }

    // Método para cambiar estado
    toggle() {
        this.completada = !this.completada;
    }

    // Método para actualizar texto
    updateTask(nuevoTexto) {
        this.texto = nuevoTexto;
    }

    static addTask(texto){
        return new Task (texto);
    }

    // Nota: El "borrado" suele requerir acceso al array principal. 
    // Pero ahora el objeto tiene sus propios métodos de lógica interna.
}

