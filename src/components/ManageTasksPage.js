import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import taskStore from "../stores/taskStore";
import { toast } from "react-toastify";
import * as taskActions from "../actions/taskAction";

const ManageTasksPage = (props) => {
  const [errors, seterrors] = useState({});
  const [tasks, setTasks] = useState(taskStore.getTasks());
  const [task, setTask] = useState({
    id: null,
    taskName: '',
    slug: '',
    taskStatus: null
  });

  
  useEffect(() => {
    taskStore.addChangeListener(onChange);
    const slug = props.match.params.slug; // from the path '/tasks/:slug'
    if (tasks.length === 0) {
      taskActions.loadTasks();
    }
    else if (slug) {
      setTask(taskStore.getTaskBySlug(slug));
    }
    return () => taskStore.removeChangeListener(onChange);
  }, [tasks.length, props.match.params.slug]);

  function onChange() {
    setTasks(taskStore.getTasks());
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    taskActions.saveTask(task).then(() => {
      props.history.push("/tasks");
      toast.success("Task saved.");
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!task.taskName) _errors.taskName = "Task Name is required";
    if (!task.taskStatus) _errors.taskStatus = "Task status is required";

    seterrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  function handleChange({ target }) {
    setTask({
      ...task,
      [target.name]: target.value,
    });
  }

  return (
    <>
      <h2>Manage Task</h2>
      <TaskForm
        errors={errors}
        task={task}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageTasksPage;
