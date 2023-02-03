import axios from "axios"
import { baseUrl } from "./constants"
const getToken = ()=>{
    return sessionStorage.getItem("access_token") || null
}
const token = getToken()
const refresh = sessionStorage.getItem("refresh_token") || null
function getData(){
    return axios.get(baseUrl,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }
    )
}
function postData(title,year,month,day,time,date){
    return axios.post(`${baseUrl}/create`,
    {
        "title":title,
        "year":year,
        "month":month,
        "day":day,
        "time":time,
        "date":date
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
    console.log(refresh)
    return axios.post(`${baseUrl}/token/refresh/`,{
        'refresh':refresh
    })
    
}
const setUserSession = (access_token,  refresh_token)=>{
    sessionStorage.setItem("access_token", access_token)
    sessionStorage.setItem("refresh_token", refresh_token)
}

export {getData,postData, login, setUserSession,getToken, refreshToken}