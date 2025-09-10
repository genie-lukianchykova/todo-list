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
        TODO List
      </div>

      <div className="contentContainer">
        <span>Tasks</span>
        <button className="modalButton" onClick={() => setIsModalOpen(true)}>Add Task</button>
      </div>
      
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="modalHeader">New Task</h2>
        <div>
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
          <button className="addTask" onClick={addTask}>Add Task</button>
        </div>
      </Modal>

      <div className="todoList">
        {todoList.map((task) => (
          <TodoTask key={task.id} task={task} completeTask={completeTask} />
        ))}
      </div>

      
    </div>
  );
};

export default App;