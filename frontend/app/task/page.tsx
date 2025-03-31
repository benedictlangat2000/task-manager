// frontend/app/taskManagement/page.tsx
'use client';
import { useForm } from 'react-hook-form';
import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// GraphQL query to get tasks
const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      status
    }
  }
`;

// GraphQL mutation to create a task
const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String!, $status: String!) {
    createTask(title: $title, description: $description, status: $status) {
      id
      title
      description
      status
    }
  }
`;

// GraphQL mutation to update a task
const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $title: String!, $description: String!, $status: String!) {
    updateTask(id: $id, title: $title, description: $description, status: $status) {
      id
      title
      description
      status
    }
  }
`;

// GraphQL mutation to delete a task
const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)  # No subfields since it returns a Boolean
  }
`;

/**
 * TaskManagement component for managing tasks (create, update, delete).
 * @returns {JSX.Element} The rendered TaskManagement component.
 */
export default function TaskManagement() {
  const { register, handleSubmit, reset } = useForm();
  const { data, loading, error, refetch } = useQuery(GET_TASKS);
  const [createTask] = useMutation(CREATE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Effect to clear messages after 5 seconds
  useEffect(() => {
    if (message || errorMessage) {
      const timer = setTimeout(() => {
        setMessage(null);
        setErrorMessage(null);
      }, 5000);
      return () => clearTimeout(timer); // Cleanup the timer on unmount or when message changes
    }
  }, [message, errorMessage]);

  /**
   * Handles form submission for creating or updating a task.
   * @param {Object} formData - The form data containing title, description, and status.
   * @param {string} formData.title - The title of the task.
   * @param {string} formData.description - The description of the task.
   * @param {string} formData.status - The status of the task.
   * @returns {Promise<void>} A promise that resolves when the task is created or updated.
   */
  const onSubmit = async (formData: any) => {
    try {
      if (editingTask) {
        await updateTask({ variables: { id: editingTask.id, ...formData } });
        setMessage('Task updated successfully!');
        setEditingTask(null);
      } else {
        await createTask({ variables: formData });
        setMessage('Task created successfully!');
      }
      reset();
      refetch();
    } catch (err) {
      console.error('Error:', err);
      setErrorMessage('An error occurred while saving the task.');
    }
  };

  /**
   * Prepares the task for editing by setting it to the editing state and resetting the form.
   * @param {Object} task - The task object to edit.
   */
  const handleEdit = (task: any) => {
    setEditingTask(task);
    reset(task);
  };

  /**
   * Handles the deletion of a task.
   * @param {number} id - The ID of the task to delete.
   * @returns {Promise<void>} A promise that resolves when the task is deleted.
   */
  const handleDelete = async (id: number) => {
    try {
      const { data } = await deleteTask({ variables: { id: id.toString() } });
      if (data.deleteTask) {
        setMessage('Task deleted successfully!');
        refetch();
      } else {
        setErrorMessage('Failed to delete task.');
      }
    } catch (err) {
      console.error('Error deleting task:', err);
      setErrorMessage('An error occurred while deleting the task.');
    }
  };

  if (loading) return <p className="text-center mt-4">Loading tasks...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Top Bar */}
      <div className="bg-blue-600 p-4 mb-6">
        <h1 className="text-white text-3xl font-bold text-center">TaskMaster</h1>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
        <Link
          href="/dashboard"
          className="bg-green-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Back to Dashboard
        </Link>
      </div>

      {message && <p className="text-green-500">{message}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              {...register('title', { required: true })}
              placeholder="Enter task title"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register('description', { required: true })}
              placeholder="Enter task description"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-32"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb- 1">Status</label>
            <select
              {...register('status', { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              required
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {editingTask ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.tasks.map((task: any) => (
              <tr key={task.id} className="hover:bg-gray-50 even:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-600">{task.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{task.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}