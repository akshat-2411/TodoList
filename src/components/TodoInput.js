import React, { useState } from "react";

function TodoInput(props) {
    const [inputText, setInputText] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('low'); // New Priority Feature

    const handleAddTask = () => {
        if (inputText && dueDate) {
            props.addList({ text: inputText, dueDate, completed: false, priority });
            setInputText('');
            setDueDate('');
            setPriority('low');
        }
    };

    return (
        <div className="input-container">
            <input
                type="text"
                className="input-box-todo"
                placeholder="Enter your todo"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button className="add-btn" onClick={handleAddTask}>+</button>
        </div>
    );
}

export default TodoInput;
