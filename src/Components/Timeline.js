import { useEffect, useState } from "react"

export const Times = ['9:30','10:30','11:30', '12:30', '1:30','2:30','3:30','4:30','5:30','6:30']


const tasks = [
    {
        day: '1',
        month: '10'
    }, 
    {

    }
]
const Timeline = (props)=>{
    // const [selected, setSelected] = useState({})
    
    const [selected, setSelected] = useState(false)
    const select = (index, time)=>{
        props.days.map((index1, i)=>{
            if(index1.year === index.year && index1.month===index.month && index1.number===index.number && index1.week===index.week){
    
                index1.selected = true
                props.setTime(time)
                setSelected((prev)=>!prev)
            }else{
                index1.selected = false
                props.setTime(time)
            }
        })
    }
    return (
        <div>
                {Times.map((index, i)=>{
                        return (
                            <div key={`${i}a`}>
                                
                            <div className="days">
                            <div  className="day" style={{backgroundColor: 'bisque'}} key={i}>
                            {/* <span>{index.date}</span> */}
                            {index}
                            </div>
                            {props.days.map((index1, i)=>{
                                if(i<props.weekno*7 && i>=(props.weekno-1)*7){
                                    if(i===(props.weekno*7-1)){
                                        return (
                                            <div className={ index1.selected && props.time===index ?`selected boxb`: `boxb`} style={
                                                index1.currentMonth?{backgroundColor: 'azure'}:{backgroundColor: 'aliceblue', opacity: '0.5', cursor: 'default'} } onClick={()=>{
                                                if(index1.currentMonth){
                                                    select(index1, index)
                                                }
                                            }}  key={`${i}b`}>
                                            {/* <span>{index.date}</span> */}
                                            
                                            { index1.task?
                                            Object.keys(index1.task).map(key => {
                                                if(key==index){
                                                    return (
                                                        <span>{index1.task[key]}</span>
                                                    )
                                                }
                                            }):''}
                                            </div> 
                                        )
                                    }else{
                                        return (
                                            <div   className={ index1.selected && props.time===index ?`selected`: `box`} style={
                                                index1.currentMonth?{backgroundColor: 'azure'}:{backgroundColor: 'aliceblue', opacity: '0.5', cursor: 'default'} } onClick={()=>{
                                                if(index1.currentMonth){
                                                    select(index1, index)
                                                }
                                            }}  key={`${i}b`}>
                                            {/* <span>{index.date}</span> */}
                                            
                                            { index1.task?
                                            Object.keys(index1.task).map(key => {
                                                if(key==index){
                                                    return (
                                                        <span>{index1.task[key]}</span>
                                                    )
                                                }
                                            }):''}
                                            </div> 
                                        )
                                    }
                                    
                                }
                                
                            })}
                        
                            </div>
                            {index==='1:30'?<></>:<hr className="hr" />}
                            </div>
                        )
                        
                })}
            </div>
    )
}
export default Timeline