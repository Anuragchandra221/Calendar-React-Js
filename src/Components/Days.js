import { useEffect, useState } from "react"
import { weeks }  from "../constants"
import Timeline from "./Timeline"
import Input from "./Input"

const Days = (props)=>{
    const startDay = new Date(props.year, props.month)
    const startWeek = startDay.getDay()
    const [time, setTime] = useState(false)
    const [days, setDays] = useState([])
    let dyz = []
    // startDay.setDate(startDay.getDate() - (startWeek))
    // console.log(startDay)
    // console.log(startDay.getMonth())
    useEffect(()=>{
        const startDay = new Date(props.year, props.month)
        const startWeek = startDay.getDay()
        console.log(startDay)
        dyz = []

        for(let day=0; day<42; day++){
            if(day===0 && startWeek!=0){
                startDay.setDate(startDay.getDate() - (startWeek))
    
            }if(day===0 && startWeek===0){
                startDay.setDate(startDay.getDate())
            }else{
                startDay.setDate(startDay.getDate()+1)
            }
            console.log(startDay.getMonth(), props.month)
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
            dyz.push(dayz)
        }
        console.log((props.year in props.dict1))
        if((props.year in props.dict1)){
            
        }else{
            props.dict1[props.year] = dyz
        }
        setDays(props.dict1[props.year])
    }, [props.year, props.month])
    
    if(days){
        return (
            <div className="mainCalendar" style={{marginTop: '15px'}}>
                <Input days={days} setDays = {setDays} time ={time} />
                <div className="mCalendar">

                    <div   className="days">
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
                <Timeline days={days} weekno={props.weekno} setDays = {setDays} time={time} setTime={setTime} />
                </div>
            </div>
        )
    }
}
export default Days