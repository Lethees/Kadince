import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/tasks/";

export function getTasks() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getTaskBySlug(slug) {
  return fetch(baseUrl + "?slug=" + slug)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json().then(tasks => {
        if (tasks.length !== 1) throw new Error("Task not found: " + slug);
        return tasks[0]; // should only find one task for a given slug, so return it.
      });
    })
    .catch(handleError);
}

export function saveTask(task) {
  return fetch(baseUrl + (task.id || ""), {
    method: task.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...task,
      // Parse taskStatus to a number (in case it was sent as a string).
      taskStatus: parseInt(task.taskStatus, 10)
    })
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteTask(taskId) {
  return fetch(baseUrl + taskId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
