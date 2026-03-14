function TaskItem({ todo, toggleTask, deleteTask }) {

  return (
    <li className={`todo-item ${todo.completed ? "completed-task" : ""}`}>

      <span
        className={`circle ${todo.completed ? "completed-circle" : ""}`}
        onClick={() => toggleTask(todo.id)}
      >
        {todo.completed ? "✓" : ""}
      </span>

      <span className="task-text">{todo.text}</span>

      <button
        className="delete-btn"
        onClick={() => deleteTask(todo.id)}
      >
        ✕
      </button>

    </li>
  );
}

export default TaskItem;