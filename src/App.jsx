import { useState } from "react";

function App() {

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  function addTask() {

    if (task.trim() === "") return;

    setTodos([...todos, task]);
    setTask("");
  }

  function deleteTask(index){
    const updatedTodos = todos.filter((todo, i) => i !== index);
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
      />

      <button onClick={addTask}>Add task</button>

      <h2>Complete all your tasks today</h2>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;