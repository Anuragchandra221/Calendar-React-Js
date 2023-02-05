import { useEffect, useReducer, useState } from "react"
import Days from "./Days"
import { months } from "../constants"
import {getData, getToken, refreshToken, setUserSession} from "../services"
import { Navigate, useNavigate } from "react-router-dom"
const reducer = (state, action)=>{
    switch(action.type){
        case "decrement":
            return state-1
        case "increment":
            return state+1
    }
}
const Calendar = ()=>{
    const [date, setDate] = useState(new Date())
    const [weekno, setweekno] = useState(1)
    const [data, setData] = useState()
    const isUserLoggedIn = getToken()?true:false
    const navigate = useNavigate()
    // const [year, setYear] = useState(date.getFullYear())
    const [year, dispatch] = useReducer(reducer, date.getFullYear())
    const [month, setMonth] = useState(date.getMonth())
    const [loading, setLoading] = useState(true)
    let dict1 = {}
    const time = 4*60*1000
    // console.log("calendar")
     useEffect(()=>{
        if(loading){
            dict1 = {}
            refreshToken().then((results)=>{
                // console.log(results.data.access)
                setUserSession(results.data.access, results.data.refresh)
                setLoading(false)
                // console.log('loading')
            }).catch((err)=>{
                // console.log(err.response)
            })
        }
        if(getToken()){
            // console.log(localStorage.getItem("access_token"))
            getData().then((results)=>{
                setData(results.data)
                setLoading(false)
            }).catch((err)=>{
                console.log(err)
            })
            refreshToken().then((results)=>{
                setUserSession(results.data.access, results.data.refresh)
            }).catch((err)=>{
                // console.log(err.response)
            })
            let interval = setInterval(()=>{
                console.log("hi")
                refreshToken().then((results)=>{
                    setUserSession(results.data.access, results.data.refresh)
                }).catch((err)=>{
                    // console.log(err.response)
                })
            },time)
            return ()=>clearInterval(interval)
            
        }else{
            navigate('login')
        }
     },[loading])
     if(!loading){

         return(
             <div className="calendar" style={{color: '#00367d'}}>
                <button onClick={()=>{
                    localStorage.removeItem("access_token")
                    localStorage.removeItem("refresh_token")
                    navigate("login")
                }}>Logout</button>
                 <h2 className="heading" style={{marginInline: '0.83em'}}><button className="prev" style={{backgroundColor: "#fff", color: '#00367d', borderRadius: '10px', height: '2em', cursor: 'pointer'}} onClick={()=>{
                     dispatch({type:"decrement"})
                 }}><i className="fa-solid fa-chevron-left" ></i></button>
                     {year}
                     <div className="dropdown">
                     <button className="dropbtn" style={{marginInline: '10px', marginBottom: '1px'}}>{months[month]}<i style={{marginLeft: '10px'}} className="fa-solid fa-caret-down"></i></button>
                     <div className="dropdown-content">
                         <button className="listitem"  onClick={()=>setMonth(0)}>January</button>
                         <button className="listitem" onClick={()=>setMonth(1)}>February</button>
                         <button className="listitem" onClick={()=>setMonth(2)}>March</button>
                         <button className="listitem" onClick={()=>setMonth(3)}>April</button>
                         <button className="listitem" onClick={()=>setMonth(4)}>May</button>
                         <button className="listitem" onClick={()=>setMonth(5)}>June</button>
                         <button className="listitem" onClick={()=>setMonth(6)}>July</button>
                         <button className="listitem" onClick={()=>setMonth(7)}>August</button>
                         <button className="listitem" onClick={()=>setMonth(8)}>September</button>
                         <button className="listitem" onClick={()=>setMonth(9)}>October</button>
                         <button className="listitem" onClick={()=>setMonth(10)}>November</button>
                         <button className="listitem" onClick={()=>setMonth(11)}>December</button>
                     </div>
                     </div>
                     <button className="prev" style={{backgroundColor: "#fff", color: '#00367d', borderRadius: '10px', height: '2em', cursor: 'pointer', marginLeft: '0px'}} onClick={()=>{
                     dispatch({type:"increment"})
                 }}><i className="fa-solid fa-chevron-right" ></i></button>
                 </h2>
                 <div className="" style={{marginBottom: '6px'}}>
                 <button className="prev" style={{backgroundColor: "#fff", color: '#00367d', borderRadius: '10px', height: '2em', cursor: 'pointer'}} onClick={()=>{
                     setweekno((prev)=>{
                         if(weekno==1){
                             return 1
                         }else{
                             return prev-1
                         }
                     })
                 }}><i className="fa-solid fa-chevron-left" ></i></button>
                 <h3 style={{marginBottom: '1px', display: 'inline'}}>Week {weekno}</h3>
                 <button className="prev" style={{backgroundColor: "#fff", color: '#00367d', borderRadius: '10px', height: '2em', cursor: 'pointer'}} onClick={()=>{
                     setweekno((prev)=>{
                         if(weekno==6){
                             return prev
                         }else{
                             return prev+1
                         }
                     })
                 }}><i className="fa-solid fa-chevron-right" ></i></button>
                 {/* <div className="dropdown-content">
                     <button className="listitem" onClick={()=>setweekno(1)}>Week 1</button>
                     <button className="listitem" onClick={()=>setweekno(2)}>Week 2</button>
                     <button className="listitem" onClick={()=>setweekno(3)}>Week 3</button>
                     <button className="listitem" onClick={()=>setweekno(4)}>Week 4</button>
                     <button className="listitem" onClick={()=>setweekno(5)}>Week 5</button>
                 </div> */}
                 </div>
                 
                 {/* <div>
                     <div className="header">
                         {days.map((index, i)=>{
                             return <span key={i} className="weekday">{index}</span>
                         })}
                     </div>
                 </div> */}
                 <div className="centerDiv">
                         {data?<Days year={year} month={month} weekno={weekno} dict1={dict1} data={data} />:<></>}
                         
                 </div>
             </div>
         )
     }else{
        return <h1>loading...</h1>
     }

}
export default Calendar
