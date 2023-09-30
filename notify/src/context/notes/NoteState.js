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
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwYjNiNGFhYmE2NWIwNTY2NDg3YjExIn0sImlhdCI6MTY5NTIzOTMzNH0.z12I0A5_wfJvZsCFKtCXzUiCbZWoSl9Ju3hVBrZc0LM",
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
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwYjNiNGFhYmE2NWIwNTY2NDg3YjExIn0sImlhdCI6MTY5NTIzOTMzNH0.z12I0A5_wfJvZsCFKtCXzUiCbZWoSl9Ju3hVBrZc0LM",
          },
          body: JSON.stringify({title,description,tag}), 
        });
        const json =  response.json();
      

        console.log("Adding a note")
        // TODO: Call API
        const note =  {
          "_id": "650c371609d9d272b3c9b2ee",
          "user": "650b3b4aaba65b0566487b11",
          "title": title,
          "description": description,
          "tag": "Default Tag",
          "date": "2023-09-21T12:29:10.909Z",
          "__v": 0
        }
        // setNotes(notes.push(note));   --> updates array 
        setNotes(notes.concat(note)); //--> returns array
      }

      //update a note
      const editnote = async (id,title,description,tag)=>{

        //API CALL   -- searched fetch with headers
        const response = await fetch(`${host}/api/notes/updatenote/650c36c4c7bc97f4199bae7b`, {
          method: "PUT", 
         
          headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwYjNiNGFhYmE2NWIwNTY2NDg3YjExIn0sImlhdCI6MTY5NTIzOTMzNH0.z12I0A5_wfJvZsCFKtCXzUiCbZWoSl9Ju3hVBrZc0LM",
          },
          body: JSON.stringify({title,description,tag}), 
        });
        const json =  response.json();
      


        for(let index=0 ; index < notes.length ; index++){
          //logic to edit in client
          const element = notes[index];
          if(element._id === id){
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
        }
        
      }


      //delete a note
      const deletenote = (id)=>{
        // console.log(id)

        // TODO: Call API

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