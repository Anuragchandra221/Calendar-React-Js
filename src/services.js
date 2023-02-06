import axios from "axios"
import { baseUrl } from "./constants"
const getToken = ()=>{
    return localStorage.getItem("access_token") || null
}


function getData(){
    const token = getToken()
    return axios.get(baseUrl,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }
    )
}
function postData(title,year,month,day,time){
    const token = getToken()
    return axios.post(`${baseUrl}/create`,
    {
        "title":title,
        "year":year,
        "month":month,
        "day":day,
        "time":time
    },{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
}
function login(username, password){
    return axios.post(`${baseUrl}/token/`,{
        "username":username,
        "password":password
    })
}
const refreshToken=()=>{
    const refresh = localStorage.getItem("refresh_token") || null
    return axios.post(`${baseUrl}/token/refresh/`,{
        'refresh':refresh
    })
    
}
const setUserSession = (access_token,  refresh_token)=>{
    localStorage.setItem("access_token", access_token)
    localStorage.setItem("refresh_token", refresh_token)
}

const registerUser = (username, password, email)=>{
    return axios.post(`${baseUrl}/register/`,
    {
        "username":username,
        "password":password,
        "email":email
    })
}
const checkUser = (usr)=>{
    return axios.get(`${baseUrl}/checkUser/${usr}`)
}
const deleteTask = (title,year,month,day,time)=>{
    const token = getToken()
    return axios.post(`${baseUrl}/deleteTask/`,{
        "title":title,
        "year":year,
        "month":month,
        "day":day,
        "time":time
    },{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
}
export {getData,postData, login, setUserSession,getToken, refreshToken, registerUser, checkUser, deleteTask}