const express = require('express');
const taskData=require('./task.json');
const validator=require('./validator');
const fs=require('fs');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/tasks",(req, res)=>{
  return res.status(200).send(taskData);
});

app.get("/tasks/:id",(req, res)=>{
    const tasks=taskData.tasks;
    let filteredTask=tasks.filter(task => task.id==req.params.id);
    
    if(filteredTask.length==0){
        return res.status(404).send("Not found");
    }
    return res.status(200).send(filteredTask);
  });

  app.post('/tasks',(req, res)=>{
    const taskDetail=req.body;
    let val=validator.validateTaskInfo(taskDetail);
    const modifyTask=taskData.tasks;
    if(val.status==true){
      modifyTask.push(taskDetail);
      fs.writeFile('./task-manager/task.json',JSON.stringify(modifyTask),{encoding:'utf8',flag:'w'},(err,data)=>{
        if(err){
            return res.status(500).send("something went wrong");
        }
        else{
            return res.status(200).send("data is added");
        }
      })

    }

  })

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;