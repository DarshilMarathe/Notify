import React, { useContext,useEffect, useRef,useState} from "react";
import {useNavigate} from 'react-router-dom'
import noteContext from "../context/notes/noteContext"

import Noteitem from "./Noteitem";
import AddNote from "./AddNote"; 


const Notes = () => {
  
  const navigate = useNavigate();

  const context = useContext(noteContext)
  const {notes,getNotes,editnote} = context;

  
  const [note, setNote] = useState({id:"", etitle:"",edescription :"",etag:""})

  useEffect(() => {

    if(localStorage.getItem("token")){
      getNotes();

    }
    else{
      // alert("Login to continue")
      navigate('/login')
    }

      //eslint-disable-next-line
  }, [])

  const updateNote = (currentNote)=>{
    ref.current.click() ;
    setNote({id: currentNote._id,etitle:currentNote.title , edescription : currentNote.description , etag : currentNote.tag});
  }
  
  const ref = useRef(null);
  const Closeref = useRef(null);

  //Copied from Addnote.js


  const onChange = (e)=>{
    setNote({
        ...note,[e.target.name]:e.target.value    //...note -> keep properties in note , aage joh likha hai unko add or overwrite
    })
    // console.log(note)
  }

  const handleClick = (e)=>{
    console.log("Updating The note")
    editnote(note.id,note.etitle,note.edescription , note.etag);
    Closeref.current.click();
  }

  return (
    <>
          <AddNote/>

        
    <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
              <form>
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  value={note.etitle}
                  onChange={onChange}
                  aria-describedby="emailHelp"
                  minLength={5} required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  value={note.edescription}
                  onChange={onChange}
                  minLength={5} required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  value={note.etag}
                  onChange={onChange}
                />
              </div>
          
            </form>
          </div>
          <div className="modal-footer">
            <button ref={Closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length<5 || note.edescription.length<5}  type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
          </div>
        </div>
      </div>
    </div>


    <div className="row my-3 container">
      <h1>Your notes</h1>
      {notes.length === 0 && "No notes to display"}
      {notes.map((note) => {
        return <Noteitem key={note._id} updateNote = {updateNote}  note = {note}/>;
      })}
    </div>
    </>
  );
};

export default Notes;
