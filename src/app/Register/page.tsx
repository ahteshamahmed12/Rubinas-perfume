'use client';

import React from 'react';
import Image from 'next/image';

const Page = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const userName = (form.elements.namedItem('userName') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      alert('Registration successful!');
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="w-full h-full mt-2 p-4">
      <div className="flex flex-col md:flex-row items-center justify-evenly gap-6">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/register.png"
            alt="Register illustration"
            width={600}
            height={600}
            className="w-full max-w-[500px] h-auto object-contain"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 max-w-lg">
          <h6 className="font-semibold text-3xl md:text-[36px] mb-2">Create an account</h6>
          <p className="font-normal text-[16px] mb-6">Enter your details below</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              name="userName"
              placeholder="Name"
              className="w-full h-10 border-b border-gray-700"
              required
            />
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
            <button onClick={() => console.log("Button clicked")} type="submit" className="mt-4 bg-[#db4444] hover:bg-[#db2222] hover:font-semibold cursor-pointer text-white py-2 px-4 rounded">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
