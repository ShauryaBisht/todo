import axios from 'axios'

const API_URL = 'http://localhost:3004/api'

export const getTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch todos", error);
    throw error;
  }
};

export const addTodo = async (todo) => {
  try {
    const response = await axios.post(`${API_URL}/add`, todo);
    return response.data;
  } catch (error) {
    console.error("Failed to add todo", error);
    throw error;
  }
};


export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};


export const toggleComplete = async (id) => {
  const response = await axios.patch(`${API_URL}/toggle/${id}`);
  return response.data;
};


