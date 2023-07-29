import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';


const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    setTodoList([...todoList, newTodo]);
  };

  const handleToggleTodo = (id) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(updatedTodoList);
  };

  const handleEditTodo = (id, t) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, text: t } : todo
    );
    setTodoList(updatedTodoList);
  };
  const handleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      handleAddTodo(inputValue);
      setInputValue('');
    }
  };
  // useEffect(()=>{
  //   console.log(todoList);
  // },[todoList])
  return (
    <>
      <Navbar />
      <div className="App">
        <h1>TODO List</h1>
        <div class="container">
          <div class="block">
            <h1>task</h1>
            <input class="inp" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Enter a new task...' />
            <button class="add" onClick={handleSubmit}>Add</button>
          </div>
        </div>
      </div>
      <div>
        <div class="listContainer">
          {todoList.map((todo, index) => (
            <>
              <div class="listBlock">
                <h1>task {index + 1}</h1>
                <input class="edit" type="text" name="edit" placeholder="Edit task" onChange={(e) => handleEditTodo(todo.id, e.target.value)} />
                <p class = "txt">{todo.text}</p>
                <span>
                  <input type="checkbox" name="completed" onChange={() => handleToggleTodo(todo.id)} />
                  <label class = "txt" for="completed">Completed</label>
                </span>
                <button class="delete" onClick={() => handleDeleteTodo(todo.id)}>delete</button>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

// const TodoForm = ({ onAddTodo }) => {


//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Enter a new task..."
//       />
//       <button type="submit">Add</button>
//     </form>
//   );
// };

const TodoItem = ({ todo, onToggleTodo, onDeleteTodo }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo.id)}
      />
      <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
      <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
    </div>
  );
};

const TodoList = ({ todoList, onToggleTodo, onDeleteTodo }) => {
  return (
    <div className="todo-list">
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
};

export default App;
