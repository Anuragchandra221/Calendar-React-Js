import { useEffect, useState } from "react"
import { weeks }  from "../constants"

const Days = (props)=>{
    const startDay = new Date(props.year, props.month)
    const startWeek = startDay.getDay()
    const days = []
    console.log(startDay)
    // startDay.setDate(startDay.getDate() - (startWeek))
    // console.log(startDay)
    // console.log(startDay.getMonth())

        for(let day=0; day<42; day++){
            if(day===0 && startWeek!=0){
                startDay.setDate(startDay.getDate() - (startWeek))
    
            }if(day===0 && startWeek===0){
                startDay.setDate(startDay.getDate())
            }else{
                startDay.setDate(startDay.getDate()+1)
            }
            let dayz = {
                currentMonth: (startDay.getMonth()===props.month),
                date: (new Date(startDay)),
                month: startDay.getMonth(),
                number: startDay.getDate(),
                year: startDay.getFullYear(),
                week: startDay.getDay(),
            }
            days.push(dayz)
        }
    
    if(days.length>0){
        return (
            <div style={{marginTop: '15px'}}>
            <div className="weeks">
                
            
        </div>
        <div   className="days">

            {days.map((index, i)=>{
                if(i<props.weekno*7 && i>=(props.weekno-1)*7){
                    return (
                        <div>
                            <span className="week">{weeks[index.week]}</span>
                        <div  className="day"  key={i}>
                        {/* <span>{index.date}</span> */}
                        {index.currentMonth?<span>{index.number}</span>:<></>}
                        </div>
                        </div>
                    )
                }
                
            })}
            </div>
            <hr/>
            </div>
        )
    }
}

export default Days