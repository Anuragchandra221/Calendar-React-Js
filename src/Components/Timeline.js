import { useState } from "react"

export const Times = ['9:30','10:30','11:30', '12:30', '1:30']


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
                console.log(index1.week, index.week)
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
        <div className="">
            
            {Times.map((index, i)=>{
                    return (
                        <div key={`${i}a`}>
                        <div className="days">
                        <div  className="day"  key={i}>
                        {/* <span>{index.date}</span> */}
                        {index}
                        </div>
                        {props.days.map((index1, i)=>{
                            if(i<props.weekno*7 && i>=(props.weekno-1)*7){
                                return (
                                    <div   className={ index1.selected && props.time===index?`selected box`: `box`}  onClick={()=>{
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
                            
                        })}
                    
                        </div>
                        <hr/>
                        </div>
                    )
                    
            })}

            </div>
    )
}
export default Timeline