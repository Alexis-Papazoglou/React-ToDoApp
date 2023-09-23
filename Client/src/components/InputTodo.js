import React, { Fragment ,useState } from "react"

const inputTodo = () => {

    const [description , setDescription] = useState("")

    const onsubmitform = async(e) => {
        e.preventDefault()
        try {
            const body = {description}
            const response = await fetch("http://localhost:5000/todos" , {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });
            window.location = '/'
        } catch (error) {
            console.error(error.message)
        }
    }

    return(
        <Fragment>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onsubmitform}>
                <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}></input>
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default inputTodo;