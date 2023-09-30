import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{
  const host = "http://localhost:5000";

    const notesInitial = []

      const [notes, setNotes] = useState(notesInitial)

      
      //Get all Notes
      const getNotes = async()=>{
        //API
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token'),
          },
        });
        const json =  await response.json();
        console.log(json);
        setNotes(json);
      
      }



      //add a note
      const addnote = async(title,description,tag)=>{
        //header ka token will give konsa user

        //API
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token'),
          },
          body: JSON.stringify({title,description,tag}), 
        });
        const note =  await response.json();
       
        // setNotes(notes.push(note));   --> updates array 
        setNotes(notes.concat(note)); //--> returns array
      }

      //update a note
      const editnote = async (id,title,description,tag)=>{

        //API CALL   -- searched fetch with headers
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", 
         
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token'),
          },
          body: JSON.stringify({title,description,tag}), 
        });
        const json =  await response.json();


         //logic to edit in client
      
        let newNotes = JSON.parse(JSON.stringify(notes));
        for(let index=0 ; index < newNotes.length ; index++){
         
          const element = notes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
        
      }


      //delete a note
      const deletenote = async(id)=>{

        // Call API
         const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
         
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token'),
          }
        });
        const json =  response.json();
        console.log(json);

        const newnodes = notes.filter((note)=>{return note._id !== id});
        setNotes(newnodes);
      }

    return(
        // <noteContext.Provider value ={{state : state,update : update}}>   --same 
        <noteContext.Provider value ={{notes,setNotes,addnote,editnote,deletenote,getNotes}}> 
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;