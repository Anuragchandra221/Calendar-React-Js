import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkUser, registerUser } from '../services'
import './style/SignUp.css'

function SignUp() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [email, setEmail] = useState()
    const [emailErr, setEmailErr] = useState()
    const [passwordErr, setPasswordErr] = useState()
    const [passErr, setPassErr] = useState()
    const [userErr, setUserErr] = useState()
    const navigate = useNavigate()
    const validateEmail = (e)=>{
        if(email){
            if(email.toLowerCase().match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)){
                setEmailErr()
            }else{
                setEmailErr("Enter valid email")
            }
        }
    }
    const validatePassword = ()=>{
        if(password){
            if(password.length<8){
                setPassErr("Password should contain 8 characters")
            }else{
                setPassErr()
            }
        }
        if(password && confirmPassword){
            
            if(password==confirmPassword){
                setPasswordErr()
            }else{
                setPasswordErr("Passwords do not match")
            }
        }
        
    }
    const register = (e)=>{
        e.preventDefault()
        console.log('hihi')
        if(username && password && confirmPassword && email){
            if(!passErr && !passwordErr && !emailErr){
                registerUser(username,password,email).then((results)=>{
                    navigate("/")
                })
            }
        }
    }
    useEffect(() => {
      validateEmail();
      validatePassword();
      if(username){
          checkUser(username).then((results)=>{
              if(results.data.msg=="success"){
                  setUserErr()
              }else{
                  setUserErr("Username is invalid")
              }
          }).catch((err)=>{
            console.log(err.data)
          })
      }
    }, [email, confirmPassword, password,username])
    
  return (
    <div>
        <form>
            <p>Username</p>
            <input type="text" onChange={(e)=>setUsername(e.target.value)} className={!userErr?"input green":"input red"}/>
            <p>{userErr=="Username is invalid"?<span id='valid'>Username is Taken</span>:<></>}</p>
            <p>Email</p>
            <input type="email" onChange={(e)=>{
                setEmail(e.target.value)
            }}
            className={!emailErr?"input green":"input red"}
                />
            <p>{emailErr?<span>{emailErr}</span>:<></>}</p>
            <p>Password</p>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} className={!passErr?"input green":"input red"} />
            <p>{passErr?<span>{passErr}</span>:<></>}</p>
            <p>Confirm Password</p>
            <input type="password" onChange={(e)=>{
                setConfirmPassword(e.target.value)
                }}
                className={!passwordErr?"input green":"input red"}
                />
                <p>{passwordErr?<span>{passwordErr}</span>:<></>}</p>
            <button onClick={register}>Register</button>
        </form>
    </div>
  )
}

export default SignUp