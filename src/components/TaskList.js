import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const status = [
  { id: 1, name: "Complete" },
  { id: 2, name: "Pending" },
  { id: 3, name: "To do" }
];

function TaskList(props) {

let filter = null;

  if(props.filter === 'Complete') {
     filter = 1;
  }
  else if (props.filter === 'Pending') {
     filter = 2;
  }  else if (props.filter === 'To do') {
     filter = 3;
  }
  else{
  }

    const tasks = props.tasks.filter(e => e.taskStatus === filter)
    console.log(tasks)

  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Task Name</th>
          <th>Task Status</th>
        </tr>
      </thead>
      <tbody>
        {filter === null ? props.tasks.map((task) => {
          return (
            <tr key={task.id}>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.deleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <Link to={"/task/" + task.slug}>{task.taskName}</Link>
              </td>
              <td>{status.find(element => element.id === task.taskStatus).name}</td>
            </tr>
          );
        }): tasks.map((task) => {
          return (
            <tr key={task.id}>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.deleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <Link to={"/task/" + task.slug}>{task.taskName}</Link>
              </td>
              <td>{status.find(element => element.id === task.taskStatus).name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

TaskList.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      taskName: PropTypes.string.isRequired,
      taskStatus: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TaskList;
