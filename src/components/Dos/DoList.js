import Todo from "../pages/TodosPage/Todo"

export default function DoList({
  todos,
  addTodo,
  completeTodo,
  editTodoText,
  deleteTodo
}) {
  return (
    <>
      <h1 className="main-header">My To do List :</h1>
      <input
        type="text"
        onKeyDown={(e) => {
          e.key === "Enter" && addTodo(e)
        }}
      />
      {todos.length ? (
        <>
          <h1>Todo Items</h1>
          <ul className="todolist-items">
            {todos
              .filter((i) => !i.completed)
              .map((todo) => {
                return (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    completeTodo={completeTodo}
                    editTodoText={editTodoText}
                    deleteTodo={deleteTodo}
                  />
                )
              })}
          </ul>
          <h1>Completed Items </h1>
          <ul className="complete-todolist">
            {todos
              .filter((i) => i.completed)
              .map((todo) => {
                return (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    completeTodo={completeTodo}
                    editTodoText={editTodoText}
                    deleteTodo={deleteTodo}
                  />
                )
              })}
          </ul>
        </>
      ) : (
        <h1>No Todos Added Yet</h1>
      )}
    </>
  )
}
