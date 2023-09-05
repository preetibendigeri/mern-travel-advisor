import React,{useRef, useState} from 'react';
import "./signup.css";
import {Place,Close} from '@mui/icons-material';
import axios from "axios";

export default function Signup (props){
    const[success,setSuccess]=useState(false);
    const[failure,setFailure]=useState(false);
    const nameRef=useRef();
    const emailRef=useRef();
    const passwordRef=useRef();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const newUser={
            username:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
        };
        try {
           await axios.post("http://127.0.0.1:5000/api/users/signup",newUser)
           setFailure(false);
           setSuccess(true);
        } catch (error) {
            setFailure(true);
        }
    }
  return (
    <div className='signupContainer'>
        <div className='logo'>
            <Place/>
            PreetiPin

        </div>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='username' ref={nameRef}/>
            <input type='email' placeholder='email' ref={emailRef}/>
            <input type='password' placeholder='password' ref={passwordRef}/>
            <button className='signupBtn'>Sign up</button>
            {success &&
            <span className="success">You can Login now</span>}
            {failure && 
            <span className="failure">Something went wrong!</span>}

        </form>
      <Close className="signupClose" onClick={()=>props.setshowSignup(false)}/>
    </div>
  )
}


