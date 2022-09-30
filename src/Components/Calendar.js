import { useState } from "react"
import Days from "./Days"
import { months } from "../constants"
import Timeline from "./Timeline"
const Calendar = ()=>{
    const [date, setDate] = useState(new Date())
    const [weekno, setweekno] = useState(1)
    const [year, setYear] = useState(date.getFullYear())
    const [month, setMonth] = useState(date.getMonth())

    return(
        <div className="calendar">
            <h2 className="heading"><button className="prev" onClick={()=>{
                setYear((prev)=>prev-1)
            }}>&lt;</button>
                {year}
                <div class="dropdown">
                <button class="dropbtn" style={{marginInline: '10px', marginBottom: '1px'}}>{months[month]}<i style={{marginLeft: '10px'}} class="fa-solid fa-caret-down"></i></button>
                <div class="dropdown-content">
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
                <button className="prev" onClick={()=>{
                setYear((prev)=>prev+1)
            }}>&gt;</button>
            </h2>
            <div class="dropdown">
            <button class="dropbtn" style={{marginBottom: '1px'}}>Week {weekno} <i style={{marginLeft: '10px'}} class="fa-solid fa-caret-down"></i></button>
            <div class="dropdown-content">
                <button className="listitem" onClick={()=>setweekno(1)}>Week 1</button>
                <button className="listitem" onClick={()=>setweekno(2)}>Week 2</button>
                <button className="listitem" onClick={()=>setweekno(3)}>Week 3</button>
                <button className="listitem" onClick={()=>setweekno(4)}>Week 4</button>
                <button className="listitem" onClick={()=>setweekno(5)}>Week 5</button>
            </div>
            </div>
            
            {/* <div>
                <div className="header">
                    {days.map((index, i)=>{
                        return <span key={i} className="weekday">{index}</span>
                    })}
                </div>
            </div> */}
            <div>
                    <Days year={year} month={month} weekno={weekno} />
            </div>
        </div>
    )
}
export default Calendar
