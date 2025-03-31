// frontend/app/signup/page.tsx
'use client';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// GraphQL mutation for signing up
const SIGN_UP = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

/**
 * SignUp component for user registration.
 * @returns {JSX.Element} The rendered SignUp component.
 */
export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signUp] = useMutation(SIGN_UP);
  const router = useRouter();

  // Redirect to login page after successful signup
  useEffect(() => {
    if (signupSuccess) {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [signupSuccess, router]);

  /**
   * Handles form submission for signup.
   * @param {Object} formData - The form data containing name, email, and password.
   * @param {string} formData.name - The name of the user.
   * @param {string} formData.email - The email of the user.
   * @param {string} formData.password - The password of the user.
   * @returns {Promise<void>} A promise that resolves when the signup process is complete.
   */
  const onSubmit = async (formData: any) => {
    try {
      setServerError(null); // Reset server error state
      const { data } = await signUp({ variables: formData });
      
      if (data?.signUp) {
        setSignupSuccess(true);
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setServerError(err.message || 'An error occurred during signup. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Account
        </h1>
        
        {signupSuccess ? (
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Success!</h2>
            <p className="text-gray-600">Redirecting to login page in 3 seconds...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                {...register('name', { required: true })}
                placeholder="enter name"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>

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
                  errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue- 500 focus:ring-2 focus:ring-blue-200'
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
              Create Account
            </button>

            {serverError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
                {serverError}
              </div>
            )}
          </form>
        )}

        {!signupSuccess && (
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link 
              href="/login" 
              className="text-blue-600 hover:text-blue-700 font-semibold underline"
            >
              Log in here
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}