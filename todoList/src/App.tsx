// App.tsx
import React, { useEffect, useState } from 'react';
import TodoForm from './component/todoform/todoForm';
import TodoList from './component/todolist/TodoList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
interface Todo {
  id: number | null;
  text: string;
  completed: boolean;
}
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const reassignIds = (items: Todo[]) => {
    const active = items.filter(t => !t.completed);
    const completed = items.filter(t => t.completed);
    let id = 1;
    const activeWithIds = active.map(todo => ({ ...todo, id: id++ }));
    const completedWithNullId = completed.map(todo => ({ ...todo, id: null }));
    return [...activeWithIds, ...completedWithNullId];
  };

  const isDuplicateText = (text: string, excludeId: number | null = null) => {
    return todos.some(
      todo => todo.text.trim().toLowerCase() === text.trim().toLowerCase() && todo.id !== excludeId
    );
  };

  const handleAddOrUpdate = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return toast.error('📢 Không được để trống!');

    if (editingId === null) {
      if (isDuplicateText(trimmed)) {
        return toast.error('📢 Nội dung bị trùng!');
      }
      const newTodo: Todo = {
        id: null,
        text: trimmed,
        completed: false
      };
      setTodos(prev => reassignIds([...prev, newTodo]));
      toast.success('✅ Thêm thành công');
    } else {
      const original = todos.find(t => t.id === editingId);
      if (original && original.text.trim().toLowerCase() === trimmed.toLowerCase()) {
        return toast.error('📢 Nội dung sửa không được trùng với nội dung cũ!');
      }
      if (isDuplicateText(trimmed, editingId)) {
        return toast.error('📢 Nội dung bị trùng với công việc khác!');
      }
      const updated = todos.map(todo =>
        todo.id === editingId ? { ...todo, text: trimmed } : todo
      );
      setTodos(reassignIds(updated));
      setEditingId(null);
      toast.success('✏️ Cập nhật thành công');
    }
    setInputValue('');
  };

  const handleEdit = (id: number) => {
    if (editingId !== null) return toast.warn(' Vui lòng chỉnh sửa xong mới sử dụng chức năng khác!');
    const todo = todos.find(t => t.id === id);
    if (!todo || todo.completed) return;
    setInputValue(todo.text);
    setEditingId(id);
  };

  const handleDelete = (id: number) => {
    if (editingId !== null) return toast.warn(' Vui lòng chỉnh sửa xong mới sử dụng chức năng khác!');
    const confirm = window.confirm('❓ Bạn có chắc muốn xóa công việc này?');
    if (!confirm) return;
    setTodos(reassignIds(todos.filter(t => t.id !== id)));
    toast.success('🗑️ Xóa thành công');
  };

  const handleComplete = (id: number) => {
    if (editingId !== null) return toast.warn(' Vui lòng chỉnh sửa xong mới sử dụng chức năng khác!');
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, completed: true, id: null } : todo
    );
    setTodos(reassignIds(updated));
    toast.info('✅ Hoàn thành công việc');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">✅ Todo List</h1>
      <TodoForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleAddOrUpdate={handleAddOrUpdate}
        isEditing={editingId !== null}
        todos={todos}
        editingId={editingId}
      />
      <TodoList
        todos={todos}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleComplete={handleComplete}
      />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default App;