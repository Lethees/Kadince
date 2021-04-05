import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

function TaskForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="taskName"
        label="Task Name"
        onChange={props.onChange}
        name="taskName"
        value={props.task.taskName}
        error={props.errors.taskName}
      />

      <div className="form-group">
        <label htmlFor="taskStatus">Task Status</label>
        <div className="field">
          <select
            id="taskStatus"
            name="taskStatus"
            onChange={props.onChange}
            value={props.task.taskStatus || ""}
            className="form-control"
          >
            <option value="" />
            <option value="1">Complete</option>
            <option value="2">Pending</option>
            <option value="3">To do</option>
          </select>
        </div>
        {props.errors.taskStatus && (
          <div className="alert alert-danger">{props.errors.taskStatus}</div>
        )}
      </div>

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

TaskForm.propTypes = {
  Task: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default TaskForm;

