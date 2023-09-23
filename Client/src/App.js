import './App.css';
import {Fragment} from "react";

//components

import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';

function App() {
  return <Fragment>
    <div className='container'>
      <InputTodo></InputTodo>
    </div>
    <div className='list-container'>
      <ListTodos></ListTodos>
    </div>
  </Fragment>;
}

export default App;
