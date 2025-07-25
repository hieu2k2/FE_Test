import React, { useState } from 'react';
import './TodoList.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type TodoItem = {
    id: number;
    text: string;
    isEditing: boolean;
    error?: string;
};

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [newError, setNewError] = useState<string | null>(null);
    const [editTexts, setEditTexts] = useState<{ [id: number]: string }>({});

    const handleAdd = () => {
        if (newTodo.trim() === '') {
            setNewError('Nội dung không được để trống');
            return;
            toast.success("Đã thêm việc cần làm!");
        }

        const newItem: TodoItem = {
            id: Date.now(),
            text: newTodo.trim(),
            isEditing: false,
        };

        setTodos([...todos, newItem]);
        setNewTodo('');
        setNewError(null);
    };

    const handleDelete = (id: number) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa công việc này?");
        if (confirmed) {
            setTodos(todos.filter(todo => todo.id !== id));
            toast.success("Đã xóa công việc!");
        }
    };

    const handleEdit = (id: number) => {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            setEditTexts({ ...editTexts, [id]: todo.text });
            setTodos(todos.map(t =>
                t.id === id ? { ...t, isEditing: true, error: undefined } : t
            ));
        }
    };

    const handleSave = (id: number, newText: string) => {
        if (newText.trim() === '') {
            toast.warning('Nội dung không được để trống!');
            return;
        }

        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: newText.trim(), isEditing: false } : todo
        ));
        toast.success('Cập nhật công việc thành công!');
    };

    return (
        <div className="todo-container">
            <h2>Danh sách việc cần làm</h2>
            <div className="todo-input">
                <input
                    type="text"
                    placeholder="Nhập việc cần làm..."
                    value={newTodo}
                    onChange={(e) => {
                        setNewTodo(e.target.value);
                        if (e.target.value.trim() !== '') {
                            setNewError(null);
                        }
                    }}
                />
                <button onClick={handleAdd}>Thêm</button>
            </div>
            {newError && <div className="error-message">{newError}</div>}

            <ul className="todo-list">
                {todos.map((todo, index) => (
                    <li key={todo.id} className="todo-item">
                        <span className="todo-index">{index + 1}.</span>
                        {todo.isEditing ? (
                            <>
                                <input
                                    value={editTexts[todo.id] ?? ''}
                                    onChange={(e) =>
                                        setEditTexts({ ...editTexts, [todo.id]: e.target.value })
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSave(todo.id, editTexts[todo.id]);
                                        }
                                    }}

                                />
                                <button
                                    className="save-button"
                                    onClick={() => handleSave(todo.id, editTexts[todo.id])}
                                >
                                    Lưu
                                </button>
                                {todo.error && <div className="error-message">{todo.error}</div>}
                            </>
                        ) : (
                            <>
                                <span>{todo.text}</span>
                                <button className="edit-btn" onClick={() => handleEdit(todo.id)}>Sửa</button>
                                <button className="delete-btn" onClick={() => handleDelete(todo.id)}>Xóa</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
