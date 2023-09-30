import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";


const Signup = () => {

      const [credentials, setCredentials] = useState({name : "",email : "" , password : "",cpassword : ""})

      
      let navigate = useNavigate();
  
      const onChange=(e)=>{
          setCredentials({
              ...credentials,[e.target.name] : e.target.value,
          })
      }
  
      const handleSubmit=async (e)=>{
        if(credentials.password !== credentials.cpassword)
        {
          return alert("Password doesnt match")
        }
          e.preventDefault();
          const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({name : credentials.name , email : credentials.email,password:credentials.password}),
            });
            const json =  await response.json();
            console.log(json);
            if(json.success){
              //save auth token and redirect
              localStorage.setItem('token',json.authtoken);

              //Can use alert bootstrap
              alert("Successfully Signed In")
               navigate("/");
  
            }
            else{
              alert("Invalid Credentials")
            }
      }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email"  name="email" aria-describedby="emailHelp" onChange={onChange} required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="password" onChange={onChange} required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} required minLength={5}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form> 
    </div>
  )
}

export default Signup
