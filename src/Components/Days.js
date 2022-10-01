import { useEffect, useState } from "react"
import { weeks }  from "../constants"
import Timeline from "./Timeline"
import Input from "./Input"

const Days = (props)=>{
    const startDay = new Date(props.year, props.month)
    const startWeek = startDay.getDay()
    const [time, setTime] = useState(false)
    const [days, setDays] = useState([])
    // startDay.setDate(startDay.getDate() - (startWeek))
    // console.log(startDay)
    // console.log(startDay.getMonth())
    useEffect(()=>{

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
                selected: false,
                task: {}
            }
            setDays((prev)=>[...prev, dayz])
        }
    }, [])
    
    if(days.length>0){
        return (
            <div className="mainCalendar" style={{marginTop: '15px'}}>
                <Input days={days} setDays = {setDays} time ={time} />
                <div>

                    <div   className="days">
                        <div className="day"></div>
                            {days.map((index, i)=>{
                                if(i<props.weekno*7 && i>=(props.weekno-1)*7){
                                    return (
                                        <div key={i}>
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
                <Timeline days={days} weekno={props.weekno} setDays = {setDays} time={time} setTime={setTime} />
                </div>
            </div>
        )
    }
}
export default Days