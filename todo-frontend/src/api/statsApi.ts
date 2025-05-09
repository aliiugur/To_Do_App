import axiosInstance from './axios';

// Todo durumlarına göre istatistik
export const getTodoStats = async () => {
  const response = await axiosInstance.get('/stats/todos');
  return response.data;
};

// Todo önceliklerine göre istatistik
export const getPriorityStats = async () => {
  const response = await axiosInstance.get('/stats/priorities');
  return response.data;
};