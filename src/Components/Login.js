import axios from "axios"
import { useState } from "react"
import { redirect, useNavigate } from "react-router-dom"
import { login, setUserSession } from "../services"
import  { Navigate } from 'react-router-dom'

const Login = ()=>{
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    console.log(username)
    console.log(password)
    const submit = (e)=>{
            e.preventDefault();
            console.log("clicked")
            login(username,password).then((results)=>{
                setUserSession(results.data.access, results.data.refresh)
                navigate("/")
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