"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">About Us</h2>
          <p className="text-lg text-gray-600 mb-6">
            We are passionate developers and designers building high-quality web
            experiences that help businesses grow and innovate. Our mission is
            to bring your ideas to life with modern tools and beautiful design.
          </p>
          <p className="text-lg text-gray-600">
            With years of experience in web development, we focus on delivering
            scalable, accessible, and performance-optimized solutions tailored
            to your goals.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/pic4.png" // You can replace this with your image
            alt="About Us"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
}
