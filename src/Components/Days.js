import { useEffect, useState } from "react"
import { weeks }  from "../constants"
import Timeline from "./Timeline"
import Input from "./Input"
import { Times } from "./Timeline"

const Days = (props)=>{
    const startDay = new Date(props.year, props.month)
    const startWeek = startDay.getDay()
    const [time, setTime] = useState(false)
    const [days, setDays] = useState([])
    
    let dyz = []
    let dy = []
    // startDay.setDate(startDay.getDate() - (startWeek))
    // console.log(startDay)
    // console.log(startDay.getMonth())
    useEffect(()=>{
        const startDay = new Date(props.year, props.month)
        const startWeek = startDay.getDay()
        dyz = []
        
            for(let day=0; day<42; day++){
                if(day===0 && startWeek!=0){
                    startDay.setDate(startDay.getDate() - (startWeek))
        
                }if(day===0 && startWeek===0){
                    startDay.setDate(startDay.getDate())
                }else{
                    startDay.setDate(startDay.getDate()+1)
                }
                // console.log(startDay.getMonth(), props.month)
                let d = {}
                    props.data.map((val, i)=>{
                        if(val.month === props.month && val.year === props.year && startDay.getDate()==val.day){
                            
                            d[val.time] = val.title
                        }
                    })
                    // console.log(dy)
                
                let dayz = {
                    currentMonth: (startDay.getMonth()===props.month),
                    date: (new Date(startDay)),
                    month: startDay.getMonth(),
                    number: startDay.getDate(),
                    year: startDay.getFullYear(),
                    week: startDay.getDay(),
                    selected: false,
                    task: d
                }
                dyz.push(dayz)
            }
            if((`${props.year}${props.month}` in props.dict1)){
                
            }else{
                props.dict1[`${props.year}${props.month}`] = dyz
            }
            // console.log(props.dict1[`${props.year}${props.month}`])
            setDays(props.dict1[`${props.year}${props.month}`])
        

        
        // console.log(data)
        // dy = []
        
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
    },[props.month,props.year])
    // console.log("days")
    if(days){
        return (
            <div className="mainCalendar" style={{marginTop: '15px'}}>
                <Input days={days} setDays = {setDays} time ={time} />
                <div className="timing">
                
                </div>
                <div className="mCalendar">
                    
                    <div   className="days ">
                        <div className="day"></div>
                            {days.map((index, i)=>{
                                // {console.log(index.month)}
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
                    
                    
                <hr className="hr" />
                <div>

                <Timeline days={days} weekno={props.weekno} setDays = {setDays} time={time} setTime={setTime} />
                </div>
                </div>
            </div>
        )
    }
}
export default Days