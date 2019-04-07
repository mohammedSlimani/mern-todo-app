import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/style.css";
const URL = "http://localhost:4000/todos";

const Todo = props => (
  <tr>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_description}
    </td>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_priority}
    </td>
    <td>
      <Link to={"edit/" + props.todo._id}>Edit</Link>
    </td>
  </tr>
);

export class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    axios
      .get(URL)
      .then(res => {
        this.setState({
          todos: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  todoList() {
    return this.state.todos.map((currentTodo, index) => {
      return <Todo todo={currentTodo} key={index} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}

export default TodosList;
