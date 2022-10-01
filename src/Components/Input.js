import { useState } from "react"
import { Times } from "./Timeline"

const Input = (props)=>{
    const [input, setInput] = useState('')
    const [time, setTime] = useState('9:30')
    const setTask = ()=>{
        props.days.map((index, i)=>{
            if(index.selected){
                index.time = time
                index.task = input
                props.setDays((prev)=>[...prev])   
            }
        })
    }
    console.log(input)
    console.log(time)
    return(
        <div>
            <div>
                <div>Add event</div>
                <input type="text" onChange={(e)=>{setInput(e.target.value)}} />
            </div>
            <div class="dropdown">
                <button class="dropbtn" style={{marginInline: '10px', marginBottom: '1px'}}>{props.time}</button>
                
                </div>
                <button onClick={setTask}>Add</button>
        </div>
    )
}
export default Input