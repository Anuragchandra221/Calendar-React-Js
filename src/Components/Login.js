import axios from "axios"
import { useEffect, useState } from "react"
import { redirect, useNavigate } from "react-router-dom"
import { getToken, login, setUserSession } from "../services"
import  { Navigate } from 'react-router-dom'

const Login = ()=>{
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(getToken()){
            navigate("/")
        }
    },[])
    const submit = (e)=>{
            e.preventDefault();
            login(username,password).then((results)=>{
                localStorage.removeItem("access_token")
                    localStorage.removeItem("refresh_token")
                //  setUserSession(results.data.access, results.data.refresh)
                localStorage.setItem("access_token", results.data.access)
                localStorage.setItem("refresh_token", results.data.refresh)
                console.log(localStorage)
                navigate("/")
            }).catch((err)=>{
                console.log("err")
            })
    }
    return (
        <div>
            <form method="post">
                <p>Username:</p>
                <input type="text" onChange={(e)=>{
                    setUsername(e.target.value)
                }} />

                <p>Password:</p>
                <input type="password" onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
                <button onClick={submit}>
                    Login
                </button>
            </form>
        </div>
    )
}
export default Login