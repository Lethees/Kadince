import React, { useState, useEffect } from "react";
import taskStore from "../stores/taskStore";
import TaskList from "./TaskList";
import { Link } from "react-router-dom";
import { loadTasks, deleteTask } from "../actions/taskAction";
import TextField from '@material-ui/core/TextField';

function TasksPage() {
  const [tasks, setTasks] = useState(taskStore.getTasks());
  const [filter, setFilter] = useState();

  useEffect(() => {
    taskStore.addChangeListener(onChange);
    if (taskStore.getTasks().length === 0) loadTasks();
    return () => taskStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setTasks(taskStore.getTasks());
  }

  return (
    <>
      <h2>Tasks</h2>
      <Link className="btn btn-primary" to="/task">
        Add Task
      </Link>
      <TextField style={{ width: '400px', float: 'right' }}
            onChange={ e => setFilter(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="filter"
            label="Status Filter (Enter the correct name of the Status)"
            name="filter"
            autoComplete="filter"
            autoFocus
          />
      <TaskList tasks={tasks} deleteTask={deleteTask} filter={filter}/>
    </>
  );
}

export default TasksPage;
