import "./App.scss";
import React, { useRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TodoInput = (props) => {
  const inputRef = useRef();
  const [newItem, setNewItem] = React.useState({
    id: Math.random(),
    title: "",
    completed: false,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (event !== undefined) {
      setNewItem({
        ...newItem,
        title: newValue,
      });
    }
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    if (newItem.title !== "") {
      props.addItem(newItem);
      e.target.reset();
      setNewItem({ ...newItem, title: "" });
    }
  };

  return (
    <form
      ref={inputRef}
      className="todo__input"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        type="text"
        onChange={(e) => {
          handleChange(e);
        }}
        placeholder="Add a task here..."
      />
      <button type="submit" className="btn btn-default">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

const TodoList = (props) => {
  console.log(props);
  const completed = [];
  const notComplete = props.list.filter((e, index) => {
    e.index = index;
    if (!e.completed) {
      return e;
    } else {
      completed.push(e);
    }
  });
  console.log(notComplete);
  return (
    <div>
      <ul className="todo__list">
        {notComplete.map((el) => {
          return (
            <li className="todo__list__item" key={el.id}>
              <p>{el.title}</p>
              <div className="todo__list__options">
                <span onClick={() => props.completeItem(el.id)}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span onClick={() => props.removeItem(el.id)}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <ul className="todo__list todo__list--completed">
        {completed.map((el) => {
          return (
            <li className="todo__list__item complete" key={el.id}>
              <p>{el.title}</p>
              {/* <div className="todo__list__options"> */}
              <span>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              {/* <span onClick={() => props.removeItem(el.id)}>
                  <FontAwesomeIcon icon={faTimes} />
                </span> */}
              {/* </div> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

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

  useEffect(async () => {
    const result = await axios(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    setData(result.data);
  }, []);

  const addItem = (item) => {
    console.log(item);
    axios
      .post("https://jsonplaceholder.typicode.com/todos", item)
      .then((res) => {
        setData([...data, res.data]);
      });
  };

  const removeItem = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => setData(data.filter((todo) => todo.id !== id)));
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

  return (
    <div className="App">
      <div className="todo">
        <TodoInput addItem={addItem} />
        <TodoList
          list={data}
          removeItem={removeItem}
          completeItem={completeItem}
        />
      </div>
    </div>
  );
}

export default App;
