import { useState,useRef,useEffect } from 'react';
import './CSS/Todo.css'
import TodoItems from './TodoItems';
let count = 0;
export const Todo = () => {
    const[todos, setTodos] = useState([]);
    const inputRef = useRef(null);

    const add = () => {
        setTodos([...todos, {no:count++,text:inputRef.current.value,display:""}]);
        inputRef.current.value = "";
        localStorage.setItem("todos_count", count)
    }

    //This one runs first on page load
    useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem("todos")));
        count = localStorage.getItem("todos_count");
    },[])

    //Delay 1 second before executing when todos value changes
    useEffect(() => {
        setTimeout(() => {
            console.log(todos);
            localStorage.setItem("todos",JSON.stringify(todos));
        }, 100);
    },[todos])
  return (
    <div className='todo'>
        <div className="todo-header">To-Do List</div>
        <div className="todo-add">
            <input ref={inputRef} type="text" placeholder='Add Your Task' className="todo-input" />
            <div onClick={add} className="todo-add-btn">ADD</div>
        </div>
        <div className="todo-list">
            {todos.map((item,index) => {
                return <TodoItems key={index} setTodos = {setTodos} no={item.no} display={item.display} text={item.text} />
            })}
        </div>
    </div>
  )
}

export default Todo
