'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert('Login successful!');
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password'); // make sure this route exists
  };

  return (
    <div className="w-full h-full mt-2 p-4">
      <div className="flex flex-col md:flex-row items-center justify-evenly gap-6">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/register.png"
            alt="Login illustration"
            width={600}
            height={600}
            className="w-full max-w-[500px] h-auto object-contain"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 max-w-lg">
          <h6 className="font-semibold text-3xl md:text-[36px] mb-2">Log in to Exclusive</h6>
          <p className="font-normal text-[16px] mb-6">Enter your details below</p>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              name="email"
              placeholder="Email"
              type="email"
              className="w-full h-10 border-b border-gray-700"
              required
            />
            <input
              name="password"
              placeholder="Password"
              type="password"
              className="w-full h-10 border-b border-gray-700"
              required
            />
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <button
                type="submit"
                className="bg-[#db4444] hover:bg-[#db2222] hover:font-semibold cursor-pointer text-white py-2 px-4 rounded"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="bg-[#db4444] hover:bg-[#db2222] hover:font-semibold  text-white py-2 px-4 rounded"
              >
                Forgot Password
              </button>
            </div>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
