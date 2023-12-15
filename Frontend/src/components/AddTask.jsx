import { useState } from "react"

const AddTask = ({onAddTask}) => {
  
  const [text,setText]=useState('')
  const [day,setDay]=useState('')
  const [reminder,setReminder]=useState(false)

  const sendData=(e)=>{
    e.preventDefault()

    if(!text){
      alert('Please add text')
      return
    }

    const data={
      text: text,
      day:day,
      reminder:reminder
    }
    onAddTask(data)

    setText('')
    setDay('')
    setReminder('')
  }

  return (
    <form className='add-form'>

      <div className="form-control">
        <label>Task</label>
        <input type="text" placeholder='Add task' onChange={(e)=>setText(e.target.value)} value={text} />
      </div>

      <div className="form-control">
        <label>Day and Time</label>
        <input type="text" placeholder='Add Day and Time' onChange={(e)=>setDay(e.target.value)} value={day} />
      </div>

      <div className="form-control form-control-check">
        <label>Set reminder</label>
        <input type='checkbox' onChange={(e)=>setReminder(e.currentTarget.checked)} checked={reminder} value={reminder} />
      </div>

      <input type="submit" value='Save Task' className='btn btn-block' onClick={sendData} />
    </form>
  )
}

export default AddTask