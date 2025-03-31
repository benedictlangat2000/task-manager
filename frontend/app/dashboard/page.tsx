// frontend/app/dashboard/page.tsx
'use client';
import { useQuery, gql } from '@apollo/client';
import React from 'react';
import Link from 'next/link';

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

export default function Dashboard() {
  const { data, loading, error } = useQuery(GET_TASKS);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-blue-600 p-4">
        <h1 className="text-white text-3xl font-bold text-center">TaskMaster</h1>
      </div>

      {/* Content Container with Margin Top */}
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6 mt-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <Link
            href="/task"
            className="bg-green-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Create Task
          </Link>
        </div>

        {data.tasks.length > 0 ? (
          <ul className="space-y-4">
            {data.tasks.map((task: any) => (
              <li key={task.id} className="p-4 border rounded-lg hover:shadow transition-shadow">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{task.title}</h2>
                  <span className={`px-3 py-1 text-sm font-medium text-white rounded-full 
                                  ${task.status === 'completed' ? 'bg-green-500' : 
                                    task.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-500'}`}>
                    {task.status}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{task.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No tasks found.</p>
            <Link
              href="/task"
              className="bg-green-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg inline-block"
            >
              Create Your First Task
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}