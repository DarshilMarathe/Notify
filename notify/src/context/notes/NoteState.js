import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{

    const s1 = {
        "name":"Darshil",
        "class" : "11"
    }

    const [state, setstate] = useState(s1);

    const update = ()=>{
        setTimeout(() => {
            setstate({
                "name":"Larry",
                "class":"0"
            })
        }, 1000);
    }


    return(
        // <noteContext.Provider value ={{state : state,update : update}}>   --same 
        <noteContext.Provider value ={{state,update}}> 
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;