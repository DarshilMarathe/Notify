import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{

    const notesInitial = [
        {
          "_id": "650c371609d9d272b3c9b2ee",
          "user": "650b3b4aaba65b0566487b11",
          "title": "new noasdta",
          "description": "neasdsadasdt",
          "tag": "newe",
          "date": "2023-09-21T12:29:10.909Z",
          "__v": 0
        },
        {
          "_id": "650c371f9584ef00d4b4a3db",
          "user": "650b3b4aaba65b0566487b11",
          "title": "new noasdta",
          "description": "neasdsadasdt",
          "tag": "newe",
          "date": "2023-09-21T12:29:19.814Z",
          "__v": 0
        },
        {
          "_id": "650c37219584ef00d4b4a3dd",
          "user": "650b3b4aaba65b0566487b11",
          "title": "new noasdta",
          "description": "neasdsadasdt",
          "tag": "newe",
          "date": "2023-09-21T12:29:21.405Z",
          "__v": 0
        },
        {
          "_id": "650c37219584ef00d4b4a3df",
          "user": "650b3b4aaba65b0566487b11",
          "title": "new noasdta",
          "description": "neasdsadasdt",
          "tag": "newe",
          "date": "2023-09-21T12:29:21.883Z",
          "__v": 0
        },
        {
          "_id": "650c37229584ef00d4b4a3e1",
          "user": "650b3b4aaba65b0566487b11",
          "title": "new noasdta",
          "description": "neasdsadasdt",
          "tag": "newe",
          "date": "2023-09-21T12:29:22.042Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)

    return(
        // <noteContext.Provider value ={{state : state,update : update}}>   --same 
        <noteContext.Provider value ={{notes,setNotes}}> 
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;