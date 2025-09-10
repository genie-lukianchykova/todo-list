import { useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import { ITask } from "./interfaces";
import TodoTask from "./components/TodoTask";
import Modal from "./components/Modal";

const App = () => {
  const [formState, setFormState] = useState({
    task: "",
    date: ""
  });
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodoList(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const addTask = () => {
    if (!formState.task.trim() || !formState.date) return;
    const newTask: ITask = {
      id: crypto.randomUUID(),
      taskName: formState.task,
      date: formState.date,
    };
    setTodoList([...todoList, newTask]);
    setFormState({
      task: "",
      date: ""
    });
  };

  const completeTask = (id: string) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Your Task"
            name="task"
            value={formState.task}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={formState.date}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="todoList">
        {todoList.map((task) => (
          <TodoTask key={task.id} task={task} completeTask={completeTask} />
        ))}
      </div>

      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Добавить задачу</h2>
        <p>Здесь можно разместить форму или что угодно.</p>
      </Modal>
    </div>
  );
};

export default App;