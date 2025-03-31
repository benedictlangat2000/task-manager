'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function LandingPage() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component mounts
    setAnimate(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">TaskMaster</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/login">
                  <span className="bg-green-500 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-200">
                    Login
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow bg-gray-100 flex items-center justify-center">
        <div className="text-center p-6">
          <h2 className={`text-4xl font-bold mb-4 ${animate ? 'animate-slideInFromLeft' : ''}`}>
            Organize Your Tasks Effortlessly
          </h2>
          <p className={`text-xl mb-8 ${animate ? 'animate-slideInFromLeft' : ''}`}>
            Boost your productivity and streamline your workflow with TaskMaster.
          </p>
          <Link href="/signup">
            <span className="bg-green-500 hover:bg-gray-500 text-white font-semibold py-3 px-8 rounded transition-colors duration-200">
              Get Started
            </span>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-8">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-md shadow-md transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Task Management</h3>
            <p className="text-gray-600">
              Easily create, update, and delete your tasks.
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Team Collaboration</h3>
            <p className="text-gray-600">
              Assign tasks and collaborate with your team in real-time.
            </p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Real-Time Updates</h3>
            <p className="text-gray-600">
              Receive notifications and track progress instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}