import TaskItem from "./TaskItem";

function TaskList({ todos, toggleTask, deleteTask }) {

  return (
    <ul className="todo-list">

      {todos.map((todo) => (
        <TaskItem
          key={todo.id}
          todo={todo}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}

    </ul>
  );
}

export default TaskList;