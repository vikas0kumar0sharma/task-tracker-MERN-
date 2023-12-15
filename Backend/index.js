const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const bodyParser=require('body-parser')

const app=express()

// middleware  (cors,body-parser)
app.use(cors())
app.use(bodyParser.json())

// backend stuff
main().catch(err => console.log(err));

// connecting
async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/tasks')
  console.log('DB connected')
}

// creating schema
const TaskSchema=new mongoose.Schema({
  text:String,
  day:String,
  reminder:Boolean
})

// creating model
const Task=mongoose.model('Task',TaskSchema)


// api's

app.post('/createTask',async(req,res)=>{
   const data=await req.body
   
   await Task.create({
    text:data.text,
    day:data.day,
    reminder:data.reminder
   })
   res.json(data)
})

app.post('/deleteTask',async(req,res)=>{ 
  const idData=await req.body
  const data=await Task.deleteOne({_id:idData.id})
  
  const allTasks=await Task.find({})
  res.json(allTasks)
})

app.get('/allTasks',async(req,res)=>{
  const allTasks=await Task.find({})
  res.json(allTasks)
})


app.listen(8080,()=>console.log('server running on port 8080'))