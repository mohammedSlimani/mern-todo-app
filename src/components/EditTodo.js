import React, { Component } from "react";
import axios from "axios";
const URL = "http://localhost:4000/todos";

export class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo_description: "",
      todo_priority: "",
      todo_completed: false
    };
    this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    axios
      .get(`${URL}/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          todo_description: res.data.todo_description,
          todo_priority: res.data.todo_priority,
          todo_completed: res.data.todo_completed
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  onChangeTodoCompleted(e) {
    this.setState({
      todo_completed: !this.state.todo_completed
    });
  }
  onChangeTodoDescription(e) {
    this.setState({
      todo_description: e.target.value
    });
  }
  onChangeTodoPriority(e) {
    this.setState({
      todo_priority: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      todo_description: this.state.todo_description,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed
    };
    console.log(obj);
    axios
      .post(`${URL}/update/${this.props.match.params.id}`, obj)
      .then(res => console.log(res.data));

    this.props.history.push("/");
  }
  render() {
    return (
      <div>
        <h3 align="center">Update Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_description}
              onChange={this.onChangeTodoDescription}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Low"
                checked={this.state.todo_priority === "Low"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
                checked={this.state.todo_priority === "Medium"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="High"
                checked={this.state.todo_priority === "High"}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              id="completedCheckbox"
              type="checkbox"
              name="completedCheckbox"
              onChange={this.onChangeTodoCompleted}
              checked={this.state.todo_completed}
              value={this.state.todo_completed}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>

          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditTodo;
