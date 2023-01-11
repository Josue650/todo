export default function TodoList ({newTodo, createTodo, setNewTodo}){
    return (
        <>
             Add New Todo:<input type='text'
        value={newTodo.title}
        onChange={(e) => {
            setNewTodo({...newTodo, title: e.target.value})
        }}
        onKeyDown={(e) => {
        e.key === 'Enter' && createTodo()
        }}
        />
        </>

    )
}
