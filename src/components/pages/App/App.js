import { useState, useEffect } from "react"
import TodosPage from "../TodosPage/TodoList"

export default function App() {
    const [todos, setTodos] = useState([])
    const [completeTodo, setCompleteTodo] = useState([])
    const [newTodo, setNewTodo] = useState({
        title: '',
        complete: false
    })

    // createTodo
    const createTodo = async () => {
      const body = {...newTodo}
      try {
          const response = await fetch(`/api/todos`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
          })
          const createdTodo = await response.json()
          const todosCopy = [createdTodo,...todos]
          setTodos(todosCopy)
          setNewTodo({
            title: '',
            complete: false
          })
      } catch (error) {
            console.error(error)
      }
    }

    // deleteTodo
    const deleteTodo = async (id) => {
        try{
          const index = completeTodo.findIndex((todo) => todo._id === id)
          const completedTodoCopy = [...completeTodo]
          const response = await fetch(`/api/todos/${id}`, {
              method: 'Delete',
              headers: {
                  'Content-type': 'application/json'
              },
          })
          await response.json()
          completedTodoCopy.splice(index, 1)
          setCompleteTodo(completedTodoCopy)
        } catch(error){
            console.error(error)
        }
    }
    // moveToCompleted
    const moveToCompleted = async (id) => {
        try{
            const index = todos.findIndex((todo) => todo._id ===id)
            const todosCopy = [...todos]
            const subject = todosCopy[index]
            subject.complete = true
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(subject)
            })
            const updatedTodo = await response.json()
            const completedTDsCopy = [updatedTodo, ...completeTodo]
            setCompleteTodo(completedTDsCopy)
            todosCopy.splice(index, 1)
            setTodos(todosCopy)
          } catch(error){
              console.error(error)
        }
    }

    // getTodos
    const getTodos = async () => {
        try{
            const response = await fetch('/api/todos')
            const foundTodos = await response.json()
            setTodos(foundTodos.reverse())
            const responseTwo = await fetch('/api/todos/completed')
            const foundCompleteTodos = await responseTwo.json()
            setCompleteTodo(foundCompleteTodos.reverse())
        } catch(error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getTodos()
    }, [])


  return (<>
      <TodosPage
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        createTodo={createTodo}
      />
    <h3>Todos</h3>
    {todos.map(todo => {
        return (
            <div key={todo._id}> {todo.title}
                <button onClick={() => moveToCompleted(todo._id)}>Complete</button>
            </div>
        )})
    }
    <h3>Complete Todos</h3>
    {completeTodo.map(todo => {
        return (
            <div key={todo._id}> {todo.title}
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
        )})
    }
   </>)
}
