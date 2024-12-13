import { useEffect, useState } from "react";
import NewTodo from "./NewTodo";
import Todos from "./Todos"
import style from './home.module.css'
import { v4 as uuidv4 } from 'uuid'; 

export default function Home() {

  const [todos,setTodos] = useState(()=>{
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const handleAddTodo = (todo) => {
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(),...todo }];
    });
  };
  const handleRemoveTodo = (id) => {
    setTodos((prevTodos) => {
      const filteredTodos = prevTodos.filter((todo) => todo.id !== id);
      return filteredTodos;
    });
  };

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos]);

  return (
    <div className={style.container}>
      <h1 style={{color:"white"}}>Todo App</h1>
      <NewTodo onAddTodo={handleAddTodo}/>
      <Todos todos={todos} onRemoveTodo={handleRemoveTodo}/>
    </div>
  )
}
