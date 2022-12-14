import { useEffect, useState } from "react"
import { Times } from "./Timeline"

const Input = (props)=>{
    const [input, setInput] = useState('')
    const [selected, setSelected] = useState(false)
    useEffect(()=>{
        props.days.map((index, i)=>{
            if(index.selected ){
                setSelected(true)
                 
            }
        })
        console.log(selected)
    })
    const setTask = ()=>{
        props.days.map((index, i)=>{
            if(index.selected ){
                index.task[props.time] = input
                 
            }
        })
        props.setDays((prev)=>[...prev]) 
    }
    if(selected){
        return(
            <div className="inputArea">
                <div>
                    <div>Add event</div>
                    <input type="text" style={{border: 'none', borderBottom: '2px solid #00367d'}} placeholder="Add your event..." onChange={(e)=>{setInput(e.target.value)}} />
                </div>
                <div className="dropdown">
                    {/* <button className="dropbtn" style={{marginInline: '10px', marginBottom: '1px'}}>{props.time}</button> */}
                    
                    </div>
                    <button onClick={setTask} style={{backgroundColor: '#00367d', border: '2px solid #00367d', color: '#fff', borderRadius: '10px', cursor: 'pointer'}}>Add</button>
            </div>
        )
    }else{
        return(
            <div className="inputArea" style={{color: '#00367d'}}>
                Click on any box to add event
            </div>
        )
    }
}
export default Input