import { useState, useEffect } from "react";

function App() {

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Load tasks from localStorage when app starts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("orbitTodos")) || [];
    const today = new Date().toDateString();

    // remove completed tasks from previous days
    const filteredTodos = storedTodos.filter(todo =>
      !todo.completed || todo.completedDate === today
    );

    setTodos(filteredTodos);
  }, []);

  // Save tasks whenever todos change
  useEffect(() => {
    localStorage.setItem("orbitTodos", JSON.stringify(todos));
  }, [todos]);

  function addTask() {

    if (task.trim() === "") return;

    setTodos([
      ...todos,
      {
        text: task,
        completed: false,
        completedDate: null
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
          completed: !todo.completed,
          completedDate: todo.completed ? null : new Date().toDateString()
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  // Remaining tasks counter
  const remainingTasks = todos.filter(todo => !todo.completed).length;

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

      <p>{remainingTasks} tasks remaining</p>

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