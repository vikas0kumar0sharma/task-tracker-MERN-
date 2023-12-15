import Header from "./components/Header";
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import { About } from "./components/About";
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  const [tasks, setTask] = useState([])

  const [addToggle, setAddToggle] = useState(false)

  const deleteTask = async(id) => {
    const idObj={
      id:id
    }

    await fetch('http://localhost:8080/deleteTask',{
      method:'POST',
      body: JSON.stringify(idObj),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    updateTasks()
  }

  const toggleReminder = (id) => {
    setTask(tasks.map((task) => task._id === id ? { ...task, reminder: !task.reminder } : task))
  }

  const addTask = async(taskData) => {

    await fetch('http://localhost:8080/createTask',{
      method:'POST',
      body: JSON.stringify(taskData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    updateTasks()
  }

  const updateTasks=async()=>{
    const responseGet=await fetch('http://localhost:8080/allTasks',{
      method:'GET',
    })

    const data=await responseGet.json()
    setTask(data)
  }

  useEffect(()=>{
    updateTasks()
  },[])

  const toggleAdd = () => {
    setAddToggle(!addToggle)
  }

  return (
    <Router>
      <div className="container">
        <Header title='Task Tracker' onToggleAdd={toggleAdd} showTask={addToggle} />

        <Routes>
          <Route path='/' exact Component={(props) => (
            <>
              {addToggle && <AddTask onAddTask={addTask} />}
              {tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                : 'No tasks to show'
              } 
            </>
          )} />
        </Routes>

        <Routes>
          <Route path='/about' Component={About} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
