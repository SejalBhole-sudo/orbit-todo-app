import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";

function App() {

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Load tasks from localStorage when app starts
  useEffect(() => {

    const storedTodos = JSON.parse(localStorage.getItem("orbitTodos")) || [];
    const today = new Date().toDateString();

    const filteredTodos = storedTodos.filter(
      (todo) => !todo.completed || todo.completedDate === today
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
        id: Date.now(),
        text: task,
        completed: false,
        completedDate: null
      }
    ]);

    setTask("");

  }


  function deleteTask(id) {

    setTodos(
      todos.filter((todo) => todo.id !== id)
    );

  }


  function toggleTask(id) {

    const updatedTodos = todos.map((todo) => {

      if (todo.id === id) {

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


  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const remainingTasks = activeTodos.length;


  return (

    <div className="app-container">

      <h1>Orbit To-Do</h1>
      <p>Organize your day with Orbit</p>


      <div className="input-container">

        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        />

        <button onClick={addTask}>Add</button>

      </div>


      <p className="task-counter">
        {remainingTasks} tasks remaining
      </p>


      <h3>Tasks</h3>

      {activeTodos.length === 0 ? (

    <div className="empty-state">
    No tasks yet
    <p>Add your first task above</p>
  </div>

) : (

  <TaskList
    todos={activeTodos}
    toggleTask={toggleTask}
    deleteTask={deleteTask}
  />

)}


      {completedTodos.length > 0 && (

        <>
          <h3 className="completed-title">Completed</h3>

          <TaskList
            todos={completedTodos}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        </>

      )}

    </div>

  );
}

export default App;