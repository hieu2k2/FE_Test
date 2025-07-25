import React from 'react';
import TodoList from './component/todolist/TodoList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App: React.FC = () => {
  return (
    <div>
      <TodoList />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default App;
