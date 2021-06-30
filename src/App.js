import "./App.scss";
import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TodoInput = (props) => {
  const inputRef = useRef();
  const [newItem, setNewItem] = React.useState({
    task: "",
    complete: false,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (event !== undefined) {
      setNewItem({
        ...newItem,
        task: newValue,
      });
    }
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    if (newItem.task !== "") {
      props.addItem(newItem);
      e.target.reset();
      setNewItem({ ...newItem, task: "" });
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
  const completed = [];
  const notComplete = props.list.filter((e, index) => {
    e.index = index;
    if (!e.complete) {
      return e;
    } else {
      completed.push(e);
    }
  });
  return (
    <div>
      <ul className="todo__list">
        {notComplete.map((el) => {
          return (
            <li className="todo__list__item">
              <p>{el.task}</p>
              <div className="todo__list__options">
                <span onClick={() => props.completeItem(el.index)}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span onClick={() => props.removeItem(el.index)}>
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
            <li className="todo__list__item complete">
              <p>{el.task}</p>
              <span>
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

function App(props) {
  const [list, setList] = React.useState(props.todoItems);
  const addItem = (item) => {
    setList((list) => [...list, item]);
  };

  const removeItem = (index) => {
    console.log(index);
    let newList = [...list];
    newList.splice(index, 1);
    setList(newList);
    console.log("item removed");
  };

  const completeItem = (index) => {
    let arr2 = [...list];
    arr2[index].complete = true;
    setList(arr2);
    console.log("item complete");
  };

  return (
    <div className="App">
      <div className="todo">
        <TodoInput addItem={addItem} />
        <TodoList
          list={list}
          removeItem={removeItem}
          completeItem={completeItem}
        />
      </div>
    </div>
  );
}

export default App;
