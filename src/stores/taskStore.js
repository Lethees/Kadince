import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";

let _tasks = [];

class TaskStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getTasks() {
    return _tasks;
  }

  getTaskBySlug(slug) {
    return _tasks.find((task) => task.slug === slug);
  }
}

const store = new TaskStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_TASK:
      _tasks.push(action.task);
      store.emitChange();
      break;
    case actionTypes.UPDATE_TASK:
      _tasks = _tasks.map((task) =>
        task.id === action.task.id ? action.task : task
      );
      store.emitChange();
      break;
    case actionTypes.LOAD_TASKS:
      _tasks = action.tasks;
      store.emitChange();
      break;
    case actionTypes.DELETE_TASK:
      _tasks = _tasks.filter(task => task.id !== parseInt (action.id, 10))
      store.emitChange();
      break;    
    default:
  }
});

export default store;
