import React from 'react';
 interface Todo {
  id: number | null;
  text: string;
  completed: boolean;
}
interface Props {
  todos: Todo[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  handleComplete: (id: number) => void;
}

const TodoList: React.FC<Props> = ({
  todos,
  handleEdit,
  handleDelete,
  handleComplete,
}) => {
  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          key={todo.text + Math.random()}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.completed ? 'list-group-item-success text-decoration-line-through' : ''
          }`}
        >
          <span>
            {todo.id !== null && <strong>{todo.id}. </strong>}
            {todo.text}
          </span>
          <div className="btn-group">
            {!todo.completed && (
              <>
                <button
                  className="btn btn-warning rounded btn-sm me-2"
                  onClick={() => handleEdit(todo.id!)}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-danger rounded btn-sm me-2"
                  onClick={() => handleDelete(todo.id!)}
                >
                  🗑️
                </button>
                <button
                  className="btn btn-secondary rounded  btn-sm"
                  onClick={() => handleComplete(todo.id!)}
                >
                  ✅
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
