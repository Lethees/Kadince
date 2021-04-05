import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/status/";

export function getStatuss() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveStatus(status) {
  return fetch(baseUrl + (status.name || ""), {
    method: status.name ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(status)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteStatus(taskStatus) {
  return fetch(baseUrl + taskStatus, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
