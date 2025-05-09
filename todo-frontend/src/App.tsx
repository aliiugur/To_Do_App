import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { TodoProvider } from './context/TodoContext';
import { CategoryProvider } from './context/CategoryContext';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import DashboardPage from './pages/DashboardPage';
import TodoListPage from './pages/TodoListPage';
import TodoDetailPage from './pages/TodoDetailPage';
import TodoFormPage from './pages/TodoFormPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryFormPage from './pages/CategoryFormPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <TodoProvider>
        <CategoryProvider>
          <Router>
            <ToastContainer position="top-right" />
            <MainLayout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                
                <Route path="/todos" element={<TodoListPage />} />
                <Route path="/todos/create" element={<TodoFormPage />} />
                <Route path="/todos/:id" element={<TodoDetailPage />} />
                <Route path="/todos/:id/edit" element={<TodoFormPage />} />
                
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/categories/create" element={<CategoryFormPage />} />
                <Route path="/categories/:id/edit" element={<CategoryFormPage />} />
                
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </MainLayout>
          </Router>
        </CategoryProvider>
      </TodoProvider>
    </ThemeProvider>
  );
};

export default App;