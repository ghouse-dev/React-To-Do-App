import React from "react";
import AddIcon from '@material-ui/icons/Add';

const TodoInput = (props) => {
    const inputRef = React.useRef();
    const [formData, setFormData] = React.useState({
      title: "",
      description: ""
    });
  
    const { title, description} = formData;
  
    // useEffect(() => {
    //   inputRef.current.focus();
    // }, []);
  
    const updateFormData = event =>
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if(formData.title !== "" && formData.description !== null) {
        props.addItem(formData);
        setFormData({title: "", description: ""});
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
         
          value={title}
          onChange={e => updateFormData(e)}
          name="title"
          placeholder="Title..."
          required
        />
        <input
          type="text"
          value={description}
          onChange={e => updateFormData(e)}
          name="description"
          placeholder="Description..."
          required
        />
        <button type="submit" className="btn btn-default">
           <AddIcon />
        </button>
      </form>
    );
  };

  export default TodoInput;