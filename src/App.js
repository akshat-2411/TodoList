import React, { useState, useEffect } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [listTodo, setListTodo] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) setListTodo(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(listTodo));
  }, [listTodo]);

  const addList = (task) => {
    if (task.text !== '' && task.dueDate) {
      setListTodo([...listTodo, task]);
    }
  };

  const deleteListItem = (key) => {
    const newListTodo = listTodo.filter((_, index) => index !== key);
    setListTodo(newListTodo);
  };

  const toggleComplete = (key) => {
    const updatedList = listTodo.map((item, index) =>
      index === key ? { ...item, completed: !item.completed } : item
    );
    setListTodo(updatedList);
  };

  const editTask = (key, updatedText) => {
    const updatedList = listTodo.map((item, index) =>
      index === key ? { ...item, text: updatedText } : item
    );
    setListTodo(updatedList);
  };

  // Reminder Feature: Check for tasks due today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    listTodo.forEach(task => {
      if (task.dueDate === today && !task.completed) {
        alert(`Reminder: Task "${task.text}" is due today!`);
      }
    });
  }, [listTodo]);

  const filteredList = listTodo.filter(item => {
    const matchesSearch = item.text.toLowerCase().includes(searchText.toLowerCase());
    if (filter === 'completed') return item.completed && matchesSearch;
    if (filter === 'pending') return !item.completed && matchesSearch;
    return matchesSearch;
  });

  return (
    <div className={`main-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="center-container">
        <TodoInput addList={addList} />
        <h1 className="app-heading">TODO</h1>
        <hr />
        <button
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="filter-buttons">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
          <button onClick={() => setFilter('pending')}>Pending</button>
        </div>
        <ul>
          {filteredList.map((listItem, i) => (
            <TodoList
              key={i}
              index={i}
              item={listItem}
              deleteItem={deleteListItem}
              toggleComplete={toggleComplete}
              editTask={editTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
