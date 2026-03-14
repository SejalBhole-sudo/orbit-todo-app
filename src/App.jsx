import { useState } from "react";

function App() {

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  function addTask() {

    if (task.trim() === "") return;

    setTodos([
      ...todos,
      {
        text: task,
        completed: false
      }
    ]);

    setTask("");
  }

  function deleteTask(index){
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setTodos(updatedTodos);
  }

  function toggleTask(index){
    const updatedTodos = todos.map((todo, i) => {
      if(i === index){
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  return(
    <div>
      <h1>Orbit To-do App</h1>
      <p>Organize your day with Orbit</p>

      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
      />

      <button onClick={addTask}>Add task</button>

      <h2>Complete all your tasks today</h2>

      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            onClick={() => toggleTask(index)}
          >

            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
            >
              {todo.text}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(index);
              }}
            >
              Delete
            </button>

          </li>
        ))}
      </ul>

    </div>
  )
}

export default App;