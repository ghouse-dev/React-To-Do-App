import "./App.scss";
import React, { useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Container } from "@material-ui/core";
import TodoInput from "./components/TodoInput";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App(props) {
  const todos = [
    {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
      index: 0,
    },
  ];
  const [data, setData] = React.useState(todos);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("warning");
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    async function fetchData() {
      const result = await axios("http://localhost:3000/api/todos");
      setData(result.data);
    }
    fetchData();
  }, []);

  const addItem = (item) => {
    axios.post("http://localhost:3000/api/todos", item).then((res) => {
      setData([...data, res.data]);
      setOpen(true);
      setSeverity("success");
      setMessage("New task added successfully!");
    });
  };

  const removeItem = (id) => {
    axios.delete(`http://localhost:3000/api/todos/${id}`).then((res) => {
      setData(data.filter((todo) => todo.id != id));
      setOpen(true);
      setSeverity("warning");
    });
    setMessage("Task removed successfully!");
  };

  const completeItem = (id) => {
    setData(
      data.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="App">
      <Container maxWidth="md">
        <div className="todo">
          <h4>Add a New Task here:</h4>
          <TodoInput addItem={addItem} />
          <TodoList
            list={data}
            removeItem={removeItem}
            completeItem={completeItem}
          />
        </div>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

export default App;
