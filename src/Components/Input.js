import { useState } from "react"
import { Times } from "./Timeline"

const Input = (props)=>{
    const [input, setInput] = useState('')
    const setTask = ()=>{
        props.days.map((index, i)=>{
            if(index.selected ){
                index.task[props.time] = input
                 
            }
        })
        props.setDays((prev)=>[...prev]) 
    }
    return(
        <div>
            <div>
                <div>Add event</div>
                <input type="text" onChange={(e)=>{setInput(e.target.value)}} />
            </div>
            <div className="dropdown">
                <button className="dropbtn" style={{marginInline: '10px', marginBottom: '1px'}}>{props.time}</button>
                
                </div>
                <button onClick={setTask}>Add</button>
        </div>
    )
}
export default Input