
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getToken, login } from "../services"
import './style/Login.css'

const Login = ()=>{
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [err, setErr] = useState()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(getToken()){
            navigate("/")
        }
    },[])
    console.log(err)
    const submit = (e)=>{
            e.preventDefault();
            if(username && password){
                login(username,password).then((results)=>{
                    setErr()
                    localStorage.removeItem("access_token")
                        localStorage.removeItem("refresh_token")
                    //  setUserSession(results.data.access, results.data.refresh)
                    localStorage.setItem("access_token", results.data.access)
                    localStorage.setItem("refresh_token", results.data.refresh)
                    navigate("/")
                }).catch((err)=>{
                    setErr("Invalid credentials")
                    console.log("invalid")
                })
            }else{
                setErr("Enter your credentials")
            }
    }
    return (
        <div className="login mx-auto">
            <form method="post" className="form">
                <p className="label">Username:</p>
                <input className="input mb-2" type="text" placeholder="Enter your username" onChange={(e)=>{
                    setUsername(e.target.value)
                }} />

                <p className="label mt-3">Password:</p>
                <input className="input mb-2" type="password" placeholder="Enter your password" onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
                <br />
                <p className="invalid mt-2 mb-0 ml-2">{err?err:<></>}</p>
                <button onClick={submit} className="button mx-auto mt-3">
                    Login
                </button>
            </form>
            <p className="mt-3">Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
    )
}
export default Login