import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
    document.getElementById('root').style.display = 'flex'
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
                    navigate("/login")
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
    <div className='signup mx-auto'>
        <form className='form'>
            <p className='label'>Username</p>
            <input type="text"  placeholder='Enter your username' onChange={(e)=>setUsername(e.target.value)} className={!userErr?"input green mb-2":"input red mb-2"}/>
            <p>{userErr=="Username is invalid"?<span className='invalid'>Username is Taken</span>:<></>}</p>
            
            <p className='label'>Email</p>
            <input type="email"  placeholder='Enter your email' onChange={(e)=>{
                setEmail(e.target.value)
            }}
            className={!emailErr?"input green mb-2":"input red mb-2"}
                />
            <p>{emailErr?<span className='invalid'>{emailErr}</span>:<></>}</p>


            <p className='label'>Password</p>
            <input type="password"  placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} className={!passErr?"input green mb-2":"input red mb-2"} />
            <p>{passErr?<span className='invalid'>{passErr}</span>:<></>}</p>


            <p className='label'>Confirm Password</p>
            <input type="password"  placeholder='Confirm your password' onChange={(e)=>{
                setConfirmPassword(e.target.value)
                }}
                className={!passwordErr?"input green mb-2":"input red mb-2"}
                />
                <p>{passwordErr?<span className='invalid'>{passwordErr}</span>:<></>}</p>
            <button onClick={register} className="button">Register</button>
        </form>
        <p className='mt-3 mx-auto'>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default SignUp