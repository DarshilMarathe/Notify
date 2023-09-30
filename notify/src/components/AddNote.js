import React,{useContext,useState} from "react";

import noteContext from "../context/notes/noteContext"


const AddNote = () => {

  const context = useContext(noteContext);
  const {addnote} = context;


  const [note, setNote] = useState({title:"",description :"",tag:""})

  //Functions to handle input
  const onChange = (e)=>{
    setNote({
        ...note,[e.target.name]:e.target.value    //...note -> keep properties in note , aage joh likha hai unko add or overwrite
    })
    // console.log(note)
  }

  const handleClick = (e)=>{
    e.preventDefault();
      addnote(note.title,note.description,note.tag);
      setNote({title:"",description :"",tag:""})
  }

  return (
    <div>
      <div className="container my-3">
        <h2>Add a note</h2>

        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onChange}
              aria-describedby="emailHelp"
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={5} required
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              minLength={5} required
              value={note.tag}
            />
          </div>
         
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
