'use client';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// GraphQL mutation for logging in
const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

/**
 * Login component for user authentication.
 * @returns {JSX.Element} The rendered Login component.
 */
export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState<string | null>(null);
  const [login] = useMutation(LOGIN);
  const router = useRouter();

  /**
   * Handles form submission for login.
   * @param {Object} formData - The form data containing email and password.
   * @param {string} formData.email - The email of the user.
   * @param {string} formData.password - The password of the user.
   * @returns {Promise<void>} A promise that resolves when the login process is complete.
   */
  const onSubmit = async (formData: any) => {
    try {
      setServerError(null); // Reset server error state
      const { data } = await login({ variables: formData });
      
      if (data?.login) {
        // Redirect to tasks dashboard on successful login
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setServerError(err.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              placeholder="john@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message?.toString()}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message?.toString()}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Sign In
          </button>

          {serverError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
              {serverError}
            </div>
          )}
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link 
            href="/signup" 
            className="text-blue-600 hover:text-blue-700 font-semibold underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}