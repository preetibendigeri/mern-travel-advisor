import React,{useRef, useState} from 'react';
import "./logn.css";
import {Place,Close} from '@mui/icons-material';
import axios from "axios";

export default function Login (props){
    
    const[failure,setFailure]=useState(false);
    const nameRef=useRef();
  
    const passwordRef=useRef();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const user={
            username:nameRef.current.value,
           
            password:passwordRef.current.value,
        };
        try {
           const res=await axios.post("http://127.0.0.1:5000/api/users/login",user)
           props.mystorage.setItem("user",res.data.username)
           props.setcurrentuser(res.data.username)
           props.setshowLogin(false)
           setFailure(false);
       
        } catch (error) {
            setFailure(true);
        }
    }
  return (
    <div className='loginContainer'>
        <div className='logo'>
            <Place/>
            PreetiPin

        </div>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='username' ref={nameRef}/>
        
            <input type='password' placeholder='password' ref={passwordRef}/>
            <button className='loginBtn'>Login</button>
            
            {failure && 
            <span className="failure">Something went wrong!</span>}

        </form>
      <Close className="loginClose" onClick={()=>props.setshowLogin(false)}/>
    </div>
  )
}


