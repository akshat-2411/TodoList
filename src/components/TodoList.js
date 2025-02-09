import React, { useState } from 'react';

function TodoList(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(props.item.text);

    const handleEdit = () => {
        if (isEditing) {
            props.editTask(props.index, editText);
        }
        setIsEditing(!isEditing);
    };

    return (
        <li className={`list-item ${props.item.completed ? 'completed' : ''}`}>
            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />
            ) : (
                <span onClick={() => props.toggleComplete(props.index)}>
                    {props.item.text} - Due: {props.item.dueDate} - Priority: {props.item.priority}
                </span>
            )}
            <span className="icons">
                <i
                    className={`fa-solid fa-check icon-complete ${props.item.completed ? 'completed' : ''}`}
                    onClick={() => props.toggleComplete(props.index)}
                ></i>
                <i className="fa-solid fa-edit icon-edit" onClick={handleEdit}></i>
                <i className="fa-solid fa-trash-can icon-delete" onClick={() => props.deleteItem(props.index)}></i>
            </span>
        </li>
    );
}

export default TodoList;
