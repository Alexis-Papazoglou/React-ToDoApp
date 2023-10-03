import react, {Fragment , useEffect , useState} from 'react'

import EditTodo from './EditTodos';

const ListTodos = () => {

    const [todos , setTodos] = useState([])
    const [isDone , setIsDone] = useState(false)

    const markDone = (id) => {
        
        try {
            fetch(`http://localhost:5000/todos/d/${id}`, {
                method: 'PUT',
            }).then((response)=> console.log(response));

            console.log(todos)
            
            const update = todos.map(existingTodo => {
                if(existingTodo.todo_id === id){
                    (existingTodo.done) = true
                }
            })
            setTodos((currentTodos) => {
                return [...currentTodos]
            })
            
        } catch (error) {
            console.error(error)
        }

        console.log(id)
    }

    const markUndone = (id) => {
        
        try {
            fetch(`http://localhost:5000/todos/ud/${id}`, {
                method: 'PUT',
            }).then((response)=> console.log(response));

            console.log(todos)
            
            const update = todos.map(existingTodo => {
                if(existingTodo.todo_id === id){
                    (existingTodo.done) = false
                }
            })
            setTodos((currentTodos) => {
                return [...currentTodos]
            })
            
        } catch (error) {
            console.error(error)
        }

        console.log(id)
    }


    //delete function
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}` , {method : "DELETE"})
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.error(error.message)
        }
    }

    const getTodos = async () => {
        try {

            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json()

            setTodos(jsonData);            
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    return <Fragment>
        <table class="table mt-5">
            <thead className="text-center">
                <tr>
                <th scope="col">Description</th>
                <th scope="col"></th>
                <th scope="col"></th>
                </tr>
            </thead>

            <tbody className="text-center">
                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.todo_id}</td>
                        <td>{todo.description}</td>
                        <td>{todo.done ? <p>Done</p> : <p>Not done</p>}</td>
                        <td><EditTodo todo = {todo}></EditTodo></td>
                        <td><button className='btn btn-primary' onClick={()=>markDone(todo.todo_id)}>Done</button></td>
                        <td><button className='btn btn-primary' onClick={()=>markUndone(todo.todo_id)}>Undone</button></td>
                        <td><button className='btn btn-danger' onClick={()=>deleteTodo(todo.todo_id)}>Delete</button></td>                        
                    </tr>
                ))}
            </tbody>
        </table>
    </Fragment>
};

export default ListTodos