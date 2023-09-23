const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

//middleware
app.use(cors())
app.use(express.json())

//                                     --------       ROUTES        --------

//create a todo
app.post("/todos", async(req,res) => {
    try {
       const {description} = (req.body)
       const newTodo = await pool.query("INSERT INTO todolist (description) VALUES($1) RETURNING *" , [description])
       res.json(newTodo.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//getalltodos
app.get("/todos",async(req,res)=>{
    try {
        const allTodos = await pool.query("SELECT * FROM todolist")
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//getatodo
app.get("/todos/:id",async(req,res)=>{
    try {
        const { id } = req.params
        const todo = await pool.query("SELECT * FROM todolist WHERE todo_id = ($1)",[id])

        res.json(todo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

//updateatodo
app.put("/todos/:id",async(req,res)=>{
    try {
        const { id } = req.params
        const {description} = (req.body)
        const updateTodo = await pool.query("UPDATE todolist SET description = $1 WHERE todo_id = $2",[description,id])
        res.json(updateTodo.rows[0])
        console.log("Updated!")
    } catch (error) {
        console.error(error.message)
    }
})

//deletetodo
app.delete("/todos/:id",async(req,res)=>{
    try {
        const { id } = req.params
        const updateTodo = await pool.query("DELETE FROM todolist WHERE todo_id = ($1)",[id])
        res.json(updateTodo.rows[0])
        console.log("Deleted!")
    } catch (error) {
        console.error(error.message)
    }
})


//APP SETUP

app.listen(5000, ()=> {
    console.log("server started on port 5000")
});

