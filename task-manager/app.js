const express = require('express');
const taskData=require('./task.json')
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

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;