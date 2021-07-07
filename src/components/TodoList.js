import React from "react";
import DoneIcon from "@material-ui/icons/Done";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const TodoList = (props) => {
  const completed = [];
  const notComplete = props.list.filter((e, index) => {
    e.index = index;
    if (!e.completed) {
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
            <li className="todo__list__item" key={el.id}>
              <div>
                <h4>{el.title}</h4>
                <p>{el.description}</p>
              </div>

              <div className="todo__list__options">
                <span onClick={() => props.completeItem(el.id)}>
                  <DoneIcon />
                </span>
                <span onClick={() => props.removeItem(el.id)}>
                  <DeleteOutlineIcon />
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
              <div>
                <p>{el.title}</p>
                <p>{el.description}</p>
              </div>
              <div className="todo__list__options">
                <span>
                  <CheckBoxIcon />
                </span>
                <span onClick={() => props.removeItem(el.id)}>
                  <DeleteOutlineIcon />
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
