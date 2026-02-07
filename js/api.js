// api.js
const API_URL = "https://task-manager-backend-zeta-five.vercel.app"; // o localhost

export async function getTasks() {
    const res = await fetch(`${API_URL}/tasks`);
    return res.json();
}

export async function createTask(texto) {
    const res = await fetch(`${API_URL}/tasks/post/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto })
    });
    return res.json();
}

export async function toggleTask(id) {
    const res = await fetch(`${API_URL}/tasks/${id}/toggle`, {
        method: "PATCH"
    });
    return res.json();
}

export async function deleteTask(id) {
    const res = await fetch(`${API_URL}/tasks/id/${id}`, {
        method: "DELETE"
    });
    return res.json();
}

