import { useEffect, useState } from "react"
import { deleteTask, postData } from "../services"
import { Times } from "./Timeline"

const Input = (props)=>{
    const [input, setInput] = useState('')
    const [selected, setSelected] = useState(false)
    const [err, setErr] = useState()
    const [data, setData] = useState()
    useEffect(()=>{
        props.days.map((index, i)=>{
            if(index.selected ){
                setSelected(true)
                setData(index)
                if(index.task){
                    if(index.task[props.time]){
                        setInput(index.task[props.time])
                    }else{
                        setInput('')
                    }
                }else{
                    setInput()
                }
            }
        })
    })
    const setTask = ()=>{
        props.days.map((index, i)=>{
            if(index.selected ){
                index.task[props.time] = input
                
                postData(input,index.year,index.month,index.number,props.time).then((results)=>{
                    // console.log(results.data)
                })
                 
            }
        })
        // console.log(props.days)
        props.setDays((prev)=>[...prev]) 
    }
    if(selected){
        return(
            <div className="inputArea">
                <div>
                    <div>Add event</div>
                    <input type="text" id="addInput" style={{border: 'none', borderBottom: '2px solid #00367d'}} placeholder="Add your event..." onChange={(e)=>{
                        if(input){
                            setErr("Already task is there..")
                        }else{
                            setInput(e.target.value)
                        }
                        console.log(input)
                    }} value={input} />
                </div>
                <div className="dropdown">
                    {/* <button className="dropbtn" style={{marginInline: '10px', marginBottom: '1px'}}>{props.time}</button> */}
                    
                    </div>
                    <p className="invalid" >{err?err:''}</p>
                    <button className="addTask" onClick={setTask} style={{backgroundColor: '#00367d', border: '2px solid #00367d',height:'30px' , color: '#fff', borderRadius: '10px', cursor: 'pointer'}}>Add</button>
                    <button className="addTask mt-3 btn-danger" onClick={()=>{
                        console.log(data, props.time)
                        deleteTask(data.task[props.time],data.year,data.month,data.number,props.time).then((results)=>{
                            console.log(results.data)
                           }).catch((err)=>{
                            console.log(err)
                           })
                        props.days.map((index, i)=>{
                            if(index.selected ){
                                if(index.task){
                                    if(index.task[props.time]){
                                        delete index.task[props.time]
                                    }else{
                                        setInput('')
                                    }
                                }else{
                                    setInput('')
                                }
                            }
                        })
                        setInput('')
                       deleteTask(data.task[props.time],data.year,data.month,data.number,props.time).then((results)=>{
                        console.log(results.data)
                       }).catch((err)=>{
                        console.log(err)
                       })
                        setErr()
                    }} style={{backgroundColor: '#00367d', border: '2px solid #00367d',height:'30px' , color: '#fff', borderRadius: '10px', cursor: 'pointer'}}>Delete Task</button>
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