import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
// In react-router-dom v6 useHistory() is replaced by useNavigate().

const Login = () => {
//   let history = useHistory();
  // let history = useHistory();
  let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email : "" , password : ""})

    const handleChange=(e)=>{
        setCredentials({
            ...credentials,[e.target.name] : e.target.value,
        })
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email : credentials.email,password:credentials.password}),
          });
          const json =  await response.json();
          console.log(json);
          if(json.success){
            //save auth token and redirect
            localStorage.setItem('token',json.authtoken);
            // history.push("/");
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
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={handleChange} aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' onChange={handleChange} value={credentials.password}/>
        </div>
        
        <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </div>
  )
}

export default Login
