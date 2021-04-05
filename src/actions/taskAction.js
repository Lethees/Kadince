import dispatcher from "../appDispatcher";
import * as taskApi from "../api/taskApi";
import actionTypes from "./actionTypes";

export function saveTask(task) {
  return taskApi.saveTask(task).then((savedTask) => {
    // Hey dispatcher, go tell all the stores that a task has just been created.
    dispatcher.dispatch({
      actionType: task.id
        ? actionTypes.UPDATE_TASK
        : actionTypes.CREATE_TASK,
      task: savedTask,
    });
  });
}

export function loadTasks() {
  return taskApi.getTasks().then((tasks) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_TASKS,
      tasks: tasks,
    });
  });
}

export function deleteTask(id) {
  return taskApi.deleteTask(id).then( () => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_TASK,
      id : id
    });
  });
}