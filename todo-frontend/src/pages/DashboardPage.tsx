import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { getTodos } from '../api/todoApi';
import { getTodoStats, getPriorityStats } from '../api/statsApi';
import { Todo, TodoStats, PriorityStats } from '../types/todo';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon, 
  ExclamationCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import StatusBadge from '../components/ui/StatusBadge';
import PriorityIndicator from '../components/ui/PriorityIndicator';
import Button from '../components/ui/Button';

const DashboardPage: React.FC = () => {
  const [upcoming, setUpcoming] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [todoStats, setTodoStats] = useState<TodoStats[]>([]);
  const [priorityStats, setPriorityStats] = useState<PriorityStats[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Yaklaşan todo'ları getir
        const todosResponse = await getTodos({
          sort: 'due_date',
          order: 'asc',
          limit: 5
        });
        
        if (todosResponse.success) {
          setUpcoming(todosResponse.data.data.filter((todo: Todo) => 
            todo.due_date && todo.status !== 'completed' && todo.status !== 'cancelled'
          ));
        }
        
        // İstatistikleri getir
        const statsResponse = await getTodoStats();
        if (statsResponse.success) {
          setTodoStats(statsResponse.data);
        }
        
        const priorityResponse = await getPriorityStats();
        if (priorityResponse.success) {
          setPriorityStats(priorityResponse.data);
        }
      } catch (error) {
        console.error('Dashboard verisi yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // İstatistik kartı için renkler ve ikonlar
  const statConfig = {
    pending: {
      icon: ClockIcon,
      bgColor: 'bg-yellow-100 dark:bg-yellow-900',
      textColor: 'text-yellow-800 dark:text-yellow-300',
      title: 'Bekleyen',
    },
    in_progress: {
      icon: ExclamationCircleIcon,
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      textColor: 'text-blue-800 dark:text-blue-300',
      title: 'Devam Eden',
    },
    completed: {
      icon: CheckCircleIcon,
      bgColor: 'bg-green-100 dark:bg-green-900',
      textColor: 'text-green-800 dark:text-green-300',
      title: 'Tamamlanan',
    },
    cancelled: {
      icon: XCircleIcon,
      bgColor: 'bg-red-100 dark:bg-red-900',
      textColor: 'text-red-800 dark:text-red-300',
      title: 'İptal Edilen',
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Dashboard</h1>
        
        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {todoStats.map((stat) => {
            const config = statConfig[stat.status as keyof typeof statConfig];
            return (
              <div
                key={stat.status}
                className={`${config.bgColor} ${config.textColor} p-6 rounded-lg shadow-sm`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <config.icon className="h-8 w-8" />
                  </div>
                  <div className="ml-5">
                    <h2 className="text-2xl font-bold">{stat.count}</h2>
                    <p className="text-sm">{config.title} Todo</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Yaklaşan Görevler */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Yaklaşan Görevler</h3>
            <Link
              to="/todos"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 flex items-center"
            >
              Tümünü Gör
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {upcoming.length === 0 ? (
            <div className="px-4 py-10 sm:px-6 text-center text-gray-500 dark:text-gray-400">
              Yaklaşan görev bulunmuyor.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {upcoming.map((todo) => (
                <li key={todo.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                  <Link to={`/todos/${todo.id}`} className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {todo.title}
                      </p>
                      <div className="mt-1 flex">
                        <StatusBadge status={todo.status} />
                        <span className="ml-2">
                          <PriorityIndicator priority={todo.priority} />
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Son: {format(new Date(todo.due_date!), 'dd MMM yyyy HH:mm', { locale: tr })}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* Hızlı İşlemler */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Hızlı İşlemler</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/todos/create">
            <Button className="w-full justify-center">
              Yeni Todo Oluştur
            </Button>
          </Link>
          <Link to="/categories/create">
            <Button className="w-full justify-center" variant="secondary">
              Yeni Kategori Oluştur
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;