import React from 'react';

interface Todo {
  id: number | null;
  text: string;
  completed: boolean;
}
interface Props {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleAddOrUpdate: () => void;
  isEditing: boolean;
  todos: Todo[];
  editingId: number | null;
}

const TodoForm: React.FC<Props> = ({
  inputValue,
  setInputValue,
  handleAddOrUpdate,
  isEditing,
}) => {
  return (
    <div className="d-flex mb-3">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Nhập công việc..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className={`btn ${isEditing ? 'btn-warning' : 'btn-primary'}`}
        onClick={handleAddOrUpdate}
        disabled={isEditing && !inputValue.trim()}
      >
        {isEditing ? '✏️ Sửa' : '✅ Thêm'}
      </button>
    </div>
  );
};

export default TodoForm;
